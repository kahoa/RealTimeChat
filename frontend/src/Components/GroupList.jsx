
import { useState, useEffect } from "react";
import { useSocket } from "./SocketContext";

const WS_SERVER = import.meta.env.VITE_WS_SERVER
  ? `http://${import.meta.env.VITE_WS_SERVER}:8080`
  : "http://localhost:8080"; //

function UserList() {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");
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
    <div>
         <br></br>
         <p>Gruppenliste: {groupName}</p>
      <ul>
        {groups.map((group) => (
          <li key={group.id} onClick={ function(event) {
            document.getElementById("group").value = event.target.textContent
          } }>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;