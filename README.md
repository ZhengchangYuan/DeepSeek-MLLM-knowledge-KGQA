<div align="center">

# 🧠 MLLM-KGQA

## 基于 DeepSeek + Neo4j 的多模态大语言模型知识图谱智能问答系统

*Knowledge Graph Question Answering System for MLLM Domain Powered by DeepSeek & Neo4j*

[![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_|_Flask_|_Neo4j_|_DeepSeek-black?style=flat-square)](#-技术栈)
[![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.x-008CC1?style=flat-square&logo=neo4j)](https://neo4j.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 项目简介 / Overview

**MLLM-KGQA** 是一个面向**多模态大语言模型（MLLM）领域**的知识图谱智能问答系统。项目通过半人工整理 MLLM 领域前沿文献，提取关键知识（模型架构、核心技术、研发团队、发布时间等），构建基于 **Neo4j** 的知识图谱，并结合 **DeepSeek** 大模型实现智能问答，通过知识图谱为 LLM 提供结构化客观知识，**有效减少模型幻觉**。

> *An intelligent Q&A system for the Multimodal Large Language Model (MLLM) domain. It constructs a knowledge graph from MLLM research literature using Neo4j, and leverages DeepSeek LLM for natural language querying — grounding LLM responses in structured knowledge to reduce hallucination.*

### 🎯 核心亮点 / Highlights

- **RAG 落地实践** — 知识图谱增强检索生成（KG-RAG），用结构化知识约束 LLM 输出
- **全栈架构** — Next.js 14 + Flask + Neo4j，前后端分离，RESTful API 设计
- **双前端实现** — 同时拥有 Next.js (React) 和 Vue 3 两套前端，展示多框架能力
- **AI 知识抽取管线** — 集成 kg-gen（基于 DSPy + LiteLLM），从非结构化文本自动构建知识图谱
- **力导向图可视化** — 基于 D3/Force Graph 的交互式知识图谱展示

---

## 🏗️ 系统架构 / Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      用户浏览器 (Browser)                     │
├──────────────────────────┬──────────────────────────────────┤
│   Next.js 14 (App Router) │     Vue 3 SPA (Vite)            │
│   React 18 + TypeScript   │     Vue Router + Tailwind       │
│   shadcn/ui 组件库        │     force-graph 可视化          │
├──────────────────────────┴──────────────────────────────────┤
│                    HTTP REST API (/api/*)                    │
├─────────────────────────────────────────────────────────────┤
│              Flask Backend (Python, Port 5000)               │
│  ┌──────────┬──────────┬───────────┬────────────────────┐   │
│  │ 问答引擎  │ 图谱查询  │ 搜索服务  │ Cypher 直通查询     │   │
│  │ /api/chat│ /api/kg  │ /api/search│ /api/neo4j/query  │   │
│  └──────────┴──────────┴───────────┴────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    Neo4j 图数据库 (Bolt:7687)                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  5 类实体 · 26+ 节点 · 33+ 关系                        │  │
│  │  模型(MLLM) · 能力 · 应用 · 组织 · 技术                 │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│               AI 知识抽取管线 (离线/数据管道)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  PDF 论文 → kg-gen (DSPy + LLM) → 实体/关系抽取       │  │
│  │  → 聚类去重 → Graph 对象 → Neo4j 入库                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ 技术栈 / Tech Stack

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端框架** | Next.js 14, Vue 3 | 双前端实现，App Router + SPA |
| **前端语言** | TypeScript, JavaScript | 类型安全 + 现代 ES6+ |
| **UI 库** | shadcn/ui (Radix), Tailwind CSS | 50+ 可复用组件，暗色模式 |
| **可视化** | react-force-graph-2d, force-graph (D3) | 力导向知识图谱 |
| **后端框架** | Flask (Python) | RESTful API 设计 |
| **图数据库** | Neo4j 5.x | Cypher 查询语言，原生图存储 |
| **LLM** | DeepSeek (OpenAI 兼容 API) | 智能问答 + 知识抽取 |
| **AI 管线** | DSPy + LiteLLM | 结构化知识图谱生成 |
| **文档解析** | pdfplumber | PDF 论文文本/表格提取 |
| **构建工具** | Vite, Turbopack | 现代化构建工具链 |

---

## 🚀 快速开始 / Quick Start

### 环境要求 / Prerequisites

- **Python** ≥ 3.10
- **Node.js** ≥ 18
- **Neo4j** ≥ 5.x ([下载](https://neo4j.com/download/))
- **DeepSeek API Key** ([获取](https://platform.deepseek.com/))

### 1. 克隆项目

```bash
git clone https://github.com/ZhengchangYuan/DeepSeek-MLLM-knowledge-KGQA.git
cd DeepSeek-MLLM-knowledge-KGQA
```

### 2. 启动 Neo4j

确保 Neo4j 已安装并运行在 `bolt://localhost:7687`，默认用户名 `neo4j`。

```bash
# 或使用 Docker
docker run -d --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/123456 \
  neo4j:5
```

### 3. 后端配置 & 启动

```bash
cd backend

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量 (复制 .env.local 为 .env 并填入你的配置)
cp ../.env.local .env

# 初始化知识图谱数据到 Neo4j (可选，服务启动时也会自动初始化)
python init_neo4j.py

# 启动 Flask 后端 (默认 Port 5000)
python app2.py
```

### 4. 前端启动

**Next.js 前端 (推荐):**

```bash
# 在项目根目录
npm install
npm run dev
# 访问 http://localhost:3000
```

**Vue 3 前端:**

```bash
cd frontend
npm install
npm run dev
# 访问 http://localhost:5173
```

### 5. 配置环境变量

在项目根目录创建 `.env.local`:

```env
# Neo4j 数据库连接
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=123456

# DeepSeek API
DEEPSEEK_API_KEY=your_api_key_here

# 后端 API 地址 (Next.js 代理用)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## ✨ 功能特性 / Features

### 1. 🤖 智能问答 (Intelligent Q&A)

- 支持自然语言中文提问，基于知识库 + Neo4j 的混合查询策略
- **直接匹配** — 预置 MLLM 领域知识库的快速问答
- **属性查询** — 正则解析 "XX的发布时间/作者/期刊" 等属性问题，自动生成 Cypher
- **关系查询** — "XX的开发团队/关键技术/相关论文" 等关系遍历查询
- **链路追踪** — 多跳路径查询，还原技术发展脉络

```
用户: "GPT-4V 的开发团队是谁？"
系统: 查询 Neo4j → (GPT-4V)-[:DEVELOPED_BY]->(OpenAI) → "OpenAI"

用户: "CLIP 模型有哪些核心能力？"
系统: 查询 Neo4j → (CLIP)-[:HAS_CAPABILITY]->... → "图像理解、零样本学习、跨模态检索"
```

### 2. 🗺️ 知识图谱可视化 (Knowledge Graph Visualization)

- **力导向布局** — 基于 D3 的交互式知识图谱，支持拖拽、缩放、悬停高亮
- **5 色分类** — 模型(红) · 能力(青) · 应用(黄) · 组织(紫) · 技术(绿)
- **节点点击聚焦** — 点击节点高亮关联关系并居中放大
- **信息面板** — 侧边栏展示选中节点的详细信息
- **图例提示** — 右上角图例，一目了然

### 3. 📚 模型库 (Model Library)

收录 9 个主流多模态大模型的详细信息卡片：
GPT-4V · CLIP · LLaVA · Gemini · Claude 3 · BLIP · Flamingo · CogVLM · Qwen-VL

每张卡片展示：开发组织、核心能力、应用场景、外部链接

### 4. 🔍 知识搜索 (Knowledge Search)

- 基于 Neo4j `CONTAINS` 的模糊搜索
- 支持按节点名称/类型检索
- Cypher 直通查询接口（高级用户）

### 5. 🧪 AI 知识图谱自动生成 (kg-gen)

离线数据管道，基于开源项目 [stair-lab/kg-gen](https://github.com/stair-lab/kg-gen)（arXiv 2502.09956）：

```
原始文本/PDF → 分块 (NLTK) → DSPy + LLM 实体抽取
                                    ↓
Neo4j 入库 ← 聚类去重 ← 关系三元组抽取 ← 实体列表
```

支持 OpenAI、DeepSeek、Ollama 等多种模型后端。

---

## 📁 项目结构 / Project Structure

```
DeepSeek-MLLM-knowledge-KGQA/
├── app/                          # Next.js 14 App Router
│   ├── api/
│   │   ├── chat/route.ts         # 聊天 API (代理到 Flask)
│   │   └── knowledge-graph/route.ts  # 知识图谱 API
│   ├── features/page.tsx         # 核心功能页 (图谱 + 问答)
│   ├── models/page.tsx           # 模型库页
│   ├── about/page.tsx            # 关于页
│   ├── layout.tsx                # 根布局 (暗色模式)
│   └── page.tsx                  # 首页 (Landing Page)
├── components/                   # React 组件
│   ├── chat-interface.tsx        # 聊天界面 (问答交互)
│   ├── knowledge-graph.tsx       # 知识图谱可视化
│   ├── theme-provider.tsx        # 主题切换
│   └── ui/                       # shadcn/ui 组件库 (50+ 组件)
├── backend/                      # Python Flask 后端
│   ├── app.py                    # Flask 应用 (v1)
│   ├── app2.py                   # Flask 应用 (v2, 增强查询)
│   ├── init_neo4j.py             # Neo4j 数据初始化脚本
│   ├── KG_Agent.py               # Agent 规划 (DeepSeek 集成)
│   ├── util.py                   # PDF 解析工具
│   ├── Prompt/prompt.py          # LLM Prompt 模板
│   └── requirements.txt          # Python 依赖
├── frontend/                     # Vue 3 前端 (备选实现)
│   └── src/
│       ├── views/                # 4 个页面 (Home/Features/About/Models)
│       ├── components/           # 图谱 + 聊天 + 布局组件
│       └── router/index.js       # Vue Router 路由配置
├── kg-gen/                       # AI 知识图谱生成库 (本地, 不追踪)
├── lib/                          # 工具库
│   ├── python-integration.ts     # Flask API 调用封装
│   └── utils.ts                  # Tailwind 类名合并 (cn)
├── hooks/                        # React Hooks
├── styles/                       # 全局样式
├── public/                       # 静态资源
├── package.json                  # Node.js 依赖
├── tailwind.config.ts            # Tailwind 配置
├── tsconfig.json                 # TypeScript 配置
└── next.config.mjs               # Next.js 配置
```

---

## 🔄 数据流 / Data Flow

### 在线问答流程

```
1. 用户输入问题
       ↓
2. ChatInterface 组件 POST /api/chat
       ↓
3. Next.js API Route 转发到 Flask
       ↓
4. find_answer() 混合策略:
   ├── 关键词直接匹配 (knowledge_base)
   ├── 正则解析 → 属性查询 (Neo4j)
   ├── 正则解析 → 关系查询 (Neo4j)
   └── 特殊命令 (最新模型/关键技术)
       ↓
5. Flask 返回 JSON { answer: "..." }
       ↓
6. 前端渲染回答到聊天界面
```

### 知识图谱生成流程（离线）

```
学术论文 PDF
    ↓ pdfplumber 解析
结构化文本 (标题+正文+表格)
    ↓ KGGen.generate()
DSPy + LLM 实体抽取 → {entities: set}
    ↓
DSPy + LLM 关系抽取 → {relations: (s,p,o)[]}
    ↓
聚类去重 (cluster_graph)
    ↓
Graph 对象 → Cypher 语句 → Neo4j 入库
```

---

## 🧪 示例问答 / Example Queries

| 用户问题 | 查询类型 | 回答来源 |
|----------|----------|----------|
| "什么是多模态大语言模型？" | 关键词匹配 | 知识库 |
| "GPT-4V 有哪些核心能力？" | 关系查询 | Neo4j |
| "CLIP 的开发团队是哪个？" | 关系查询 | Neo4j |
| "VisionLLM 的发表期刊是什么？" | 属性查询 | Neo4j |
| "最新模型有哪些？" | 特殊查询 | Neo4j (时间排序) |
| "关键技术有哪些？" | 特殊查询 | Neo4j (去重列表) |

---

## 🎓 关键技术点 / Key Techniques

1. **KG-RAG (Knowledge Graph Retrieval-Augmented Generation)** — 用知识图谱为 LLM 提供结构化上下文，减少幻觉
2. **混合查询策略** — 知识库关键词匹配 + Neo4j Cypher 属性/关系查询，无需 LLM 即可准确回答事实性问题
3. **Cypher 自动生成** — 正则 + 模板将中文自然语言问题转换为图数据库查询语句
4. **LLM 结构化抽取** — 利用 DSPy 的 `Predict` 签名从非结构化文本中可靠抽取实体-关系三元组
5. **图聚类去重** — 迭代式 LLM 聚类合并同义实体，保证知识图谱质量

---

## 📝 TODO / 待完善

- [ ] 接入 DeepSeek API 实现真正的 LLM 驱动问答（替代关键词匹配）
- [ ] 完善 Cypher 自动生成（NL2Cypher），覆盖更复杂的自然语言查询
- [ ] 知识图谱数据扩充（更多 MLLM 论文和模型）
- [ ] 前端移动端适配优化
- [ ] 单元测试与集成测试
- [ ] Docker Compose 一键部署

---

## 👤 作者 / Author

**袁正昌 (Zhengchang Yuan)**

- GitHub: [@ZhengchangYuan](https://github.com/ZhengchangYuan)
- 学校: 湖南农业大学 (Hunan Agricultural University)

---

## 📄 License

MIT License — 详见 [LICENSE](LICENSE) 文件

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

</div>
