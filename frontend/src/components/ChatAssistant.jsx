/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, Minimize2 } from 'lucide-react';
import { geminiService, setApiKey } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const [apiKey, setApiKeyState] = useState(() => {
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem('GEMINI_API_KEY') || '' : '';
    } catch (e) {
      return '';
    }
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    setChatHistory((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const response = await geminiService.chatWithAssistant(userMessage, chatHistory);

    // If service returns NO_API_KEY message, show settings
    if (typeof response === 'string' && response.includes('No Gemini API key configured')) {
      setShowSettings(true);
      setChatHistory((prev) => [...prev, { role: 'model', text: response }]);
      setIsTyping(false);
      return;
    }

    setChatHistory((prev) => [...prev, { role: 'model', text: response || "I'm sorry, I encountered an error." }]);
    setIsTyping(false);
  };

  const handleSaveKey = () => {
    if (!apiKey) return;
    setApiKey(apiKey);
    setApiKeyState(apiKey);
    setShowSettings(false);
  };

  return (
    <>
      {/* Floating button to open chat */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/20 hover:scale-110 transition-all z-40 group"
        aria-label="Open Clinical AI Assistant"
      >
        <MessageCircle size={20} />
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 w-80 max-h-[70vh] bg-white rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Bot size={18} />
                <div>
                  <div className="text-sm font-semibold">MediSync Buddy</div>
                  <div className="text-xs text-slate-500">Clinical AI Online</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="p-3 flex-1 overflow-auto space-y-3 bg-slate-50">
              {showSettings && (
                <div className="mb-2 p-2 bg-yellow-50 border border-yellow-100 rounded">
                  <p className="text-xs text-yellow-800 mb-2">Gemini API key not configured. Paste your key below to enable the assistant.</p>
                  <div className="flex gap-2">
                    <input value={apiKey} onChange={(e) => setApiKeyState(e.target.value)} placeholder="Paste Gemini API key" className="flex-1 p-2 border rounded" />
                    <button onClick={handleSaveKey} className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
                  </div>
                </div>
              )}
              {chatHistory.length === 0 && (
                <div className="text-sm text-slate-600">
                  <p className="font-medium mb-1">How can I assist today?</p>
                  <p className="text-xs text-slate-400">Try: "Help me summarize patient i-12"</p>
                </div>
              )}

              {chatHistory.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-2 rounded-lg ${chat.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>
                    <div className="text-sm">{chat.text}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-sm text-slate-500">MediSync Buddy is typing...</div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-white">
              <div className="relative">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for clinical advice or summaries..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;