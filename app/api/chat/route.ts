import { NextResponse } from "next/server"

// 这个API路由将来会连接到Python后端
// 目前返回模拟数据用于前端展示

export async function POST(request: Request) {
  const { question } = await request.json()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // 默认值

  // 在实际应用中，这里会调用Python后端API
  const response = await fetch(`${apiUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  })
  return response

//   // 简单的问答匹配逻辑
//   const answer = findAnswer(question)
//   return NextResponse.json({ answer })
}

// 知识库问答系统的示例回答
const knowledgeBase = {
  什么是多模态大语言模型:
    "多模态大语言模型是能够处理和理解多种数据类型（如文本、图像、音频等）的人工智能模型。它们能够跨模态理解内容，并生成相应的输出。代表模型包括GPT-4V、Gemini、Claude 3等。",

  "gpt-4v":
    "GPT-4V（GPT-4 Vision）是OpenAI开发的多模态大语言模型，能够理解和分析图像内容，并结合文本进行推理和生成。它具备图像理解、视觉推理和文本生成等能力。",

  clip模型:
    "CLIP（Contrastive Language-Image Pretraining）是OpenAI开发的多模态模型，通过对比学习方法训练，能够将图像和文本映射到同一语义空间。CLIP具备零样本学习和跨模态检索能力，广泛应用于图像分类、检索等任务。",

  多模态大语言模型的应用:
    "多模态大语言模型的应用非常广泛，包括但不限于：图像描述生成、视觉问答、文档理解与分析、多模态内容生成、医疗影像诊断辅助、跨模态检索等领域。",

  多模态大语言模型的能力:
    "多模态大语言模型通常具备以下核心能力：图像理解、文本生成、视觉推理、多模态融合、零样本学习、跨模态检索等。不同模型在各方面能力上有所侧重。",

  多模态大语言模型的技术原理:
    "多模态大语言模型通常基于Transformer架构，结合注意力机制、视觉Transformer等技术。它们通过预训练和微调，学习不同模态数据之间的关系，实现跨模态理解和生成能力。关键技术包括对比学习、多模态融合等。",
}

// 简单的问答匹配函数
function findAnswer(question: string) {
  // 转换为小写并移除标点符号以进行更宽松的匹配
  const normalizedQuestion = question.toLowerCase().replace(/[.,?!;:]/g, "")

  // 尝试直接匹配
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (normalizedQuestion.includes(key.toLowerCase())) {
      return value
    }
  }

  // 关键词匹配
  const keywords = [
    { words: ["gpt", "4", "vision", "gpt4"], key: "gpt-4v" },
    { words: ["clip"], key: "clip模型" },
    { words: ["应用", "用途", "场景"], key: "多模态大语言模型的应用" },
    { words: ["能力", "功能"], key: "多模态大语言模型的能力" },
    { words: ["原理", "技术", "架构", "工作方式"], key: "多模态大语言模型的技术原理" },
    { words: ["什么是", "定义"], key: "什么是多模态大语言模型" },
  ]

  for (const { words, key } of keywords) {
    if (words.some((word) => normalizedQuestion.includes(word))) {
      return knowledgeBase[key]
    }
  }

  // 默认回答
  return "抱歉，我目前没有关于这个问题的具体信息。您可以尝试询问关于多模态大语言模型的定义、能力、应用、技术原理，或者具体模型如GPT-4V、CLIP等。"
}
