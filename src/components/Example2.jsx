import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Example2() {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => {
        const projectId = response.data.map((project) => {
          project.id = project._id;
          return project;
        });

        setProjects(response.data);
      });
  }, []);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 350, width: "800px" }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Project Number </TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Activity</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.activity}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
