import { createContext, useContext } from "react";

// Create a context for WebSocket connection
export const SocketContext = createContext();

// Custom hook to access the socket connection
export const useSocket = () => useContext(SocketContext);
