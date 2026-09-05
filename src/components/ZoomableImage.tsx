import { useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ZoomableImage({ src, alt = '', className = '' }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <img
          src={src}
          alt={alt}
          className={`${className} cursor-zoom-in`}
          onClick={() => setIsOpen(true)}
        />
        <p className="text-xs text-white/40 text-center mt-1">
          اضغط على الصورة لعرضها بالحجم الكامل
        </p>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
