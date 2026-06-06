import Link from "next/link"

export default function AboutPage() {
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
        <h1 className="mb-6 text-3xl font-bold">关于多模态大语言模型知识图谱</h1>

        <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">项目介绍</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            本项目是一个基于知识图谱的多模态大语言模型领域问答系统，旨在帮助研究人员、开发者和对多模态人工智能感兴趣的用户快速获取相关知识。系统通过构建多模态大语言模型领域的知识图谱，实现了知识的可视化展示和智能问答功能。
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            知识图谱包含了多模态大语言模型的模型、能力、应用、组织和技术等多个维度的实体及其关系，全面展示了多模态大语言模型领域的知识结构。
          </p>
        </div>

        <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">功能特点</h2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>知识图谱可视化：直观展示多模态大语言模型领域的实体和关系</li>
            <li>智能问答系统：基于知识图谱回答用户关于多模态大语言模型的问题</li>
            <li>交互式探索：用户可以通过点击知识图谱节点，探索不同实体之间的关系</li>
            <li>推荐问题：系统提供常见问题建议，帮助用户快速了解相关知识</li>
          </ul>
        </div>

        <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">技术实现</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">本系统采用以下技术实现：</p>
          <ul className="ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>前端框架：Next.js + React + TypeScript</li>
            <li>UI组件：Tailwind CSS + Shadcn UI</li>
            <li>图谱可视化：React Force Graph</li>
            <li>后端技术：Python</li>
            <li>图数据库：Neo4j</li>
            <li>知识库：结构化知识图谱数据</li>
            <li>问答系统：基于知识图谱的语义匹配算法</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">团队介绍</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            我们的团队由一群对多模态大语言模型和知识图谱充满热情的大学生组成。团队核心成员具有丰富的人工智能、多模态大模型知识储备和开发经验，致力于推动多模态人工智能技术的发展和应用。
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            如果您对我们的项目感兴趣，或者有任何问题和建议，欢迎通过以下方式联系我们：
          </p>
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">邮箱：2135560996@qq.com</p>
            <p className="text-gray-700 dark:text-gray-300">电话：+86 134 1503 4724</p>
            <p className="text-gray-700 dark:text-gray-300">地址：湖南农业大学</p>
          </div>
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
