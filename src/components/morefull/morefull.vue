<template>
    <div class="course-container" ref="scrollContainer" @scroll="handleScroll">
        <el-row :gutter="20" class="course-grid">
            <el-col v-for="course in courses" :key="course.courseId" :span="6">
                <router-link :to="{path:'video',query: { id: course.courseId }}">
                    <el-card shadow="hover" class="course-card">
                    <img :src="course.courseCover" class="course-image" />
                    <div class="course-info">
                        <div class="course-title">{{ course.courseName }}</div>
                        <div class="course-desc">{{ course.courseDescription }}</div>
                    </div>
                </el-card>
                </router-link>
                
            </el-col>
        </el-row>
        <div v-if="loading" class="loading">加载中...</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
export default defineComponent({
    name: 'morefull',
    setup() {
        // 接收参数
        const route = useRoute()
        const categoryId = route.query.id as string // 后期请求所需
        console.log('收到的 categoryId:', categoryId)

        const courses = ref<any[]>([])
        const page = ref(1)
        const loading = ref(false)
        const scrollContainer = ref<HTMLElement | null>(null)

        const fetchCourses = async () => {
            console.log("到底部拉")
            if (loading.value) return
            loading.value = true
            try {
                // 模拟接口请求
                await new Promise(resolve => setTimeout(resolve, 1000))
                const newCourses = Array.from({ length: 100 }, (_, i) => ({
                    courseId: 1,
                    courseName: `课程 ${page.value * 10 + i}`,
                    courseDescription: '这是一门有趣的课程',
                    courseCover: 'http://118.178.132.54:9000/lunwen/b7055f70-a7b2-42bc-886a-ad484b25adf4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=zV2WEBIsoOPOuwWuxFfM%2F20250408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250408T092719Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a70e7681bddc61767376cf3176b815af6956b70227c637f05639a4e80db27566'
                }))
                courses.value.push(...newCourses)
                page.value++
            } catch (e) {
                ElMessage.error('加载失败')
            } finally {
                loading.value = false
            }
        }

        const handleScroll = () => {
            if (!scrollContainer.value) return
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                fetchCourses()
            }
        }

        onMounted(() => {
            fetchCourses()
        })

        return {
            courses,
            page,
            loading,
            scrollContainer,
            handleScroll
            
        }
    }
})
</script>

<style lang="less" scoped>
a {
    text-decoration: none;
}

.course-container {
    height: 100vh;
    overflow-y: auto;
    padding: 20px;
    background-color: #f5f5f5;
    margin-left: 10%;
    margin-right: 10%;
}

.course-grid {
    display: flex;
    flex-wrap: wrap;
    

}

.course-card {
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s;
    margin-bottom: 20px;
    overflow: hidden;
}

.course-card:hover {
    transform: translateY(-4px);
}

.course-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
    transition: transform 0.3s ease; 
    &:hover {
        transform: scale(1.1);
    }
}

.course-info {
    padding: 10px 0;
}

.course-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.course-desc {
    font-size: 14px;
    color: #888;
}

.loading {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    color: #999;
}
</style>