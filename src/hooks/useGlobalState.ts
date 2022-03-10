// std
import { useContext } from "react";

// lib
import { GlobalStateContext } from "../context";

// Internal hook, to access state use `useStore` instead
export const useGlobalState = () => useContext(GlobalStateContext);
