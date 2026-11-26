import { fileNames, manifestName, readRelease } from "../../../update-server/release.mjs";

const endpoint = "https://updates.plumya.net/releases/launcher/stable/";
const options = { cache: "no-store", redirect: "error" } as const;

async function readText(response: Response, limit: number) {
  if (!response.ok || !response.body) throw new Error("Release file is unavailable");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return Buffer.concat(chunks).toString("utf8");
    length += value.length;
    if (length > limit) {
      await reader.cancel();
      throw new Error("Release file is too large");
    }
    chunks.push(value);
  }
}

async function readNotes(version: string, sha256: string, signal: AbortSignal) {
  try {
    const response = await fetch(new URL("release-notes.json", endpoint), { ...options, signal });
    const body = JSON.parse(await readText(response, 32768));
    return body.version === version && body.sha256 === sha256 && typeof body.notes === "string"
      ? body.notes.slice(0, 4000) : null;
  } catch {
    return null;
  }
}

export async function getLauncherRelease() {
  const key = process.env.PLUMYA_RELEASE_PUBLIC_KEY_B64;
  if (!key) return null;

  try {
    const download = new URL(fileNames.launcher, endpoint);
    const signal = AbortSignal.timeout(2500);
    const response = await fetch(new URL(manifestName, endpoint), { ...options, signal });
    const release = readRelease(await readText(response, 65536), key, "launcher", "stable");
    const installer = await fetch(download, { ...options, method: "HEAD", signal });
    if (!installer.ok || Number(installer.headers.get("content-length")) !== release.file.size) return null;

    const notes = release.notes ?? await readNotes(release.version, release.file.sha256, signal);
    return { ...release, notes, download: download.href };
  } catch {
    return null;
  }
}
