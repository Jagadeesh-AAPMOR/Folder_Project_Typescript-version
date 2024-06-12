import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// click to upload button in the data pannel
function UploadFile({ handleFileChange }) {
  return (
    <Box height={150} margin={"auto"} width={400} mt={10}>
      <Stack alignItems={"center"}>
        <label htmlFor="file-upload">
          <IconButton component="span">
            <CloudUploadOutlinedIcon
              sx={{
                fontSize: 50,
                bgcolor: "rgb(255, 237, 233,0.5)",
                color: "rgb(220, 75, 40)",
                borderRadius: "50%",
                p: 2,
                transition: "box-shadow 0.3s ease",
                ":hover": {
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            />
          </IconButton>
        </label>
        <Typography
          color={"grey"}
          sx={{
            mt: 2,
            cursor: "pointer",
            transition: "color 0.3s ease, transform 0.3s ease",
            ":hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Click To Upload
        </Typography>
        <input
          type="file"
          multiple
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Stack>
    </Box>
  );
}

export default UploadFile;
