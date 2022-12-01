import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
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
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";

function PendingProjects() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [queryCountry, setQueryCountry] = useState("");
  const [isSidebar, setIsSidebar] = useState(true);
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const { token, user } = useContext(SessionContext);
  const navigate = useNavigate();

  const useStyles = createStyles((theme) => ({
    wrapper: {
      fontFamily: "Raleway, sans-serif",

      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",

      gap: "20px",
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
  const { classes } = useStyles();
  const columns = [
    { field: "number", headerName: "Project Number", width: 230 },
    { field: "title", headerName: "Title", width: 230 },
    {
      field: "country",
      headerName: "Country",

      width: 220,
    },
    {
      field: "activity",
      headerName: "Activity",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (cellValues) => {
        return (
          <Badge color="pink" variant="light">
            <h3>{cellValues.row.status}</h3>
          </Badge>
        );
      },
    },
    {
      field: "Details",
      width: 160,
      renderCell: (cellValues) => {
        return (
          <Button
            className={classes.button}
            sx={{
              m: 2,
              textDecoration: "none",

              "& .MuiDataGrid-cell:hover": {
                color: `${colors.greenAccent[500]}`,
              },
            }}
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Details
          </Button>
        );
      },
    },
    {
      field: "Approve",
      width: 160,
      renderCell: (cellValues) => {
        return (
          <Button
            className={classes.button}
            sx={{
              m: 2,
              textDecoration: "none",

              "& .MuiDataGrid-cell:hover": {
                color: `${colors.greenAccent[500]}`,
              },
            }}
            onClick={(event) => {
              handleApprove(event, cellValues);
            }}
          >
            Approve
          </Button>
        );
      },
    },
    {
      field: "Reject",
      width: 160,
      renderCell: (cellValues) => {
        return (
          <Button
            className={classes.button}
            sx={{
              m: 2,
              textDecoration: "none",

              "& .MuiDataGrid-cell:hover": {
                color: `${colors.greenAccent[500]}`,
              },
            }}
            onClick={(event) => {
              handleReject(event, cellValues);
            }}
          >
            Reject
          </Button>
        );
      },
    },
  ];
  const handleApprove = async (event, cellValues) => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/projects/${cellValues.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          validationStatus: "validated",
          validatedBy: user,
        }),
      }
    );
    navigate("/projects");
  };
  const handleReject = async (event, cellValues) => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/projects/${cellValues.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          validationStatus: "rejected",
          validatedBy: user,
        }),
      }
    );
    navigate("/projects");
  };
  function handleClick(event, cellValues) {
    navigate(`/projects/${cellValues.id}`);
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => {
        setProjects(
          response.data.filter(
            (project) => project.validationStatus === "pending"
          )
        );
      });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Box paddingRight="20px">
        <Box paddingRight="20px">
          <Box sx={{ paddingTop: "50px" }}>
            {" "}
            <Typography
              variant="h1"
              fontWeight="bold"
              sx={{ color: colors.grey[100], paddingBottom: "50px" }}
            >
              Projects to Approve
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignContent="center"
            width="86vw"
            height="70vh"
            gap="20px"
          >
            <DataGrid
              sx={{
                m: 2,
                boxShadow: 2,
                border: 2,
                borderColor: `${colors.primary[400]}`,
                "& .MuiDataGrid-cell:hover": {
                  color: `${colors.greenAccent[500]}`,
                },
              }}
              rows={projects}
              getRowId={(row) => row._id}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default PendingProjects;
