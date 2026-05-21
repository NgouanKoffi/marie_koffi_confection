import "server-only";
import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";

const ZONE     = () => process.env.BUNNY_STORAGE_ZONE!;
const PASSWORD = () => process.env.BUNNY_STORAGE_PASSWORD!;
const HOST     = () => process.env.BUNNY_STORAGE_HOST || "storage.bunnycdn.com";
const CDN      = () => process.env.NEXT_PUBLIC_BUNNY_CDN_HOST!;
const FOLDER   = () => process.env.BUNNY_PROJECT_FOLDER || "mkc";

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg":  "jpg",
  "image/png":  "png",
  "image/webp": "webp",
  "image/gif":  "gif",
  "image/avif": "avif",
};

export async function uploadToBunny(opts: {
  file: File | Blob;
  subfolder: string;
  mime?: string;
}): Promise<{ url: string; path: string }> {
  if (!ZONE() || !PASSWORD() || !CDN()) {
    throw new Error(
      "Bunny env missing — set BUNNY_STORAGE_ZONE, BUNNY_STORAGE_PASSWORD, NEXT_PUBLIC_BUNNY_CDN_HOST",
    );
  }

  const mime = opts.mime || ("type" in opts.file ? opts.file.type : "") || "image/jpeg";
  const ext  = EXT_BY_MIME[mime] || "bin";
  const name = `${randomUUID()}.${ext}`;
  const path = `${FOLDER()}/${opts.subfolder}/${name}`;
  const buf  = Buffer.from(await opts.file.arrayBuffer());

  const res = await fetch(
    `https://${HOST()}/${ZONE()}/${path}`,
    {
      method: "PUT",
      headers: {
        AccessKey: PASSWORD(),
        "Content-Type": "application/octet-stream",
      },
      body: new Uint8Array(buf),
    },
  );

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Bunny upload failed (${res.status}): ${txt}`);
  }

  const url = `https://${CDN()}/${path}`;

  try {
    const sb = await createClient();
    const { data: { user } } = await sb.auth.getUser();
    await sb.from("media").insert({
      path,
      url,
      mime,
      size_bytes: buf.byteLength,
      uploaded_by: user?.id ?? null,
    });
  } catch { /* ignore */ }

  return { url, path };
}

export async function deleteFromBunny(path: string): Promise<void> {
  if (!path) return;
  const res = await fetch(
    `https://${HOST()}/${ZONE()}/${path}`,
    { method: "DELETE", headers: { AccessKey: PASSWORD() } },
  );
  if (!res.ok && res.status !== 404) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Bunny delete failed (${res.status}): ${txt}`);
  }
  try {
    const sb = await createClient();
    await sb.from("media").delete().eq("path", path);
  } catch {}
}

export function pathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\/+/, "");
  } catch {
    return null;
  }
}
