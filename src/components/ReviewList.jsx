import React from "react";
import ReviewHighlighter from "./ReviewHighlighter";
import { review } from "../lib/reviews_data";

const reviews = review;
console.log(reviews);
const ReviewList = () => {
  return (
    <div className=" flex flex-wrap gap-6 my-10 h-screen w-full justify-around">
      {reviews.map((review) => (
        <ReviewHighlighter key={review.review_id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
