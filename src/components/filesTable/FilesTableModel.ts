import { RouteComponentProps } from "react-router-dom";
import { FileDetails } from "../common/models/model";

export interface FileTableProps extends RouteComponentProps<any> {
  location: any;
  dbStorage: { [key: string]: any[] };
  handleDelete: (index: number, key: string) => void;
  handleDownload: (fileName: File) => void;
  handleShare: (fileDetails: FileDetails) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TableDataProps {
  handleDelete: (index: number, key: string) => void;
  value: any[];

  parentKey: string;
  handleDownload: (file: File) => void;
  handleShare: (file: FileDetails) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}