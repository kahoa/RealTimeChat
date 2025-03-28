import ChatHistory from "./Components/ChatHistory";
import TextInput from "./Components/TextInput";
import UserDisplay from "./Components/UserDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ColorSwitcher,
  ColorProvider,
  ColorContext,
} from "./Components/ColorSwitcher";
import "./App.css";
import { useContext, useState } from "react";
import { SocketProvider } from "./Components/SocketProvider";
import Login from "./Components/Login";
import LogOff from "./Components/LogOff";
import logo from "./Components/kaiwa-Logo.png";
import PropTypes from "prop-types";
import GroupList from "./Components/GroupList";
import CustomButton from "./Components/CustomButton";

function App() {
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("default");

  return (
    <ColorProvider>
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <SocketProvider username={username}>
          <MainComponent username={username} setUsername={setUsername} group={group} setGroup={setGroup} />
        </SocketProvider>
      )}
    </ColorProvider>
  );
}

const MainComponent = ({ username, setUsername, group, setGroup }) => {
  const { darkMode } = useContext(ColorContext);

  return (
    <div
      className={`container-fluid d-flex flex-column vh-100 ${
        darkMode ? "dark-mode" : "light-mode"
      }`}
      style={{
        backgroundColor: darkMode ? "#151515" : "#ffffff",
        color: darkMode ? "#ffffff" : "#151515",
        padding: "15px",
      }}
    >
      {/* Überschrift/Login Bereich */}
      <div
        className={`header-bar mb-3 ${darkMode ? "shadow" : "shadow-sm"}`}
        style={{
          borderRadius: "5px",
          backgroundColor: darkMode ? "#242424" : "#D9D9D9",
          color: darkMode ? "#ffffff" : "#000000",
          padding: "15px",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <LogOff setUsername={setUsername} />
          <div className="d-flex flex-grow-1 justify-content-center align-items-end">
            <img
              src={logo}
              alt="Kaiwa Logo"
              style={{
                marginLeft: "100px",
                width: "50px",
                textShadow: darkMode
                  ? "2px 2px 4px rgba(255, 255, 255, 0.7)"
                  : "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            />
            <p
              style={{
                textShadow: darkMode
                  ? "2px 2px 4px rgba(255, 255, 255, 0.7)"
                  : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                margin: "0",
                paddingLeft: "10px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 100,
                lineHeight: "2.7",
              }}
            >
              Hallo {username}! Du bist in Gruppe {group}!
            </p>
          </div>
          <ColorSwitcher />
        </div>
      </div>

      <div className="d-flex flex-grow-1" style={{ gap: "15px", paddingBottom: "15px" }}>
        {/* Sidebar für die Benutzerliste */}
        <div
          className={`chat-history d-flex flex-column align-items-center ${
            darkMode ? "shadow" : "shadow-sm"
          }`}
          style={{
            border: "none",
            borderRadius: "5px",
            color: "#565353",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            maxHeight: "calc(100vh - 75px)",
            flex: "0 1 250px",
          }}
        >
          <div className="d-flex align-items-start justify-content-start">
            <UserDisplay />
          </div>
          <div className="d-flex align-items-start justify-content-start w-100" style={{ gap: "10px" }}>
            <input className="input-field" id="group" name="group" type="text" placeholder="Gruppenname"></input>
            { /* On Submit change group to input */ }
            <CustomButton onClick={() => setGroup(document.getElementById("group").value)}className={`btn btn-custom ${darkMode ? "btn-dark" : "btn-light"}`}
          style={{ width: "100%", maxWidth: "300px" }}> Join</CustomButton>
          </div>
          {/* Gruppenliste */}
          <div className="d-flex align-items-start justify-content-start w-100">
            <div> 
                <GroupList/>
            </div>
          </div>

        </div>

        {/* Chat-Historie */}
        <div
          className={`flex-grow-1 ${darkMode ? "shadow" : "shadow-sm"}`}
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: darkMode ? "#242424" : "#D9D9D9",
            padding: "15px",
            maxHeight: "calc(100vh - 125px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatHistory username={username} group={group} darkMode={darkMode} />
          {/* Texteingabe */}
          <div className="mt-3 flex-shrink-0">
            <TextInput username={username} groupname={group} />
          </div>
        </div>
      </div>
    </div>
  );
};

MainComponent.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
  setGroup: PropTypes.func.isRequired,
};

export default App;
