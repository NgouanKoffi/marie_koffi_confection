// Downscale + recompress an image in the browser BEFORE it hits the upload
// Server Action. Vercel caps serverless request bodies at ~4.5MB, so raw phone
// photos (4-8MB) would 413 in prod. We cap the longest edge and re-encode to
// JPEG so anything realistic lands well under the limit (and uploads faster).
//
// Returns the original File untouched when it isn't a raster image we can
// safely re-encode (e.g. GIF/SVG) or if compression somehow makes it bigger.

const MAX_EDGE = 2560;   // px — plenty for full-screen retina display
const QUALITY = 0.85;    // JPEG quality

const SKIP = ["image/gif", "image/svg+xml"];

// Stay safely under Vercel's ~4.5MB serverless request-body cap (multipart
// overhead included). Beyond this we refuse the upload with a clear message
// instead of letting the Server Action 413 and crash the form.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export function tooHeavyMessage(bytes: number): string {
  const mb = (bytes / 1024 / 1024).toFixed(1);
  return `Image trop lourde (${mb} Mo) même après compression. Réduisez son poids sur bulkresize.com, puis réessayez.`;
}

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || SKIP.includes(file.type)) return file;
  if (typeof document === "undefined" || typeof createImageBitmap === "undefined") return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // decode failed — let the server reject it normally
  }

  const { width, height } = bitmap;
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) { bitmap.close(); return file; }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY),
  );
  if (!blob || blob.size >= file.size) return file; // no win → keep original

  const base = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
}
