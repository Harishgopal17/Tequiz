import { useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import { DetailsContext } from "./../../App";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Loader from "./Loader";
import Timer from "./Timer";
import NextButton from "./NextButton";
import FinishedScreen from "./FinishedScreen";
import Progress from "./Progress";

const SECS_PER_QUESTIONS = 30;

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate random index b/w 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Swap the elements at i and randomIndex
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
      };
    case "timesUp":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export default function QuizApp() {
  const { BaseUrl, selectedQuiz, setError } = useContext(DetailsContext);
  const { quiz } = useParams();
  const token = localStorage.getItem("token");

  const quizName = {
    htmlquiz: "HtmlQuiz",
    cssquiz: "CssQuiz",
    javascriptquiz: "JavascriptQuiz",
    reactjsquiz: "ReactQuiz",
    nodejsquiz: "NodejsQuiz",
    javaquiz: "JavaQuiz",
    pythonquiz: "PythonQuiz",
    phpquiz: "PhpQuiz",
    sqlquiz: "SqlQuiz",
    linuxquiz: "LinuxQuiz",
    aiquiz: "AiQuiz",
    seoquiz: "SeoQuiz",
  };

  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numofQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    if (!quiz || !BaseUrl || !token) {
      console.warn("Missing required data for fetching quiz.");
      return;
    }

    async function fetchQuiz() {
      try {
        const res = await fetch(`${BaseUrl}/api/v1/quiz/${quizName[quiz]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch quiz.");

        const data = await res.json();
        const questions = shuffleArray(data.data.questions);

        dispatch({ type: "dataReceived", payload: questions });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        setError("There was an error fetching quiz...");
      }
    }
    fetchQuiz();
  }, [token, BaseUrl, quiz]);

  async function updateUserActivity(selectedQuiz, points) {
    try {
      const res = await fetch(`${BaseUrl}/api/v1/users/update-user-activity`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recentActivity: { quizName: selectedQuiz, score: points },
          completedQuizzes: { quizName: selectedQuiz, score: points },
        }),
      });

      if (!res.ok) throw new Error(data.message);
      const data = await res.json();
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    if (status === "finished") {
      updateUserActivity(selectedQuiz, points);
    }
  }, [status, selectedQuiz, points]);

  return (
    <div className="flex h-screen flex-col items-center pt-20 max-md:items-center max-md:px-8 max-md:pt-28 dark:text-light">
      <header className="mb-4">
        <h2 className="text-[56px] font-medium max-sm:text-3xl max-md:text-4xl">
          {selectedQuiz}
        </h2>
      </header>
      <main className="flex flex-col items-center">
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen
            secPerQue={SECS_PER_QUESTIONS}
            numofQuestions={numofQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <div className="w-[500px]">
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <Progress
                index={index}
                numofQuestions={numofQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
            </div>
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              answer={answer}
              index={index}
              numofQuestions={numofQuestions}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            dispatch={dispatch}
          />
        )}
      </main>
    </div>
  );
}
