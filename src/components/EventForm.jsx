import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Divider, Input, Select, createStyles, Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { MultiSelect } from "@mantine/core";

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

function EventForm() {
  const [searchValue, onSearchChange] = useState("");

  const [newName, setNewName] = useState("");

  const [newDate, setNewDate] = useState("");

  const [newEventAddress, setNewEventAddress] = useState("");

  const [newComment, setNewComment] = useState("");

  const [newTopic, setNewTopic] = useState("");

  const [newParticipants, setNewParticipants] = useState("");

  console.log("new parti", newParticipants);
  /* const [fetchedProjects, setFetchedProjects] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      console.log("response.data", response.data);
      const dataProject = response.data;
      const arrayOfProjects = dataProject.map((project) => {
        return `${project.number} ${project.title}`;
      });
      console.log("test2", arrayOfProjects);
      setFetchedProjects(arrayOfProjects);
    });
  }, []);
 */

  const [fetchedUsers, setFetchedUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5005/api/users").then((response) => {
      const dataUser = response.data;
      const array = dataUser.map((user) => {
        return { value: user._id, label: `${user.firstName} ${user.lastName}` };
      });
      setFetchedUsers(array);
    });
  }, []);

  const navigate = useNavigate();
  const { classes } = useStyles();
  const { token } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*  console.log({
      newName,
      newDate,
      newEventAddress,
      newComment,
      newTopic,
      newProjectsReviewed,
      newParticipants,
    }); */

    const response = await fetch("http://localhost:5005/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newName,
        date: newDate,
        eventAddress: newEventAddress,
        comment: newComment,
        topic: newTopic,
        /* projectsReviewed: newProjectsReviewed, */
        participants: newParticipants,
      }),
    });

    /* navigate("/events"); */

    setNewName("");
    setNewDate("");
    setNewEventAddress("");
    setNewComment("");
    setNewTopic("");
    /* setNewProjectsReviewed(""); */
    setNewParticipants("");
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <Card shadow="md" p="lg" radius="lg" style={{ padding: "50px 150px" }}>
          <form onSubmit={handleSubmit}>
            <h1> Create a new event</h1>
            <Divider>Add Event Entry</Divider> <br />
            <label style={{ fontWeight: "bold" }}>Name of Event</label>
            <Input
              size="md"
              value={newName}
              type="text"
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <label style={{ fontWeight: "bold" }}>Pick a date</label>
            <Input
              value={newDate}
              type="date"
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <label style={{ fontWeight: "bold" }}>Address</label>
            <Input
              value={newEventAddress}
              type="text"
              onChange={(event) => {
                setNewEventAddress(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <label style={{ fontWeight: "bold" }}>
              Note to the participants
            </label>
            <Input
              value={newComment}
              type="text"
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <Select
              label="Topic"
              size="md"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={[
                "Project presentation",
                "Offer Review",
                "Commitment committee",
                "Contract signature",
                "Partners meeting",
                "Project Opening",
              ]}
              onChange={(event) => {
                setNewTopic(event);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            {/* <Select
              label="Participants"
              size="md"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={fetchedUsers}
              onChange={setNewParticipants}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            /> */}
            <MultiSelect
              data={fetchedUsers}
              label="Choose the projects to review"
              placeholder="Pick all that you like"
              onChange={setNewParticipants}
              value={newParticipants}
              searchable
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              nothingFound="Nothing found"
            />
            <button type="submit" className={classes.button}>
              Create
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default EventForm;
