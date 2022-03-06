// std
import { useContext } from "react";

// lib
import { GlobalStateContext } from "../context";

export const useGlobalState = () => useContext(GlobalStateContext);
