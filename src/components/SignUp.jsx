import React from "react";
import Header from "./Header";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const parsed = await response.json();
    console.log(parsed);
  };
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <TextInput
          label="First Name"
          variant="filled"
          size="md"
          withAsterisk
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
        <TextInput
          label="Surname"
          variant="filled"
          size="md"
          withAsterisk
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
        <TextInput
          label="Email"
          variant="filled"
          size="md"
          withAsterisk
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          variant="filled"
          size="md"
          withAsterisk
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button type="submit" variant="light" color="cyan" size="md" uppercase>
          Register
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
