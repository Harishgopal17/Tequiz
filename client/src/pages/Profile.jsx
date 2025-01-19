import { useState, useEffect, useContext } from "react";
import { DetailsContext } from "./../App";
import defaultProfile from "./../assets/profileImages/defaultProfile.jpg";

export default function Profile() {
  const { BaseUrl, setError } = useContext(DetailsContext);
  const [user, setUser] = useState({});

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchProfile() {
      try {
        const res = await fetch(`${BaseUrl}/api/v1/users/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        setError(err.message);
      } finally {
      }
    }
    fetchProfile();
  }, []);

  if (!user.name) {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 dark:text-light h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <img
            src={
              user.profilePicture
                ? `/src/assets/profileImages/${user.photo}`
                : defaultProfile
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            {/* Name */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
            </div>
            {/* Email */}
            <div className="flex items-center gap-2">
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        {/* {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green text-white rounded-md"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          </div>
        )} */}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold max-sm:font-medium">
            Quizzes Attempted
          </h2>
          <p className="text-2xl max-sm:text-xl">
            {user.stats?.quizzesAttempted || 0}
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold max-sm:font-medium">
            Total Points
          </h2>
          <p className="text-2xl max-sm:text-xl">
            {user.stats?.totalPoints || 0}
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold max-sm:font-medium">
            Average Score
          </h2>
          <p className="text-2xl max-sm:text-xl">
            {user.stats?.averageScore || 0}
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.recentActivity?.map((activity, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">{activity.quizName}</h3>
              <p className="text-sm text-gray-500">Date: {activity.date}</p>
              <p className="text-sm text-gray-500">Score: {activity.score}</p>
            </div>
          ))}
        </div>
      </div>
      {/* *********** */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Completed Quizzes</h2>
        {user.completedQuizzes.map((activity, index) => (
          <details
            key={index}
            className="mb-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
          >
            <summary className="p-4 cursor-pointer font-semibold">
              {activity.quizName}
            </summary>
            <div className="p-4 pt-0 text-sm text-gray-700">
              <p>Date: {activity.date}</p>
              <p>Score: {activity.score}</p>
            </div>
          </details>
        ))}
      </div>
      {/* ********** */}

      <div className="text-right">
        <button
          className="px-4 py-2 bg-lightest hover:bg-zinc-600 text-white rounded-md transition-all duration-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
