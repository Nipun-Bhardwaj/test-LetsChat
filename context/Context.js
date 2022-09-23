import { createContext } from "react";
import { theme } from "../Utils";

const Context = createContext({
  theme,
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {},
});

export default Context;
