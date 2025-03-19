import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types"
import io from "socket.io-client";
import { SocketContext } from "./SocketContext";

// Get WebSocket server URL from Vite's environment variable
const WS_SERVER = import.meta.env.VITE_WS_SERVER
  ? `http://${import.meta.env.VITE_WS_SERVER}:8080`
  : "http://localhost:8080"; // Default value for local development

// initialisieren einer einzelnen beständigen Verbindung
// und speichern im SocketContext
export const SocketProvider = ({ children, username }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(WS_SERVER);

    // Verbindung herstellen und im Custom-Hook speichern
    socketRef.current.on("connect", () => {
      console.log("Verbindung hergestellt!");
      setSocket(socketRef.current);
      // Benutzernamen an den Server senden
      socketRef.current.emit("set_username", username);
    });
    // Fehlerbehandlung
    socketRef.current.on("connection_error", (err) => {
      console.error(`Verbindungsfehler: ${err.message}`);
    });
    // trennen der Verbindung wenn Komponente "unmounted" wird
    return () => {
      socketRef.current.disconnect();
    };
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,  // `children` must be a React node
    username: PropTypes.string.isRequired, // `username` must be a required string
  };

export default SocketProvider;
