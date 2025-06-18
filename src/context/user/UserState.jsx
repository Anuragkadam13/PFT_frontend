import React, { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [dashboarddata, setDashboardData] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://pft-backend-wine.vercel.app/api/auth/getuser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const json = await response.json();
      if (json.success && json.user) {
        setUser(json.user);
      } else {
        console.log("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const dashboardData = async () => {
    try {
      const response = await fetch(
        "https://pft-backend-wine.vercel.app/api/dashboard/getDashboardData",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const json = await response.json();
      if (json) {
        setDashboardData(json);
      } else {
        console.log("User data is not available");
      }
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ fetchUser, user, dashboardData, dashboarddata }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
