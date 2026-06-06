import { NextResponse } from "next/server"

// 这个API路由将来会连接到Python后端和Neo4j数据库
// 目前返回模拟数据用于前端展示

export async function GET() {
  // 在实际应用中，这里会调用Python后端API，从Neo4j获取知识图谱数据
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // 默认值
  const response = await fetch(`${apiUrl}/api/knowledge-graph`);

  //   const response = await fetch('http://your-python-backend/api/knowledge-graph')
  return response

  // 模拟数据
  const knowledgeGraphData = {
    nodes: [
      // 模型节点
      { id: "gpt4v", group: 1, name: "GPT-4V", type: "模型" },
      { id: "clip", group: 1, name: "CLIP", type: "模型" },
      { id: "llava", group: 1, name: "LLaVA", type: "模型" },
      { id: "blip", group: 1, name: "BLIP", type: "模型" },
      { id: "flamingo", group: 1, name: "Flamingo", type: "模型" },
      { id: "gemini", group: 1, name: "Gemini", type: "模型" },
      { id: "claude3", group: 1, name: "Claude 3", type: "模型" },

      // 能力节点
      { id: "image_understanding", group: 2, name: "图像理解", type: "能力" },
      { id: "text_generation", group: 2, name: "文本生成", type: "能力" },
      { id: "visual_reasoning", group: 2, name: "视觉推理", type: "能力" },
      { id: "multimodal_fusion", group: 2, name: "多模态融合", type: "能力" },
      { id: "zero_shot_learning", group: 2, name: "零样本学习", type: "能力" },
      { id: "cross_modal_retrieval", group: 2, name: "跨模态检索", type: "能力" },

      // 应用节点
      { id: "image_captioning", group: 3, name: "图像描述", type: "应用" },
      { id: "vqa", group: 3, name: "视觉问答", type: "应用" },
      { id: "document_understanding", group: 3, name: "文档理解", type: "应用" },
      { id: "content_generation", group: 3, name: "内容生成", type: "应用" },
      { id: "medical_diagnosis", group: 3, name: "医疗诊断", type: "应用" },

      // 组织节点
      { id: "openai", group: 4, name: "OpenAI", type: "组织" },
      { id: "google", group: 4, name: "Google", type: "组织" },
      { id: "meta", group: 4, name: "Meta", type: "组织" },
      { id: "anthropic", group: 4, name: "Anthropic", type: "组织" },

      // 技术节点
      { id: "transformer", group: 5, name: "Transformer", type: "技术" },
      { id: "contrastive_learning", group: 5, name: "对比学习", type: "技术" },
      { id: "attention_mechanism", group: 5, name: "注意力机制", type: "技术" },
      { id: "vision_transformer", group: 5, name: "视觉Transformer", type: "技术" },
    ],
    links: [
      // 模型与组织的关系
      { source: "gpt4v", target: "openai", value: 1, relationship: "研发" },
      { source: "clip", target: "openai", value: 1, relationship: "研发" },
      { source: "gemini", target: "google", value: 1, relationship: "研发" },
      { source: "flamingo", target: "meta", value: 1, relationship: "研发" },
      { source: "claude3", target: "anthropic", value: 1, relationship: "研发" },
      { source: "llava", target: "meta", value: 1, relationship: "研发" },

      // 模型与能力的关系
      { source: "gpt4v", target: "image_understanding", value: 1, relationship: "具备" },
      { source: "gpt4v", target: "text_generation", value: 1, relationship: "具备" },
      { source: "gpt4v", target: "visual_reasoning", value: 1, relationship: "具备" },
      { source: "clip", target: "image_understanding", value: 1, relationship: "具备" },
      { source: "clip", target: "zero_shot_learning", value: 1, relationship: "具备" },
      { source: "clip", target: "cross_modal_retrieval", value: 1, relationship: "具备" },
      { source: "llava", target: "image_understanding", value: 1, relationship: "具备" },
      { source: "llava", target: "visual_reasoning", value: 1, relationship: "具备" },
      { source: "blip", target: "image_understanding", value: 1, relationship: "具备" },
      { source: "blip", target: "cross_modal_retrieval", value: 1, relationship: "具备" },
      { source: "flamingo", target: "multimodal_fusion", value: 1, relationship: "具备" },
      { source: "gemini", target: "multimodal_fusion", value: 1, relationship: "具备" },
      { source: "gemini", target: "visual_reasoning", value: 1, relationship: "具备" },
      { source: "claude3", target: "image_understanding", value: 1, relationship: "具备" },
      { source: "claude3", target: "text_generation", value: 1, relationship: "具备" },

      // 能力与应用的关系
      { source: "image_understanding", target: "image_captioning", value: 1, relationship: "支持" },
      { source: "visual_reasoning", target: "vqa", value: 1, relationship: "支持" },
      { source: "multimodal_fusion", target: "document_understanding", value: 1, relationship: "支持" },
      { source: "text_generation", target: "content_generation", value: 1, relationship: "支持" },
      { source: "image_understanding", target: "medical_diagnosis", value: 1, relationship: "支持" },

      // 技术与模型的关系
      { source: "transformer", target: "gpt4v", value: 1, relationship: "应用于" },
      { source: "transformer", target: "llava", value: 1, relationship: "应用于" },
      { source: "transformer", target: "gemini", value: 1, relationship: "应用于" },
      { source: "transformer", target: "claude3", value: 1, relationship: "应用于" },
      { source: "contrastive_learning", target: "clip", value: 1, relationship: "应用于" },
      { source: "attention_mechanism", target: "gpt4v", value: 1, relationship: "应用于" },
      { source: "attention_mechanism", target: "gemini", value: 1, relationship: "应用于" },
      { source: "vision_transformer", target: "clip", value: 1, relationship: "应用于" },
      { source: "vision_transformer", target: "blip", value: 1, relationship: "应用于" },
    ],
  }

  return NextResponse.json(knowledgeGraphData)
}
