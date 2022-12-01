import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../global/Sidebar";
import { createStyles, Card, Button } from "@mantine/core";
import { useMode } from "../theme";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import StatBox from "../dashboard/StatBox";
import CollectionsIcon from "@mui/icons-material/Collections";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CheckIcon from "@mui/icons-material/Check";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { SessionContext } from "../contexts/SessionContext";
import { Typography } from "@mui/material";
import YourProjects from "./YourProjects";

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

function MainPage() {
  const [projectCount, setProjectCount] = useState(0);
  const [projectStatus, setProjectStatus] = useState([]);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  const { classes } = useStyles();
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const { user } = useContext(SessionContext);
  const currentUser = user;
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => {
        setProjects(response.data);
        setProjectCount(response.data.length);

        /*   let statusList = [];

      response.data.map((item) => {
        let statusCount;
        if (!statusList[item.status]) statusCount = 0;
        else statusCount = statusList[item.status];
        statusList[item.status] = 1 + statusCount;
      });
      setProjectStatus(statusList); */
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => {
        console.log("rldhf", response.data, user._id);
        const myEvents = response.data.filter((event) => {
          const participants = event.participants.map((e) => e._id);
          console.log(participants);
          /* const filtered = event.participants.filter((participant) => {
            return participant._id === user._id;
          }); */
          /* console.log("testfiltered", filtered); */
          return participants.includes(user._id);
        });
        console.log("hello", myEvents);
        setEvents(response.data);
        setMyEvents(myEvents);
      });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Box paddingRight="20px" marginLeft="20px">
        <Box>
          {" "}
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{ color: colors.grey[100], paddingBottom: "50px" }}
          >
            Dashboard
          </Typography>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          justifyContent="center"
          alignContent="center"
          alignItems="stretch"
          width="86vw"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <StatBox
              title="Total Number of Projects"
              subtitle={projects.length}
              progress={100}
              icon={
                <CollectionsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <StatBox
              title="Total of Your Projects"
              subtitle={currentUser.createdProjects.length}
              progress={currentUser.createdProjects.length / projects.length}
              icon={
                <ReceiptOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <StatBox
              title="Total of Your Projects Validated"
              subtitle={
                currentUser.createdProjects.filter(
                  (event) => event.validationStatus === "validated"
                ).length
              }
              progress={
                currentUser.createdProjects.filter(
                  (event) => event.validationStatus === "validated"
                ).length / projects.length
              }
              icon={
                <CheckIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <StatBox
              title="Total number of your Pending Projects"
              subtitle={
                currentUser.createdProjects.filter(
                  (event) => event.validationStatus === "pending"
                ).length
              }
              progress={
                currentUser.createdProjects.filter(
                  (event) => event.validationStatus === "pending"
                ).length / currentUser.createdProjects.length
              }
              icon={
                <QueryBuilderIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>{" "}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          justifyContent="center"
          gap="20px"
          paddingTop="20px"
        >
          <Box
            gridColumn="span 8"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <YourProjects />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <Typography>Events</Typography>
            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {myEvents &&
                myEvents.map((e) => {
                  return <h3>{e.name}</h3>;
                })}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MainPage;
