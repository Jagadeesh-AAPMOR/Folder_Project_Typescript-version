import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, Paper, Stack, Typography } from "@mui/material";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";

const LoginLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        // flexWrap: "wrap",
        mt: 5,
        "& > :not(style)": {
          m: "auto",
          width: 1000,
          height: 500,
        },
      }}
    >
      <Paper>
        <Stack direction={"row"} sx={{ height: "84%" }}>
          <Box width={"60%"} height={"100%"} p={5} bgcolor={"rgb(18, 22, 33)"}>
            <Stack mt={10}>
              <Typography variant="h4" color={"white"}>
                <FilterDramaIcon
                  sx={{ fontSize: 30, mr: 1, color: "rgb(254, 84, 41)" }}
                />
                FOLDER
              </Typography>
              <Typography fontSize={20} mt={5} color={"#888888"}>
                Unlocking Folders, Empowering Files
              </Typography>
            </Stack>
          </Box>
          <Box width={"50%"} p={5} pt={12}>
            <Outlet />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginLayout;
