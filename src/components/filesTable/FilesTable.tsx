import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UploadFile from "../uploadFile/UploadFile.tsx";
import TableData from "./TableData.tsx";
import { RouteComponentProps } from "react-router-dom";
import { FileDetails } from "../common/models/model";

interface FileTableProps extends RouteComponentProps<any> {
  location: any;
  dbStorage: { [key: string]: any[] };
  handleDelete: (index: number, key: string) => void;
  handleDownload: (fileName: File) => void;
  handleShare: (fileDetails: FileDetails) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilesTable: React.FC<FileTableProps> = ({
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
