"use client"

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useUser, useAuth } from "@clerk/nextjs";

export default function Chatbox({ artistId }) {
const { user } = useUser();
console.log(user?.id)
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");
const messagesEndRef = useRef(null);
const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
};

useEffect(() => {
    scrollBottom();
 }, [messages]);


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

    async function fetchMessages() {
    try {
        const res = await fetch(`/api/messages?artistId=${artistId}`);
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
        console.error("Failed to fetch messages:", err);
    }
    }

    async function sendMessage() {
    if (!newMessage.trim()) return;

    try {
        const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: newMessage, artistId }),
        });

        if (!res.ok) throw new Error(await res.text());
        setNewMessage("");
        await fetchMessages();
    } catch (err) {
        console.error(err);
    }
    }

async function deleteMessage(id) {

    if (!confirm("Are you sure you want to delete this message?")) return;
try {
    const res = await fetch("/api/messages", {
    method: "DELETE",
    headers: { 
        "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ messageId: id }),
    });
    const data = await res.json();
    if (data.success) setMessages((prev) => prev.filter(m => m.id !== id));
} catch (err) {
    console.error(err);
}
}

return (
<div className="flex flex-col items-center">
    <h4 className="pb-5 text-center">
    <Image src="/brag.png" alt="brag logo" width={110} height={110} />
    <strong>about it</strong>
    </h4>

    <div className="flex flex-col border-2 rounded-2xl w-full">
    <div className="flex flex-col flex-wrap-col gap-3 p-4.5 bg-mauve-800 overflow-y-auto no-scrollbar rounded-t-2xl sticky bottom-0" style={{ maxHeight: 200 }}>
        {messages.length === 0 ? (
        <p>No messages yet</p>
        ) : (
        messages.map(msg => (
            <div key={msg.id} className=" border-mauve-600 pb-2">
            <div className="flex justify-between items-center">
                <div className="text-mauve-600"><strong>{msg.username}</strong> <span className="italic text-xs">bragged!</span></div>
                {user?.id === msg.bragger_id && (
                <button className="text-red-400 text-xs" onClick={() => deleteMessage(msg.id)}>Delete</button>
                )}
            </div>
            <div className="text-sm">{msg.content}</div>
            </div>
        ))
        )}
        <div ref={messagesEndRef} />
    </div>

    <div className="flex flex-row flex-wrap justify-items-start text-mauve-500 items-center h-20 gap-30 p-4">
        <textarea
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="Brag, Post, Boast..."
        className="w-full h-20 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-mauve-800"
        />
    </div>

    <div className="flex justify-end p-4">
        <button className="border rounded-lg p-2 mt-5 cursor-pointer" onClick={sendMessage}>Brag!</button>
    </div>
    </div>
</div>
);
}