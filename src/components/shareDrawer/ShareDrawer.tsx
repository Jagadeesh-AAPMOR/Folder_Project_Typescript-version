import React, { ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import "react-toastify/dist/ReactToastify.css";
import { FileDetails } from "../common/models/model";
import { ShareDrawerProps } from "./ShareDrawerModel";

const ShareDrawer: React.FC<ShareDrawerProps> = ({
  drawerOpen,
  handleDrawerClose,
  setDrawerOpen,
  selectedFileDetails,
  department,
  handleDepartmentChange,
  selectAllChecked,
  handleSelectAll,
  add,
  employees,
  handleCheckboxChange,
  handleCancel,
  handleShareClick,
  checkedEmployees,
}) => {
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
      <Box
        width={500}
        height={"100vh"}
        p={5}
        sx={{ overflow: "hidden", bgcolor: "rgb(244, 243, 245)" }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ArrowBackOutlinedIcon />
          </IconButton>
          <Typography variant="h6">
            Share "{selectedFileDetails?.file.name}"
          </Typography>
        </Stack>
        <Box sx={{ height: 50, mt: 3, bgcolor: "white", borderRadius: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <FormControl sx={{ width: 200 }}>
              <InputLabel
                id="department-select-label"
                sx={{ fontSize: 14, mb: 2 }}
              >
                Select Department
              </InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={department}
                label="Select Department"
                onChange={handleDepartmentChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                <MenuItem value="Full stack">Full stack</MenuItem>
                <MenuItem value="Testing">Testing</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </Select>
            </FormControl>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: "grey", height: "50px" }}
            />
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={department.length === 0}
                      checked={selectAllChecked}
                      onChange={(e) =>
                        handleSelectAll(e, selectedFileDetails?.file.name ?? "")
                      }
                    />
                  }
                  label="Select All"
                />
              </FormGroup>
            </Box>
          </Stack>
        </Box>
        {add ? (
          <Box mt={2}>
            <TableContainer sx={{ maxHeight: 380 }}>
              <Table sx={{ bgcolor: "white", borderRadius: 3, mt: 3 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Employee Id</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees[department]?.map((employee) => (
                    <TableRow
                      key={employee.id}
                      sx={{
                        "& .MuiTableCell-root": {
                          padding: 1,
                          pl: 2,
                        },
                      }}
                    >
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  handleCheckboxChange(
                                    employee.id,
                                    employee.name,
                                    department,
                                    selectedFileDetails?.file.name ?? "",
                                    e.target.checked
                                  );
                                }}
                                checked={checkedEmployees.includes(employee.id)}
                              />
                            }
                            label="" // Adding an empty label to satisfy the type requirement
                          />
                        </FormGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                onClick={handleShareClick}
                variant="contained"
                sx={{ bgcolor: "rgb(103, 88, 204)" }}
              >
                Share
              </Button>
            </Stack>
          </Box>
        ) : (
          <>
            <Typography
              variant="h6"
              fontWeight={700}
              textAlign={"center"}
              mt={3}
            >
              Shared File Access
            </Typography>
            <TableContainer sx={{ maxHeight: 380 }}>
              <Table
                sx={{
                  bgcolor: "white",
                  borderRadius: 3,
                  mt: 3,
                  mb: 2,
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Shared Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedFileDetails?.shared?.length ? (
                    selectedFileDetails.shared.map((share, index) => (
                      <TableRow key={index}>
                        <TableCell>{share.employeeName}</TableCell>
                        <TableCell>{share.employeeDepartment}</TableCell>
                        <TableCell>
                          {new Date(share.sharedDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                        File Not Shared
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default ShareDrawer;
