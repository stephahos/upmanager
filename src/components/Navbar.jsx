import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/upmanager_logo.svg";
import {
  createStyles,
  Card,
  Button,
  PasswordInput,
  TextInput,
} from "@mantine/core";
const useStyles = createStyles((theme) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    display: "flex",
    alignItems: "center",
    justifyContent: "space-btewee",
    backgroundColor: "rgba(242, 242, 242, 0.741)",
    height: "5em",
    paddingLeft: "5em",
  },
}));
function Navbar() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <img src={logo} alt="logo" style={{ maxWidth: "150px" }} />

      <Link to="/newproject">Hello</Link>
    </div>
  );
}

export default Navbar;
