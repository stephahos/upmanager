import React from "react";
import { useState, useEffect } from "react";
import meeting from "../images/meeting4.jpg";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Badge, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Divider, Input, Select, Card, Aside } from "@mantine/core";
import { useNavigate, Link, Navbar } from "react-router-dom";
import { tokens } from "../theme";
import userEvent from "@testing-library/user-event";
import {
  Image,
  Text,
  TextInput,
  Button,
  Group,
  createStyles,
} from "@mantine/core";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    fontFamily: "Raleway, sans-serif",

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",

    gap: "20px",
  },
  container: {
    // subscribe to color scheme changes right in your styles
    fontFamily: "Raleway, sans-serif",
    width: "100%",
    paddingTop: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "auto",
    marginRight: "auto",
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
  link: {
    textDecoration: "none",
    fontFamily: "Raleway, sans-serif",
    fontWeight: "400",
    paddingRight: "1em",
  },
}));

function Events() {
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);

  const [events, setEvents] = useState([]);
  /* const [projects, setProjects] = useState([]); */
  /* events && console.log(events); */

  const [query, setQuery] = useState("");

  /* const [queryCountry, setQueryCountry] = useState(""); */
  const [queryTopic, setQueryTopic] = useState("");

  const filteredEvents = () => {
    let eventsFilter = events;
    if (query) {
      eventsFilter = eventsFilter.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (queryTopic) {
      eventsFilter = eventsFilter.filter((event) =>
        event.topic.toLowerCase().includes(queryTopic.toLowerCase())
      );
    }
    return eventsFilter;
  };

  const useStyles = createStyles((theme) => ({
    wrapper: {
      fontFamily: "Raleway, sans-serif",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "10px",
    },
  }));
  const { classes } = useStyles();

  /* const [fetchedUsers, setFetchedUsers] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users`).then((response) => {
      const dataUser = response.data;
      console.log(
        "test",
        events[0].participants.filter((participant) => {
          participant._id === dataUser._id;
        })
      );
      {
        const array = dataUser.map((user) => {
          return {
            value: user._id,
            label: `${user.firstName} ${user.lastName}`,
          };
        });
      }
      setFetchedUsers(array); 
    });
  }, []); */

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => {
        setEvents(response.data);
      });
  }, []);

  useEffect(() => {
    filteredEvents;
  }, []);

  return (
    <div className={classes.wrapper}>
      <Box paddingRight="20px">
        <Box
          justifyContent="center"
          alignContent="center"
          width="86vw"
          gap="20px"
        >
          <h1>List of Projects</h1>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{ paddingRight: "15px", width: "200px" }}
                value={query}
                placeholder="Search Event Name"
                onInput={(e) => setQuery(e.target.value)}
              />
              <TextInput
                value={queryTopic}
                placeholder="Search Event Topic"
                onInput={(e) => setQueryTopic(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {filteredEvents().map((event) => (
                <Card
                  key={event._id}
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  style={{
                    width: "300px",
                    margin: "20px 40px 0 40px",
                    height: "600px",
                  }}
                >
                  <Card.Section>
                    <Image src={meeting} height={160} alt="meeting" />
                  </Card.Section>

                  <Card
                    shadow="sm"
                    p="xl"
                    radius="md"
                    withBorder
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      backgroundColor: "#CEC2EB",
                    }}
                  >
                    <h3>Event Name</h3>
                    <p
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {event.name}
                    </p>{" "}
                    <h3>Happening on</h3>
                    {<p>{event.date.toString().split("T")[0]}</p>}
                    {event.eventAddress}
                    <p>{event.comment}</p>
                    <h3>Topics and Participants</h3>
                    <p>{event.topic}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {event &&
                        event.participants.map((participant) => {
                          return (
                            <div key={participant._id}>
                              {" "}
                              <p style={{ fontWeight: "bold" }}>
                                {participant.firstName}
                              </p>{" "}
                              <img
                                src={participant.image}
                                style={{
                                  width: "50px",
                                  borderRadius: "50%",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                                alt="participantImg"
                              />
                            </div>
                          );
                        })}
                    </div>
                  </Card>
                </Card>
              ))}
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Events;
