import { Star } from 'lucide-react';
import { formatRating } from '@/utils/formatters';

interface RatingBadgeProps {
  rating?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function RatingBadge({
  rating = 0,
  size = 'sm',
  className = '',
}: RatingBadgeProps) {
  return (
    <div className={`badge-rating badge-rating-${size} ${className}`}>
      <Star className="fill-amber-400 stroke-amber-400 shrink-0" />
      <span>{formatRating(rating)}</span>
    </div>
  );
}
