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
import { useState } from "react";

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

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { classes } = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );
    const parsed = await response.json();

    if (parsed.status === 201) {
      navigate(`/login`);
    } else {
      setError(parsed);
    }
  };
  return (
    <div>
      <div className={classes.wrapper}>
        <Card shadow="md" p="lg" radius="lg" style={{ padding: "50px 150px" }}>
          <h1>
            Sign{" "}
            <span
              style={{
                backgroundColor: "#C0EB75",
                fonFamily: "Raleway, sans-serif",
              }}
            >
              up
            </span>
          </h1>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="First Name"
              size="md"
              withAsterisk
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <TextInput
              label="Surname"
              radius="xl"
              size="md"
              withAsterisk
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              style={{ paddingBottom: "20px" }}
              required
            />
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
              Register
            </Button>
          </form>
          {error && (
            <h4 style={{ color: "red", fontWeight: "900" }}>
              <em>{error.message}</em>
            </h4>
          )}
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
