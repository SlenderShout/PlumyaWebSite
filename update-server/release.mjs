import { createPublicKey, verify } from "node:crypto";

export const manifestName = "release-manifest.signed.json";
export const fileNames = {
  launcher: "Plumya-Launcher-Setup-x64.exe",
  client: "plumya-client.jar",
};

export function readRelease(envelope, publicKey, component, channel) {
  const expectedFile = fileNames[component];
  if (!expectedFile || !["stable", "beta"].includes(channel) || envelope.length > 65536) {
    throw new Error("Invalid release envelope");
  }

  const { payloadB64, signatureB64 } = JSON.parse(envelope);
  const payload = Buffer.from(payloadB64, "base64");
  const signature = Buffer.from(signatureB64, "base64");
  const keyBytes = Buffer.from(publicKey, "base64");
  if (keyBytes.length !== 32 || signature.length !== 64) throw new Error("Invalid Ed25519 key or signature");

  const key = createPublicKey({
    key: Buffer.concat([Buffer.from("302a300506032b6570032100", "hex"), keyBytes]),
    format: "der",
    type: "spki",
  });
  if (!verify(null, payload, key, signature)) throw new Error("Release signature verification failed");

  const release = JSON.parse(payload.toString("utf8"));
  const file = release.files?.[0];
  if (
    release.schemaVersion !== 1 || release.minecraftVersion !== "26.2" || release.channel !== channel ||
    typeof release.version !== "string" || !/^[a-zA-Z0-9.-]{1,64}$/.test(release.version) ||
    release.files?.length !== 1 || file?.name !== expectedFile ||
    typeof file.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(file.sha256) ||
    !Number.isSafeInteger(file.size) || file.size < 1 || file.size > (component === "client" ? 64 : 256) * 1024 * 1024
  ) throw new Error("Release manifest does not match its destination");

  return {
    version: release.version,
    file,
    notes: typeof release.notes === "string" ? release.notes.slice(0, 4000) : null,
  };
}
