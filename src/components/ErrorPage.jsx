import { createStyles } from "@mantine/core";
import React from "react";
import animation from "../assets/errorPage_animation.svg";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Link } from "react-router-dom";

function ErrorPage() {
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const useStyles = createStyles((theme) => ({
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "10em", marginBottom: "-40px" }}>Oops!</h1>
        <h2
          style={{ fontSize: "4em", marginBottom: "-40px", fontWeight: "300" }}
        >
          I have bad news for you!
        </h2>
        <h3
          style={
            themeTwo.palette.mode === "dark"
              ? { color: "#fff", fontSize: "3em" }
              : { color: "#000", fontSize: "3em" }
          }
        >
          The bootcamp is over 😢{" "}
        </h3>
        <h3
          style={
            themeTwo.palette.mode === "dark"
              ? { color: "#fff", fontSize: "3em" }
              : { color: "#000", fontSize: "3em" }
          }
        >
          If you need help, call{" "}
          <span style={{ backgroundColor: "#C0EB75", color: "#5F3DC4" }}>
            {" "}
            Mat, Josh or Belchior
          </span>
          !
        </h3>
        <h4
          style={
            themeTwo.palette.mode === "dark"
              ? { color: "#fff", fontSize: "2em" }
              : { color: "#000", fontSize: "2em" }
          }
        >
          Thank you!
        </h4>
        <Link to="/">
          <button className={classes.button}>Go to the homePage!</button>
        </Link>
      </div>
      <div>
        <img src={animation} style={{ width: "30vw" }} />
      </div>
    </div>
  );
}

export default ErrorPage;
