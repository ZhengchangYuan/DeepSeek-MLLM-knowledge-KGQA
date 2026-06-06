"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import ForceGraph to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
})

// 节点颜色映射
const nodeColorMap = {
  1: "#ff6b6b", // 模型 - 红色
  2: "#4ecdc4", // 能力 - 青色
  3: "#ffd166", // 应用 - 黄色
  4: "#6a0572", // 组织 - 紫色
  5: "#1a535c", // 技术 - 深绿色
}

export function KnowledgeGraph() {
  const graphRef = useRef(null)
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [selectedNode, setSelectedNode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    async function fetchGraphData() {
      try {
        // 在实际应用中，这里会从API获取数据
        // 目前使用模拟数据
        const response = await fetch("/api/knowledge-graph")
        const data = await response.json()
        setGraphData(data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch graph data:", error)
        setLoading(false)
      }
    }

    fetchGraphData()
  }, [])

  const handleNodeClick = (node) => {
    setSelectedNode(node)

    // 高亮显示与所选节点相关的连接
    const updatedLinks = graphData.links.map((link) => {
      if (link.source.id === node.id || link.target.id === node.id) {
        return { ...link, highlighted: true }
      }
      return { ...link, highlighted: false }
    })

    setGraphData({
      nodes: graphData.nodes,
      links: updatedLinks,
    })

    // 如果有图形引用，将所选节点居中
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000)
      graphRef.current.zoom(2, 1000)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2">加载知识图谱中...</span>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel={(node) => `${node.name} (${node.type})`}
        linkLabel={(link) => `${link.source.name} ${link.relationship} ${link.target.name}`}
        nodeColor={(node) => nodeColorMap[node.group]}
        linkColor={(link) => (link.highlighted ? "#ff9800" : "#cccccc")}
        linkWidth={(link) => (link.highlighted ? 3 : 1)}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name
          const fontSize = 12 / globalScale
          ctx.font = `${fontSize}px Sans-Serif`
          const textWidth = ctx.measureText(label).width
          const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2)

          ctx.fillStyle = nodeColorMap[node.group]
          ctx.beginPath()
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI)
          ctx.fill()

          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2 - 10,
            bckgDimensions[0],
            bckgDimensions[1],
          )

          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillStyle = "#000000"
          ctx.fillText(label, node.x, node.y - 10)
        }}
        onNodeClick={handleNodeClick}
        width={windowSize.width > 1024 ? windowSize.width / 2 - 100 : windowSize.width - 100}
        height={500}
      />

      {selectedNode && (
        <div className="absolute bottom-4 left-4 max-w-xs rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-bold">{selectedNode.name}</h3>
          <p className="mb-1 text-sm">
            <span className="font-semibold">类型:</span> {selectedNode.type}
          </p>
          <p className="text-sm text-muted-foreground">点击节点查看详细信息和关系</p>
        </div>
      )}

      <div className="absolute right-4 top-4 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
        <div className="flex flex-col space-y-2 text-xs">
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: nodeColorMap[1] }}></span>
            <span>模型</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: nodeColorMap[2] }}></span>
            <span>能力</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: nodeColorMap[3] }}></span>
            <span>应用</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: nodeColorMap[4] }}></span>
            <span>组织</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: nodeColorMap[5] }}></span>
            <span>技术</span>
          </div>
        </div>
      </div>
    </div>
  )
}
