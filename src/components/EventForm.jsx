import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Divider, Input, Select, createStyles, Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

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

function EventForm() {
  const [newName, setNewName] = useState("");

  const [newDate, setNewDate] = useState("");

  const [newEventAddress, setNewEventAddress] = useState("");

  const [newComment, setNewComment] = useState("");

  const [newTopic, setNewTopic] = useState("");

  const [newProjectsReviewed, setNewProjectsReviewed] = useState("");

  const [newParticipants, setNewParticipants] = useState("");

  const [fetchedUsers, setFetchedUsers] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5005/api/users").then((response) => {
      console.log("response.data", response.data);
      setFetchedUsers(response.data);
    });
  }, []);

  const navigate = useNavigate();
  const { classes } = useStyles();
  const { token } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      newName,
      newDate,
      newEventAddress,
      newComment,
      newTopic,
      newProjectsReviewed,
      newParticipants,
    });

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
    <div>
      <div className={classes.wrapper}>
        <Card shadow="md" p="lg" radius="lg" style={{ padding: "50px 150px" }}>
          <form onSubmit={handleSubmit}>
            <h1> Create a new event</h1>
            <Divider>Add Event Entry</Divider> <br />
            <label>Name of Event</label>
            <Input
              size="md"
              value={newName}
              type="text"
              placeholder="Name the event"
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <Input
              value={newDate}
              type="date"
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <Input
              value={newEventAddress}
              type="text"
              onChange={(event) => {
                setNewEventAddress(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
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
            <>
              {fetchedUsers.map((user) => (
                <div key={user._id} className="card">
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              ))}
            </>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default EventForm;
