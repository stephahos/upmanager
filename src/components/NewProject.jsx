import React, { useContext } from "react";
import { useState } from "react";
import { Divider, Input, Select, createStyles, Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

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

function NewProject() {
  const [newNumber, setNewNumber] = useState("");

  const [newTitle, setNewTitle] = useState("");

  const [newCountry, setNewCountry] = useState("");

  const [newGeographicalZone, setNewGeographicalZone] = useState("");

  const [newAddress, setNewAddress] = useState("");

  const [newActivity, setNewActivity] = useState("");

  const [newService, setNewService] = useState("");

  const [newStatus, setNewStatus] = useState("");

  const [newDeadLine, setNewDeadLine] = useState("");

  const navigate = useNavigate();

  const { classes } = useStyles();
  const { token } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      newNumber,
      newTitle,
      newCountry,
      newGeographicalZone,
      newAddress,
      newActivity,
      newService,
      newStatus,
      newDeadLine,
    });
    /*   setAddedProjects([
      ...addedprojects,
      {
        number: newNumber,
        title: newTitle,
        country: newCountry,
        geographicalZone: newGeographicalZone,
        address: newAddress,
        activity: newActivity,
        service: newService,
        status: newStatus,
        deadLine: newDeadLine,
      },
    ]); */
    const response = await fetch("http://localhost:5005/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        number: newNumber,
        title: newTitle,
        country: newCountry,
        geographicalZone: newGeographicalZone,
        address: newAddress,
        activity: newActivity,
        service: newService,
        status: newStatus,
        deadLine: newDeadLine,
      }),
    });

    navigate("/projects");

    setNewNumber("");
    setNewTitle("");
    setNewCountry("");
    setNewGeographicalZone("");
    setNewAddress("");
    setNewActivity("");
    setNewService("");
    setNewStatus("");
    setNewDeadLine("");
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <Card shadow="md" p="lg" radius="lg" style={{ padding: "50px 150px" }}>
          <form onSubmit={handleSubmit}>
            <h1> Create a new project</h1>
            <Divider>Add Project Entry</Divider> <br />
            <label>Project Number</label>
            <Input
              size="md"
              value={newNumber}
              type="number"
              onChange={(event) => {
                setNewNumber(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <label style={{ fontWeight: "bold" }}>Title</label>
            <Input
              size="md"
              value={newTitle}
              type="text"
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
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
                setNewCountry(event);
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
                setNewGeographicalZone(event);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <label>Address</label>
            <Input
              size="md"
              value={newAddress}
              type="text"
              onChange={(event) => {
                setNewAddress(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
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
                setNewActivity(event);
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
                setNewService(event);
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
                setNewStatus(event);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <label>Deadline</label>
            <Input
              value={newDeadLine}
              type="date"
              onChange={(event) => {
                setNewDeadLine(event.target.value);
              }}
              style={{ paddingBottom: "20px" }}
              radius="xl"
            />
            <button type="submit" className={classes.button}>
              Create
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default NewProject;
