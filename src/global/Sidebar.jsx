import React, { useContext, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Badge, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import MailIcon from "@mui/icons-material/Collections";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

function Sidebar() {
  const themeTwo = useTheme();
  const colors = tokens(themeTwo.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Main");
  const { user } = useContext(SessionContext);
  const [projects, setProjects] = useState([]);
  /*   const [foundUser, setFoundUser] = useState([]);
  console.log("found user sidebar", foundUser); */

  /*   useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/profile/${user._id}`)
      .then((response) => {
        console.log("response.data", response.data);
        setFoundUser(response.data);
      });
  }, []); */

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => {
        setProjects(response.data);
      });
  }, []);

  const currentUser = user;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: `${colors.greenAccent[400]} !important`,
          },
          "& .pro-menu-item.active": {
            color: `${colors.greenAccent[400]} !important`,
          },
          height: "100vh",
        }}
      >
        {" "}
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Welcome
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="70px"
                    height="70px"
                    src={user && user.image}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      fill: "red",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {currentUser && currentUser.firstName}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {currentUser?.isManager === true ? (
                      <p>Admin</p>
                    ) : (
                      <p>User</p>
                    )}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/main"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.primary[700]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Projects
              </Typography>
              {currentUser?.isManager === true && (
                <Item
                  title="Projects to Approve"
                  to="/pendingprojects"
                  icon={
                    projects.filter(
                      (project) => project.validationStatus === "pending"
                    ).length > 0 ? (
                      <Badge color="secondary" variant="dot">
                        <MailIcon />
                      </Badge>
                    ) : (
                      <MailIcon />
                    )
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
              )}
              <Item
                title="All Projects"
                to="/projects"
                icon={<CollectionsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="New Project"
                to="/newproject"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="New Event"
                to="/newevent"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.primary[700]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Your Pages
              </Typography>
              <Item
                title="Profile Form"
                to="/profile"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Events"
                to="/events"
                icon={<EventAvailableIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
      <Outlet
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}

export default Sidebar;
