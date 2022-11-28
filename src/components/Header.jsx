import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import logo from "../assets/upmanager_logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
//import "../style/Header.css";
import {
  createStyles,
  Card,
  Button,
  PasswordInput,
  TextInput,
  Divider,
} from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";

function Header() {
  const useStyles = createStyles((theme) => ({
    wrapper: {
      // subscribe to color scheme changes right in your styles
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",

      height: "5em",
      padding: "1.5em 5em",
      /* borderBottom: "0.1em solid rgba(192, 235, 217, .1);", */
    },
    link: {
      textDecoration: "none",
      fontFamily: "Raleway, sans-serif",
      fontWeight: "400",
      paddingRight: "1em",
    },
    button: {
      fontWeight: "700",
      padding: "10px 50px",
      color: "#5F3DC4",
      backgroundColor: "#C0EB75",
      borderRadius: "50px",
      borderStyle: "none",
      fontSize: ".95em",
      "&:hover": {
        backgroundColor: "#5F3DC4",
        color: "#fff",
      },
    },
  }));
  const { classes } = useStyles();
  const { isAuthenticated } = useContext(SessionContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  function logout() {
    localStorage.clear();
    isAuthenticated = false;
    navigate(`/login`);
  }
  return (
    <div>
      {isAuthenticated ? (
        <div className={classes.wrapper}>
          <div>
            <NavLink className={classes.link} to="/main">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "150px",
                  display: "block",
                  margin: "0 auto 30px",
                  clear: "both",
                }}
              />
            </NavLink>
          </div>
          <div>
            <IconButton
              onClick={colorMode.toggleColorMode}
              style={{ margin: "0 10px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <Link to="/newproject">
              <button
                className={classes.button}
                style={{ margin: "0 10px", padding: "10px 20px" }}
              >
                New Project
              </button>
            </Link>
            <Link
              className={classes.link}
              to="/projects"
              style={
                theme.palette.mode === "dark"
                  ? { color: "#fff" }
                  : { color: "#000" }
              }
            >
              All Projects
            </Link>
            <Link
              className={classes.link}
              to='/profile'
              style={
                theme.palette.mode === "dark"
                  ? { color: "#fff" }
                  : { color: "#000" }
              }
            >
              Profile
            </Link>

            <Link
              className={classes.link}
              style={
                theme.palette.mode === "dark"
                  ? { color: "#fff" }
                  : { color: "#000" }
              }
              onClick={() => logout()}
            >
              logout
            </Link>
          </div>
        </div>
      ) : (
        <div className={classes.wrapper}>
          <div>
            <NavLink className={classes.link} to="/">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "150px",
                  display: "block",
                  margin: "0 auto 30px",
                  clear: "both",
                }}
              />
            </NavLink>
          </div>
          <div style={{ margin: "0 10px", padding: "0px 20px" }}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              style={{ margin: "0 20px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <Link
              className={classes.link}
              to="/about"
              style={
                theme.palette.mode === "dark"
                  ? { color: "#fff" }
                  : { color: "#000" }
              }
            >
              About us
            </Link>
          </div>
        </div>
      )}
      {/* <Link to="/" className={classes.wrapper}>
        <img src={logo} alt="logo" style={{ maxWidth: "150px" }} />
      </Link> */}
    </div>
  );
}

export default Header;
