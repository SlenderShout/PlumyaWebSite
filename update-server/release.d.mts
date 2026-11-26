export const manifestName: "release-manifest.signed.json";
export const fileNames: { launcher: "Plumya-Launcher-Setup-x64.exe"; client: "plumya-client.jar" };
export function readRelease(
  envelope: string,
  publicKey: string,
  component: keyof typeof fileNames,
  channel: "stable" | "beta",
): { version: string; notes: string | null; file: { name: string; size: number; sha256: string } };
