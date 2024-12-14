import React from "react";

export default function StartScreen({ secPerQue, numofQuestions, dispatch }) {
  return (
    <div className="quiz-start flex flex-col items-center gap-6">
      <p className="text-xl font-medium font-sourceCode max-md:text-lg max-md:text-center">
        This quiz contains {numofQuestions} questions and {secPerQue} sec per
        question.
      </p>
      <p className="text-xl font-medium font-sourceCode tracking-tight max-md:text-lg max-md:text-center">
        You will get 10 point for each correct answer.
      </p>
      <p className="text-center font-medium text-xl font-sourceCode max-md:text-lg max-md:text-center">
        Good luck!
      </p>
      <button
        className="px-4 py-2 bg-slate-white text-lg font-medium rounded-full text-dark border border-transparent hover:bg-light hover:border-slate-black hover:scale-105 active:scale-105 transition-all duration-300"
        onClick={() => dispatch({ type: "start" })}
      >
        Start the quiz
      </button>
    </div>
  );
}
