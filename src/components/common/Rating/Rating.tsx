import React from "react";
import { Star, StarOutline } from "../../icons";
import "./_rating.scss";

interface StarRatingProps {
  totalStars?: number;
  starredStars: number;
}

const Rating: React.FC<StarRatingProps> = ({
  totalStars = 3,
  starredStars,
}) => {
  return (
    <span className="tier-rating">
      {[...Array(totalStars)].map((_, index) =>
        index < starredStars ? (
          <Star key={index} className="tier-rating-star" />
        ) : (
          <StarOutline key={index} className="tier-rating-star" />
        )
      )}
    </span>
  );
};

export default Rating;
