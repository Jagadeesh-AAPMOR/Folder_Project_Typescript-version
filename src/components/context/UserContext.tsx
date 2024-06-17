// userContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserInterface } from "./userContexModel";
import { fetchUser } from "./UserContextService.ts";

const UserContext = createContext<UserInterface | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): UserInterface | null => useContext(UserContext);

export default UserContext;
