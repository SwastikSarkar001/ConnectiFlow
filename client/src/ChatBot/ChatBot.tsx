import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BiMicrophone, BiPhotoAlbum, BiSend } from "react-icons/bi";

export type MessageType = {
  user: "you" | "me";
  dataType: "text" | "image" | "file" | "audio";
  text?: string;
  image?: string;
  audio?: string;
  file?: string;
  timestamp: Date;
};

function TimeStampDisplay({ date }: { date: Date }) {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const firstDayOfWeek = new Date();
  firstDayOfWeek.setDate(now.getDate() - now.getDay());
  const isThisWeek = date >= firstDayOfWeek;

  let formattedDate;
  if (isToday) {
    formattedDate = "Today";
  } else if (isYesterday) {
    formattedDate = "Yesterday";
  } else if (isThisWeek) {
    formattedDate = date.toLocaleDateString(undefined, { weekday: "long" });
  } else {
    formattedDate = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  return (
    <div className="flex sticky top-0 items-center justify-center py-4">
      <div className="text-theme-white text-xs px-4 py-2 rounded-full bg-[#3e3e3e] border-2 border-gray-400/30">
        <div>{formattedDate}</div>
      </div>
    </div>
  );
}

function Message({ user, dataType, timestamp, ...data }: MessageType) {
  if (data[dataType] === undefined)
    throw new Error("Message doesn't exist\nType : " + dataType);
  const currentUser = "me";
  const isMessageFromClient = user === currentUser;
  return (
    <div className={`flex items-start ${isMessageFromClient ? "flex-row-reverse" : "flex-row"} gap-8 p-4`}>
      <div className="rounded-full w-10 h-10 select-none bg-green-700 text-white flex items-center justify-center">
        <div className="text-lg">{isMessageFromClient ? "M" : "Y"}</div>
      </div>
      <div className={`relative -z-10 bg-[#2e2e2e] text-theme-white text-[14px] px-4 py-2 rounded-lg after:absolute after:top-0 after:content-[''] after:border-t-20 after:border-t-[#2e2e2e] after:border-l-transparent after:border-r-transparent ${isMessageFromClient ? "after:-right-2 after:border-r-20 after:border-l-0" : "after:-left-2 after:border-l-20 after:border-r-0"}`}>
        {dataType === "text" ? (
          <div>{data.text}</div>
        ) : dataType === "image" ? (
          <img src={data.image} alt="Image" className="w-20 h-20 object-cover rounded-lg" />
        ) : dataType === "file" ? (
          <a href={data.file} className="text-blue-500 hover:underline">
            Download File
          </a>
        ) : dataType === "audio" ? (
          <audio src={data.audio} controls className="w-20 h-10" />
        ) : null}
        <div className={`${isMessageFromClient ? "text-right" : "text-left"} text-gray-400 text-[10px] mt-1`}>
          {timestamp.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
}

function MessagesGroupByDate({ date, messages }: { date: Date; messages: MessageType[] }) {
  return (
    <div>
      <TimeStampDisplay date={date} />
      {messages.map((message, index) =>
        message.timestamp.toDateString() === date.toDateString() ? (
          <Message key={index} {...message} />
        ) : null
      )}
    </div>
  );
}

export default function ChatInterface() {
  // State for messages and input value
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Append user message to messages state
    const userMessage: MessageType = {
      user: "me",
      dataType: "text",
      text: inputMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Call backend to get bot response
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", { message: inputMessage });
      const botMessage: MessageType = {
        user: "you",
        dataType: "text",
        text: response.data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Fallback response on error
      const botMessage: MessageType = {
        user: "you",
        dataType: "text",
        text: "Sorry, there was an error processing your message.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
    setInputMessage(""); // Clear the input after sending
  };

  // Group messages by date
  const groupedMessages = messages.reduce(
    (acc: { date: Date; messages: MessageType[] }[], message) => {
      const lastGroup = acc[acc.length - 1];
      if (lastGroup && lastGroup.date.toDateString() === message.timestamp.toDateString()) {
        lastGroup.messages.push(message);
      } else {
        acc.push({ date: message.timestamp, messages: [message] });
      }
      return acc;
    },
    [] as { date: Date; messages: MessageType[] }[]
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="grow w-full overflow-y-auto scrollbar">
        <div className="w-full">
          {groupedMessages.map((group, index) => (
            <MessagesGroupByDate key={index} date={group.date} messages={group.messages} />
          ))}
          <div ref={endRef} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center py-8">
        <div className="flex gap-4 w-4/5 rounded-full bg-theme-black text-theme-white px-8 py-5 border-2 border-gray-400/30">
          <input
            type="text"
            className="outline-none border-none grow bg-transparent text-theme-white"
            placeholder="Type anything to send"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button className="cursor-pointer" onClick={sendMessage}>
            <BiSend className="text-[1.5em]" />
            <div className="sr-only">Send</div>
          </button>
          <button className="cursor-pointer">
            <BiMicrophone className="text-[1.5em]" />
            <div className="sr-only">Record Audio</div>
          </button>
          <button className="cursor-pointer">
            <BiPhotoAlbum className="text-[1.5em]" />
            <div className="sr-only">Send Image</div>
          </button>
        </div>
      </div>
    </div>
  );
}
