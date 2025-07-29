"use client";

import axios from "axios";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useEffect } from "react";

const baseUrl = "http://localhost:3000";

type User = {
  email: string;
};

type UserContextProps = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
};

export const UserContext = createContext<UserContextProps>({
  userInfo: { email: "" },
  setUserInfo: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<User>({ email: "" });

  const getCurrentUser = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseUrl}user/currentUser`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setUserInfo(response.data);
      console.log("userdata", userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
