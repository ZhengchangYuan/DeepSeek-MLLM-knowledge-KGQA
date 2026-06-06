import { ref } from "vue"
import { Send, User, Bot, Loader2 } from "lucide-vue-next"

// 示例问题建议
const suggestedQuestions = [
  "什么是多模态大语言模型？",
  "GPT-4V有哪些能力？",
  "CLIP模型的工作原理是什么？",
  "多模态大语言模型有哪些应用场景？",
  "多模态大语言模型与传统大语言模型有什么区别？",
  "多模态大语言模型的发展趋势是什么？",
]

const messages = ref([
  {
    role: "assistant",
    content: "您好！我是多模态大语言模型知识图谱问答助手。请问您想了解什么关于多模态大语言模型的知识？",
  },
])
const input = ref("")
const isLoading = ref(false)

const handleSend = async () => {
  if (!input.value.trim()) return

  // 添加用户消息
  const userMessage = { role: "user", content: input.value }
  messages.value.push(userMessage)
  const currentInput = input.value
  input.value = ""
  isLoading.value = true

  try {
    // 调用后端API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: currentInput }),
    })

    const data = await response.json()

    // 添加助手回复
    messages.value.push({ role: "assistant", content: data.answer })
  } catch (error) {
    console.error("Error fetching answer:", error)
    messages.value.push({ role: "assistant", content: "抱歉，处理您的请求时出现了错误。请稍后再试。" })
  } finally {
    isLoading.value = false
    // 滚动到底部
    setTimeout(() => {
      const chatContainer = document.querySelector(".overflow-y-auto")
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }, 100)
  }
}

const handleSuggestedQuestion = (question) => {
  input.value = question
}
