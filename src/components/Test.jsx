import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo } from "react";

function Test() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/api/projects").then((response) => {
      console.log("response.data", response.data);
      setProjects(response.data);
    });
  }, []);

  const columns = useMemo(() => [
    { field: "title", headerName: "Title", width: 60 },
    { field: "country", headerName: "Country", width: 160 },
    { field: "activity", headerName: "Activity", width: 60 },
    { field: "status", headerName: "Status", width: 60 },
  ]);
  return (
    <div>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Manage Users
        </Typography>
      </Box>
      <DataGrid columns={columns} rows={projects} />
    </div>
  );
}

export default Test;
