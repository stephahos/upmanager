import Navbar from "./Navbar";
import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";

function Profile() {
  const { user } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5005/api/login").then((response) => {
      setEmail(response.data);
    });
  });

  return (
    <>
      <Navbar />
      <p>Profile</p>
      {/* {console.log(fetchWithToken)} */}
      <form method="POST" action="/upload" enctype="multipart/form-data">
        <input type="file" name="imageUrl" accept="image/png, image/jpg" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Profile;
