import {
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const TableData = ({
  handleDelete,
  value,
  index,
  parentKey,
  handleDownload,
  handleShare,
  handleFileChange,
}) => {
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <PictureAsPdfOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "png":
        return <ImageOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "jpg":
        return <ImageOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "doc":
        return <DescriptionOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "xls":
        return <TableChartOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "csv":
        return <TableChartOutlinedIcon sx={{ fontSize: "20px" }} />;
      case "ics":
        return <EventNoteOutlinedIcon sx={{ fontSize: "20px" }} />;
      default:
        return <InsertDriveFileOutlinedIcon sx={{ fontSize: "20px" }} />;
    }
  };

  return value.map((file, fileIndex) => (
    <TableBody key={fileIndex}>
      <TableRow>
        <TableCell sx={{ p: 1, color: "#393939" }}>
          <Stack direction={"row"} alignItems={"center"} sx={{ pl: 2 }}>
            {getFileIcon(file.file.name.split(".").slice(-1)[0])}
            <Typography sx={{ pl: 2 }}>{file.file.name}</Typography>
          </Stack>
        </TableCell>

        {/* <TableCell sx={{ p: 1 }}>{value.timestamp}</TableCell> */}
        <TableCell>{new Date().toString().slice(4, 21)}</TableCell>
        <TableCell>Srinivas</TableCell>
        <TableCell sx={{ p: 1 }}>
          <Stack direction={"row"}>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => handleDownload(file.file)}
              />
            </IconButton>
            <IconButton>
              <ShareOutlinedIcon
                sx={{
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => handleShare(file)}
              />
            </IconButton>
            <IconButton>
              <DeleteOutlineOutlinedIcon
                sx={{
                  fontSize: "20px",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(fileIndex, parentKey)}
              />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </TableBody>
  ));
};

export default TableData;
