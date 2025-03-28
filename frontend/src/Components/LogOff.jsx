import PropTypes from "prop-types"; 
import { useSocket } from "./SocketContext";
import CustomButton from "./CustomButton";

// Websocket Verbindung trennen und und Benutzername aus State löschen
// löschen des Benutzernamens bewirkt Neu-Rendern der Login-Komponente
function LogOff({ setUsername }) {
  const socket = useSocket();

  const handleLogOff = () => {
    if (socket) {
      socket.disconnect();
    }
    setUsername("");

    window.location.href = "/default";  // Neuladen der Seite
    };
  

  return (
        <CustomButton onClick={handleLogOff}>
            Abmelden
        </CustomButton>
    );
}

LogOff.propTypes = {
    setUsername: PropTypes.func.isRequired,  
  };

export default LogOff;
