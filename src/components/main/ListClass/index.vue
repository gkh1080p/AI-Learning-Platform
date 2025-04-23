<template>
    <div v-for="(category, index) in categoryList" :key="category.categoryId" class="kindclass">
        <div class="title">
            <div class="title_left">{{ category.categoryName }}</div>
            <router-link :to="{path:'/morefull',query:{id:category.categoryId}}">
                <div class="title_right">查看更多 ></div>
            </router-link>
            
        </div>
        <CarComp v-for="item in category.course" :key="item.courseId" :message="item" class="cardOne" />
    </div>
</template>

<script lang="ts">
import CarComp from './comp/index.vue'
import http from '../../../utils/http'
import { ref, onMounted } from 'vue'
export default {
    name: "ListClass",
    setup() {
        // 数据集合
        const categoryList = ref<any>([])

        // 请求数据的函数
        const fetchData = async () => {
            try {
                const res = await http.get('/course_category/list')
                categoryList.value = res.data
            } catch (error) {
                console.error('请求失败：', error)
            }
        }

        onMounted(() => {
            fetchData()
        })

        return { categoryList }
    },

    components: { CarComp }
}
</script>
<style lang="less" scoped>
.cardOne {
    width: 195px;
    padding: 0;
    margin-left: 30px;
    flex-shrink: 0;
    margin-top: 20px;


}

// 第一个特殊样式
.cardOne:nth-child(5n+1) {
    margin: 0%;
    margin-top: 2%;
}

//第五个样式
.cardOne:nth-child(5n) {
    margin-right: 25px;
    margin-top: 23px;
}


//总样式
.kindclass {
    margin-top: 80px;
    width: 1150px;
    min-width: 800px;
    display: flex;
    margin-left: 14%;
    flex-wrap: wrap; // 允许换行
    padding: 0;

}

.title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
    cursor: pointer;
    user-select: none;
    .title_left {
        font-size: 30px;
    }

    .title_right {
        height: 30px;
        line-height: 30px;
        /* 行高等于高度 */
        text-align: center;
        padding: 5px;
        background-color: red;
        border-radius: 10px;
        margin-top: 2px;
        color: #e5e5e5;
    }
}
*{
    text-decoration: none !important;
}
</style>