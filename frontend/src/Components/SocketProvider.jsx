import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";

// "Container" für die Socket-Verbindung
const SocketContext = createContext();

// Custom-Hook für Zugriff auf Socket-Verbindung
export const useSocket = () => useContext(SocketContext);

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
    socketRef.current.on("conection_error", (err) => {
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
