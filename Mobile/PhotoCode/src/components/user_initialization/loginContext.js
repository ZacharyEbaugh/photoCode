import { useLinkProps } from "@react-navigation/native";
import { createContext } from "react";

const userContext = createContext({
  user: null,
  setUser: (user) => {}
});

export default userContext;