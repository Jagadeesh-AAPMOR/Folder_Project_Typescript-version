export interface ToolbarProps {
  isSelected: (item: string) => boolean;
  params: {
    folder: string;
    subFolder: string;
    range: string;
    tab: string;
    subTab?: string;
  };
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  paths: Record<string, any>;
  buttons: Record<string, any>;
  dbStorage: Record<string, any>;
}
