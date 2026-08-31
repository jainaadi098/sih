import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, Loader2, Key } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [customKey, setCustomKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "नमस्ते! मैं आपका कृषि सहायक (Krishi Sahayak) हूँ powered by Gemini AI। मैं आपकी खेती, फसलों, मौसम और सरकारी योजनाओं में मदद कर सकता हूँ।",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // ponytail: direct simple fetch to backend FastAPI endpoint
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          api_key: customKey.trim() || undefined,
        }),
      });

      const data = await res.json();
      const botReply = data.reply || data.detail || "Sorry, I could not get a response from Gemini.";

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "bot", text: botReply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Error connecting to backend server. Make sure FastAPI server is running on port 8000.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 sm:w-96 h-[480px] shadow-strong agricultural-card flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-hero rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Krishi Sahayak AI</CardTitle>
                  <p className="text-xs text-muted-foreground">Powered by gemini-3.6 Flash</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  title="Configure Gemini API Key"
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className="h-7 w-7 p-0"
                >
                  <Key className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-7 w-7 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Custom API Key input drawer if user wants to supply custom key */}
            {showKeyInput && (
              <div className="mt-2 pt-2 border-t text-xs">
                <label className="text-muted-foreground font-medium mb-1 block">
                  Gemini API Key (optional if set in Backend/.env):
                </label>
                <Input
                  type="password"
                  placeholder="AIzaSy..."
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
            )}
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-3 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[85%] text-sm ${msg.sender === "user"
                        ? "gradient-hero text-white"
                        : "bg-muted/60 text-foreground border"
                      }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="flex items-center space-x-1.5 mb-1 text-xs text-primary font-medium">
                        <Bot className="w-3 h-3" />
                        <span>Krishi Sahayak</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted/60 text-foreground border rounded-lg p-3 text-xs flex items-center space-x-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2 pt-2 border-t mt-2">
              <Input
                placeholder="Ask about crops, soil, weather, schemes..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 h-9 text-xs sm:text-sm"
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !inputMessage.trim()}
                className="h-9 w-9 p-0 gradient-hero"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full gradient-hero shadow-strong hover:shadow-medium transition-all duration-300 hover-lift flex items-center justify-center"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
}