<template>
    <div class="title">讲义</div>
    <el-divider />
    <div class="file-list">
        <div class="file-item" v-for="(file, index) in files" :key="index" @click="downloadFile(file)">
            <span class="file-name">{{ file.name }}</span>
            <el-icon class="download-icon" >
                <Download />
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { Download } from '@element-plus/icons-vue';

export default {
    name: 'fileList',
    setup() {
        const files = ref([
            { name: '线性代数讲义.pdf', url: '/downloads/gukh.pdf' },
            { name: '高等数学讲义.pdf', url: '/downloads/gukh.pdf' },
            { name: '概率论讲义.pdf', url: '/downloads/gukh.pdf' },
        ])

        const downloadFile = (file: { name: string; url: string }) => {
            const link = document.createElement('a')
            link.href = file.url
            link.download = file.name
            link.target = '_blank'
            link.click()
        }
        
        return { files, downloadFile }
    },
    components:{Download}
}
</script>

<style lang="less" scoped>
* {
    color: #fff;
    padding: 0;
    margin: 0;
    cursor: pointer;
    user-select: none;
}

.title {
    width: 100%;
    height: 50px;
    padding: 20px;
    font-size: 23px;
}


.file-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px 10px;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2c2c2c;
    padding: 12px 16px;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #3a3a3a;
        cursor: pointer;
    }
}

.file-name {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.download-icon {
    font-size: 20px;
    color: #409eff;

    &:hover {
        color: #66b1ff;
    }
}
</style>