import React from "react";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { IconTrash } from "@tabler/icons";
import {
  ActionIcon,
  Divider,
  Input,
  Select,
  createStyles,
  Card,
  Aside,
} from "@mantine/core";
import { useNavigate, Link, Navbar, useParams } from "react-router-dom";
import {
  Image,
  TextInput,
  Badge,
  Button,
  Group,
  Modal,
  Text,
} from "@mantine/core";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  wrapper: {
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

function DetailedProject() {
  const { token } = useContext(SessionContext);
  const navigate = useNavigate();

  const { projectId } = useParams();
  const { userId } = useParams();

  const [opened, setOpened] = useState(false);

  const [fetchedUsers, setFetchedUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
      .then((response) => {
        /* console.log("createdBy", response.data); */
        const dataUser = response.data;
        const array = dataUser.filter((createdBy) => {
          return `${createdBy._id.firstName} ${createdBy._id.lastName}`;
        });
        setFetchedUsers(array);
      });
  }, []);

  const [foundProject, setFoundProject] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
      .then((response) => {
        /*  console.log("response.data", response.data); */
        setFoundProject(response.data);
      });
  }, []);

  const [newUpdatedTitle, setNewUpdatedTitle] = useState("");
  const [newUpdatedCountry, setNewUpdatedCountry] = useState("");
  const [newUpdatedGeographicalZone, setNewUpdatedGeographicalZone] =
    useState("");
  const [newUpdatedAddress, setNewUpdatedAddress] = useState("");
  const [newUpdatedActivity, setNewUpdatedActivity] = useState("");
  const [newUpdatedService, setNewUpdatedService] = useState("");
  const [newUpdatedStatus, setNewUpdatedStatus] = useState("");
  const [newUpdatedDeadLine, setNewUpdatedDeadLine] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*    console.log({
      newUpdatedTitle,
    }); */
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/projects/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newUpdatedTitle,
          country: newUpdatedCountry,
          geographicalZone: newUpdatedGeographicalZone,
          address: newUpdatedAddress,
          activity: newUpdatedActivity,
          service: newUpdatedService,
          status: newUpdatedStatus,
          deadLine: newUpdatedDeadLine,
        }),
      }
    );
    navigate("/projects");
    /*  console.log(setNewUpdatedTitle); */
    setNewUpdatedTitle("");
    setNewUpdatedCountry("");
    setNewUpdatedGeographicalZone("");
    setNewUpdatedAddress("");
    setNewUpdatedActivity("");
    setNewUpdatedService("");
    setNewUpdatedStatus("");
    setNewUpdatedDeadLine("");
  };

  const deleteProjectById = async (projectId) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/projects/${projectId}`
    );
    navigate("/projects");
  };

  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
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
                  alt="solidwaste"
                />
              </Card.Section>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>
                  {foundProject.country} n°: {foundProject.number}
                </Text>
                <Badge color="pink" variant="light">
                  <h3>{foundProject.status}</h3>
                </Badge>{" "}
              </Group>
              {foundProject && (
                <>
                  <p>{foundProject.title}</p>
                  <p>{foundProject.activity}</p>
                  <p>{foundProject.service}</p>
                  <p>Projet Deadline:{foundProject.deadLine}</p>
                  <p>Created By: {foundProject?.createdBy?.firstName}</p>
                </>
              )}
            </Card>
          </div>
        )}
        <div>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Modify the project!"
          >
            {foundProject && (
              <form onSubmit={handleSubmit}>
                <TextInput
                  label="Title"
                  radius="xl"
                  size="md"
                  withAsterisk
                  value={newUpdatedTitle}
                  onChange={(event) => setNewUpdatedTitle(event.target.value)}
                  style={{ paddingBottom: "20px" }}
                  required
                />

                <Select
                  label="Country"
                  size="md"
                  placeholder="Pick one"
                  searchable
                  nothingFound="No options"
                  data={[
                    "AFGHANISTAN",
                    "ALBANIA",
                    "ALGERIA",
                    "ANGOLA",
                    "ANGUILLA",
                    "BRAZIL",
                    "BENIN",
                    "GERMANY",
                    "IRAN",
                    "NORWAY",
                  ]}
                  onChange={(event) => {
                    setNewUpdatedCountry(event);
                  }}
                  style={{ paddingBottom: "20px" }}
                  radius="xl"
                />
                <Select
                  label="Geographical Zone"
                  size="md"
                  placeholder="Pick one"
                  searchable
                  nothingFound="No options"
                  data={[
                    "Europe",
                    "Middle East",
                    "Asia",
                    "Africa",
                    "South America",
                    "North America",
                  ]}
                  onChange={(event) => {
                    setNewUpdatedGeographicalZone(event);
                  }}
                  style={{ paddingBottom: "20px" }}
                  radius="xl"
                />
                <TextInput
                  label="Address"
                  radius="xl"
                  size="md"
                  withAsterisk
                  value={newUpdatedAddress}
                  onChange={(event) => setNewUpdatedAddress(event.target.value)}
                  style={{ paddingBottom: "20px" }}
                  required
                />
                <Select
                  label="Activity"
                  size="md"
                  placeholder="Pick one"
                  searchable
                  nothingFound="No options"
                  data={[
                    "Drinking Water",
                    "Waste Water",
                    "Electricity",
                    "Energy Efficiency",
                    "District Energy",
                    "Waste",
                    "Other Activity",
                  ]}
                  onChange={(event) => {
                    setNewUpdatedActivity(event);
                  }}
                  style={{ paddingBottom: "20px" }}
                  radius="xl"
                />
                <Select
                  label="Service"
                  size="md"
                  placeholder="Pick one"
                  searchable
                  nothingFound="No options"
                  data={[
                    "Design and Supervision",
                    "General Studies",
                    "Digital Services",
                    "Asset Management",
                    "Technical and Commercial Losses",
                    "Strategic and Operational Assistance",
                  ]}
                  onChange={(event) => {
                    setNewUpdatedService(event);
                  }}
                  style={{ paddingBottom: "20px" }}
                  radius="xl"
                />
                <Select
                  label="Status"
                  size="md"
                  placeholder="Pick one"
                  searchable
                  nothingFound="No options"
                  data={[
                    "In preparation",
                    "Submitted",
                    "Awarded",
                    "Signed",
                    "Lost",
                    "Abandoned",
                    "Canceled",
                  ]}
                  onChange={(event) => {
                    setNewUpdatedStatus(event);
                  }}
                  style={{ paddingBottom: "20px" }}
                  radius="xl"
                />
                <label>Deadline</label>
                <Input
                  value={newUpdatedDeadLine}
                  type="date"
                  onChange={(event) => {
                    setNewUpdatedDeadLine(event.target.value);
                  }}
                  style={{ paddingBottom: "20px" }}
                  radius="xl"
                />

                <Button type="submit" className={classes.button}>
                  Update
                </Button>
              </form>
            )}
          </Modal>

          <Group position="center">
            <Button onClick={() => setOpened(true)} className={classes.button}>
              Update project
            </Button>

            <ActionIcon
              color="red"
              size="lg"
              radius="xs"
              variant="light"
              onClick={() => deleteProjectById(foundProject._id)}
              /*  onClick={() => sendDeleteRequest(foundProject._id)} */
            >
              <IconTrash size={26} />
            </ActionIcon>
          </Group>
        </div>
      </div>
    </div>
  );
}

export default DetailedProject;
