import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";

const MenuItems = ({ params, location, paths }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Destructring
  const { folder, subFolder, range, tab } = params;
  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 0,
        top: "0px",
        // display: "flex",
        flexBasis: location.pathname.includes("%20.") ? null : "20%",
        borderRight: subFolder !== "files" ? "1px solid #D1D1D1" : 0,
        pt: 2,
      }}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          sx={{
            "& .MuiTabs-indicator": { display: "none" },
            color: "black",
          }}
          // scrollButtons={false}
          // aria-label="scrollable prevent tabs example"
        >
          {subFolder !== "files"
            ? paths[folder][subFolder][tab].map((menuItem, i) => (
                <Link
                  key={i}
                  to={`/${folder}/${subFolder}/${range}/${tab}/${
                    menuItem ? menuItem : null
                  }`}
                  style={{ textDecoration: "none", color: "inherit" }} // Apply styles to remove default link styling
                >
                  <Tab
                    label={menuItem}
                    sx={{
                      width: "90%",
                      ml: 1,
                      borderRadius: "5px",
                      "&.MuiButtonBase-root.MuiTab-root": {
                        "-webkit-align-items": "flex-start",
                        // alignItems: "left",
                        // "::webkit-align-items": "left",
                      },
                      fontWeight: location.pathname.includes(menuItem) && "700",
                      color: location.pathname.includes(menuItem)
                        ? "rgb(0, 0, 0)"
                        : "grey",
                      ":hover": {
                        bgcolor: "rgba(154, 173, 186, 0.2)",
                        color: "black",
                      },
                      backgroundColor: location.pathname.includes(menuItem)
                        ? "rgb(235, 235, 235)"
                        : null,
                    }}
                  />
                </Link>
              ))
            : null}
        </Tabs>
      </Box>
    </Box>
  );
};

export default MenuItems;
