import type { Review } from '../data/reviews';
import StarRating from './StarRating';

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <StarRating rating={review.rating} />
          </div>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-bold">{review.name}</span> reviewed Evolve Garage
          </p>
        </div>
        <span className="text-green-500 text-2xl">✓</span>
      </div>
      
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {review.service}
        </span>
      </div>
      
      <p className="text-gray-600 flex-grow mb-4">{review.text}</p>
      
      <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm text-gray-500">
        <span>{review.car}</span>
        <span>{review.timestamp}</span>
      </div>
    </div>
  );
}