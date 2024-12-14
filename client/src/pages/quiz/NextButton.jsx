export default function NextButton({
  dispatch,
  answer,
  index,
  numofQuestions,
}) {
  if (answer === null) return;

  if (index < numofQuestions - 1)
    return (
      <button
        className="text-lg font-normal border border-transparent  rounded-full bg-slate-white hover:bg-light hover:border-lightest  transition-all duration-300 px-6 py-3 self-end dark:bg-dark-bg dark:hover:bg-dark max-sm:text-base"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numofQuestions - 1)
    return (
      <button
        className="text-lg font-normal border border-transparent  rounded-full bg-slate-white hover:bg-light hover:border-lightest  transition-all duration-300 px-6 py-3 self-end dark:bg-dark-bg dark:hover:bg-dark max-sm:text-base"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}
