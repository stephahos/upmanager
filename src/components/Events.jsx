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
  events && console.log(events);

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
      gap: "20px",
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
        console.log("response.data", response.data);
        setEvents(response.data);
      });
  }, []);

  useEffect(() => {
    filteredEvents;
  }, []);

  return (
    <div className={classes.wrapper}>
      <Box paddingRight="20px">
        <h2>List of Projects</h2>

        <div className={classes.wrapper}>
          <Box
            p="md"
            hiddenBreakpoint="sm"
            withBorder
            width={{ sm: 200, lg: 200 }}
          >
            <Text>Research</Text>
            <TextInput
              value={query}
              placeholder="Search Event Name"
              onInput={(e) => setQuery(e.target.value)}
            />

            <TextInput
              value={queryTopic}
              placeholder="Search Event Topic"
              onInput={(e) => setQueryTopic(e.target.value)}
            />
          </Box>
          {filteredEvents().map((event) => (
            <Card
              key={event._id}
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              style={{ width: "300px", margin: "50px" }}
            >
              <Card.Section>
                <Image src={meeting} height={160} alt="meeting" />
              </Card.Section>

              <Card
                shadow="sm"
                p="xl"
                radius="md"
                withBorder
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                <div
                  style={{
                    padding: "5px",
                    fontSize: "15px",
                    border: "solid #5F3DC4",
                    borderRadius: "20px",
                    marginTop: "10px",
                  }}
                >
                  <h3>{event.name}</h3>{" "}
                </div>
                Event Date
                <div
                  style={{
                    padding: "5px",
                    fontSize: "15px",
                    border: "solid #392576",
                    borderRadius: "20px",
                    marginTop: "1Opx",
                  }}
                >
                  {
                    <p>{event.date.toString().split("T")[0]}</p>
                    /* .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }) */
                  }
                </div>
                Address
                <div
                  style={{
                    padding: "5px",
                    fontSize: "15px",
                    border: "solid #C0EB75",
                    borderRadius: "20px",
                    marginTop: "1Opx",
                  }}
                >
                  {event.eventAddress}
                </div>
                <p>{event.comment}</p>
                <p>{event.topic}</p>
                <p>{event.projectsReviewed}</p>
                {/*   {<p>{event.participants}</p>} */}
              </Card>
              {/*   <p>{event.createdBy.firstName}</p> */}
              {/* <Link to={`/projects/${project._id}`}>Details</Link> */}
            </Card>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default Events;
