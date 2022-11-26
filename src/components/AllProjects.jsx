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

// teste ****************************
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

// teste ***************

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

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
  }));
  const { classes } = useStyles();

  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      console.log("response.data", response.data);
      setProjects(response.data);
    });
  }, []);

  const handleChange = async (event) => {
    setQuery(event.target.value);
    const responseQuery = await axios.get(
      `http://localhost:5005/api/projects/search?q=${query}`
    );

    console.log("responseQuery", responseQuery.data);
    setProjects(responseQuery.data);
  };

  return (
    <div>
      <h2>List of Projects</h2>

      {/*   <div className={classes.wrapper}>
        <Aside
          p="md"
          hiddenBreakpoint="sm"
          withBorder
          width={{ sm: 200, lg: 200 }}
        >
          <Text>Research Sidebar</Text>
          <input value={query} placeholder="Search" onChange={handleChange} />
        </Aside>
        {projects.map((project) => (
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
      </div> */}
    </div>
  );
}

export default AllProjects;
