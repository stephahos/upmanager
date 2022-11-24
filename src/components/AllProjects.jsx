import React from "react";
import { useState, useEffect } from "react";
import { Divider, Input, Select, createStyles, Card } from "@mantine/core";
import { useNavigate, Link, Navbar } from "react-router-dom";
import axios from "axios";

function AllProjects() {
  const [projects, setProjects] = useState([]);

  const [query, setQuery] = useState("");

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
      <div>
        <input value={query} onChange={handleChange} />
      </div>

      <div>
        <h2>List of Projects</h2>
        {projects.map((project) => (
          <div key={project._id} className="card">
            <h2>{project.title}</h2>
            <h3>{project.number}</h3>
            <h3>{project.country}</h3>
            <h3>{project.geographicalZone}</h3>
            <h3>{project.address}</h3>
            <p>Created by: {project.creator}</p>
            <Link to={`/projects/${project._id}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProjects;
