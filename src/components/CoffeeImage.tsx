import { useState } from 'react';
import { CoffeeBeanIcon } from './Icons';

interface CoffeeImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function CoffeeImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
}: CoffeeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#EFE6D8] via-[#E5D7C3] to-[#D8C3A8] ${containerClassName}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-[#5C3A21]">
          <CoffeeBeanIcon className="h-9 w-9 text-[#8C5219]" />
          <span className="text-sm font-semibold text-[#2C1A12]">{alt}</span>
        </div>
      )}
    </div>
  );
}
