import axios from "../../utils/mockAxios";

const SidebarService = {
  // getPaths: async () => {
  //   const response = await fetch("http://localhost:3000/paths");
  //   const data = await response.json();
  //   // console.log(`ContentPanelService paths`, data);
  //   return data;
  // },

  // getButtons: async () => {
  //   const response = await fetch("http://localhost:3000/buttons");
  //   const data = await response.json();
  //   // console.log(`ContentPanelService buttons`, data);
  //   return data;
  // },

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
};

export default SidebarService;
