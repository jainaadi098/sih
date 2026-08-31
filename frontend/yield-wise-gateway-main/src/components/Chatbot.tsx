import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Handle message sending logic here
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 h-96 shadow-strong agricultural-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-hero rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm">Krishi Sahayak</CardTitle>
                  <p className="text-xs text-muted-foreground">Agricultural Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-4 pt-0">
            {/* Messages Area */}
            <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">Krishi Sahayak</span>
                </div>
                <p className="text-sm text-foreground">
                  नमस्ते! मैं आपका कृषि सहायक हूं। मैं आपकी खेती संबंधी समस्याओं में मदद कर सकता हूं।
                </p>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  How can I assist you with farming, equipment, or crop management today?
                </p>
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 h-9"
              />
              <Button type="submit" size="sm" className="h-9 w-9 p-0 gradient-hero">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full gradient-hero shadow-strong hover:shadow-medium transition-all duration-300 hover-lift"
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}