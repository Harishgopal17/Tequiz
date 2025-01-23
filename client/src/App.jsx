import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/quiz/Dashboard";
import QuizApp from "./pages/quiz/QuizApp";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ErrorMessage from "./components/Error";
import { explore } from "./constants/constants";

export const DetailsContext = createContext();
// const BaseUrl = "http://127.0.0.1:3000";
const BaseUrl = "https://tequiz.onrender.com";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const rootElement = document.querySelector("#root");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      rootElement.classList.add("bg-dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      rootElement.classList.remove("bg-dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const res = await fetch(`${BaseUrl}/ping`);
        const data = await res.json();
        console.log(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    pingBackend();

    const pingInterval = setInterval(() => {
      pingBackend();
    }, 840000);

    return () => clearInterval(pingInterval);
  }, []);

  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <DetailsContext.Provider
      value={{
        BaseUrl,
        isLoggedIn,
        setIsLoggedIn,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        selectedQuiz,
        setSelectedQuiz,
        setError,
        theme,
        handleTheme,
      }}
    >
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Profile />} /> */}
        {/* <Route path="/" element={<Profile />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard explore={explore} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:quiz"
          element={
            <ProtectedRoute>
              <QuizApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </DetailsContext.Provider>
  );
}

export default App;
