/**
 * 这个文件提供了与Python后端集成的工具函数
 * 在实际应用中，您需要根据Python API的具体实现来修改这些函数
 */

// 调用Python后端API获取知识图谱数据
export async function fetchKnowledgeGraph() {
  try {
    // 这里应该是您的Python后端API地址
    const response = await fetch("http://localhost:5000/api/knowledge-graph")

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching knowledge graph data:", error)
    // 返回一个空的知识图谱结构
    return { nodes: [], links: [] }
  }
}

// 调用Python后端API进行问答
export async function askQuestion(question: string) {
  try {
    // 这里应该是您的Python后端API地址
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.answer
  } catch (error) {
    console.error("Error asking question:", error)
    return "抱歉，服务器出现了问题，请稍后再试。"
  }
}

// 调用Python后端API搜索知识图谱
export async function searchKnowledgeGraph(query: string) {
  try {
    // 这里应该是您的Python后端API地址
    const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error searching knowledge graph:", error)
    return []
  }
}

// Neo4j数据库集成示例
// 这个函数展示了如何在前端调用Python后端，后端再与Neo4j交互
export async function queryNeo4j(cypher: string) {
  try {
    // 这里应该是您的Python后端API地址
    const response = await fetch("http://localhost:5000/api/neo4j/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: cypher }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error querying Neo4j:", error)
    return []
  }
}
