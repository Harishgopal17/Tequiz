import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const sec = Math.floor(secondsRemaining % 60);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timesUp" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div
      className={`text-right mb-5 font-medium ${
        secondsRemaining < 60 && "text-red-600"
      }`}
    >
      <span>Time left:</span>{" "}
      <span className={``}>
        {min < 10 && "0"}
        {min}:{sec < 10 && "0"}
        {sec}
      </span>
    </div>
  );
}
