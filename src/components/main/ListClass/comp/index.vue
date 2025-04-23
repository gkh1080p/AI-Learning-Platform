<template>
    <!-- 后期迭代传入数据修改 -->
    <!-- 传输id后续根据id来实现发送请求 -->
    <router-link :to="{ path: 'video', query: { id: message.courseId } }">
        <el-card class="card" :body-style="{ padding: '0px', height: '120px' }" :shadow="'hover'">

            <el-image style="width: 100%; height: 120% ;" class="carimage" :src="message.courseCover" fit="cover" />
            <template #footer>
                <div class="foterValue">
                    {{ message.courseName }}
                </div>
                
            </template>
        </el-card>
    </router-link>
</template>
<script lang="ts">
import { computed, onMounted } from "vue";
export default {
    name: 'Carcomp',
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        onMounted(() => {
           
        })
        return {
            message: props.message
        }
    }



}
</script>

<style lang="less" scoped>
a {
    text-decoration: none;
}

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
    transition: transform 0.3s ease;
    /* 添加平滑过渡效果 */
}

.card:hover .carimage {
    transform: scale(1.1);
    /* 鼠标悬停时图片放大1.05倍 */
}

.foterValue {
    margin: 0;
    padding: 0;
    margin-top: 20px;
    margin-left: -10px  ;
    text-decoration: none; // 去掉下划线
    color: #333; // 初始颜色（你可以根据你页面风格调整）
    cursor: pointer; // 鼠标经过显示为手型
    transition: color 0.3s; // 添加过渡动画效

    &:hover {
        color: #fe9900; // 鼠标经过变成蓝色（可自行更改）
    }
}
// .more{
//     margin-left: -10px  ;
//     font-size: 9px;
// }
</style>