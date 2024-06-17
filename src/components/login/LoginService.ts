// import User from "../models/User";
import axios from "../../utils/mockAxios";

const LoginService = {
  getUser: async (userId: string) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data.user;
    } catch (error) {
      console.error("Error fetching paths:", error);
      return null;
    }
  },
};

export default LoginService;
