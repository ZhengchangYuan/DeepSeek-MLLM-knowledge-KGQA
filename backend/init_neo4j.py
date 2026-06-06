from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# Neo4j数据库连接
NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password")

# 创建Neo4j驱动
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def initialize_knowledge_graph():
    with driver.session() as session:
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
            {"source": "gpt4v", "target": "image_under0standing", "relationship": "HAS_CAPABILITY"},
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
        
        print("知识图谱初始化完成！")

if __name__ == "__main__":
    initialize_knowledge_graph()
    driver.close()
