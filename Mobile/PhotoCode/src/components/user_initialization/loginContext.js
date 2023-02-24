import { useLinkProps } from "@react-navigation/native";
import { createContext } from "react";

const userContext = createContext({
  user: null,
  setUser: (user) => {},
  userId: null,
  setUserId: (userId) => {},
  userInfo: null,
  setUserInfo: (userInfo) => {}
});

export default userContext;