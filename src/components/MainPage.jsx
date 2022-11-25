import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
  const [projectCount, setProjectCount] = useState(0);
  const [projectStatus, setProjectStatus] = useState([]);
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      setProjects(response.data)
      setProjectCount(response.data.length);

      let statusList = [];

      response.data.map(item => {
        let statusCount;
        if (!statusList[item.status])
          statusCount = 0;
        else
          statusCount = statusList[item.status];
        statusList[item.status] = 1 + statusCount;
      });

      setProjectStatus(statusList);

    });
  }, []);

  return (
    <div>
      <h2>List of Projects</h2>
      <p>Project Count: {projectCount}</p>
      {Object.entries(projectStatus).map(([k, v]) => (
        <div>
          {k}: {v}
        </div>
      ))}
        </div>
  );
}

export default MainPage;
