import React from "react";
import { Link } from "react-router-dom";

export default function FinishedScreen({
  points,
  maxPossiblePoints,
  dispatch,
}) {
  const percentageOfPoints = (points / maxPossiblePoints) * 100;

  return (
    <div className="flex flex-col gap-5 dark:text-light">
      <h6 className="text-lg font-sourceCode max-md:text-lg max-md:text-center">
        🎉 Congratulations! Quiz Completed! 🎉
      </h6>
      <p className="font-sourceCode mb-5 max-md:text-lg max-md:text-center">
        You scored {points} points out of {maxPossiblePoints} points (
        {Math.ceil(percentageOfPoints)}%)
      </p>
      <Link
        to="/dashboard"
        className="text-lg font-normal border border-transparent  rounded-full bg-slate-white hover:bg-light hover:border-lightest  transition-all duration-300 px-6 py-3 self-center dark:bg-dark-bg dark:hover:bg-dark max-sm:text-base"
        // onClick={() => dispatch({ type: "restart" })}
      >
        Back to home
      </Link>
    </div>
  );
}
