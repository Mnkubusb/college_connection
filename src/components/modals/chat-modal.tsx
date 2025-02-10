"use client"
import { useEffect, useState } from "react";
import Chat from "../chat/chat";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const ChatModal = ({ children }: { children: React.ReactNode }) => {

    const [isMobileView, setIsMobileView] = useState(false);
    useEffect(() => {
        setIsMobileView(window.innerWidth < 768);
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side={isMobileView ? "bottom" : "right"} className="p-0">
                <SheetHeader className="p-2 sm:p-6">
                    <SheetTitle>College Connection AI</SheetTitle>
                    <SheetDescription>
                        You can ask any question here 
                    </SheetDescription>
                </SheetHeader>
                <Chat />
            </SheetContent>
        </Sheet>
    );
}

export default ChatModal;