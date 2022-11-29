import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../global/Sidebar";
import { createStyles, Card, Button } from "@mantine/core";
import { useMode } from "../theme";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
const useStyles = createStyles((theme) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    fontFamily: "Raleway, sans-serif",
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "auto",
    marginRight: "auto",
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
  const [projects, setProjects] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  const { classes } = useStyles();
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      setProjects(response.data);
      setProjectCount(response.data.length);

      let statusList = [];

      response.data.map((item) => {
        let statusCount;
        if (!statusList[item.status]) statusCount = 0;
        else statusCount = statusList[item.status];
        statusList[item.status] = 1 + statusCount;
      });

      setProjectStatus(statusList);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Sidebar isSidebar={isSidebar} />
      <div className={classes.container}>
        <Box backgroundColor={colors.primary[400]}>
          <h2>List of Projects</h2>
          <p>Project Count: {projectCount}</p>
          {Object.entries(projectStatus).map(([k, v]) => (
            <div>
              {k}: {v}
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default MainPage;
