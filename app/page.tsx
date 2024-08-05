"use client";

import React, { KeyboardEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import ReactMarkdown from "react-markdown";
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
import { MessageCircleMore, Send, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Define the structure of a message
type Message = {
  type: "user" | "system";
  text: string;
};

// Define the structure of a history item
type HistoryItem = {
  question: string;
  timestamp: string;
};

export default function Component() {
  // State to store chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to store the current input text
  const [input, setInput] = useState<string>("");
  // State to store chat history (static for this example)
  const [history] = useState<HistoryItem[]>([
    { question: "How does AI work?", timestamp: "2024-08-05 10:30" },
    { question: "What is machine learning?", timestamp: "2024-08-05 11:45" },
    {
      question: "Explain natural language processing",
      timestamp: "2024-08-05 14:20",
    },
  ]);
  // Hook to manage theme
  const { setTheme } = useTheme();

  // Function to send a message
  const sendMessage = (event?: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (input.trim()) {
      // Add user message to the chat
      const newMessages: Message[] = [
        ...messages,
        { type: "user", text: input },
      ];
      setMessages(newMessages);
      setInput("");

      // Simulate system response after a short delay
      setTimeout(() => {
        const response: Message = {
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
          <MessageCircleMore
            strokeWidth={2.25}
            className="h-6 w-6 mx-2 text-primary"
          />
          <h1 className="text-lg font-semibold">AI Chat Interface</h1>
        </div>

        {/* Theme toggle and user menu */}
        <div className="flex items-center">
          {/* Theme toggle dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/2.png" alt="Avatar" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">History</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar with history (hidden on mobile) */}
        <div className="hidden sm:block bg-gray-100 dark:bg-gray-800 border-r w-64">
          <nav className="flex flex-col gap-1 p-4">
            <h2 className="font-semibold mb-2">Chat History</h2>
            {history.map((item, index) => (
              <div
                key={index}
                className="text-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <p className="font-medium truncate">{item.question}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.timestamp}
                </p>
              </div>
            ))}
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
                      <AvatarImage src="/1.jpg" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="grid gap-1">
                    <div className="font-medium">
                      {msg.type === "system" ? "AI" : "You"}
                    </div>
                    {/* Message bubble */}
                    <div
                      className={`rounded-lg px-4 py-2 shadow-md ${
                        msg.type === "system"
                          ? "bg-gray-200 dark:bg-gray-700"
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
                      <AvatarImage src="/2.png" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message input area */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 py-4 shadow-lg">
            <div className="mx-auto flex max-w-2xl items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full p-2">
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
