import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.tsx";
import Header from "../header/Header.tsx";

const DashboardLayout: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={2.25} minHeight={"100vh"}>
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={9.75}
        sx={{ p: 1, bgcolor: "rgb(238, 242, 246)", maxHeight: "100vh" }}
      >
        <Header />
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
