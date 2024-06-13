import { SelectChangeEvent } from "@mui/material";
import { FileDetails } from "../common/models/model";

export interface Employee {
  id: number;
  name: string;
  department: string;
}

export interface Employees {
  [key: string]: Employee[];
}

export interface ShareDrawerProps {
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  setDrawerOpen: (open: boolean) => void;
  selectedFileDetails: FileDetails | null;
  department: any;
  handleDepartmentChange: (event: SelectChangeEvent<HTMLInputElement>) => void;
  selectAllChecked: boolean;
  handleSelectAll: (
    event: React.ChangeEvent<HTMLInputElement>,
    fileName: string
  ) => void;
  add: boolean;
  employees: Employees;
  handleCheckboxChange: (
    employeeId: number,
    employeeName: string,
    employeeDepartment: string,
    fileName: string,
    isChecked: boolean
  ) => void;
  handleCancel: () => void;
  handleShareClick: () => void;
  checkedEmployees: number[];
}
