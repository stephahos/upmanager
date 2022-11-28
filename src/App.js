import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AboutPage from "./components/AboutPage";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import NewProject from "./components/NewProject";
import ErrorPage from "./components/ErrorPage";
import AllProjects from "./components/AllProjects";
import DetailedProject from "./components/DetailedProject";

import Example from "./components/Example";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Header from "./components/Header";

function App() {
  const [themeTwo, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeTwo}>
        <CssBaseline />
        <div className="App">

          <Header />
          <Routes>
            <Route path="/" element={<HomePage theme={themeTwo} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/main"
              element={
                <PrivateRoute>
                  <MainPage />{" "}
                </PrivateRoute>
              }
            />
            <Route path="/example" element={<Example />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/newproject"
              element={
                <PrivateRoute>
                  <NewProject />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <AllProjects />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <PrivateRoute>
                  <DetailedProject />{" "}
                </PrivateRoute>
              }
            />

            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
