"use client"
import { useChat } from "ai/react"
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Send, SendHorizonal, SendIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import reactGfm from "remark-gfm";
import Markdown from "./Markdown";


const Chat = () => {

    const { messages, input, handleSubmit, handleInputChange, isLoading, stop, reload } = useChat();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="mt-2 flex flex-col sm:h-[calc(100vh-110px)] h-full justify-between w-full">
            <div className="flex flex-col gap-4 px-4 w-full">
                <ScrollArea className="sm:h-[calc(100vh-200px)] h-[53dvh] ">
                    {messages.length === 0 &&
                    <div className={`inline-block text-wrap w-max max-w-full`}>
                        <div className="flex justify-end items-center text-sm text-muted-foreground">
                            <ReactMarkdown remarkPlugins={[reactGfm]} className="p-2"  >
                                Hello! I am a chatbot. How can I help you today?
                            </ReactMarkdown>
                        </div>
                    </div>
                    }
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-4  ${message.role === "user" ? "text-right" : "text-left"}`}>
                            <div className={`inline-block text-wrap text-sm ${message.role === "user" ? "bg-primary-700 text-muted rounded-t-xl rounded-l-xl w-max max-w-full" : "text-gray-300  w-max max-w-[350px]"}`}>
                                {message.role === "user" && (
                                    <div className="flex justify-end items-center">
                                        <ReactMarkdown className="p-2 text-wrap break-words whitespace-pre-wrap"  >
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                                {message.role === "assistant" && (
                                    <div className="flex justify-start items-center flex-wrap ">
                                        <Markdown content={message.content} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="animate-spin" />
                            <Button type="button" variant={"outline"} size={"sm"} className="absolute bottom-4 rounded-full right-6 flex gap-1" onClick={stop}>
                                <span className="text-sm" >
                                    Stop
                                </span>
                            </Button>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </ScrollArea>
            </div>
            <div >
                <form onSubmit={handleSubmit} onKeyDown={(event) => event.key === "Enter" && handleSubmit(event)}>
                    <div className="border-y md:p-3 p-2 relative">
                        <Textarea placeholder="What are Vibrational modes" className="border-none hover:border-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
                            value={input} onChange={handleInputChange}
                        />
                        <Button type="submit" size={"sm"} className="absolute bottom-3 rounded-full right-2 flex gap-1 justify-center items-center mt-1" disabled={isLoading}>
                            <SendHorizonal size={15} />
                            <span className="text-sm" >
                                Ask
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;