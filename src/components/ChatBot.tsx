"use client";

import { useChatStore } from "@/lib/services/cartStore";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import type { Message } from "ai";
import {
  Bot,
  Loader2,
  MessageSquareIcon,
  Send,
  Trash2,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ProductLink } from "./ProductLink";

interface ChatBotProps {
  position?: "bottom-right" | "bottom-left";
  initialMessage?: string;
  pageContext?: string;
  apiEndpoint?: string;
}

export function ChatBot({
  position = "bottom-right",
  initialMessage = "👋 Hi there! I'm your shopping assistant. How can I help you today?",
  pageContext = "",
  apiEndpoint = "/api/chat",
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  const initialSystemMessage = {
    id: "welcome-message",
    role: "assistant" as const,
    content: initialMessage,
  };

  // Load chat history from localStorage
  const loadChatHistory = (): Message[] => {
    if (typeof window === "undefined") return [initialSystemMessage];

    try {
      const savedMessages = localStorage.getItem("chatHistory");
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages) as Message[];
        return parsedMessages.length > 0
          ? parsedMessages
          : [initialSystemMessage];
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }

    return [initialSystemMessage];
  };

  // Using useChat from Vercel AI SDK
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
  } = useChat({
    initialMessages: loadChatHistory(),
    api: apiEndpoint,
    body: {
      pageContext: pageContext,
    },

    onFinish: (completion) => {
      // Save messages to localStorage whenever a response is finished
      useChatStore
        .getState()
        .setMessages([...useChatStore.getState().messages, completion]);
    },
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && typeof window !== "undefined") {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChatHistory = () => {
    setMessages([initialSystemMessage]);
    localStorage.removeItem("chatHistory");
  };

  // Position classes based on the position prop
  const positionClasses = {
    button:
      position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6",
    window:
      position === "bottom-right" ? "bottom-24 right-6" : "bottom-24 left-6",
  };

  // Function to parse message content and render product links
  const renderMessageContent = (content: string) => {
    // Regular expression to match "Here is a product you can read more about: PRODUCT_ID"
    const productRegex =
      /Here is a product you can read more about: ([a-zA-Z0-9_-]+)/;

    const match = content.match(productRegex);

    if (match && match[1]) {
      const productId = match[1];
      // Remove the product reference text from the content
      const cleanContent = content.replace(match[0], "").trim();

      return (
        <>
          {cleanContent}
          <ProductLink productId={productId} />
        </>
      );
    }

    return content;
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          `fixed ${positionClasses.button} z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300`,
          "bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900",
          isOpen && "rotate-90 bg-gray-700 hover:bg-gray-600"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <XIcon className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            `fixed ${positionClasses.window} z-50 w-full max-w-md transform rounded-lg bg-gray-800 shadow-xl transition-all duration-300`,
            "border border-gray-700 overflow-hidden",
            isOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none"
          )}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <MessageSquareIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Assistant</h3>
                <p className="text-xs text-gray-400">Ask me anything</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={clearChatHistory}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                aria-label="Close chat"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-max max-w-[80%] flex-col rounded-lg px-4 py-2 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-orange-500 text-white"
                      : "bg-gray-700 text-gray-100"
                  )}
                >
                  {message.role === "assistant"
                    ? renderMessageContent(message.content)
                    : message.content}
                  <span className="mt-1 text-xs opacity-50 self-end">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex w-max max-w-[80%] flex-col rounded-lg bg-gray-700 px-4 py-2 text-sm text-gray-100">
                  <div className="flex items-center space-x-2">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              {error && (
                <div className="flex w-max max-w-[80%] flex-col rounded-lg bg-red-900/30 border border-red-800 px-4 py-2 text-sm text-red-300">
                  <span>Error: {error.message}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-700 p-4"
          >
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 rounded-md border border-gray-700 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) {
                      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                    }
                  }
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-500 text-white disabled:opacity-50 hover:bg-orange-600"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1">
      <div
        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}

///////////////////////////////////////////
////////////////////////////////////////
///////////////////////////////////////////
//////////////////////////////////////////
