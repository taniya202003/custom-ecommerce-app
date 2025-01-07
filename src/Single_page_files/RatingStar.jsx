import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export const RatingStar = ({ rating }) => {
  // console.log(rating,'rating')

  const starRating = Array.from({ length: 5 }, (el, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating > index + 1 ? (
          <FaStar className="full_star" />
        ) : rating >= number ? (
          <FaStarHalfAlt className="half_star" />
        ) : (
          <FaRegStar className="empty_star" />
        )}
      </span>
    );
  });

  return (
    <div>
      <div className="stars">{starRating}</div>
    </div>
  );
};
