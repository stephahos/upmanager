import React from "react";
import axios from "axios";
import upphoto from "../assets/upphoto.jpg";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { createStyles, Card } from "@mantine/core";
import { useNavigate, Link, Navbar, useParams } from "react-router-dom";
import { Image, TextInput, Button, Group, Modal } from "@mantine/core";
import { fontFamily } from "@mui/system";
import { Box } from "@mui/system";

function Profile() {
  const { user } = useContext(SessionContext);
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [foundUser, setFoundUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/auth/profile/${user._id}`)
      .then((response) => {
        console.log("response.data", response.data);
        setFoundUser(response.data);
      });
  }, []);

  const [newUpdatedFirstName, setNewUpdatedFirstName] = useState("");
  const [newUpdatedLastName, setNewUpdatedLastName] = useState("");
  const [newUpdatedEmail, setNewUpdatedEmail] = useState("");
  const [newUpdatedPassword, setNewUpdatedPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5005/api/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: newUpdatedFirstName,
        lastName: newUpdatedLastName,
        email: newUpdatedEmail,
        password: newUpdatedPassword,
      }),
    });
    navigate(`/profile/${userId}`);
    setNewUpdatedFirstName("");
    setNewUpdatedLastName("");
    setNewUpdatedEmail("");
    setNewUpdatedPassword("");
  };

  const photoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const image = e.target.imageUrl.files[0];
    formData.append("imageUrl", image);
    console.log("photoUpload");

    await axios
      .post(`http://localhost:5005/api/upload/${foundUser._id}`, formData)
      .then((response) => {
        console.log(response);
        setFoundUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const useStyles = createStyles((theme) => ({
    wrapper: {
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

  return (
    <>
      <div>
        {!foundUser && <h3>Profile not found!</h3>}
        {foundUser && (
          <div className={classes.wrapper}>
            <Box paddingRight="20px">
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
                width="86vw"
                gap="20px"
              >
                <Card
                  shadow="sm"
                  p="xl"
                  radius="md"
                  withBorder
                  style={{ width: "500px", fontFamily: "Raleway, sans-serif" }}
                >
                  <h1
                    style={{
                      color: "#392576",
                    }}
                  >
                    Profile
                  </h1>
                  {foundUser.image && (
                    <img
                      style={{ width: "30%", borderRadius: "50%" }}
                      src={foundUser.image}
                    />
                  )}
                  <h2
                    style={{
                      color: "#392576",
                    }}
                  >
                    Your Photo
                  </h2>
                  <form onSubmit={photoUpload} encType="multipart/form-data">
                    <input
                      type="file"
                      id="image"
                      name="imageUrl"
                      accept="image/png, image/jpg"
                    />
                    <button className={classes.button} type="submit">
                      Submit
                    </button>
                  </form>
                  <div
                    style={{
                      padding: "10px",
                      fontSize: "15px",
                      border: "solid #392576",
                      borderRadius: "20px",
                      marginTop: "15px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      First Name:
                    </p>
                    {foundUser.firstName}
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Last Name:
                    </p>
                    {foundUser.lastName}
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Email:
                    </p>
                    {foundUser.email}
                    <p
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Password:*********
                    </p>
                    <Group position="center">
                      <Button
                        onClick={() => setOpened(true)}
                        className={classes.button}
                      >
                        Edit
                      </Button>
                    </Group>
                  </div>
                </Card>
              </Box>
            </Box>
          </div>
        )}
        <div>
          <Box paddingRight="20px">
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              width="86vw"
              gap="20px"
            >
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Edit your profile"
              >
                {foundUser && (
                  <form onSubmit={handleSubmit}>
                    <TextInput
                      label="First Name"
                      radius="xl"
                      size="md"
                      withAsterisk
                      value={newUpdatedFirstName}
                      onChange={(event) =>
                        setNewUpdatedFirstName(event.target.value)
                      }
                      style={{ paddingBottom: "20px" }}
                      required
                    />
                    <TextInput
                      label="Last Name"
                      radius="xl"
                      size="md"
                      withAsterisk
                      value={newUpdatedLastName}
                      onChange={(event) =>
                        setNewUpdatedLastName(event.target.value)
                      }
                      style={{ paddingBottom: "20px" }}
                      required
                    />
                    <TextInput
                      label="Email Address"
                      radius="xl"
                      size="md"
                      withAsterisk
                      value={newUpdatedEmail}
                      onChange={(event) =>
                        setNewUpdatedEmail(event.target.value)
                      }
                      style={{ paddingBottom: "20px" }}
                      required
                    />
                    <TextInput
                      label="Password"
                      radius="xl"
                      size="md"
                      withAsterisk
                      value={newUpdatedPassword}
                      onChange={(event) =>
                        setNewUpdatedPassword(event.target.value)
                      }
                      style={{ paddingBottom: "20px" }}
                      required
                    />
                    <Button type="submit" className={classes.button}>
                      Save Changes
                    </Button>
                  </form>
                )}
              </Modal>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Profile;
