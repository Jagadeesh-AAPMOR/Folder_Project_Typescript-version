export interface SharedDetail {
  employeeId: number;
  employeeName: string;
  employeeDepartment: string;
  sharedDate: Date;
}

export interface FileDetails {
  file: File;
  shared: SharedDetail[];
}
