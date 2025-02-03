"use client";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Question {
    question?: string;
    answer?: string;
}

const AnimatedQuestion =( {question, answer}:Question ) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    {question}
                </AccordionTrigger> 
                <AccordionContent> 
                    {answer}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
const ContactPage = () => {
    return (
        <div className="w-full h-full flex flex-col items-center overflow-y-auto overflow-hidden justify-center">
            <div className="w-full min-h-64 flex flex-col items-center justify-center mb-10">
                <h1 className="text-center md:text-6xl text-5xl font-semibold font-josefin">Contact Us</h1>
                <p className="text-center md:text-large md:px-0 px-2 text-base font-geist text-muted-foreground" >
                    We&apos;re here to help you with any questions or concerns you may have.
                </p>
                <Badge className="mt-4 !py-1 rounded-full" variant={"secondary"} >
                    <p className="text-center uppercase">
                        Talk to US
                    </p>
                </Badge>
            </div>
            <div className="flex md:flex-row mx-40 flex-col w-full justify-center gap-10">
                <div className="flex flex-col justify-start gap-4 px-4 md:px-0">
                    <h2 className="text-left md:text-4xl text-3xl font-semibold font-josefin">
                        Send Us a Message
                    </h2>
                    <p className="text-left max-w-md md:text-base text-medium font-geist text-muted-foreground">
                        Have a question, suggestion, or need support? Send us a message, and our team will get back to you as soon as possible. Whether it’s a general inquiry, technical issue, or feature request, we’re here to help! Reach us at support@collegeconnections.com or use the in-app chat for quick assistance. Your feedback helps us improve and build a better student community! 🚀
                    </p>
                </div>
                <div className="flex flex-col justify-center gap-4 rounded-lg sm:w-2/5 w-full px-4 sm:px-0" >
                    <Input
                        type="text"
                        placeholder="Your name"
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <Textarea
                        className="h-44 mt-2"
                        placeholder="Enter your message"
                        required
                    />
                    <Button type="submit" variant={"outline"} className="bg-white text-black w-32 rounded-xl">
                        Send Message
                    </Button>
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center mt-10">
                <h2 className="text-center md:text-6xl text-5xl font-semibold font-josefin leading-5">
                    Frequently Asked <br /> Questions
                </h2>
                <div className="w-full flex flex-col items-center justify-center">
                    <AnimatedQuestion question="What is College Connections?" answer="
                    College Connections is a student community platform that connects students with their college mates." />
                </div>
            </div>
        </div>
    );
}

export default ContactPage;