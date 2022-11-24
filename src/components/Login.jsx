import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {
  createStyles,
  Card,
  Button,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useContext, useState } from "react";

import { SessionContext } from "../contexts/SessionContext";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(SessionContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const useStyles = createStyles((theme) => ({
    wrapper: {
      // subscribe to color scheme changes right in your styles
      fontFamily: "Raleway, sans-serif",
      width: "100%",
      paddingTop: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: theme.radius.sm,
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const parsed = await response.json();

    if (parsed.status === 200) {
      setToken(parsed.token);
      navigate(`/profile`);
    } else {
      setError(parsed);
    }
  };
  return (
    <div>
      <Header />
      <div className={classes.wrapper}>
        <Card shadow="md" p="lg" radius="lg" style={{ padding: "50px 150px" }}>
          <h1>
            Log
            <span
              style={{
                backgroundColor: "#C0EB75",
                fonFamily: "Raleway, sans-serif",
              }}
            >
              in
            </span>
          </h1>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              radius="xl"
              size="md"
              withAsterisk
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ paddingBottom: "20px" }}
              required
            />
            <PasswordInput
              label="Password"
              radius="xl"
              size="md"
              withAsterisk
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ paddingBottom: "40px" }}
              required
            />
            {/* <button className={classes.button}>Botao</button> */}
            <Button type="submit" className={classes.button}>
              Let's go!
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
