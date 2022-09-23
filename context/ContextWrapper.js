import Context from "./Context";
import { theme } from "../Utils";
import { useState } from "react";

function ContextWrapper(props) {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);

  return (
    <Context.Provider
      value={{ theme, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextWrapper;
