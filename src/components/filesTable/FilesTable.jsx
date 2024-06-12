import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

import UploadFile from "../uploadFile/UploadFile";
import TableData from "./TableData";

const FilesTable = ({
  location,
  dbStorage,
  handleDelete,
  handleDownload,
  handleShare,
  handleFileChange,
}) => {
  return (
    <Box width={"100%"}>
      {Object.keys(dbStorage).length > 0 && (
        <TableContainer
          sx={{
            width: "100%",
            maxHeight: "70vh",
            minHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>File Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Upload Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Owned</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            {Object.keys(dbStorage).includes(location.pathname) &&
            dbStorage[location.pathname]?.length > 0 ? (
              <TableData
                handleDelete={handleDelete}
                value={dbStorage[location.pathname]}
                parentKey={location.pathname}
                handleDownload={handleDownload}
                handleShare={handleShare}
                handleFileChange={handleFileChange}
              />
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ borderBottom: 0 }}
                  >
                    <UploadFile handleFileChange={handleFileChange} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
      {Object.keys(dbStorage).length === 0 && (
        <>
          <TableContainer sx={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>File Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Upload Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Owned</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <Box>
            <UploadFile handleFileChange={handleFileChange} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default FilesTable;
