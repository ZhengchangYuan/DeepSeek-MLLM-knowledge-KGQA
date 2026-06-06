import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
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
          <div className="ml-auto">
            <Button variant="outline" size="sm">
              登录/注册
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center py-24 text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl rounded-lg bg-white/90 p-8 text-black dark:bg-gray-900/90 dark:text-white">
            <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">探索智能与知识的边界</div>
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
              多模态大语言模型与知识图谱的未来
            </h1>
            <p className="mb-6 max-w-[700px] text-gray-700 dark:text-gray-300">
              双向融合多模态大语言模型和知识图谱的创新技术，帮助您方便地查询多模态知识并获取知识图谱。为深度研究提供支持，提高智能问答系统。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">了解更多</Button>
              <Button variant="outline">
                探索功能 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">智能问答</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                基于多模态大语言模型，提供精准且自然的智能问答服务。
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                  <path d="M6 9v12" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">知识图谱支持</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                构建和利用知识图谱，实现领域知识的结构化表示与查询。
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h.01" />
                  <path d="M17 7h.01" />
                  <path d="M7 17h.01" />
                  <path d="M17 17h.01" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">多模态数据处理</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">支持图像、文本等多种模态数据的融合处理与分析。</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">高效性能</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">优化的算法与架构，确保快速响应与高效处理。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages Section */}
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="多模态大语言模型核心优势"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">技术领先优势</div>
              <h2 className="mb-4 text-3xl font-bold">多模态大语言模型的核心优势</h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                多模态大语言模型结合了先进的语言理解能力与视觉识别能力，新的模型和技术正在不断推动这个领域，为各行业提供智能化解决方案。
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-2 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">创新能力</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">持续研发与技术创新，推动技术进步。</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-2 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">行业应用</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      金融、教育、医疗，全面覆盖多个领域应用场景。
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-2 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">用户体验</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">简洁人性化的设计，提升用户使用体验。</p>
                  </div>
                </div>
              </div>

              <Button className="mt-6 w-fit bg-blue-600 hover:bg-blue-700">了解核心优势</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold">立即探索多模态与知识图谱的结合</h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                加入我们，共同探索多模态大语言模型与知识图谱的无限可能，推动智能领域管技术的发展。
              </p>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-blue-600" />
                  <span>技术前沿</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-blue-600" />
                  <span>行业应用</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-blue-600" />
                  <span>高效学习</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-blue-600" />
                  <span>资源丰富</span>
                </div>
              </div>

              <Link href="/features">
                <Button className="w-fit bg-blue-600 hover:bg-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" x2="3" y1="12" y2="12" />
                  </svg>
                  立即加入
                </Button>
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="多模态与知识图谱的结合"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="w-full bg-gray-50 py-12 dark:bg-gray-900 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">知识图谱基础知识</h2>
            <p className="text-gray-700 dark:text-gray-300">
              知识图谱是语义网络的一种形式，高度结构化的知识为人工智能提供支撑，广泛应用于搜索引擎、智能问答等领域。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <path d="m12 9 4 4" />
                  <path d="m8 13 4-4" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">语义理解</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">利用语义网络表示知识文档，增强数据理解能力。</p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 3v3" />
                  <path d="M18.5 8.5 16 11" />
                  <path d="M8 16H5" />
                  <path d="M16 16h3" />
                  <path d="m8.5 8.5 2.5 2.5" />
                  <path d="M12 16v3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">知识表示</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">通过图谱结构实现复杂知识的结构化表示与关系。</p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">自动推理与决策</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">结合知识图谱实现智能推理和自动化决策支持。</p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">检索能力</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">利用知识图谱提高检索精度，提供精准答案。</p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300 w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">可视化展示</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                通过图形化界面展示知识的结构化表示，便于用户理解。
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-gray-900 py-12 text-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-medium">关于我们</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    团队介绍
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    发展历程
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    联系我们
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">知识图谱与多模态模型</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    技术原理
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white">
                    应用场景
                  </Link>
                </li>
                <li>
                  <Link href="/models" className="hover:text-white">
                    模型库
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">技术资源</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    API文档
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    开发指南
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    示例代码
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">联系我们</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>邮箱：contact@example.com</li>
                <li>电话：+86 123 4567 8910</li>
                <li>地址：北京市海淀区中关村大街1号</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400">© 多模态大语言模型与知识图谱问答系统 2025，保留所有权利</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
