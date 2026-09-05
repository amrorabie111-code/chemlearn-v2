import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ZoomableImage({ src, alt = '', className = '' }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
      <div>
        <img
          src={src}
          alt={alt}
          className={`${className} cursor-zoom-in transition-transform duration-150 ease-out active:scale-[0.98]`}
          onClick={() => setIsOpen(true)}
        />
        <p className="text-xs text-white/40 text-center mt-1">
          اضغط على الصورة لعرضها بالحجم الكامل
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <motion.img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg will-change-transform"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
