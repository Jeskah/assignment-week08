'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

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

    <div className="flex flex-col items-center">
        <h4 className="pb-5             text-center">
            <Image 
            src="/brag.png" 
            alt="brag logo" 
            width={110} 
            height={110}
            className=" pb-2 scroll-pt-0.5"
            /><strong>about it</strong>
        </h4>
    
<div className="flex flex-col border-2 rounded-2xl">

    <div className="flex flex-col-reverse gap-3 p-4.5 bg-mauve-800 overflow-hidden rounded-t-2xl" style={{ maxHeight: 200, overflowY: "auto" }}>

    {messages.length === 0 ? (
        <p>No messages yet</p>
    ) : (
        messages.map((msg) => (
        <div key={msg.username}>
            <div className="text-mauve-600 flex flex-row items-center gap-1"><strong>{msg.username}</strong>
            <p className="text-xs italic text-mauve-600">bragged!</p>
            </div> 
                
            <div className="text-sm"> {msg.content} </div>
            
        </div>
        ))
    )}
    </div>

<div className="flex flex-row flex-wrap justify-items-start text-mauve-500 items-center h-20 gap-30 p-10">
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
</div>
);

}