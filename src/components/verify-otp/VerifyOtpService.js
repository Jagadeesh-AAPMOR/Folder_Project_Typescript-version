import User from "../models/User";

const VerifyOtp = {
  getUsers: async () => {
    // Example API call to fetch users
    const response = await fetch("https://example.com/api/users");
    const data = await response.json();
    // Map response data to User objects
    return data.map((user) => new User(user.id, user.name, user.email));
  },
  // Other CRUD operations can be defined here
};

export default VerifyOtp;
