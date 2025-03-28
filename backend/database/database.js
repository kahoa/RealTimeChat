import sqlite3 from "sqlite3";

const dbFile = "./database.db";

function initializeDatabase() {
    const db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            console.error("Error opening database:", err.message);
        } else {
            console.log("Connected to the database.");
            db.serialize(() => {
                db.run("BEGIN TRANSACTION", () => {
                    // Enable foreign key support
                    db.run(`PRAGMA foreign_keys = ON;`, (err) => {
                        if (err) {
                            console.error("Error enabling foreign keys:", err.message);
                        }
                    });

                    // Create tables for chat messages and groups
                    db.run(`CREATE TABLE IF NOT EXISTS chatmessages (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        text TEXT,
                        date TEXT,
                        username TEXT,
                        group_id INTEGER DEFAULT 1 REFERENCES groups(id)
                    )`, (err) => {
                        if (err) {
                            console.error("Error creating table:", err.message);
                        } else {
                            console.log("Table `chatmessages` created or already exists.");
                        }
                    });

                    db.run(`CREATE TABLE IF NOT EXISTS groups (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT UNIQUE
                    )`, (err) => {
                        if (err) {
                            console.error("Error creating groups table:", err.message);
                        } else {
                            console.log("Table `groups` created or already exists.");
                        }
                    });

                    db.run("COMMIT", (err) => {
                        if (err) {
                            console.error("Error committing transaction:", err.message);
                        }
                    });

                    db.run("INSERT INTO groups (name) VALUES ('default')", (err) => {
                        if (err) {
                            console.error("Error inserting default group:", err.message);
                        }
                    });
                })
            });
        }
    });

    return db;
}

const db = initializeDatabase();

// Add a new chat message
export function addChatMessage(username, text, id, timestamp, group_id = 1) {
    return new Promise((resolve, reject) => {
        if (!username || !text || !id || !timestamp) {
            return reject("One of the fields was empty.");
        }
        db.run(`INSERT INTO chatmessages (id, text, date, username, group_id) VALUES (?, ?, ?, ?, ?)`, 
            [id, text, timestamp, username, group_id], (err) => {
            if (err) {
                return reject(`Error inserting data: ${err.message}`);
            }
            resolve("Data inserted successfully.");
        });
    });
}

// Get chat messages
export function getChatMessages(group_id = 1, number = 100) {
    return new Promise((resolve, reject) => {
		// TODO Reject if number is not a number or negative
        db.all("SELECT * FROM chatmessages WHERE group_id = ? ORDER BY date LIMIT ?",
  [group_id, number], (err, rows) => {
            if (err) {
                return reject(`Error fetching data: ${err.message}`);
            } else {
                resolve(rows);
            }
        });
    });
}

// Delete chat message
export function deleteChatMessage(chatMessageId) {
    return new Promise((resolve, reject) => {
        // TODO Reject if chatmessageid is not a number or negative
        db.run(`DELETE FROM chatmessages WHERE id = ?`, [chatMessageId], (err) => {
            if (err) {
                reject(`Error deleting data: ${err.message}`);
            } else {
                resolve("Data deleted successfully.");
            }
        });
    });
}

// Get group by name
export function getGroup(group_name) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM groups WHERE name = ?", [group_name], (err, rows) => {
            if (err) {
                reject(`Error fetching groups: ${err.message}`);
            } else {
                resolve(rows);
            }
        });
    });
}

// Add a new group
export function addGroup(groupName) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO groups (name) VALUES (?)`, [groupName], (err) => {
            if (err) {
                reject(`Error adding group: ${err.message}`);
            } else {
                resolve("Group added successfully.");
            }
        });
    });
}

//get all groups
export function getAllGroups() {
    try {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM groups", (err, rows) => {
                if (err) {
                    reject(`Error fetching groups: ${err.message}`);
                } else {
                    resolve(rows);
                }
            });
        });
    } catch (error) {
        console.error("Error fetching groups:", error);
    }
    
    
}
// Reset the database contents
export function resetDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`BEGIN TRANSACTION`, (err) => {
                if (err) {
                    return reject(`Error starting transaction: ${err.message}`);
                }

                db.run(`DELETE FROM chatmessages`, (err) => {
                    if (err) {
                        return db.run(`ROLLBACK`, () => {
                            reject(`Error deleting chat messages: ${err.message}`);
                        });
                    }
                    db.run(`DELETE FROM groups`, (err) => {
                        if (err) {
                            return db.run(`ROLLBACK`, () => {
                                reject(`Error deleting groups: ${err.message}`);
                            });
                        }
                        db.run(`COMMIT`, (err) => {
                            if (err) {
                                return reject(`Error committing database reset: ${err.message}`);
                            }
                            resolve("Database reset successfully.");
                        });
                    });
                });
            });
        });
    });
}
