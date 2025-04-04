<template>
    <el-row class="video_box">
        <!-- 视频播放组件 -->
        <el-col :span="17">
            <VideoPlayer ref="videoPlayer" :options="videoOptions" />
            <!-- <button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button> -->
        </el-col>
        <!-- 间隙 -->
        <el-col :span="1"></el-col>
        <!-- 列表 -->
        <el-col :span="6">22222</el-col>
    </el-row>
</template>

<script>
import { ref } from 'vue'
// 视频播放组件
import VideoPlayer from './VideoPlayer.vue'

export default {
    name: 'video',
    components: {
        VideoPlayer
    },

    setup() {
        const videoPlayer = ref(null)
        // 状态跟踪
        const isPlaying = ref(false)
        // 播放源配置，后期根据传来的id来请求src
        const videoOptions = ref({
            sources: [{
                src: 'https://vjs.zencdn.net/v/oceans.mp4',
                type: 'video/mp4'
            }],
            controls: true,
            autoplay: false,
            playbackRates: [0.5, 1, 1.5, 2]
        })
        // 切换播放状态方法
        // const togglePlay = () => {
        //     if (isPlaying.value) {
        //         videoPlayer.value.pause()
        //     } else {
        //         videoPlayer.value.play()
        //     }
        //     isPlaying.value = !isPlaying.value
        // }

        return {
            videoPlayer,
            videoOptions,
            isPlaying,
        }
    }
}
</script>


<style lang="less" scoped>
.video_box {
    width: 88%;
    height: 200px;
    margin: 0 auto;
    background-color: pink;
}
</style>