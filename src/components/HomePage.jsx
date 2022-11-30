import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import {
  createStyles,
  Card,
  Button,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";

function HomePage({ theme }) {
  const { isAuthenticated, setToken } = useContext(SessionContext);
  const useStyles = createStyles((theme) => ({
    wrapper: {
      // subscribe to color scheme changes right in your styles
      fontFamily: "Raleway, sans-serif",
      width: "100%",

      display: "flex",

      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
    homePage: {
      // subscribe to color scheme changes right in your styles
      fontFamily: "Raleway, sans-serif",
      color: "#FFF",
      width: "100%",
      fontSize: "5em",
      height: "100vh",
      backgroundColor: "#5F3DC4",
      fontWeight: "900",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
    btnDiv: {
      // subscribe to color scheme changes right in your styles
      height: "100vh",
      fontFamily: "Raleway, sans-serif",
      width: "100%",
      fontSize: "1.5em",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
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

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.homePage}>
          Track your{" "}
          <span style={{ backgroundColor: "#C0EB75", color: "#5F3DC4" }}>
            projects
          </span>{" "}
          with just one tool.
        </div>
        <div className={classes.btnDiv}>
          <h3
            style={
              theme.palette.mode === "dark"
                ? { color: "#fff", fontWeight: "300" }
                : { color: "#000", fontWeight: "300" }
            }
          >
            Start your journey with us
            <span
              style={{
                fontWeight: "900",
                fontSize: "2.5em",
                fontFamily: "Roboto, sans-serif",
                color: "#C0EB75",
              }}
            >
              .
            </span>
          </h3>
          {!isAuthenticated && (
            <>
              <Link to="/login">
                <button className={classes.button}>Login</button>
              </Link>
              <Link to="/signup">
                <button className={classes.button}>Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
