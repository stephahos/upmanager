import React from "react";
import { useState, useEffect } from "react";
import {
  Divider,
  Input,
  Select,
  createStyles,
  Card,
  Aside,
} from "@mantine/core";
import { useNavigate, Link, Navbar } from "react-router-dom";
import { Image, Text, Badge, Button, Group } from "@mantine/core";
import axios from "axios";
import Sidebar from "../global/Sidebar";
import { Box } from "@mui/system";
function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [queryCountry, setQueryCountry] = useState("");
  const [isSidebar, setIsSidebar] = useState(true);
  const filteredProjects = () => {
    let projectsFilter = projects;
    if (query) {
      projectsFilter = projectsFilter.filter((project) =>
        project.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (queryCountry) {
      projectsFilter = projectsFilter.filter((project) =>
        project.country.toLowerCase().includes(queryCountry.toLowerCase())
      );
    }

    return projectsFilter;
  };

  const useStyles = createStyles((theme) => ({
    wrapper: {
      // subscribe to color scheme changes right in your styles
      fontFamily: "Raleway, sans-serif",

      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",

      gap: "20px",
    },
  }));
  const { classes } = useStyles();

  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      console.log("response.data", response.data);
      setProjects(response.data);
    });
  }, []);

  /*  const handleChange = async (event) => {
    value.length > 2 && setQuery(event.target.value);
    const responseQuery = await axios.get(
      `http://localhost:5005/api/projects/search?q=${query}`
    );
    console.log("responseQuery", responseQuery.data);
    setProjects(responseQuery.data);
  }; */

  useEffect(() => {
    filteredProjects;
  }, []);

  return (
    <div className={classes.wrapper}>
      <Box paddingRight="20px">
        <h2>List of Projects</h2>

        <div className={classes.wrapper}>
          <Aside
            p="md"
            hiddenBreakpoint="sm"
            withBorder
            width={{ sm: 200, lg: 200 }}
          >
            <Text>Research Sidebar</Text>
            <input
              value={query}
              placeholder="Search Title"
              onInput={(e) => setQuery(e.target.value)}
            />
            <input
              value={queryCountry}
              placeholder="Search Country"
              onInput={(e) => setQueryCountry(e.target.value)}
            />
          </Aside>
          {filteredProjects().map((project) => (
            <Card
              key={project._id}
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              style={{ width: "300px", margin: "50px" }}
            >
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>
                  {project.country} n°: {project.number}
                </Text>
                <Badge color="pink" variant="light">
                  <h3>{project.status}</h3>
                </Badge>{" "}
              </Group>

              <p size="sm" color="dimmed"></p>
              <h3>{project.title}</h3>
              <h3>{project.activity}</h3>
              <h3>{project.service}</h3>
              <p>Project deadline:{project.deadLine}</p>
              <p>Created by: {project.creator}</p>
              <Link to={`/projects/${project._id}`}>Details</Link>
            </Card>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default AllProjects;
