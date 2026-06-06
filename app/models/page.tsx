import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function ModelsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">多模态大语言模型知识图谱</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              主页
            </Link>
            <Link href="/features" className="transition-colors hover:text-foreground/80">
              功能
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              关于我们
            </Link>
            <Link href="/models" className="transition-colors hover:text-foreground/80">
              模型库
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-10">
        <h1 className="mb-6 text-3xl font-bold">多模态大语言模型库</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <div key={model.id} className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{model.name}</h2>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {model.organization}
                </span>
              </div>
              <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">{model.description}</p>
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium">核心能力</h3>
                <div className="flex flex-wrap gap-2">
                  {model.capabilities.map((capability, index) => (
                    <span key={index} className="rounded-full bg-secondary px-2 py-1 text-xs">
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium">主要应用</h3>
                <div className="flex flex-wrap gap-2">
                  {model.applications.map((application, index) => (
                    <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                      {application}
                    </span>
                  ))}
                </div>
              </div>
              {model.link && (
                <Link
                  href={model.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  了解更多
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2025 多模态大语言模型知识图谱问答系统
          </p>
        </div>
      </footer>
    </div>
  )
}

const models = [
  {
    id: "gpt4v",
    name: "GPT-4V",
    organization: "OpenAI",
    description:
      "GPT-4 with Vision (GPT-4V) 是OpenAI的多模态大语言模型，能够理解和分析图像，并结合文本进行推理和生成。",
    capabilities: ["图像理解", "文本生成", "视觉推理"],
    applications: ["图像描述", "视觉问答", "内容生成"],
    link: "https://openai.com/research/gpt-4v-system-card",
  },
  {
    id: "clip",
    name: "CLIP",
    organization: "OpenAI",
    description:
      "CLIP (Contrastive Language-Image Pretraining) 通过对比学习方法训练，能够将图像和文本映射到同一语义空间。",
    capabilities: ["图像理解", "零样本学习", "跨模态检索"],
    applications: ["图像分类", "图像检索", "零样本识别"],
    link: "https://openai.com/research/clip",
  },
  {
    id: "llava",
    name: "LLaVA",
    organization: "Meta AI",
    description:
      "LLaVA (Large Language and Vision Assistant) 是一个开源的多模态大语言模型，结合了大语言模型和视觉编码器。",
    capabilities: ["图像理解", "视觉推理", "文本生成"],
    applications: ["视觉问答", "图像描述", "多模态对话"],
    link: "https://llava-vl.github.io/",
  },
  {
    id: "gemini",
    name: "Gemini",
    organization: "Google",
    description: "Gemini是Google开发的多模态大语言模型系列，能够同时处理文本、图像、音频和视频等多种模态数据。",
    capabilities: ["多模态融合", "视觉推理", "文本生成"],
    applications: ["多模态对话", "内容理解", "知识问答"],
    link: "https://deepmind.google/technologies/gemini/",
  },
  {
    id: "claude3",
    name: "Claude 3",
    organization: "Anthropic",
    description: "Claude 3是Anthropic开发的多模态大语言模型系列，包括Haiku、Sonnet和Opus三个版本，具备图像理解能力。",
    capabilities: ["图像理解", "文本生成", "推理"],
    applications: ["多模态对话", "内容分析", "文档理解"],
    link: "https://www.anthropic.com/claude",
  },
  {
    id: "blip",
    name: "BLIP",
    organization: "Salesforce",
    description: "BLIP (Bootstrapping Language-Image Pre-training) 是一个用于视觉语言理解和生成的多模态模型。",
    capabilities: ["图像理解", "跨模态检索", "图像描述生成"],
    applications: ["图像描述", "视觉问答", "图像检索"],
    link: "https://github.com/salesforce/BLIP",
  },
  {
    id: "flamingo",
    name: "Flamingo",
    organization: "Meta AI",
    description: "Flamingo是一个能够处理交错的视觉和语言输入的多模态大语言模型，专注于少样本学习能力。",
    capabilities: ["多模态融合", "少样本学习", "视觉理解"],
    applications: ["视觉问答", "图像描述", "多模态推理"],
    link: "https://www.deepmind.com/blog/tackling-multiple-tasks-with-a-single-visual-language-model",
  },
  {
    id: "cogvlm",
    name: "CogVLM",
    organization: "清华大学",
    description: "CogVLM是一个开源的视觉语言模型，专注于认知和推理能力，支持中英双语。",
    capabilities: ["图像理解", "视觉推理", "双语支持"],
    applications: ["视觉问答", "图像描述", "视觉推理"],
    link: "https://github.com/THUDM/CogVLM",
  },
  {
    id: "qwen-vl",
    name: "Qwen-VL",
    organization: "阿里巴巴",
    description: "Qwen-VL（通义千问-VL）是阿里巴巴开发的多模态大模型，支持中英双语的图文理解和生成。",
    capabilities: ["图像理解", "文本生成", "双语支持"],
    applications: ["视觉问答", "图像描述", "多模态对话"],
    link: "https://github.com/QwenLM/Qwen-VL",
  },
]
