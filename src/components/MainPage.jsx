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
import { SessionContext } from "../contexts/SessionContext";
import { Typography } from "@mui/material";

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
  const [userProjects, setUserProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  const { classes } = useStyles();
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const { user } = useContext(SessionContext);
  const currentUser = user;
  console.log(user);
  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
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
  }, []);
  const arrProj = projects.map((project) => project._id);

  useEffect(() => {
    async function userProjectStatus() {
      // You can await here
      let userProjectsdata;
      const arrProj = projects.map((project) => project._id);

      const arrUserProj = currentUser.createdProjects.map(
        (userProject) => userProject
      );

      /*  userProjectsdata = await arrProj.filter((element) =>
        arrUserProj.includes(element)
      ); */
      userProjectsdata = arrProj.filter((val, index) => {
        console.log("index", index); // Stops at array1.length - 1
        return arrUserProj.includes(val);
      });
      console.log("test 345", userProjectsdata);
      /*      for (let i = 0; i < projects.length; i++) {
        for (let j = 0; j < currentUser.createdProjects.length; j++) {
          if (project[i]._id === currentUser.createdProjects[j]._id) {
            await userProjectsdata.push(project[i]);
          }
        }
      } */
      return setUserProjects(userProjectsdata);
      // ...
    }
  }, []);
  // Or [] if effect doesn't need props or state

  return (
    <div className={classes.wrapper}>
      <Sidebar isSidebar={isSidebar} />
      <Box paddingRight="20px">
        <Box sx={{ paddingTop: "50px" }}>
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
              progress={projects.length / 100}
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
              progress={currentUser.createdProjects.length / 100}
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
              title="Test"
              subtitle={userProjects.length}
              progress={userProjects.length / 100}
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
              title="Total Number of Projects"
              subtitle={projects.length}
              progress={projects.length / 100}
              icon={
                <CollectionsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MainPage;
