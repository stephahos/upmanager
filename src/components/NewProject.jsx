import React from "react";
import { useState } from "react";
import { Select } from "@mantine/core";

function NewProject({ addedprojects, setAddedProjects }) {
  const [newNumber, setNewNumber] = useState(1);

  const [newTitle, setNewTitle] = useState("");

  const [newCountry, setNewCountry] = useState("");

  const [newGeographicalZOne, setNewGeographicalZOne] = useState("");

  const [newAddress, setNewAddress] = useState("");

  const [newActivity, setNewActivity] = useState("");

  const [newService, setNewService] = useState("");

  const [newStatus, setNewStatus] = useState("");

  const [newDeadLine, setNewDeadLine] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      newNumber,
      newTitle,
      newCountry,
      newGeographicalZOne,
      newAddress,
      newActivity,
      newService,
      newStatus,
      newDeadLine,
    });
    setAddedProjects([
      ...addedprojects,
      {
        number: newNumber,
        title: newTitle,
        country: newCountry,
        geographicalZOne: newGeographicalZOne,
        address: newAddress,
        activity: newActivity,
        service: newService,
        status: newStatus,
        deadLine: newDeadLine,
      },
    ]);
    const response = await fetch("http://localhost:5005/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newNumber,
        newTitle,
        newCountry,
        newGeographicalZOne,
        newAddress,
        newActivity,
        newService,
        newStatus,
        newDeadLine,
      }),
    });

    navigate("/projects");

    setNewNumber(1);
    setNewTitle("");
    setNewCountry("");
    setNewGeographicalZOne("");
    setNewAddress("");
    setNewActivity("");
    setNewService("");
    setNewStatus("");
    setNewDeadLine("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Divider>Add Project Entry</Divider>

      <label>Project Number</label>
      <Input
        value={newNumber}
        type="number"
        onChange={(event) => {
          setNewNumber(event.target.value);
        }}
      />

      <label>Title</label>
      <Input
        value={newTitle}
        type="text"
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
      />

      <label>Country</label>
      <Select
        label="Country"
        placeholder="Pick one"
        searchable
        nothingFound="No options"
        data={[
          "AFGHANISTAN",
          "ALBANIA",
          "ALGERIA",
          "ANGOLA",
          "ANGUILLA",
          "BRESIL",
          "BENIN",
          "GERMANY",
          "IRAN",
          "NORWAY",
        ]}
        onChange={(event) => {
          setNewCountry(event.target.data);
        }}
      />

      <label>Geographical Zone</label>
      <Select
        label="Country"
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
          setNewGeographicalZOne(event.target.data);
        }}
      />

      <label>Address</label>
      <Input
        value={newAddress}
        type="text"
        onChange={(event) => {
          setNewAddress(event.target.value);
        }}
      />

      <label>Activity</label>
      <Select
        label="Country"
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
          setNewActivity(event.target.data);
        }}
      />

      <label>Service</label>
      <Select
        label="Country"
        placeholder="Pick one"
        searchable
        nothingFound="No options"
        data={[
          "Design and Supervision",
          "General Studies",
          "Digital Services",
          "Energy Efficiency",
          "Asset Management",
          "Technical and Commercial Losses",
          "Strategic and Operational Assistance",
        ]}
        onChange={(event) => {
          setNewService(event.target.data);
        }}
      />

      <label>Status</label>
      <Select
        label="Country"
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
          setNewStatus(event.target.data);
        }}
      />

      <label>Deadline Date</label>
      <Input
        value={newDeadLine}
        type="text"
        onChange={(event) => {
          setNewDeadLine(event.target.value);
        }}
      />

      <button type="submit">Create</button>
    </form>
  );
}

export default NewProject;
