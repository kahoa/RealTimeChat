
import { useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
import PropTypes from 'prop-types';


function GroupList({ darkMode, groups, setGroups }) { 
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const socket = useSocket(); //

  useEffect(() => {
      // Update the groupName state when the "group_name" event is received
      if (socket) {
          socket.on("group_name", (name) => {
              console.log("Received updated group name:", name);
              setGroupName(name);
          });
          socket.on("update_group", setGroups);
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

GroupList.propTypes = {
    darkMode: PropTypes.bool.isRequired, // Assuming darkMode is a boolean
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired, // Assuming groups is an array of objects with id and name
    setGroups: PropTypes.func.isRequired,
  };

export default GroupList;