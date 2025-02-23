import { useEffect, useRef } from "react";
import { BiMicrophone, BiPhotoAlbum, BiSend } from "react-icons/bi";
import { GiPhotoCamera } from "react-icons/gi";
import { HiPaperClip } from "react-icons/hi";

/** Sample Message Data (Remove carefully when implementing firebase) */

type MessageType = {
  user: 'you' | 'me';
  dataType: 'text' | 'image' | 'file' | 'audio';
  text?: string;
  image?: string;
  audio?: string;
  file?: string;
  timestamp: Date;
}

const messages: MessageType[] = [{
  user: "you",
  dataType: "text",
  text: "Hi, how can I help you today?",
  timestamp: new Date('2025-02-15T09:00:00')
}, {
  user: "me",
  dataType: "text",
  text: "I am looking for a job",
  timestamp: new Date('2025-02-15T09:05:00')
}, {
  user: "you",
  dataType: "text",
  text: "Sure, I can help you with that. Can you tell me more about your skills?",
  timestamp: new Date('2025-02-15T09:10:00')
}, {
  user: "me",
  dataType: "text",
  text: "I am a web developer",
  timestamp: new Date('2025-02-15T09:15:00')
}, {
  user: "you",
  dataType: "text",
  text: "Great! We have a few openings for web developers. Can you share your resume with me?",
  timestamp: new Date('2025-02-15T09:20:00')
}, {
  user: "me",
  dataType: "text",
  text: "Sure, I will send it to you right away",
  timestamp: new Date('2025-02-15T09:25:00')
}, {
  user: "you",
  dataType: "text",
  text: "Thank you! I will get back to you soon.",
  timestamp: new Date('2025-02-15T09:30:00')
}, {
  user: "you",
  dataType: "text",
  text: "Hi, how can I help you today?",
  timestamp: new Date('2025-02-16T10:00:00')
}, {
  user: "me",
  dataType: "text",
  text: "I am looking for a job",
  timestamp: new Date('2025-02-16T10:05:00')
}, {
  user: "you",
  dataType: "text",
  text: "Sure, I can help you with that. Can you tell me more about your skills?",
  timestamp: new Date('2025-02-16T10:10:00')
}, {
  user: "me",
  dataType: "text",
  text: "I am a web developer",
  timestamp: new Date('2025-02-16T10:15:00')
}, {
  user: "you",
  dataType: "text",
  text: "Great! We have a few openings for web developers. Can you share your resume with me?",
  timestamp: new Date('2025-02-16T10:20:00')
}, {
  user: "me",
  dataType: "text",
  text: "Sure, I will send it to you right away",
  timestamp: new Date('2025-02-16T10:25:00')
}, {
  user: "you",
  dataType: "text",
  text: "Thank you! I will get back to you soon.",
  timestamp: new Date('2025-02-16T10:30:00')
}];

/** Sample data ends */

type TimeStampProps = {
  date: Date
}

function TimeStampDisplay({ date }: TimeStampProps) {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
  const isThisWeek = date >= new Date(now.setDate(now.getDate() - now.getDay()));

  let formattedDate;
  if (isToday) {
    formattedDate = "Today";
  } else if (isYesterday) {
    formattedDate = "Yesterday";
  } else if (isThisWeek) {
    formattedDate = date.toLocaleDateString(undefined, { weekday: 'long' });
  } else {
    formattedDate = date.toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric'});
  }
  return (
    <div className="flex sticky top-0 items-center justify-center py-4">
      <div className="text-theme-white text-xs px-4 py-2 rounded-full bg-[#3e3e3e] border-2 border-gray-400/30">
        <div>{formattedDate}</div>
      </div>
    </div>
  )
}

function Message({ user, dataType, timestamp, ...data }: MessageType) {
  if (data[dataType] === undefined) throw new Error("Message doesn't exist\nType : "+dataType)
  const currentUser = "me";
  const isMessageFromClient = user === currentUser;
  return (
    <div className={`flex items-start ${isMessageFromClient ? 'flex-row-reverse' : 'flex-row'} gap-8 p-4`}>
      <div className="rounded-full size-10 select-none bg-green-700 text-white flex items-center justify-center">
        <div className="text-lg">
          U
        </div>
      </div>
      <div className={`relative -z-10 bg-[#2e2e2e] text-theme-white text-[14px] px-4 py-2 rounded-lg after:absolute after:size-0 after:top-0 after:content-[''] after:border-t-20 after:border-t-[#2e2e2e]  after:border-l-transparent after:border-r-transparent ${isMessageFromClient? 'after:-right-2 after:border-r-20 after:border-l-0' : 'after:-left-2 after:border-l-20 after:border-r-0'}`}>
      {
        dataType === 'text' ?
        <div>{data.text}</div> :
        dataType === 'image' ?
        <img src={data.image} alt="Image" className="w-20 h-20 object-cover rounded-lg" /> :
        dataType === 'file' ?
        <a href={data.file} className="text-blue-500 hover:underline">Download File</a> :
        dataType === 'audio' ?
        <audio src={data.audio} controls className="w-20 h-10" /> :
        null
      }
      <div className={`${isMessageFromClient? 'text-right' : 'text-left'} text-gray-400 text-[10px] mt-1`}>
        {timestamp.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
      </div>
      </div>
    </div>
  )
}

function MessagesGroupByDate({ date, messages }: { date: Date, messages: MessageType[] }) {
  return (
    <div>
      <TimeStampDisplay date={date} />
      {
        messages.map (
          (message, index) => message.timestamp.toDateString() === date.toDateString() ? (
            <Message key={index} {...message} />
          ) :
          null
        )
      }
    </div>
  )
}

export default function ChatInterface() {
  const textRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);
  const send = () => {
    console.log('Hello')
  }
  return (
    <div className="h-screen flex items-center flex-col">
      <div className="grow w-full overflow-y-auto scrollbar">
        <div id='all-texts' ref={textRef} className="w-full">
          {
            messages.reduce((acc, message) => {
              const lastMessage = acc[acc.length - 1];
              if (lastMessage && lastMessage.date.toDateString() === message.timestamp.toDateString()) {
                lastMessage.messages.push(message);
              } else {
                acc.push({ date: message.timestamp, messages: [message] });
              }
              return acc;
            }, [] as { date: Date, messages: MessageType[] }[]).map(
              (group, index) => <MessagesGroupByDate key={index} date={group.date} messages={group.messages} />
            )
          }
          <div ref={endRef} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center py-8">
        <div className="flex gap-4 w-4/5 rounded-full bg-theme-black text-theme-white px-8 py-5 border-2 border-gray-400/30">
          <input type="text" className="outline-none border-none grow bg-transparent text-theme-white" placeholder="Type anything to send" />
          <button className="cursor-pointer">
            <BiPhotoAlbum className="size-[1.5em]" />
            <div className="sr-only">Send Image</div>
          </button>
          <button className="cursor-pointer">
            <BiMicrophone className="size-[1.5em]" />
            <div className="sr-only">Record Audio</div>
          </button>
          <button className="cursor-pointer" onClick={send}>
            <BiSend className="size-[1.5em]" />
            <div className="sr-only">Send</div>
          </button>
        </div>
      </div>
    </div>
  )
}
