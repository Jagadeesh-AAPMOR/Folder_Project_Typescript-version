// import User from "../models/User";
import axios from "../../utils/mockAxios";

const ContentPanelService = {
  getPaths: async () => {
    try {
      const response = await axios.get("/paths");
      return response.data.paths;
    } catch (error) {
      console.error("Error fetching paths:", error);
      return null;
    }
  },
  getButtons: async () => {
    try {
      const response = await axios.get("/buttons");
      return response.data.buttons;
    } catch (error) {
      console.error("Error fetching buttons:", error);
      return null;
    }
  },
  getEmployees: async () => {
    try {
      const response = await axios.get("/employees");
      return response.data.employees;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return null;
    }
  },
};

export default ContentPanelService;
