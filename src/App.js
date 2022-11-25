import React from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*  <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
<<<<<<< Updated upstream
        <Route path="/main" element={<MainPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
=======
        {/*  <Route path="/main" element={<MainPage />} /> */}
        <Route path="/profile" element={<Profile />} />
>>>>>>> Stashed changes
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/projects" element={<AllProjects />} />
        {/* <Route path="/projects/:projectId" element={<DetailedProject />} /> */}

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
