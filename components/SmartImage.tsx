"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & { wrapperClassName?: string };

export default function SmartImage({
  wrapperClassName = "",
  className = "",
  onLoad,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${wrapperClassName}`}>
      {!loaded && (
        <div
          aria-hidden
          className="skeleton absolute inset-0 z-[1]"
        />
      )}
      <Image
        {...rest}
        className={className}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </div>
  );
}
