import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import {
  createStyles,
  Card,
} from "@mantine/core";
import { useNavigate, Link, Navbar, useParams } from "react-router-dom";
import {
  Image,
  TextInput,
  Button,
  Group,
  Modal,
} from "@mantine/core";

function Profile() {
  const { user } = useContext(SessionContext);
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [foundUser, setFoundUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/auth/profile/${user.user._id}`)
      .then((response) => {
        console.log("response.data", response.data);
        setFoundUser(response.data);
      });
  }, []);

  const [newUpdatedFirstName, setNewUpdatedFirstName] = useState("");
  const [newUpdatedLastName, setNewUpdatedLastName] = useState("");
  const [newUpdatedEmail, setNewUpdatedUpdatedEmail] = useState("");
  const [newUpdatedPassword, setNewUpdatedPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:5005/api/${userId}`,
      {
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
      }
    );
    navigate(`/profile/${userId}`);
    setNewUpdatedFirstName("");
    setNewUpdatedLastName("");
    setNewUpdatedUpdatedEmail("");
    setNewUpdatedPassword("");
  };

  const photoUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "CLOUDINARY_PRESET")
    let data = "";

    await axios.post("https://api.cloudinary.com/vi_1/dzymqa1ce/image/upload", formData)
    .then((response) => {
      data = response.data["secure_url"]
      });
      return data;
    }

    const photoSubmit = async(e) => {
      e.preventDefault();
      await photoUpload(document.getElementById("image").files[0]);
    }



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
          <Link to="/profile">Back</Link>
          <h1>Profile</h1>
          {!foundUser && <h3>Profile not found!</h3>}

          {foundUser && (
            <div className={classes.wrapper}>
              <Card
                shadow="sm"
                p="xl"
                radius="md"
                withBorder
                style={{ width: "500px", margin: "50px" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="solidwaste"
                />
                <form 
                onSubmit={photoSubmit}
                method="POST" 
                action="#" 
                encType="multipart/form-data">
                  <input type="file" id="image" name="imageUrl" accept="image/png, image/jpg" />
                  <button type="submit">Submit</button>
                </form>
                <p>{foundUser.firstName}</p>
                <p>{foundUser.lastName}</p>
                <p>{foundUser.email}</p>
                <p>{foundUser.password}</p>
              </Card>
            </div>
          )}
          <div>
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
                    onChange={(event) => setNewUpdatedFirstName(event.target.value)}
                    style={{ paddingBottom: "20px" }}
                    required
                  />
                  <TextInput
                    label="Last Name"
                    radius="xl"
                    size="md"
                    withAsterisk
                    value={newUpdatedLastName}
                    onChange={(event) => setNewUpdatedLastName(event.target.value)}
                    style={{ paddingBottom: "20px" }}
                    required
                  />
                  <TextInput
                    label="Email Address"
                    radius="xl"
                    size="md"
                    withAsterisk
                    value={newUpdatedEmail}
                    onChange={(event) => setNewUpdatedEmail(event.target.value)}
                    style={{ paddingBottom: "20px" }}
                    required
                  />
                  <TextInput
                    label="Password"
                    radius="xl"
                    size="md"
                    withAsterisk
                    value={newUpdatedPassword}
                    onChange={(event) => setNewUpdatedPassword(event.target.value)}
                    style={{ paddingBottom: "20px" }}
                    required
                  />
                  <Button type="submit" className={classes.button}>
                    Save Changes
                  </Button>
                </form>
              )}
            </Modal>
            <Group position="center">
              <Button onClick={() => setOpened(true)} className={classes.button}>
                Edit
              </Button>
            </Group>
          </div>
        </div>
      </>
    );
  }

  export default Profile;
