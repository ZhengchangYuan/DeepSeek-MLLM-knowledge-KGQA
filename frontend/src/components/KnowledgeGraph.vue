import { ref, onMounted, onUnmounted } from "vue"
import { Loader2 } from "lucide-vue-next"
import ForceGraph from "force-graph"

const graphContainer = ref(null)
const loading = ref(true)
const selectedNode = ref(null)
const graph = ref(null)

// 节点颜色映射
const nodeColorMap = {
  1: "#ff6b6b", // 模型 - 红色
  2: "#4ecdc4", // 能力 - 青色
  3: "#ffd166", // 应用 - 黄色
  4: "#6a0572", // 组织 - 紫色
  5: "#1a535c", // 技术 - 深绿色
}

onMounted(async () => {
  try {
    // 从后端API获取知识图谱数据
    const response = await fetch("/api/knowledge-graph")
    const graphData = await response.json()

    // 初始化力导向图
    graph.value = ForceGraph()(graphContainer.value)
      .graphData(graphData)
      .nodeId("id")
      .nodeLabel((node) => `${node.name} (${node.type})`)
      .linkLabel((link) => `${link.source.name} ${link.relationship} ${link.target.name}`)
      .nodeColor((node) => nodeColorMap[node.group])
      .linkColor((link) => (link.highlighted ? "#ff9800" : "#cccccc"))
      .linkWidth((link) => (link.highlighted ? 3 : 1))
      .nodeCanvasObject((node, ctx, globalScale) => {
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
      })
      .onNodeClick((node) => {
        selectedNode.value = node

        // 高亮显示与所选节点相关的连接
        const updatedLinks = graphData.links.map((link) => {
          if (link.source.id === node.id || link.target.id === node.id) {
            return { ...link, highlighted: true }
          }
          return { ...link, highlighted: false }
        })

        graph.value.graphData({
          nodes: graphData.nodes,
          links: updatedLinks,
        })

        // 将所选节点居中
        graph.value.centerAt(node.x, node.y, 1000)
        graph.value.zoom(2, 1000)
      })

    loading.value = false
  } catch (error) {
    console.error("Failed to fetch graph data:", error)
    loading.value = false
  }
})

onUnmounted(() => {
  if (graph.value) {
    graph.value._destructor()
  }
})
