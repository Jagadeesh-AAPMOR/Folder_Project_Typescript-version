import React, { createContext } from "react";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  access: string[]; // Assuming access is an array of strings
  role: string;
}

const UserContext = createContext<UserInterface | null>(null);

export default UserContext;
