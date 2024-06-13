import React from "react";
import { Stack, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "80%" }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Dashboard
      </Typography>
    </Stack>
  );
};

export default Dashboard;
