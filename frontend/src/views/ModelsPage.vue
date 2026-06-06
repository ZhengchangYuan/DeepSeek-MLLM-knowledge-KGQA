import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { ref } from "vue"

const models = ref([
  {
    id: "gpt4v",
    name: "GPT-4V",
    organization: "OpenAI",
    description:
      "GPT-4 with Vision (GPT-4V) 是OpenAI的多模态大语言模型，能够理解和分析图像，并结合文本进行推理和生成。",
  },
  // Additional models would be defined here
])
