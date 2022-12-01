import { useLocalStorage } from "@mantine/hooks";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  //const [token, setToken] = useState()
  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: undefined,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [needRedirectToMain, setneedRedirectToMain] = useState(false);
  const navigate = useNavigate();
  const verifyToken = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/verify`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const parsed = await response.json();
    console.log("parsed", parsed);
    if (parsed.message === "Token OK") {
      setIsAuthenticated(true);
      setUser(parsed.user);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  useEffect(() => {
    if (user && needRedirectToMain) {
      setneedRedirectToMain(false);
      navigate(`/`);
      // Navigate to main
    }
  }, [needRedirectToMain, user]);

  const fetchWithToken =
    (method, endpoint, callback, body = null) =>
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body,
        }
      );
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
      value={{
        token,
        setToken,
        isAuthenticated,
        fetchWithToken,
        user,
        setneedRedirectToMain,
        setUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
