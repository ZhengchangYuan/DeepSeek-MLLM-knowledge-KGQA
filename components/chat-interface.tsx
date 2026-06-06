"use client"

import { useState, useRef, useEffect } from "react"
import { Send, User, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// 示例问题建议
const suggestedQuestions = [
  "什么是多模态大语言模型？",
  "GPT-4V有哪些能力？",
  "CLIP模型的工作原理是什么？",
  "多模态大语言模型有哪些应用场景？",
  "多模态大语言模型与传统大语言模型有什么区别？",
  "多模态大语言模型的发展趋势是什么？",
]

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "您好！我是多模态大语言模型知识图谱问答助手。请问您想了解什么关于多模态大语言模型的知识？",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // 添加用户消息
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // 在实际应用中，这里会调用API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      })

      const data = await response.json()

      // 添加助手回复
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }])
    } catch (error) {
      console.error("Error fetching answer:", error)
      setMessages((prev) => [...prev, { role: "assistant", content: "抱歉，处理您的请求时出现了错误。请稍后再试。" }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="flex h-[500px] flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              <div className="flex items-center gap-2">
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                <span className="font-semibold">{message.role === "user" ? "您" : "知识助手"}</span>
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>正在思考...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="rounded-full bg-secondary px-3 py-1 text-xs hover:bg-secondary/80"
            >
              {question}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
