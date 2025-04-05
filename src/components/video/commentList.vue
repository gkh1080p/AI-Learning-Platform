<template>
    <div class="nav">
        <div class="title">评论</div>
        <div class="class">
            <el-dropdown placement="bottom-start">
                <el-button type="info" size="small"> {{comClass}} </el-button> 
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="comClass='一周时间内'">一周时间内</el-dropdown-item>
                        <el-dropdown-item @click="comClass='一月时间内'">一月时间内</el-dropdown-item>
                        <el-dropdown-item @click="comClass='所有时间内'">所有时间内</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>


</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    name: 'commentList',
    setup() {
        const comClass=ref('一周时间内')
        return {comClass}
    }
}
</script>

<style lang="less" scoped>
* {
    color: #fff;

    .nav {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        cursor: pointer;
        user-select: none;

    }
}
</style>