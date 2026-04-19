"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import styles from "./AIChatWidget.module.css";
import TechnicalSheetPreview from "./TechnicalSheetPreview";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <Bot size={20} />
              <span>Asesor PlastiK LITE</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.length === 0 && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                ¡Hola! Soy tu asesor virtual de PlastiK LITE. ¿En qué tipo de empaque flexible estás interesado hoy?
              </div>
            )}
            {messages.map((m) => (
              m.role !== 'system' && (
                <div key={m.id} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  {m.content && (
                    <div
                      className={`${styles.message} ${
                        m.role === "user"
                          ? styles.userMessage
                          : styles.assistantMessage
                      }`}
                    >
                      {m.content}
                    </div>
                  )}

                  {m.toolInvocations?.map((toolInvocation) => {
                    if (toolInvocation.toolName === "generateTechnicalSheetPreview") {
                      if ("args" in toolInvocation) {
                        return (
                          <div key={toolInvocation.toolCallId} style={{ marginTop: "12px", marginBottom: "12px" }}>
                            {/* @ts-ignore */}
                            <TechnicalSheetPreview {...toolInvocation.args} />
                          </div>
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              )
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                Escribiendo...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
              className={styles.input}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={styles.submitButton}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.fab}
          aria-label="Abrir chat"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
}
