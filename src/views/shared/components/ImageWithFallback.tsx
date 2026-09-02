import { useState, type ImgHTMLAttributes } from 'react';
import { DEFAULT_PLACEHOLDER_POSTER } from '@/utils/constants';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_PLACEHOLDER_POSTER,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError || !imgSrc ? fallbackSrc : imgSrc}
      alt={alt || ''}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
      loading="lazy"
      {...props}
    />
  );
}
