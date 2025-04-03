<template>
    <!-- 后期迭代传入数据修改 -->
     
    <el-card class="card" :body-style="{ padding: '0px', height: '120px' }">
        
        <el-image style="width: 100%; height: 120% ;"
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" fit="cover" />
        <template #footer>
            <div class="foterValue">
                {{ message[0].class }}
            </div>
        </template>
    </el-card>
</template>
<script>
export default {
    name: 'Carcomp',
    props: {
        message: [{ class: String, login: Number }]

    },
    setup(props) {
        const { message } = props.message
    },

}
</script>

<style lang="less" scoped>
.card {
    padding: 0%;
    height: 200px;
    border-radius: 10px;
}
.foterValue{
    margin-top: 5px;
}
</style>