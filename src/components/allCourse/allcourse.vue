<template>
    <div class="all-course">
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索课程名称"
          class="search-input"
          clearable
          @keyup.enter="searchCourses"
        >
          <template #prefix>
            <i class="el-icon-search"></i>
          </template>
        </el-input>
        <el-select
          v-model="selectedType"
          placeholder="选择课程类型"
          class="type-select"
          clearable
        >
          <el-option
            v-for="type in courseTypes"
            :key="type"
            :label="type"
            :value="type"
          />
        </el-select>
        <el-button type="primary" @click="searchCourses">搜索</el-button>
      </div>
  
      <div class="course-list">
        <el-card
          v-for="course in filteredCourses"
          :key="course.id"
          class="course-card"
          shadow="hover"
          @click="goToCourseDetail(course.id)"
        >
          <h3>{{ course.name }}</h3>
          <p>类型: {{ course.type }}</p>
          <p>{{ course.description }}</p>
        </el-card>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from "vue";
  import { useRouter } from "vue-router";
  
  interface Course {
    id: number;
    name: string;
    type: string;
    description: string;
  }
  
  export default defineComponent({
    name: "CourseList",
    setup() {
      const router = useRouter();
  
      const searchQuery = ref<string>("");
      const selectedType = ref<string>("");
  
      const courseTypes = ["编程", "设计", "营销", "数据分析"];
  
      const courses = ref<Course[]>([
        { id: 1, name: "Vue.js 入门", type: "编程", description: "学习 Vue.js 基础知识" },
        { id: 2, name: "UI/UX 设计", type: "设计", description: "设计用户友好的界面" },
        { id: 3, name: "数字营销策略", type: "营销", description: "掌握数字营销技巧" },
        { id: 4, name: "Python 数据分析", type: "数据分析", description: "用 Python 进行数据分析" },
      ]);
  
      const filteredCourses = computed(() =>
        courses.value.filter((course) => {
          const matchesName = course.name.toLowerCase().includes(searchQuery.value.toLowerCase());
          const matchesType = !selectedType.value || course.type === selectedType.value;
          return matchesName && matchesType;
        })
      );
  
      const searchCourses = () => {
        console.log("搜索中...");
      };
  
      const goToCourseDetail = (courseId: number) => {
        router.push({ path: '/video', query: { id: courseId } });
      };
  
      return {
        searchQuery,
        selectedType,
        courseTypes,
        courses,
        filteredCourses,
        searchCourses,
        goToCourseDetail,
      };
    },
  });
  </script>
  
  <style scoped lang="less">
  .all-course {
    padding: 24px;
    background-color: #f7f9fb;
    min-height: 100vh;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    padding: 20px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
    .el-input__inner,
    .el-select .el-input__inner {
      height: 40px;
      border-radius: 20px;
      padding: 0 16px;
      font-size: 14px;
      transition: border 0.3s ease, box-shadow 0.3s ease;
  
      &:focus {
        border-color: #409eff;
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
      }
    }
  
    .el-input {
      flex: 1;
    }
  
    .type-select {
      width: 180px;
    }
  
    .el-button {
      height: 40px;
      border-radius: 20px;
      padding: 0 24px;
      font-weight: 500;
      font-size: 14px;
      background-color: #409eff;
      border: none;
  
      &:hover {
        background-color: #66b1ff;
      }
    }
  }
  
  .course-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }
  
  .course-card {
    padding: 20px;
    border-radius: 16px;
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
  
    h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #333;
    }
  
    p {
      font-size: 14px;
      color: #666;
      margin: 4px 0;
    }
  }
  </style>
  