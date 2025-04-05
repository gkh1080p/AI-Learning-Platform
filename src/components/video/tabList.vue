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
      <el-tooltip v-for="item in cards" :key="item.id" :content="item.name" placement="top" effect="dark"
        :show-after="2000">
        <p class="scrollbar-demo-item" @click="videoGet(item.id)" :class="{ selected: selectedId === item.id }">{{
          item.name }}</p>
      </el-tooltip>
    </el-scrollbar>
  </div>

</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'tabList',
  setup() {
    // 高亮显示
    const selectedId = ref<number | null>(null)
    const cards = [
      { name: '卡片1f', id: 12 }, { name: '卡片1f', id: 312 }, { name: '卡片1f', id: 234 }, { name: '卡片1f', id: 145345 },
      { name: '卡片1f', id: 14562 }, { name: '卡片1f', id: 312312 }, { name: '卡片1f', id: 275634 }, { name: '卡片1f', id: 14537866845 },
    ]
    const videoGet = (id: number) => {
      console.log(id)
      selectedId.value = id
    }
    return { cards, videoGet, selectedId }
  }
}
</script>

<style lang="less" scoped>
* {
  color: #fff;

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
}
</style>