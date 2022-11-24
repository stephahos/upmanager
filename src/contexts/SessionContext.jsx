import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  //const [token, setToken] = useState()
  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: undefined,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async () => {
    const response = await fetch("http://localhost:5005/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const parsed = await response.json();
    console.log(parsed.payload);
    if (parsed.message === "Token OK") {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const fetchWithToken =
    (method, endpoint, callback, body = null) =>
    async () => {
      const response = await fetch(`http://localhost:5005/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });
      const parsed = await response.json();

      callback(parsed);
    };

  /* useEffect(() => {
    const localToken = localStorage.getItem('token')
    setToken(localToken)
  }, [])
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    }
  }, [token]) */

  return (
    <SessionContext.Provider
      value={{ token, setToken, isAuthenticated, fetchWithToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
