"use client"
import { useChat } from "ai/react"
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Send } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import reactGfm from "remark-gfm";




const Chat = () => {

    const { messages, input, handleSubmit, handleInputChange, isLoading, stop, reload } = useChat();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="mt-2 flex flex-col sm:h-[calc(100vh-110px)] h-full justify-between">
            <div className="flex flex-col gap-4 px-2 w-full">
                <ScrollArea className="sm:h-[calc(100vh-200px)] h-[53dvh] ">
                    {messages.length === 0 &&
                        <div className="flex justify-center items-center h-full">
                            <p className="text-center text-muted-foreground">
                                Ask me anything about your notes
                            </p>
                        </div>}
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-4  ${message.role === "user" ? "text-right" : "text-left"}`}>
                            <div className={`inline-block text-wrap w-full ${message.role === "user" ? "bg-primary-700/50 rounded-t-xl rounded-l-xl w-max max-w-full" : ""}`}>
                                {message.role === "user" && (
                                    <div className="flex justify-end items-center">
                                        <ReactMarkdown remarkPlugins={[reactGfm]} className="p-2">
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                                {message.role === "assistant" && (
                                    <div className="flex justify-start items-center flex-wrap">
                                        <ReactMarkdown remarkPlugins={[reactGfm]} className="p-2">
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="animate-spin" />
                            <Button type="button" variant={"outline"} size={"sm"} className="absolute bottom-4 rounded-full right-6 flex gap-1" onClick={stop}>
                                <span className="text-sm mt-1" >
                                    Stop
                                </span>
                            </Button>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </ScrollArea>
            </div>
            <div >
                <form onSubmit={handleSubmit}>
                    <div className="border-y md:p-3 p-2 relative">
                        <Textarea placeholder="What are Vibrational modes" className="border-none hover:border-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
                            value={input} onChange={handleInputChange}
                        />
                        <Button type="submit" variant={"outline"} size={"sm"} className="absolute bottom-4 rounded-full right-2 flex gap-1 justify-center items-center"  disabled={isLoading}>
                            <Send size={15} />
                            <span className="text-sm sm:block hidden mt-1" >
                                Send
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;