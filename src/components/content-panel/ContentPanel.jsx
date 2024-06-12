import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ToolBar from "../toolbar/ToolBar";
import MenuItems from "../menuItems/MenuItems";
import FilesTable from "../filesTable/FilesTable";
import { ToastContainer, toast } from "react-toastify";
import ShareDrawer from "../shareDrawer/ShareDrawer";
import ContentPanelService from "./ContentPanelService";

const ContentPanel = () => {
  const location = useLocation();
  const params = useParams();
  const isSelected = (path) => location.pathname.includes(path);

  // const { item1, level1, tab1, year, itemOne } = useParams();
  const pathname = location.pathname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dbStorage, setDbStorage] = useState({});
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);
  const [department, setDepartment] = useState("");
  const [add, setAdd] = useState(false);
  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [paths, setPaths] = useState("");
  const [buttons, setButtons] = useState("");
  const [employees, setEmployees] = useState("");

  const handleDrawerClose = () => setDrawerOpen(false);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setAdd(true);
  };

  // uploading the file UPLOAD BUTTON
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    let updatedValue = uploadedFiles.map((file) => ({
      file: file,
      shared: [],
    }));

    if (dbStorage[pathname]) {
      setDbStorage({
        ...dbStorage,
        [pathname]: [...dbStorage[pathname], ...updatedValue],
      });
    } else {
      setDbStorage({
        ...dbStorage,
        [pathname]: updatedValue,
      });
    }
  };
  // Download the file
  const handleDownload = (file) => {
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("File Downloaded Successfully");
  };

  //Delete the file
  const handleDelete = (index, key) => {
    let tempArray = dbStorage[key];
    tempArray.splice(index, 1);
    setDbStorage({ ...dbStorage, [key]: tempArray });
    toast.success("File Deleted Successfully");
  };
  // Opening the side drawer
  const handleShare = (fileDetails) => {
    setDrawerOpen(true);
    setSelectedFileDetails(fileDetails);
  };

  const [tempDbStorage, setTempDbStorage] = useState(dbStorage);

  //Handleing checkboxes other than select all
  const handleCheckboxChange = (
    employeeId,
    employeeName,
    employeeDepartment,
    fileName,
    isChecked
  ) => {
    const sharedDate = new Date();

    const updateSharedEmployees = (sharedEmployees) => {
      if (!isChecked && sharedEmployees.length > 0) {
        return sharedEmployees.filter((e) => e.employeeId !== employeeId);
      }
      return [
        ...sharedEmployees,
        { employeeId, employeeName, employeeDepartment, sharedDate },
      ];
    };

    const updatedTempDbStorage = tempDbStorage[pathname].map((item) => {
      if (item.file.name === fileName) {
        return { ...item, shared: updateSharedEmployees(item.shared) };
      }
      return item;
    });

    setCheckedEmployees((prev) => {
      const newCheckedEmployees = prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId];

      // Check if "Select All" should be unchecked
      const isAllChecked =
        newCheckedEmployees.length === employees[department].length;
      setSelectAllChecked(isAllChecked);

      return newCheckedEmployees;
    });

    setTempDbStorage((prev) => {
      return { [pathname]: updatedTempDbStorage };
    });
  };
  // Select all checkboxes
  const handleSelectAll = (event, fileName) => {
    const isChecked = event.target.checked;
    let selectedEmployeeIds = [...checkedEmployees];
    const currentEmployees =
      employees[department]?.map((employee) => ({
        id: employee.id,
        name: employee.name,
      })) || [];

    let updatedTempDbStorage = [...tempDbStorage[pathname]];

    if (isChecked) {
      currentEmployees.forEach((employee) => {
        if (!selectedEmployeeIds.includes(employee.id)) {
          selectedEmployeeIds.push(employee.id);
          const sharedDate = new Date();
          updatedTempDbStorage = updatedTempDbStorage.map((item) => {
            if (item.file.name === fileName) {
              return {
                ...item,
                shared: [
                  ...item.shared,
                  {
                    employeeId: employee.id,
                    employeeName: employee.name,
                    employeeDepartment: department,
                    sharedDate,
                  },
                ],
              };
            }
            return item;
          });
        }
      });
    } else {
      currentEmployees.forEach((employee) => {
        const index = selectedEmployeeIds.indexOf(employee.id);
        if (index > -1) {
          selectedEmployeeIds.splice(index, 1);
          updatedTempDbStorage = updatedTempDbStorage.map((item) => {
            if (item.file.name === fileName) {
              return {
                ...item,
                shared: item.shared.filter(
                  (sharedEmployee) => sharedEmployee.employeeId !== employee.id
                ),
              };
            }
            return item;
          });
        }
      });
    }

    setCheckedEmployees(selectedEmployeeIds);

    setTempDbStorage({ [pathname]: updatedTempDbStorage });
    setSelectAllChecked(isChecked);
  };

  // Share button in side drawer
  const handleShareClick = () => {
    setDbStorage(tempDbStorage);
    setCheckedEmployees([]);
    setAdd(false);
    setDrawerOpen(false);
    setDepartment("");
    toast.success("File Shared Successfully");
  };

  async function fetchPaths() {
    const response = await ContentPanelService.getPaths();
    if (response) {
      setPaths(response);
      // console.log("paths", response);
    } else {
      console.log("ERROR FETCHING PATHS");
    }
  }

  async function fetchButtons() {
    const response = await ContentPanelService.getButtons();
    if (response) {
      setButtons(response);
      // console.log("paths", response);
    } else {
      console.log("ERROR FETCHING BUTTONS");
    }
  }

  async function fetchEmployees() {
    const response = await ContentPanelService.getEmployees();
    if (response) {
      setEmployees(response);
      // console.log("paths", response);
    } else {
      console.log("ERROR FETCHING EMPLOYEES");
    }
  }

  useEffect(() => {
    fetchPaths();
    fetchButtons();
    fetchEmployees();
  }, []);

  useEffect(() => {
    ContentPanelService.getPaths();
    ContentPanelService.getButtons();
    setTempDbStorage(dbStorage);
  }, [dbStorage]);

  useEffect(() => {
    setSelectAllChecked(false);
  }, [department]);

  // Cancel button inside side drawer
  const handleCancel = () => {
    setAdd(false);
    setDepartment("");
  };

  return (
    <Box bgcolor={"white"} mx={5} borderRadius={3}>
      {/*Top Tool bar  */}
      {paths && buttons && (
        <ToolBar
          isSelected={isSelected}
          params={params}
          handleFileChange={handleFileChange}
          paths={paths}
          buttons={buttons}
          dbStorage={dbStorage}
        />
      )}

      {/* Bottom Box under the top toolbar */}
      <Box
        sx={{
          display: "flex",
          minHeight: "70vh",
          borderTop: "1px solid rgb(203, 213, 225)",
        }}
      >
        {/* Menu items */}
        {paths && (
          <MenuItems params={params} location={location} paths={paths} />
        )}

        {/* Upload Files Table */}
        <FilesTable
          location={location}
          dbStorage={dbStorage}
          setDbStorage={setDbStorage}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
          handleShare={handleShare}
          handleFileChange={handleFileChange}
        ></FilesTable>
      </Box>
      <ToastContainer />
      {employees && (
        <ShareDrawer
          drawerOpen={drawerOpen}
          handleDrawerClose={handleDrawerClose}
          setDrawerOpen={setDrawerOpen}
          selectedFileDetails={selectedFileDetails}
          department={department}
          handleDepartmentChange={handleDepartmentChange}
          selectAllChecked={selectAllChecked}
          handleSelectAll={handleSelectAll}
          add={add}
          employees={employees}
          handleCheckboxChange={handleCheckboxChange}
          handleCancel={handleCancel}
          handleShareClick={handleShareClick}
          checkedEmployees={checkedEmployees}
        />
      )}
    </Box>
  );
};

export default ContentPanel;
