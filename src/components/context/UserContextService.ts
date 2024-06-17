// userService.ts
import axios from "../../utils/mockAxios";
import { UserInterface } from "./userContexModel";

export const fetchUser = async (): Promise<UserInterface | null> => {
  try {
    const response = await axios.get<{ user: UserInterface }>("/users/1");
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
