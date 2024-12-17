import React from "react";

export default function Progress({
  index,
  numofQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 justify-between mb-5">
      <progress
        className="col-span-2 w-full h-3 progress-bar"
        max={numofQuestions}
        value={index + Number(answer !== null)}
      />
      <p className="self-start">
        Questions <strong>{index + 1}</strong> /{numofQuestions}
      </p>
      <p className="text-right">
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </div>
  );
}
