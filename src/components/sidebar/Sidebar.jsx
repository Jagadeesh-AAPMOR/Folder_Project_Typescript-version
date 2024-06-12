import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import { Link, useLocation } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import PeopleIcon from "@mui/icons-material/People";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarService from "./SidebarService";

const Sidebar = () => {
  const iconMapping = {
    Development: <CodeIcon sx={{ color: "rgb(154, 173, 186)" }} />,
    Testing: <BugReportIcon sx={{ color: "rgb(154, 173, 186)" }} />,
    HumanResource: <PeopleIcon sx={{ color: "rgb(154, 173, 186)" }} />,
    Sample: <PeopleIcon sx={{ color: "rgb(154, 173, 186)" }} />,
    Sample1: <PeopleIcon sx={{ mr: 1 }} />,
    Sample2: <PeopleIcon sx={{ mr: 1 }} />,
  };

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [paths, setPaths] = useState("");
  const [buttons, setButtons] = useState("");
  const location = useLocation();

  const handleAccordionChange = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  async function fetchPaths() {
    const response = await SidebarService.getPaths();
    if (response) {
      setPaths(response);
      // console.log("paths", response);
    } else {
      console.log("ERROR FETCHING PATHS");
    }
  }

  async function fetchButtons() {
    const response = await SidebarService.getButtons();
    if (response) {
      setButtons(response);
      // console.log("paths", response);
    } else {
      console.log("ERROR FETCHING BUTTONS");
    }
  }

  useEffect(() => {
    fetchPaths();
    fetchButtons();
  }, []);

  return (
    <Stack direction={"row"} width={"100%"} height={"100%"}>
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          backgroundColor: "rgb(18, 22, 33)",
        }}
      >
        <Typography variant="h4" sx={{ pb: 5, pt: 3 }}>
          <Link
            to={"/"}
            style={{ textDecoration: "none", color: "rgb(255, 254, 254)" }}
          >
            <FilterDramaIcon
              sx={{ fontSize: 30, mr: 1, color: "rgb(254, 84, 41)" }}
            />
            FOLDER
          </Link>
        </Typography>

        <Box
          overflow={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              width: "7px" /* Set the width of the scrollbar */,
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: "20px",
              backgroundColor:
                "#a8adba" /* Set the color of the thumb (scroll handle) */,
            },
          }}
        >
          {/* Accordians menu items */}
          {paths &&
            Object.keys(paths).map((path, index) => (
              <Box key={index}>
                <Accordion
                  elevation={0}
                  expanded={expandedIndex === index}
                  onChange={() => handleAccordionChange(index)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: "rgb(154, 173, 186)" }} />
                    }
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                    sx={{
                      bgcolor: "rgb(18, 22, 33)",

                      color:
                        expandedIndex !== index
                          ? "rgb(154, 173, 186)"
                          : "white",
                      px: 0,
                      ":hover": {
                        bgcolor:
                          expandedIndex === index
                            ? "rgb(18, 22, 33)"
                            : "rgb(45, 53, 63)",
                        color: expandedIndex === index ? "white" : "white",
                      },
                    }}
                  >
                    {iconMapping[path]}
                    <Typography sx={{ marginLeft: 1 }}>{path}</Typography>
                  </AccordionSummary>

                  <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    sx={{
                      bgcolor: "rgb(18, 22, 33)",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{ borderLeft: "1px solid rgb(67, 74, 96)", ml: 1 }}
                    ></Box>

                    <AccordionDetails
                      sx={{
                        bgcolor: "rgb(18, 22, 33)",
                        width: "100%",
                      }}
                    >
                      {Object.keys(paths[path]).map((e1, i) => (
                        <Link
                          key={i}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          to={
                            Object.values(paths[path][e1])[0].length > 0
                              ? `/${path}/${e1}/2023-2024/${
                                  Object.keys(paths[path][e1])[0]
                                }/${
                                  Object.entries(
                                    Object.values(paths[path][e1])[0]
                                  )[0]?.[1]
                                }`
                              : `/${path}/${e1}/2023-2024/${
                                  Object.keys(paths[path][e1])[0]
                                }/ .`
                          }
                        >
                          <Box
                            sx={{
                              p: 0,
                              pl: 2,
                              borderRadius: 2,
                              ":hover": {
                                backgroundColor: location.pathname.includes(e1)
                                  ? "rgb(255, 129, 31)"
                                  : "rgba(154, 173, 186, 0.2)",
                              },
                              backgroundColor: location.pathname.includes(e1)
                                ? "rgb(255, 108, 71)"
                                : null,
                            }}
                          >
                            <Button
                              // onClick={() => window.reload()}
                              sx={{
                                color: location.pathname.includes(e1)
                                  ? "white"
                                  : "rgb(154, 173, 186)",
                              }}
                            >
                              {e1}
                            </Button>
                          </Box>
                        </Link>
                      ))}
                    </AccordionDetails>
                  </Stack>
                </Accordion>
              </Box>
            ))}
          {/* last two Buttons */}
          {buttons &&
            Object.keys(buttons).map((button, ukey) => (
              <Link
                key={ukey}
                to={`/${button}/files/2023-2024/${
                  Object.keys(buttons[button])[0]
                }/ .`}
              >
                <Box
                  sx={{
                    color: "rgb(154, 173, 186)",
                    px: 0.3,
                    mt: 0.5,
                    backgroundColor: location.pathname.includes(button)
                      ? "rgb(255, 108, 71)"
                      : null,
                    borderRadius: 2,
                    textAlign: "left",
                    py: 1,
                    ":hover": {
                      backgroundColor: location.pathname.includes(button)
                        ? "rgb(255, 108, 71)"
                        : "rgba(154, 173, 186, 0.2)",
                    },
                  }}
                >
                  <Button
                    sx={{
                      color: location.pathname.includes(button)
                        ? "white"
                        : "rgb(154, 173, 186)",
                      textTransform: "capitalize",
                      fontSize: 15,
                      px: 0,
                    }}
                  >
                    {iconMapping[button]} {button}{" "}
                    {/* Adding the icon and the name */}
                  </Button>
                </Box>
              </Link>
            ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default Sidebar;
