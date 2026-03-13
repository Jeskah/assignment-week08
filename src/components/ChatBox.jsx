'use client'

import { useEffect, useState } from "react";

export default function Chatbox({ artistId }) {
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");

// Fetch messages inside useEffect
useEffect(() => {
async function fetchMessages() {
    try {
    const res = await fetch(`/api/messages?artistId=${artistId}`);
    const data = await res.json(); // ✅ await here is correct
    setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
    console.error("Failed to fetch messages:", err);
    setMessages([]);
    }
}

fetchMessages();
}, [artistId]);

// Send a new message
async function sendMessage() {
if (!newMessage.trim()) return;

try {
    const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        content: newMessage,
        artistId,
        braggerId: 1, // replace with Clerk user ID later
    }),
    });

    const data = await res.json();
    if (data) setMessages((prev) => [...prev, data]);
    setNewMessage("");
} catch (err) {
    console.error(err);
}
}

return (
<div>
    <div style={{ maxHeight: 200, overflowY: "auto" }}>
    {messages.length === 0 ? (
        <p>No messages yet</p>
    ) : (
        messages.map((msg) => (
        <div key={msg.id}>
            <strong>Bragger {msg.bragger_id}:</strong> {msg.content}
        </div>
        ))
    )}
    </div>

    <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
</div>
);
}