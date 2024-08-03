"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, MessageCircleMore, Send } from "lucide-react";

// Define the structure of a message
type Message = {
  type: "user" | "system";
  text: string;
};

export default function Component() {
  // State to store chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to store the current input text
  const [input, setInput] = useState<string>("");

  // Function to send a message
  const sendMessage = (event?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (input.trim()) {
      // Add user message to the chat
      const newMessages = [...messages, { type: "user", text: input }];
      setMessages(newMessages);
      setInput("");

      // Simulate system response after a short delay
      setTimeout(() => {
        const response = {
          type: "system",
          text: "This is a **dummy response** rendered as markdown.",
        };
        setMessages((prevMessages) => [...prevMessages, response]);
      }, 1000);
    }

    // Prevent default behavior if called from a key event
    event?.preventDefault();
  };

  // Handle key press events in the textarea
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      sendMessage(event);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background bg-opacity-50">
      {/* Header section */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 shadow-sm sm:h-16 sm:px-6">
        {/* App title */}
        <div className="flex items-center">
          {/* <MessageCircle className="h-6 w-6 mx-2 text-primary" /> */}
          <MessageCircleMore
            strokeWidth={2.25}
            className="h-6 w-6 mx-2 text-primary"
          />
          <h1 className="text-lg font-semibold">Chat Interface</h1>
        </div>

        {/* Navigation links */}
        <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
          <Link
            href="#"
            className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground hover:shadow-md"
            prefetch={false}
          >
            Profile
          </Link>
          <Link
            href="#"
            className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground hover:shadow-md"
            prefetch={false}
          >
            Messages
          </Link>
          <Link
            href="#"
            className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground hover:shadow-md"
            prefetch={false}
          >
            Stories
          </Link>
          <Link
            href="#"
            className="rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground hover:shadow-md"
            prefetch={false}
          >
            Calls
          </Link>
        </nav>

        {/* User dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/4.png" alt="Avatar" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar with contact list */}
        <div className="bg-gray-100 border-r">
          <nav className="flex flex-col gap-1 p-4">
            {/* Contact items with tooltips */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black"
                    prefetch={false}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/1.png" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">Amritha</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Amritha</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black"
                    prefetch={false}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/6.png" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">Avinash</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Avinash</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-black"
                    prefetch={false}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/3.png" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">Shreya</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Shreya</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          {/* Message display area */}
          <div className="flex-1 overflow-auto p-4 chat-container">
            <div className="grid gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${
                    msg.type === "user" ? "justify-end" : ""
                  } animate-fade-in`}
                >
                  {/* Avatar for system messages */}
                  {msg.type === "system" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/5.png" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="grid gap-1">
                    <div className="font-medium">
                      {msg.type === "system" ? "Riya" : "You"}
                    </div>
                    {/* Message bubble */}
                    <div
                      className={`rounded-lg px-4 py-2 shadow-md ${
                        msg.type === "system"
                          ? "bg-gray-200"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {msg.type === "system" ? (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                  {/* Avatar for user messages */}
                  {msg.type === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/4.png" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message input area */}
          <div className="sticky bottom-0 bg-white py-4 shadow-lg">
            <div className="mx-auto flex max-w-2xl items-center gap-2 bg-gray-100 rounded-full p-2">
              <Textarea
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                className="h-10 mx-2 flex-1 resize-none rounded-full border-none bg-transparent px-4 py-2 mx-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => sendMessage()}
                    >
                      <Send className="h-5 w-5" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send Message</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
