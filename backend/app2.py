from flask import Flask, jsonify, request
from flask_cors import CORS
from neo4j import GraphDatabase
import os
from dotenv import load_dotenv
import re
# 加载环境变量
load_dotenv()

app = Flask(__name__)
CORS(app)  # 启用CORS

# Neo4j数据库连接
NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password")

# 创建Neo4j驱动
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# 知识库问答系统的示例回答
knowledge_base = {
    "什么是多模态大语言模型":
        "多模态大语言模型是能够处理和理解多种数据类型（如文本、图像、音频等）的人工智能模型。它们能够跨模态理解内容，并生成相应的输出。代表模型包括GPT-4V、Gemini、Claude 3等。",

    "gpt-4v":
        "GPT-4V（GPT-4 Vision）是OpenAI开发的多模态大语言模型，能够理解和分析图像内容，并结合文本进行推理和生成。它具备图像理解、视觉推理和文本生成等能力。",

    "clip模型":
        "CLIP（Contrastive Language-Image Pretraining）是OpenAI开发的多模态模型，通过对比学习方法训练，能够将图像和文本映射到同一语义空间。CLIP具备零样本学习和跨模态检索能力，广泛应用于图像分类、检索等任务。",

    "多模态大语言模型有哪些应用场景":
        "多模态大语言模型的应用非常广泛，包括但不限于：图像描述生成、视觉问答、文档理解与分析、多模态内容生成、医疗影像诊断辅助、跨模态检索等领域。",

    "多模态大语言模型的能力":
        "多模态大语言模型通常具备以下核心能力：图像理解、文本生成、视觉推理、多模态融合、零样本学习、跨模态检索等。不同模型在各方面能力上有所侧重。",

    "多模态大语言模型的技术原理":
        "多模态大语言模型通常基于Transformer架构，结合注意力机制、视觉Transformer等技术。它们通过预训练和微调，学习不同模态数据之间的关系，实现跨模态理解和生成能力。关键技术包括对比学习、多模态融合等。",
}
#     "PINK论文的标题是什么？"
#     "GLaMM的关键技术有哪些？"

# "ContextDET的发布时间是什么时候？"
#
# "DetGPT的作者有哪些？"
#
# "VisionLLM的发表期刊是什么？"



# 属性查询：
#     "ContextDET的发布时间是什么时候？"
#     "DetGPT的作者有哪些？"
#     "VisionLLM的发表期刊是什么？"



# 简单的问答匹配函数
def find_answer(question):
    # 转换为小写并移除标点符号以进行更宽松的匹配
    normalized_question = question.lower().replace(".", "").replace(",", "").replace("?", "").replace("!", "").replace(
        ";", "").replace(":", "")

    # 尝试直接匹配
    for key, value in knowledge_base.items():
        if key.lower() in normalized_question:
            return value

    # 属性查询模式
    attr_queries = {
        "发布时间": ("paper_time", "MLLM"),
        "发表时间": ("paper_time", "MLLM"),
        "作者": ("scholar", "MLLM"),
        "期刊": ("paper_journal", "MLLM"),
        "发表期刊": ("paper_journal", "MLLM"),
        "论文标题": ("title", "Paper"),
        "标题": ("title", "Paper"),
        "题目": ("title", "Paper"),
        # "技术": ("name", "KeyTechnology")
    }

    # 关系查询模式
    rel_queries = {

        "开发团队": ("DEVELOPED_BY", "Team"),
        "团队": ("DEVELOPED_BY", "Team"),
        "技术": ("USES_TECHNOLOGY", "KeyTechnology"),
        "相关论文": ("RELATED_PAPER", "Paper"),
        "发表会议": ("PUBLISHED_IN", "Conference"),
        "发表在哪个会议":("PUBLISHED_IN", "Conference")
    }

    # 属性查询识别
    for key, (prop, label) in attr_queries.items():
        if key in question:
            match = re.search(f"(.*?)的{key}", question)
            if match:
                entity = match.group(1)
                return query_attributes(entity, prop, label)
    print("Here1")
    # 关系查询识别
    for key, (rel_type, target_label) in rel_queries.items():
        if key in question:
            match = re.search(f"(.*?)的{key}", question)
            if match:
                entity = match.group(1)
                return query_relationships(entity, rel_type, target_label)
    print("Here2")
    return "暂时没有相关信息"


# 属性查询函数
def query_attributes(entity, prop, label):
    query = f"""
    MATCH (n:{label} {{name: $name}})
    RETURN n.{prop} AS value
    """
    with driver.session() as session:
        result = session.run(query, name=entity)
        record = result.single()
        return record["value"] if record else "未找到相关信息"


# 关系查询函数
def query_relationships(entity, rel_type, target_label):
    query = f"""
    MATCH (s:MLLM {{name: $name}})-[:{rel_type}]->(t:{target_label})
    RETURN t.name AS name
    """
    with driver.session() as session:
        result = session.run(query, name=entity)
        records = [record["name"] for record in result]
        return "、".join(records) if records else "未找到相关关系"


@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.json
    question = data.get('question', '')

    # 处理特殊查询
    if "最新模型" in question:
        return jsonify(query_recent_models())
    elif "关键技术" in question:
        return jsonify(query_key_technologies())

    # 常规查询
    answer = find_answer(question)
    return jsonify({"answer": answer})


def query_recent_models(limit=5):
    query = """
    MATCH (n:MLLM)
    RETURN n.name AS name, n.paper_time AS time
    ORDER BY datetime(n.paper_time) DESC
    LIMIT $limit
    """
    with driver.session() as session:
        result = session.run(query, limit=limit)
        return [dict(record) for record in result]


def query_key_technologies():
    query = """
    MATCH (n:KeyTechnology)
    RETURN DISTINCT n.name AS technology
    LIMIT 20
    """
    with driver.session() as session:
        result = session.run(query)
        return [record["technology"] for record in result]




def query_development_chain(model_name):
    query = """
    MATCH path=(m:MLLM {name: $name})-[:DEVELOPED_BY|USES_TECHNOLOGY|RELATED_PAPER*..3]->(t)
    RETURN [node IN nodes(path) | node.name] AS path
    """
    with driver.session() as session:
        result = session.run(query, name=model_name)
        return [record["path"] for record in result]

#======================================================================




# 路由：获取知识图谱数据
@app.route('/api/knowledge-graph', methods=['GET'])
def get_knowledge_graph():
    return jsonify(get_mock_knowledge_graph())


    try:
        # 从Neo4j数据库获取知识图谱数据
        with driver.session() as session:
            # 检查数据库中是否已有数据
            count_query = "MATCH (n) RETURN count(n) as count"
            count_result = session.run(count_query).single()

            # 如果数据库为空，则初始化数据
            if count_result and count_result["count"] == 0:
                initialize_knowledge_graph(session)

            # 获取所有节点
            nodes_query = """
            MATCH (n)
            RETURN n.id AS id, n.name AS name, n.type AS type, n.group AS group
            """
            nodes_result = session.run(nodes_query)
            nodes = [dict(record) for record in nodes_result]

            # 获取所有关系
            links_query = """
            MATCH (s)-[r]->(t)
            RETURN s.id AS source, t.id AS target, type(r) AS relationship, 1 AS value
            """
            links_result = session.run(links_query)
            links = [dict(record) for record in links_result]

            return jsonify({"nodes": nodes, "links": links})
    except Exception as e:
        # 如果Neo4j连接失败，返回模拟数据
        print(f"Error connecting to Neo4j: {e}")
        return jsonify(get_mock_knowledge_graph())


# 初始化知识图谱数据
def initialize_knowledge_graph(session):
    # 清空数据库
    session.run("MATCH (n) DETACH DELETE n")

    # 创建模型节点
    models = [
        {"id": "gpt4v", "name": "GPT-4V", "type": "模型", "group": 1},
        {"id": "clip", "name": "CLIP", "type": "模型", "group": 1},
        {"id": "llava", "name": "LLaVA", "type": "模型", "group": 1},
        {"id": "blip", "name": "BLIP", "type": "模型", "group": 1},
        {"id": "flamingo", "name": "Flamingo", "type": "模型", "group": 1},
        {"id": "gemini", "name": "Gemini", "type": "模型", "group": 1},
        {"id": "claude3", "name": "Claude 3", "type": "模型", "group": 1},
    ]

    # 创建能力节点
    capabilities = [
        {"id": "image_understanding", "name": "图像理解", "type": "能力", "group": 2},
        {"id": "text_generation", "name": "文本生成", "type": "能力", "group": 2},
        {"id": "visual_reasoning", "name": "视觉推理", "type": "能力", "group": 2},
        {"id": "multimodal_fusion", "name": "多模态融合", "type": "能力", "group": 2},
        {"id": "zero_shot_learning", "name": "零样本学习", "type": "能力", "group": 2},
        {"id": "cross_modal_retrieval", "name": "跨模态检索", "type": "能力", "group": 2},
    ]

    # 创建应用节点
    applications = [
        {"id": "image_captioning", "name": "图像描述", "type": "应用", "group": 3},
        {"id": "vqa", "name": "视觉问答", "type": "应用", "group": 3},
        {"id": "document_understanding", "name": "文档理解", "type": "应用", "group": 3},
        {"id": "content_generation", "name": "内容生成", "type": "应用", "group": 3},
        {"id": "medical_diagnosis", "name": "医疗诊断", "type": "应用", "group": 3},
    ]

    # 创建组织节点
    organizations = [
        {"id": "openai", "name": "OpenAI", "type": "组织", "group": 4},
        {"id": "google", "name": "Google", "type": "组织", "group": 4},
        {"id": "meta", "name": "Meta", "type": "组织", "group": 4},
        {"id": "anthropic", "name": "Anthropic", "type": "组织", "group": 4},
    ]

    # 创建技术节点
    technologies = [
        {"id": "transformer", "name": "Transformer", "type": "技术", "group": 5},
        {"id": "contrastive_learning", "name": "对比学习", "type": "技术", "group": 5},
        {"id": "attention_mechanism", "name": "注意力机制", "type": "技术", "group": 5},
        {"id": "vision_transformer", "name": "视觉Transformer", "type": "技术", "group": 5},
    ]

    # 创建所有节点
    for node in models + capabilities + applications + organizations + technologies:
        query = """
        CREATE (n:Node {id: $id, name: $name, type: $type, group: $group})
        """
        session.run(query, node)

    # 创建关系
    relationships = [
        # 模型与组织的关系
        {"source": "gpt4v", "target": "openai", "relationship": "DEVELOPED_BY"},
        {"source": "clip", "target": "openai", "relationship": "DEVELOPED_BY"},
        {"source": "gemini", "target": "google", "relationship": "DEVELOPED_BY"},
        {"source": "flamingo", "target": "meta", "relationship": "DEVELOPED_BY"},
        {"source": "claude3", "target": "anthropic", "relationship": "DEVELOPED_BY"},
        {"source": "llava", "target": "meta", "relationship": "DEVELOPED_BY"},

        # 模型与能力的关系
        {"source": "gpt4v", "target": "image_understanding", "relationship": "HAS_CAPABILITY"},
        {"source": "gpt4v", "target": "text_generation", "relationship": "HAS_CAPABILITY"},
        {"source": "gpt4v", "target": "visual_reasoning", "relationship": "HAS_CAPABILITY"},
        {"source": "clip", "target": "image_understanding", "relationship": "HAS_CAPABILITY"},
        {"source": "clip", "target": "zero_shot_learning", "relationship": "HAS_CAPABILITY"},
        {"source": "clip", "target": "cross_modal_retrieval", "relationship": "HAS_CAPABILITY"},
        {"source": "llava", "target": "image_understanding", "relationship": "HAS_CAPABILITY"},
        {"source": "llava", "target": "visual_reasoning", "relationship": "HAS_CAPABILITY"},
        {"source": "blip", "target": "image_understanding", "relationship": "HAS_CAPABILITY"},
        {"source": "blip", "target": "cross_modal_retrieval", "relationship": "HAS_CAPABILITY"},
        {"source": "flamingo", "target": "multimodal_fusion", "relationship": "HAS_CAPABILITY"},
        {"source": "gemini", "target": "multimodal_fusion", "relationship": "HAS_CAPABILITY"},
        {"source": "gemini", "target": "visual_reasoning", "relationship": "HAS_CAPABILITY"},
        {"source": "claude3", "target": "image_understanding", "relationship": "HAS_CAPABILITY"},
        {"source": "claude3", "target": "text_generation", "relationship": "HAS_CAPABILITY"},

        # 能力与应用的关系
        {"source": "image_understanding", "target": "image_captioning", "relationship": "ENABLES"},
        {"source": "visual_reasoning", "target": "vqa", "relationship": "ENABLES"},
        {"source": "multimodal_fusion", "target": "document_understanding", "relationship": "ENABLES"},
        {"source": "text_generation", "target": "content_generation", "relationship": "ENABLES"},
        {"source": "image_understanding", "target": "medical_diagnosis", "relationship": "ENABLES"},

        # 技术与模型的关系
        {"source": "transformer", "target": "gpt4v", "relationship": "USED_IN"},
        {"source": "transformer", "target": "llava", "relationship": "USED_IN"},
        {"source": "transformer", "target": "gemini", "relationship": "USED_IN"},
        {"source": "transformer", "target": "claude3", "relationship": "USED_IN"},
        {"source": "contrastive_learning", "target": "clip", "relationship": "USED_IN"},
        {"source": "attention_mechanism", "target": "gpt4v", "relationship": "USED_IN"},
        {"source": "attention_mechanism", "target": "gemini", "relationship": "USED_IN"},
        {"source": "vision_transformer", "target": "clip", "relationship": "USED_IN"},
        {"source": "vision_transformer", "target": "blip", "relationship": "USED_IN"},
    ]

    for rel in relationships:
        query = """
        MATCH (s:Node {id: $source}), (t:Node {id: $target})
        CREATE (s)-[r:%s]->(t)
        """ % rel["relationship"]
        session.run(query, source=rel["source"], target=rel["target"])


# 模拟知识图谱数据（当Neo4j连接失败时使用）
def get_mock_knowledge_graph():
    return {
        "nodes": [
            # 模型节点
            {"id": "gpt4v", "group": 1, "name": "GPT-4V", "type": "模型"},
            {"id": "clip", "group": 1, "name": "CLIP", "type": "模型"},
            {"id": "llava", "group": 1, "name": "LLaVA", "type": "模型"},
            {"id": "blip", "group": 1, "name": "BLIP", "type": "模型"},
            {"id": "flamingo", "group": 1, "name": "Flamingo", "type": "模型"},
            {"id": "gemini", "group": 1, "name": "Gemini", "type": "模型"},
            {"id": "claude3", "group": 1, "name": "Claude 3", "type": "模型"},

            # 能力节点
            {"id": "image_understanding", "group": 2, "name": "图像理解", "type": "能力"},
            {"id": "text_generation", "group": 2, "name": "文本生成", "type": "能力"},
            {"id": "visual_reasoning", "group": 2, "name": "视觉推理", "type": "能力"},
            {"id": "multimodal_fusion", "group": 2, "name": "多模态融合", "type": "能力"},
            {"id": "zero_shot_learning", "group": 2, "name": "零样本学习", "type": "能力"},
            {"id": "cross_modal_retrieval", "group": 2, "name": "跨模态检索", "type": "能力"},

            # 应用节点
            {"id": "image_captioning", "group": 3, "name": "图像描述", "type": "应用"},
            {"id": "vqa", "group": 3, "name": "视觉问答", "type": "应用"},
            {"id": "document_understanding", "group": 3, "name": "文档理解", "type": "应用"},
            {"id": "content_generation", "group": 3, "name": "内容生成", "type": "应用"},
            {"id": "medical_diagnosis", "group": 3, "name": "医疗诊断", "type": "应用"},

            # 组织节点
            {"id": "openai", "group": 4, "name": "OpenAI", "type": "组织"},
            {"id": "google", "group": 4, "name": "Google", "type": "组织"},
            {"id": "meta", "group": 4, "name": "Meta", "type": "组织"},
            {"id": "anthropic", "group": 4, "name": "Anthropic", "type": "组织"},

            # 技术节点
            {"id": "transformer", "group": 5, "name": "Transformer", "type": "技术"},
            {"id": "contrastive_learning", "group": 5, "name": "对比学习", "type": "技术"},
            {"id": "attention_mechanism", "group": 5, "name": "注意力机制", "type": "技术"},
            {"id": "vision_transformer", "group": 5, "name": "视觉Transformer", "type": "技术"},
        ],
        "links": [
            # 模型与组织的关系
            {"source": "gpt4v", "target": "openai", "value": 1, "relationship": "研发"},
            {"source": "clip", "target": "openai", "value": 1, "relationship": "研发"},
            {"source": "gemini", "target": "google", "value": 1, "relationship": "研发"},
            {"source": "flamingo", "target": "meta", "value": 1, "relationship": "研发"},
            {"source": "claude3", "target": "anthropic", "value": 1, "relationship": "研发"},
            {"source": "llava", "target": "meta", "value": 1, "relationship": "研发"},

            # 模型与能力的关系
            {"source": "gpt4v", "target": "image_understanding", "value": 1, "relationship": "具备"},
            {"source": "gpt4v", "target": "text_generation", "value": 1, "relationship": "具备"},
            {"source": "gpt4v", "target": "visual_reasoning", "value": 1, "relationship": "具备"},
            {"source": "clip", "target": "image_understanding", "value": 1, "relationship": "具备"},
            {"source": "clip", "target": "zero_shot_learning", "value": 1, "relationship": "具备"},
            {"source": "clip", "target": "cross_modal_retrieval", "value": 1, "relationship": "具备"},
            {"source": "llava", "target": "image_understanding", "value": 1, "relationship": "具备"},
            {"source": "llava", "target": "visual_reasoning", "value": 1, "relationship": "具备"},
            {"source": "blip", "target": "image_understanding", "value": 1, "relationship": "具备"},
            {"source": "blip", "target": "cross_modal_retrieval", "value": 1, "relationship": "具备"},
            {"source": "flamingo", "target": "multimodal_fusion", "value": 1, "relationship": "具备"},
            {"source": "gemini", "target": "multimodal_fusion", "value": 1, "relationship": "具备"},
            {"source": "gemini", "target": "visual_reasoning", "value": 1, "relationship": "具备"},
            {"source": "claude3", "target": "image_understanding", "value": 1, "relationship": "具备"},
            {"source": "claude3", "target": "text_generation", "value": 1, "relationship": "具备"},

            # 能力与应用的关系
            {"source": "image_understanding", "target": "image_captioning", "value": 1, "relationship": "支持"},
            {"source": "visual_reasoning", "target": "vqa", "value": 1, "relationship": "支持"},
            {"source": "multimodal_fusion", "target": "document_understanding", "value": 1, "relationship": "支持"},
            {"source": "text_generation", "target": "content_generation", "value": 1, "relationship": "支持"},
            {"source": "image_understanding", "target": "medical_diagnosis", "value": 1, "relationship": "支持"},

            # 技术与模型的关系
            {"source": "transformer", "target": "gpt4v", "value": 1, "relationship": "应用于"},
            {"source": "transformer", "target": "llava", "value": 1, "relationship": "应用于"},
            {"source": "transformer", "target": "gemini", "value": 1, "relationship": "应用于"},
            {"source": "transformer", "target": "claude3", "value": 1, "relationship": "应用于"},
            {"source": "contrastive_learning", "target": "clip", "value": 1, "relationship": "应用于"},
            {"source": "attention_mechanism", "target": "gpt4v", "value": 1, "relationship": "应用于"},
            {"source": "attention_mechanism", "target": "gemini", "value": 1, "relationship": "应用于"},
            {"source": "vision_transformer", "target": "clip", "value": 1, "relationship": "应用于"},
            {"source": "vision_transformer", "target": "blip", "value": 1, "relationship": "应用于"},
        ],
    }


# 路由：聊天接口
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question', '')

    # 查询Neo4j数据库获取答案
    try:
        with driver.session() as session:
            # 这里可以实现基于知识图谱的问答逻辑
            # 简单示例：根据问题中的关键词查询相关节点
            pass
    except Exception as e:
        print(f"Error querying Neo4j: {e}")
    print(f"{question=}")
    # 使用简单的问答匹配逻辑
    answer = find_answer(question)

    return jsonify({"answer": answer})


# 路由：搜索知识图谱
@app.route('/api/search', methods=['GET'])
def search_knowledge_graph():
    query = request.args.get('q', '')

    try:
        with driver.session() as session:
            # 搜索节点
            search_query = """
            MATCH (n)
            WHERE n.name CONTAINS $query OR n.type CONTAINS $query
            RETURN n.id AS id, n.name AS name, n.type AS type
            LIMIT 10
            """
            result = session.run(search_query, query=query)
            search_results = [dict(record) for record in result]

            return jsonify(search_results)
    except Exception as e:
        print(f"Error searching Neo4j: {e}")
        return jsonify([])


# 路由：执行Cypher查询
@app.route('/api/neo4j/query', methods=['POST'])
def query_neo4j():
    data = request.json
    cypher_query = data.get('query', '')

    try:
        with driver.session() as session:
            result = session.run(cypher_query)
            records = [dict(record) for record in result]

            return jsonify({"results": records})
    except Exception as e:
        print(f"Error executing Cypher query: {e}")
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)








