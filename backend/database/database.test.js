import {
    addChatMessage,
    getChatMessages,
    deleteChatMessage,
    getGroup,
    addGroup,
    resetDatabase
} from './database';

// This will run before each test to reset the database state
beforeEach(async () => {
    await resetDatabase();
});

// Test adding a chat message with missing fields (should reject)
test('addChatMessage - missing fields', async () => {
    try {
        await addChatMessage("", "test message", 1, Date.now()); // Missing username
    } catch (err) {
        expect(err).toBe("One of the fields was empty.");
    }
});

// Test deleting a chat message
test('deleteChatMessage', async () => {
    const text = "test message";
    const timestamp = Date.now();
    
    // Add chat message to the database
    await addChatMessage("testuser", text, 1, timestamp);
    
    // Fetch the message to get the ID
    let chatMessages = await getChatMessages();
    const chatMessageId = chatMessages[0].id;

    // Delete the chat message
    await deleteChatMessage(chatMessageId);

    // Fetch chat messages again after deletion
    chatMessages = await getChatMessages();
    expect(chatMessages.length).toBe(0);
});

// Test deleting a chat message with an invalid ID (should reject)
test('deleteChatMessage - invalid ID', async () => {
    try {
        await deleteChatMessage(-1); // Invalid ID
    } catch (err) {
        expect(err).toBe("Error deleting data: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed");
    }
});

// Test getting a group by name
test('getGroup - by name', async () => {
    const groupName = "testgroup";
    await addGroup(groupName);

    const group = await getGroup(groupName);
    expect(group.name).toBe(groupName);
});

