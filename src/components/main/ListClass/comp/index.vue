<template>
    <!-- 后期迭代传入数据修改 -->
     <!-- 传输id后续根据id来实现发送请求 -->
    <router-link :to="{ path: message.path, query: { id: message.id} }">
    <el-card class="card" :body-style="{ padding: '0px', height: '120px' }" :shadow="'hover'">

        <el-image style="width: 100%; height: 120% ;" class="carimage"
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" fit="cover" />
        <template #footer>
            <div class="foterValue">
                {{ message.class }}
            </div>
        </template>
    </el-card>
</router-link>
</template>
<script>
import { computed } from "vue";
export default {
    name: 'Carcomp',
    props: {
        message: [{ class: String, login: Number,path:String,id:Number }]

    },
    
   

}
</script>

<style lang="less" scoped>
.card {
    padding: 0%;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    /* 防止阴影外溢 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* 初始状态的阴影 */
    transition: box-shadow 0.3s ease-in-out;
    /* 阴影过渡动画 */
}


.card:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    /* 悬停时的阴影效果 */
}
.carimage {
    transition: transform 0.3s ease; /* 添加平滑过渡效果 */
}
.card:hover .carimage {
    transform: scale(1.1); /* 鼠标悬停时图片放大1.05倍 */
}
.foterValue {
    margin-top: 5px;
}
</style>