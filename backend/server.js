import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { addChatMessage, getChatMessages, addGroup, getGroup,getAllGroups } from "./database/database.js";

const app = express();
const server = createServer(app);
const port = 8080;

app.use(cors());
app.use(express.json());

// Socket.io-Server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Liste der angemeldeten Benutzer
let users = [];

// auf "connection"-Event in Socket warten
io.on("connection", (socket) => {
  console.log(`User verbunden: ${socket.id}`);

  // Benutzernamen über das "set_username"-Event aus dem Frontend empfangen
  socket.on("set_username", (username) => {
    socket.username = username;
    // username zur Benutzerliste hinzufügen
    users.push(username);
    console.log(`${username} hat sich angemeldet!`);
    // Benutzerliste über das "update_user"-Event ins Frontend senden
    io.emit("update_user", users);
  });

  // Daten über das "send_message"-Event aus dem Frontend empfangen
  socket.on("send_message", async(messageData) => {
    console.log(`Nachricht von ${socket.username}:`, messageData);
    try {
      // Add the chat message to the database
      const group = await getGroup(messageData.groupname);
      await addChatMessage(messageData.user, messageData.text, messageData.id, messageData.timestamp, group.id);
      console.log("Message added to database");
      // Broadcast the message to other clients
    } catch (error) {
      console.error("Error processing message:", error);
    }
    // Daten über das "receive_message"-Event ins Frontend senden
    io.emit("receive_message", messageData);
  });

  // Benutzerliste altualisieren wenn ein Benutzer die Verbindung trennt
  socket.on("disconnect", () => {
    if (socket.username) {
      console.log(`${socket.username} hat sich abgemeldet!`);
      users = users.filter((user) => user !== socket.username);
      io.emit("update_user", users);
    }
  });
});

// Get chat messages from the database
app.get("/chat/:group_name?", async (req, res) => {
  try {
    // Default group name is `default`
    let { group_name } = req.params;
    if (!group_name) {
        group_name = "default";
    }
    // Try to retrieve the matching ID for the group
    let groupID;
    let triedGroupCreation = false;
    do {
        groupID = await getGroup(group_name);
        if (!groupID) {
            if (triedGroupCreation) {
                console.error("Group creation failed");
                res.status(500).send("Group creation failed");
                return;
            }
            // Group not found, create it
            await addGroup(group_name);
            console.log("Group created", group_name);
            triedGroupCreation = true;
        }
    } while (groupID === undefined);
    
    // Get messages for this group
    const chatMessages = await getChatMessages(groupID.id);
    res.status(200).send(chatMessages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).send("Error fetching chat messages");
  }
});

// get all groups
app.get("/groups_list", async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.status(200).send(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).send("Error fetching groups");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server läuft auf http://0.0.0.0:${port}`);
});
