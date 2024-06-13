export interface DbStorage {
  [key: string]: Array<{
    file: File;
    shared: Array<{
      employeeId: number;
      employeeName: string;
      employeeDepartment: string;
      sharedDate: Date;
    }>;
  }>;
}

interface Employee {
  id: number;
  name: string;
  department: string;
}

export interface Employees {
  [key: string]: Employee[];
}
