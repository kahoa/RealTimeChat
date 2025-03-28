
import { useState, useEffect } from "react";
import { useSocket } from "./SocketContext";

const WS_SERVER = import.meta.env.VITE_WS_SERVER
  ? `http://${import.meta.env.VITE_WS_SERVER}:8080`
  : "http://localhost:8080"; //

function GroupList({ darkMode }) { 
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const socket = useSocket(); //

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch(`${WS_SERVER}/groups_list`);
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }
    fetchGroups();

    // Update the groupName state when the "group_name" event is received
        if (socket) {
          socket.on("group_name", (name) => {
            console.log("Received updated group name:", name);
            setGroupName(name);
         });
    } 
  
        return () => {
         if (socket) {
           socket.off("group_name");
         }
    };
  }, [socket]);
  
  return (
    <div
      style={{
        color: darkMode ? "#ffffff" : "#151515",
        padding: "15px",
        borderRadius: "5px",
      }}
    >
      <br />
      <p style={{ fontFamily: "Inter, sans-serif" }}>
        Gruppenliste: {groupName}
      </p>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <span
              onClick={(event) => {
                setSelectedGroup(group.id); // Update the selected group
                document.getElementById("group").value = event.target.textContent;
              }}
              style={{
                cursor: "pointer",
                color: selectedGroup === group.id ? "#0a58ca" : (darkMode ? "#ffffff" : "black"), 
                fontSize: selectedGroup === group.id ? "18px" : "16px",
                fontWeight: selectedGroup === group.id ? "bold" : "normal",
                fontFamily: "Inter, sans-serif",
                padding: "5px 10px", 
                borderRadius: "5px",
              }}
            >
              {group.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;