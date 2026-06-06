import pdfplumber


def parse_pdf(pdf_path):
    """
    解析PDF论文，提取文本和表格数据
    :param pdf_path: PDF文件路径
    :return: 包含标题、正文和表格的字典
    """
    results = {
        'title': '',
        'text': '',
        'tables': []
    }

    try:
        with pdfplumber.open(pdf_path) as pdf:
            # 提取标题（假设第一页首行是标题）
            first_page = pdf.pages[0]
            results['title'] = first_page.extract_text().split('\n')[0].strip()

            # 提取所有文本
            full_text = []
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:  # 确保文本不为空
                    full_text.append(page_text)
            results['text'] = '\n'.join(full_text)

            # 提取所有表格
            for page in pdf.pages:
                for table in page.extract_tables():
                    # 转换为二维列表
                    table_data = []
                    for row in table:
                        cleaned_row = [cell.replace('\n', ' ') if cell else '' for cell in row]
                        table_data.append(cleaned_row)
                    results['tables'].append(table_data)

    except Exception as e:
        print(f"解析PDF时出错: {str(e)}")

    return results





# 使用示例
if __name__ == "__main__":
    pdf_file = "../../MLLM论文50篇截至2023-10-16yqs/知识工程论文50篇/2021_7_1_A Primer on Pretrained Multilingual Language Models.pdf"  # 替换为你的PDF路径
    parsed_data = parse_pdf(pdf_file)

    print(f"标题: {parsed_data['title']}")
    print(f"\n前500字符正文:\n{parsed_data['text']}...")
    print(f"\n找到 {len(parsed_data['tables'])} 个表格")

    # 打印第一个表格（如果存在）
    if parsed_data['tables']:
        print("\n第一个表格示例:")
        for row in parsed_data['tables'][0]:
            print(row)
