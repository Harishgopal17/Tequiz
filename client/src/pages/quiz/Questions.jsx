import React from "react";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate random index b/w 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Swap the elements at i and randomIndex
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

export default function Questions({ question, answer, dispatch }) {
  const hasAnswerd = answer !== null;
  // const shuffeledOptions = shuffleArray(question.options);
  // console.log(question.options);
  // console.log(shuffeledOptions);

  return (
    <div>
      <h5 className="text-xl font-medium mb-5 max-sm:text-lg">
        {question.question}
      </h5>
      <div className="flex flex-col gap-4 mb-5">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`btn btn-option dark:bg-dark-bg max-sm:text-base ${
              option === answer ? "answer" : ""
            } ${
              hasAnswerd
                ? option === question.correctOption
                  ? "correct"
                  : "wrong"
                : " "
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: option })}
            disabled={hasAnswerd}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
//  className={`block text-xl font-normal w-full text-left px-6 py-3 border border-transparent  rounded-full bg-slate-white hover:bg-light hover:border-lightest  transition-all duration-300 mb-3 hover:translate-x-4  disabled:cursor-not-allowed disabled:hover:translate-x-0
