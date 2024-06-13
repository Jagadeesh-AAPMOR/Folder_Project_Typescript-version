import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { ToolbarProps } from "./ToolBarModel";
const ToolBar: React.FC<ToolbarProps> = ({
  isSelected,
  params,
  handleFileChange,
  paths,
  buttons,
  dbStorage,
}) => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  // Icons for top toolbar
  const iconItems: { [key: string]: JSX.Element } = {
    PLANNING: <AssignmentIcon sx={{ fontSize: 18 }} />,
    DESIGNING: <DesignServicesIcon sx={{ fontSize: 18 }} />,
    DEVELOPING: <CodeIcon sx={{ fontSize: 18 }} />,
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Destructuring
  const { folder, subFolder, range, tab, subTab } = params;

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack direction="row" mt={1}>
        {paths && subFolder !== "files"
          ? Object.keys(paths[folder][subFolder]).map((toolbarItem, i) => (
              <Tabs
                key={i}
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ style: { display: "none" } }}
              >
                <Link
                  to={
                    Object.values(paths[folder][subFolder][toolbarItem])[0]
                      ? `/${folder}/${subFolder}/${range}/${toolbarItem}/${
                          Object.values(
                            paths[folder][subFolder][toolbarItem]
                          )[0]
                        }`
                      : `/${folder}/${subFolder}/${range}/${toolbarItem}/%20.`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {iconItems[toolbarItem.toUpperCase()] && (
                          <Box sx={{ mr: 1 }}>
                            {iconItems[toolbarItem.toUpperCase()]}
                          </Box>
                        )}
                        {toolbarItem}
                      </Box>
                    }
                    sx={{
                      position: "relative" as const,
                      overflow: "hidden" as const,
                      textDecoration: isSelected(toolbarItem)
                        ? "underline"
                        : "none",
                      textUnderlineOffset: "18px",
                      fontWeight: isSelected(toolbarItem) ? "700" : "normal",
                      color: isSelected(toolbarItem)
                        ? "rgb(254, 84, 41)"
                        : "black",
                      transition: "color 0.1s linear",
                      "&::before": {
                        content: '""',
                        position: "absolute" as const,
                        width: "100%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "currentColor",
                        transform: isSelected(toolbarItem)
                          ? "translateX(0%)"
                          : "translateX(-100%)",
                        transition:
                          "transform 0.1s linear, background-color 0.1s linear",
                      },
                      "&:hover": !isSelected(toolbarItem)
                        ? {
                            color: "rgb(254, 84, 41)",
                          }
                        : undefined,
                    }}
                  />
                </Link>
              </Tabs>
            ))
          : buttons &&
            Object.keys(buttons[folder]).map((e, i) => (
              <Tabs
                key={i}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{ style: { display: "none" } }}
                aria-label="scrollable auto tabs example"
              >
                <Link
                  to={`/${folder}/${subFolder}/${range}/${e}/%20.`}
                  style={{ textDecoration: "none" }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {iconItems[e.toUpperCase()] && (
                          <Box sx={{ mr: 1 }}>{iconItems[e.toUpperCase()]}</Box>
                        )}
                        {e}
                      </Box>
                    }
                    sx={{
                      position: "relative" as const,
                      overflow: "hidden" as const,
                      textDecoration: isSelected(e) ? "underline" : "none",
                      textUnderlineOffset: "18px",
                      fontWeight: isSelected(e) ? "700" : "normal",
                      color: isSelected(e) ? "rgb(255, 108, 71)" : "black",
                      transition: "color 0.1s linear",
                      "&::before": {
                        content: '""',
                        position: "absolute" as const,
                        width: "100%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "currentColor",
                        transform: isSelected(e)
                          ? "translateX(0%)"
                          : "translateX(-100%)",
                        transition:
                          "transform 0.1s linear, background-color 0.1s linear",
                      },
                      "&:hover": !isSelected(e)
                        ? {
                            color: "rgb(254, 84, 41)",
                          }
                        : undefined,
                    }}
                  />
                </Link>
              </Tabs>
            ))}
      </Stack>
      {/* Upload button and calendar selection */}
      <Stack gap={2} direction="row" mt={1} mr={1} mb={1}>
        {/* Upload button */}
        <Box>
          {Object.keys(dbStorage).includes(location.pathname) && (
            <>
              <label htmlFor="file-upload">
                <Button
                  component="span"
                  sx={{
                    backgroundColor: "rgb(255, 84, 41)",
                    ":hover": { backgroundColor: "rgb(255, 129, 31,0.5 )" },
                    color: "white",
                  }}
                >
                  <UploadFileOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />
                  UPLOAD
                </Button>
              </label>
              <input
                type="file"
                multiple
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>
          )}
        </Box>
        <FormControl>
          <Select
            defaultValue={"2023-2024"}
            renderValue={(selected) => (
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  "&.MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.MuiSvgIcon-root":
                    { fontSize: 16 },
                }}
              >
                <CalendarTodayIcon sx={{ marginRight: 1, width: "14px" }} />
                {selected}
              </Box>
            )}
            sx={{
              borderRadius: 2,
              fontSize: "14px",
              minWidth: 150,
              color: "black",
              backgroundColor: "white",
              "& .MuiInputBase-root": {
                fontSize: "0.8rem",
                borderRadius: 0,
                color: "black",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "18px",
              },
              "& .MuiInputBase-input": {
                padding: "8.5px 14px",
                color: "black",
              },
            }}
          >
            {["2021-2022", "2022-2023", "2023-2024"].map((year) => (
              <MenuItem
                key={year}
                value={year}
                // onClick={() => window.location.reload()}
              >
                <Link
                  to={`/${folder}/${subFolder}/${year}/${tab}/${
                    subTab || "%20."
                  }`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {year}
                </Link>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default ToolBar;
