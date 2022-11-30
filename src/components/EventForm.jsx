import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Divider, Input, Select, createStyles, Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { MultiSelect } from "@mantine/core";
import { Box } from "@mui/system";

const useStyles = createStyles((theme) => ({
  wrapper: {
    fontFamily: "Raleway, sans-serif",

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",

    gap: "20px",
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

  const [newProjectsReviewed, setNewProjectsReviewed] = useState("");

  console.log("new parti", newParticipants);

  /*  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      console.log("response.data", response.data);
      const dataProject = response.data;
      const arrayOfProjects = dataProject.map((project) => {
        return `${project.number} ${project.title}`;
      });
      console.log("test2", arrayOfProjects);
      setFetchedProjects(arrayOfProjects);
    });
  }, []); */

  const [fetchedProjects, setFetchedProjects] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      console.log("test", response.data);
      const dataProjects = response.data;
      const arrayProjects = dataProjects.map((project) => {
        return {
          value: project._id,
          label: `${project.number} ${project.title}`,
        };
      });
      setFetchedProjects(arrayProjects);
    });
  }, []);

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
        projectsReviewed: newProjectsReviewed,
        participants: newParticipants,
      }),
    });

    /* navigate("/events"); */

    setNewName("");
    setNewDate("");
    setNewEventAddress("");
    setNewComment("");
    setNewTopic("");
    setNewProjectsReviewed("");
    setNewParticipants("");
  };

  return (
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
            shadow="md"
            p="lg"
            radius="lg"
            style={{ padding: "120px 180px" }}
          >
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
              {fetchedProjects && (
                <Select
                  label="Project"
                  size="md"
                  placeholder="Pick one"
                  searchable
                  nothingFound="No options"
                  data={fetchedProjects}
                  onChange={setNewProjectsReviewed}
                  style={{ paddingBottom: "20px" }}
                  radius="xl"
                />
              )}
              <MultiSelect
                data={fetchedUsers}
                label="Who is invited ?"
                placeholder="Pick all that you like"
                onChange={setNewParticipants}
                value={newParticipants}
                searchable
                searchValue={searchValue}
                onSearchChange={onSearchChange}
                nothingFound="Nothing found"
                radius="xl"
                size="md"
              />
              <button
                type="submit"
                className={classes.button}
                style={{ marginTop: "20px" }}
              >
                Create Event
              </button>
            </form>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export default EventForm;
