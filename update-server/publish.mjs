import { createHash, randomUUID } from "node:crypto";
import { createReadStream } from "node:fs";
import { chmod, copyFile, mkdir, mkdtemp, readFile, rename, rm, stat, symlink, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileNames, manifestName, readRelease } from "./release.mjs";

const [component, channel, input, root, notesFile] = process.argv.slice(2);
const publicKey = process.env.PLUMYA_RELEASE_PUBLIC_KEY_B64;
if (!["launcher", "client"].includes(component) || !["stable", "beta"].includes(channel) || !input || !root || !publicKey) {
  console.error("Usage: PLUMYA_RELEASE_PUBLIC_KEY_B64=… node publish.mjs <launcher|client> <stable|beta> <signed-directory> <publish-root> [notes.txt]");
  process.exit(2);
}

const releases = join(resolve(root), "releases", component);
const versions = join(releases, ".versions");
await mkdir(versions, { recursive: true, mode: 0o755 });
const staged = await mkdtemp(join(versions, ".incoming-"));
const next = join(releases, `.next-${randomUUID()}`);

try {
  const manifestPath = join(input, manifestName);
  const envelope = await readFile(manifestPath, "utf8");
  const release = readRelease(envelope, publicKey, component, channel);
  const source = join(input, fileNames[component]);
  const destination = join(staged, fileNames[component]);
  await copyFile(source, destination);

  const details = await stat(destination);
  if (details.size !== release.file.size) throw new Error("Package size does not match the signed manifest");
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(destination)) hash.update(chunk);
  if (hash.digest("hex") !== release.file.sha256) throw new Error("Package hash does not match the signed manifest");

  await writeFile(join(staged, manifestName), envelope, { mode: 0o644 });
  if (notesFile) {
    const notes = await readFile(notesFile, "utf8");
    if (notes.length > 4000) throw new Error("Release notes exceed 4000 characters");
    await writeFile(join(staged, "release-notes.json"), JSON.stringify({ version: release.version, sha256: release.file.sha256, notes }), { mode: 0o644 });
  }

  // The web server reads the finished directory through a relative symlink.
  await Promise.all([
    chmod(staged, 0o755),
    chmod(destination, 0o644),
  ]);
  const target = join(".versions", `${channel}-${randomUUID()}`);
  await rename(staged, join(releases, target));
  await symlink(target, next, "dir");
  await rename(next, join(releases, channel));
  console.log(`Published ${component}/${channel} ${release.version}`);
} finally {
  await rm(staged, { recursive: true, force: true });
  await rm(next, { force: true });
}
