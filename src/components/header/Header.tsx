import React from "react";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../common/components/breadcrumbs/Breadcrumbs.tsx";
import Cookies from "js-cookie";
import { useUser } from "../context/UserContext.tsx";
const Header: React.FC = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const path = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("loginDetails");
    navigate("/login");
  };
  console.log();
  return (
    <Container sx={{ height: "60px", padding: "10px", mb: 2 }}>
      <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
        <Box>{path.pathname !== "/" && <Breadcrumbs />}</Box>
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          sx={{ height: 40, mr: 1 }}
          gap={2}
        >
          {/* Avatar */}
          <IconButton
            onClick={handleClick}
            sx={{ ":hover": { bgcolor: "transparent" } }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg"
              sx={{
                ":hover": { backgroundColor: "#E1DDFF,0.5" },
                p: 0,
              }}
            />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Avatar />
                <Typography>{user?.name}</Typography>
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Container>
  );
};

export default Header;
