import Link from "next/link"
import { KnowledgeGraph } from "@/components/knowledge-graph"
import { ChatInterface } from "@/components/chat-interface"

export default function FeaturesPage() {
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
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              多模态大语言模型知识图谱问答系统
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              基于知识图谱的智能问答系统，帮助您探索多模态大语言模型领域的相关知识
            </p>
          </div>
        </section>
        <section className="container grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">知识图谱可视化</h2>
            <div className="h-[500px] w-full">
              <KnowledgeGraph />
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">智能问答</h2>
            <ChatInterface />
          </div>
        </section>
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
