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
import { useNavigate, Link, Navbar, useParams } from "react-router-dom";
import { Image, Text, Badge, Button, Group, Modal } from "@mantine/core";
import axios from "axios";

function DetailedProject(props) {
  const { projectId } = useParams();
  console.log("projectId", projectId);
  const [foundProject, setFoundProject] = useState(null);

  const [foundTitleEdit, setFoundTitleEdit] = useState("");

  const [opened, setOpened] = useState(false);

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
    axios
      .get(`http://localhost:5005/api/projects/${projectId}`)
      .then((response) => {
        console.log("response.data", response.data);
        setFoundProject(response.data);
      });
  }, []);

  return (
    <div>
      <Link to="/projects">Back</Link>

      <h1>Project Details</h1>
      {!foundProject && <h3>Project not found!</h3>}

      {foundProject && (
        <div className={classes.wrapper}>
          <Card
            shadow="sm"
            p="xl"
            radius="md"
            withBorder
            style={{ width: "500px", margin: "50px" }}
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>
            <h3>{foundProject.title}</h3>
            <p>{foundProject.number}</p>
            <p>{foundProject.activity}</p>
            <p>{foundProject.service}</p>
            <p>{foundProject.deadLine}</p>
            <p>Created by: {foundProject.creator}</p>
          </Card>
        </div>
      )}
      <div>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Introduce yourself!"
        >
          {/* Modal content */}
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Title"
              radius="xl"
              size="md"
              withAsterisk
              value={foundTitleEdit.number}
              onChange={(event) => setFoundTitleEdit(event.target.value)}
              style={{ paddingBottom: "20px" }}
              required
            />

            <Button type="submit" className={classes.button}>
              Register
            </Button>
          </form>
        </Modal>

        <Group position="center">
          <Button onClick={() => setOpened(true)}>Open Modal</Button>
        </Group>
      </div>
    </div>
  );
}

export default DetailedProject;
