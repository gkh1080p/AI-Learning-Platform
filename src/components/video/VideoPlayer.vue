<template>
    <div class="video-container">
      <video 
        ref="videoPlayer" 
        class="video-js vjs-big-play-centered"
      ></video>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount, watch, toRefs } from 'vue'
  import videojs from 'video.js'
  import 'video.js/dist/video-js.css'
  
  export default {
    name:"VideoPlayer",
    props: {
      options: {
        type: Object,
        required: true,
        default: () => ({
          sources: [],
          controls: true,
          autoplay: false,
          preload: 'auto'
        })
      }
    },
  
    setup(props, context) {
      const videoPlayer = ref(null)
      let player = null
  
      // 初始化播放器
      onMounted(() => {
        player = videojs(
          videoPlayer.value,
          props.options,
          () => {
            console.log('播放器初始化完成')
          }
        )
      })
  
      // 销毁播放器
      onBeforeUnmount(() => {
        if (player) {
          player.dispose()
        }
      })
  
      // 监听options变化
      watch(
        () => props.options,
        (newVal) => {
          if (player) {
            player.src(newVal.sources)
          }
        },
        { deep: true }
      )
  
      // 暴露控制方法
      const play = () => player?.play()
      const pause = () => player?.pause()
      const getCurrentTime = () => player?.currentTime()
  
      return {
        videoPlayer,
        play,
        pause,
        getCurrentTime
      }
    }
  }
  </script>
  
  <style scoped>
  .video-container {
    position: relative;
    padding-top: 56.25%;
  }
  
  .video-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>