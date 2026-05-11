export const GALLERY_COUNT = 83;

export const galleryImages: { src: string; alt: string }[] = Array.from(
  { length: GALLERY_COUNT },
  (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `/gallery/look-${n}.jpeg`,
      alt: `Marie Koffi Confection — Look ${n}`,
    };
  }
);

export const featuredImages = galleryImages.slice(0, 12);
