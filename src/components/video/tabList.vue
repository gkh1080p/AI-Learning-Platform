<template>
  <div class="top">
    <div class="title">
      xxxxxxx
    </div>
    <div class="teacher">
      xxx
    </div>
  </div>
  <div class="classList">
    <el-scrollbar height="470.8px">
      <el-tooltip v-for="item in cards" :key="item.videoId" :content="item.courseVideoName" placement="top"
        effect="dark" :show-after="2000">
        <p class="scrollbar-demo-item" @click="videoGet(item)" :class="{ selected: selectedId === item.videoId }">{{
          item.courseVideoName }}</p>
      </el-tooltip>
    </el-scrollbar>
  </div>

</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import http from '@/utils/http.ts'

// 定义事件
const emit = defineEmits(['changeVideo']);  // 声明事件

// 响应式数据
const courseId = ref(0)
const route = useRoute()
const selectedId = ref<number | null>(null)
const cards = ref<any[]>([])

// 方法
const videoGet = (item: any) => {
 
  selectedId.value = item.videoId
  console.log(selectedId.value)
  emit('changeVideo', item.courseVideo) 
}

// 请求方法
const fetchData = async () => {
  try {
    const res = await http.get('/course_video/list', {
      course_id: courseId.value
    })
    cards.value = res.data
  } catch (error) {
    console.error('请求失败：', error)
  }
}

// 生命周期
onMounted(() => {
  courseId.value = route.query.course_id
  console.log(courseId.value)
  fetchData()
})
</script>

<style lang="less" scoped>
* {
  color: #fff;
}

.top {
  background-color: #282828;
  margin: 10px;
  padding: 10px;
  padding-top: 0px;
  border-radius: 10px;
  cursor: pointer;

  .title {
    font-size: 30px;
  }
}

.classList {


  .scrollbar-demo-item {
    display: block;
    align-items: center;
    justify-content: flex-start;
    height: 35px;
    line-height: 35px;
    margin: 5px;
    padding-left: 10px;
    padding-right: 20px;
    border-radius: 4px;
    background: #282828;
    color: #fff;
    font-size: 12px;
    width: 95%;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
      background-color: #3a3a3a;
      color: #ffd700;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    // 高亮显示样式
    &.selected {
      transform: scale(1.05); // 轻微放大效果，增强交互感
      background: linear-gradient(145deg, #3a3f45, #2b2b2b); // 渐变背景，给人一种立体感
      border: 1px solid #409eff; // 边框颜色为蓝色
      box-shadow: 0 4px 8px rgba(64, 158, 255, 0.6), 0 0 20px rgba(64, 158, 255, 0.3); // 蓝色发光阴影
      color: #ffd700; // 金色字体，提升视觉效果
      font-weight: bold; // 加粗字体
      transition: all 0.3s ease; // 平滑过渡效果

      // 鼠标悬停时加深阴影
      &:hover {
        box-shadow: 0 8px 16px rgba(64, 158, 255, 0.8), 0 0 25px rgba(64, 158, 255, 0.4);
      }
    }
  }
}
</style>