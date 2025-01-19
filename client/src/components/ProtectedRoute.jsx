import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { DetailsContext } from "./../App";

const ProtectedRoute = ({ children }) => {
  const {
    BaseUrl,
    setIsLoggedIn,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  } = useContext(DetailsContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Simulate a token validation request
    async function validateToken() {
      setLoading(true);
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BaseUrl}/api/v1/users/validatetoken`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        // const data = await res.json();

        // if (!res.ok) throw new Error(data.message);

        setIsAuthenticated(response.ok);
        setIsLoggedIn(response.ok);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    validateToken();
  }, [BaseUrl, setIsAuthenticated, setIsLoggedIn, setLoading]);

  if (loading) {
    return (
      <div
        className={`${
          loading ? "absolute" : "hidden"
        } top-0 left-0 h-screen w-screen z-50 flex justify-center items-center bg-transparent`}
      >
        <div className="loading"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
