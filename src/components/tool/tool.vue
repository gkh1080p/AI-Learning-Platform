<template>
    <div class="container">
      <!-- 头部 -->
      <header class="header">
        <!-- 分类过滤 -->
        <div class="filters">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="['filter-btn', { active: selectedCategory === category }]"
          >
            {{ category }}
          </button>
          <button
            @click="selectedCategory = null"
            :class="['filter-btn', { active: !selectedCategory }]"
          >
            全部
          </button>
        </div>
      </header>
  
      <!-- 工具卡片网格 -->
      <div class="tool-grid">
        <div
          v-for="tool in filteredTools"
          :key="tool.name"
          class="tool-card"
          @click="openTool(tool.url)"
        >
          <div class="tool-icon">{{ tool.icon }}</div>
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-desc">{{ tool.description }}</p>
          <div class="tool-tags">
            <span v-for="tag in tool.category" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, reactive } from 'vue'
  
  // 类型定义
  interface Tool {
    name: string
    url: string
    category: string[]
    description: string
    icon: string
  }
  
  // 工具数据
  const tools = reactive<Tool[]>([
  {
    name: "Remove.bg",
    url: "https://www.remove.bg",
    category: ["AI工具", "图片处理"],
    description: "AI智能背景去除工具",
    icon: "🎭" // 面具图标表示背景处理
  },
  {
    name: "Canva",
    url: "https://www.canva.com",
    category: ["设计工具", "模板"],
    description: "在线平面设计平台",
    icon: "🖋️" // 设计用笔
  },
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    category: ["AI工具", "聊天机器人"],
    description: "智能对话助手",
    icon: "🧠" // 大脑表示智能
  },
  {
    name: "Midjourney",
    url: "https://www.midjourney.com",
    category: ["AI工具", "图像生成"],
    description: "AI图像生成工具",
    icon: "🌄" // 日出风景表示创意生成
  },
  {
    name: "Figma",
    url: "https://www.figma.com",
    category: ["设计工具", "原型设计"],
    description: "云端协作式UI设计工具",
    icon: "📐" // 尺规工具
  },
  {
    name: "GitHub Copilot",
    url: "https://copilot.github.com",
    category: ["开发工具", "AI编程"],
    description: "AI代码辅助工具",
    icon: "👨💻" // 程序员图标
  },
  {
    name: "Notion AI",
    url: "https://www.notion.so",
    category: ["效率工具", "AI写作"],
    description: "智能笔记与知识管理",
    icon: "📚" // 书籍堆叠
  },
  {
    name: "Grammarly",
    url: "https://www.grammarly.com",
    category: ["写作辅助", "语法检查"],
    description: "英文语法校对工具",
    icon: "🔍" // 放大镜检查
  },
  {
    name: "Runway ML",
    url: "https://runway.ml",
    category: ["AI工具", "视频编辑"],
    description: "AI视频创作平台",
    icon: "🎞️" // 电影胶片
  },
  {
    name: "Unsplash",
    url: "https://unsplash.com",
    category: ["图片资源", "摄影"],
    description: "高质量免费图库",
    icon: "🏞️" // 自然风景图
  },
  {
    name: "CodePen",
    url: "https://codepen.io",
    category: ["开发工具", "前端"],
    description: "在线代码编辑器",
    icon: "💾" // 存储磁盘
  },
  {
    name: "DeepL",
    url: "https://www.deepl.com",
    category: ["AI工具", "翻译"],
    description: "神经网络翻译工具",
    icon: "🔤" // 字母转换
  },
  {
    name: "Trello",
    url: "https://trello.com",
    category: ["项目管理", "协作"],
    description: "看板式任务管理工具",
    icon: "🗂️" // 卡片分类
  },
  {
    name: "Zoom",
    url: "https://zoom.us",
    category: ["视频会议", "远程办公"],
    description: "高清视频会议平台",
    icon: "👥" // 多人会议
  },
  {
    name: "Adobe Firefly",
    url: "https://www.adobe.com/firefly",
    category: ["AI工具", "设计"],
    description: "Adobe创意生成式AI",
    icon: "✨" // 创意火花
  },
  {
    name: "Miro",
    url: "https://miro.com",
    category: ["协作工具", "白板"],
    description: "在线协作白板平台",
    icon: "🖍️" // 蜡笔涂鸦
  },
  {
    name: "DALL-E 3",
    url: "https://openai.com/dall-e",
    category: ["AI工具", "图像生成"],
    description: "AI图像生成器",
    icon: "🌀" // 生成漩涡
  },
  {
    name: "Otter.ai",
    url: "https://otter.ai",
    category: ["AI工具", "语音处理"],
    description: "语音转文字工具",
    icon: "📜" // 文字卷轴
  },
  {
    name: "Airtable",
    url: "https://airtable.com",
    category: ["效率工具", "数据库"],
    description: "智能表格数据库",
    icon: "🗃️" // 卡片文件柜
  },
  {
    name: "Loom",
    url: "https://loom.com",
    category: ["效率工具", "视频录制"],
    description: "屏幕录制与分享",
    icon: "📼" // 复古录像带
  },
  {
    name: "Framer",
    url: "https://framer.com",
    category: ["设计工具", "原型设计"],
    description: "交互式设计平台",
    icon: "🖱️" // 鼠标交互
  },
  {
    name: "Hemingway Editor",
    url: "https://hemingwayapp.com",
    category: ["写作辅助", "语法检查"],
    description: "写作风格优化工具",
    icon: "✒️" // 古典钢笔
  },
  {
    name: "Replicate",
    url: "https://replicate.com",
    category: ["AI工具", "开发工具"],
    description: "AI模型部署平台",
    icon: "🧩" // 拼图集成
  },
  {
    name: "Iconscout",
    url: "https://iconscout.com",
    category: ["设计工具", "资源库"],
    description: "图标与素材库",
    icon: "🪄" // 魔法棒
  },
  {
    name: "Descript",
    url: "https://descript.com",
    category: ["AI工具", "视频编辑"],
    description: "AI视频剪辑工具",
    icon: "🎬" // 导演板
  },
  {
    name: "Webflow",
    url: "https://webflow.com",
    category: ["开发工具", "建站"],
    description: "可视化网站生成器",
    icon: "🕸️" // 网站网络
  },
  {
    name: "Slack",
    url: "https://slack.com",
    category: ["协作工具", "通讯"],
    description: "团队协作通讯平台",
    icon: "💌" // 消息信封
  },
  {
    name: "Zapier",
    url: "https://zapier.com",
    category: ["效率工具", "自动化"],
    description: "工作流自动化平台",
    icon: "⚡" // 闪电效率
  }
])
  
  // 响应式状态
  const selectedCategory = ref<string | null>(null)
  
  // 计算分类列表
  const categories = computed(() => {
    const allCategories = tools.flatMap(t => t.category)
    return [...new Set(allCategories)]
  })
  
  // 计算过滤后的工具
  const filteredTools = computed(() => {
    if (!selectedCategory.value) return tools
    return tools.filter(t => t.category.includes(selectedCategory.value!))
  })
  
  // 打开工具链接
  const openTool = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  
  
  
  .filters {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .filter-btn {
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    border: 1px solid #e5e7eb;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .filter-btn:hover {
    background-color: #f3f4f6;
  }
  
  .filter-btn.active {
    background-color: #3b82f6;
    color: white;
    border-color: transparent;
  }
  
  .tool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .tool-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background: white;
  }
  
  .tool-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .tool-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .tool-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #1f2937;
  }
  
  .tool-desc {
    color: #6b7280;
    margin-bottom: 1rem;
    min-height: 3em;
    line-height: 1.5;
  }
  
  .tool-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background-color: #f3f4f6;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    font-size: 0.85rem;
    color: #4b5563;
  }
  </style>