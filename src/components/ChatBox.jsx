'use client'

import { useEffect, useState } from "react";

export default function Chatbox({ artistId }) {
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");

useEffect(() => {
async function fetchMessages() {
    try {
    const res = await fetch(`/api/messages?artistId=${artistId}`);
    const data = await res.json();
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
        credentials: "include"
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
<div className="flex flex-col border-2 rounded-2xl">
    <div className="flex flex-col gap-3 p-4.5" style={{ maxHeight: 200, overflowY: "auto" }}>
    {messages.length === 0 ? (
        <p>No messages yet</p>
    ) : (
        messages.map((msg) => (
        <div key={msg.username}>
            <div className="text-mauve-500 flex flex-row items-center gap-1"><strong>{msg.username}</strong>
            <p className="text-xs italic text-mauve-600">bragged!</p>
            </div> 
                
            <div className="text-sm"> {msg.content} </div>
        </div>
        ))
    )}
    </div>

<div className="flex flex-row flex-wrap justify-items-start text-mauve-500 items-center h-20 gap-30 p-10 mt-10">
    <textarea
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Brag, Post, Boast..."
    className="pt-4 justify-center border-t w-full h-20 object-contain flex-wrap"
    />
</div>
<div className="flex flex-col p-10 items-right mt-10">
    <button className="border rounded-lg p-4 cursor-pointer" onClick={sendMessage}>Brag!</button>
</div>
</div>
);
}