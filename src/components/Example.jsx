import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { createStyles, Card, Button, Badge } from "@mantine/core";
import Sidebar from "../global/Sidebar";
import { Box } from "@mui/system";
import { SessionContext } from "../contexts/SessionContext";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    fontFamily: "Raleway, sans-serif",

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",

    gap: "20px",
  },
  container: {
    // subscribe to color scheme changes right in your styles
    fontFamily: "Raleway, sans-serif",
    width: "100%",
    paddingTop: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "auto",
    marginRight: "auto",
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
  link: {
    textDecoration: "none",
    fontFamily: "Raleway, sans-serif",
    fontWeight: "400",
    paddingRight: "1em",
  },
}));

export default function Example() {
  const [projects, setProjects] = useState([]);
  const { classes } = useStyles();
  const [isSidebar, setIsSidebar] = useState(true);
  const { user } = useContext(SessionContext);
  const currentUser = user;
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const navigate = useNavigate();
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
      field: "validationStatus",
      headerName: "Validation status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (cellValues) => {
        return (
          <Badge color="pink" variant="light">
            <h3>{cellValues.row.validationStatus}</h3>
          </Badge>
        );
      },
    },
  ];
  function handleClick(event, cellValues) {
    navigate(`/projects/${cellValues.id}`);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => {
        setProjects(response.data);
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
              All projects
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
