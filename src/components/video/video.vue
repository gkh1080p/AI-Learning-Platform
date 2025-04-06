<template>
    <el-row class="video_box">
        <!-- 视频播放组件 -->
        <el-col :span="17">
            <div class="video-wrapper">
                <VideoPlayer :options="playerOptions" />

                <img class="custom-logo" src="https://i.postimg.cc/wx0Zb7Z6/Logo-AI-48-328x200px.png" />
            </div>
        </el-col>
        <!-- 间隙 -->
        <el-col :span="1"></el-col>
        <!-- 列表 -->
        <el-col :span="6" class="list_all">
            <el-row>
                <el-col :span="6" class="list_tab">
                    <ul>
                        <router-link to="/" class="nav-link">
                            <li :class="{ active: activeTab === '/' }">
                                <el-icon :size="20" color="#fe9900">
                                    <HomeFilled />
                                </el-icon>
                                <div>回到主页</div>
                            </li>
                        </router-link>
                        <router-link to="/video/tabList" class="nav-link">
                            <li :class="{ active: activeTab === 'tabList' }">
                                <el-icon :size="20" color="#fe9900">
                                    <MoreFilled />
                                </el-icon>
                                <div>目录</div>
                            </li>
                        </router-link>

                        <router-link to="/video/commentList" class="nav-link">
                            <li :class="{ active: activeTab === 'commentList' }">
                                <el-icon :size="20" color="#fe9900">
                                    <ChatDotSquare />
                                </el-icon>
                                <div>评论</div>
                            </li>
                        </router-link>

                        <router-link to="/video/fileList" class="nav-link">
                            <li :class="{ active: activeTab === 'fileList' }">
                                <el-icon :size="20" color="#fe9900">
                                    <FolderRemove />
                                </el-icon>
                                <div>讲义</div>
                            </li>
                        </router-link>
                    </ul>
                </el-col>
                <el-col :span="18" class="list_value">
                    <router-view name="video">
                    </router-view>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>



<script>
import { reactive, ref, computed ,onMounted,onUnmounted} from 'vue';
import VideoPlayer from './VideoPlayer.vue';
import { ChatDotSquare, MoreFilled, FolderRemove, HomeFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
export default {
    name: 'Video',
    components: {
        VideoPlayer, ChatDotSquare, MoreFilled, FolderRemove, HomeFilled
    },
    setup() {
        // 功能栏高亮
        const route = useRoute();
        const activeTab = computed(() => {
            const path = route.path;
            if (path.includes('tabList')) return 'tabList';
            if (path.includes('commentList')) return 'commentList';
            if (path.includes('fileList')) return 'fileList';
            return '';
        });
        // 视频播放配置
        const playerOptions = reactive({
            video: {
                url: 'https://static.smartisanos.cn/common/video/t1-ui.mp4',
                // pic: 'https://www.runoob.com/try/demo_source/movie.mp4.jpg', // 示例封面图
            },
            autoplay: false,
            theme: '#FADFA3',
            loop: true,
            lang: 'zh-cn',
            screenshot: true,
            hotkey: true,
            preload: 'auto',
            volume: 0.7,
            mutex: true,
            highlight: [
                {
                    time: 10, // 高亮的时间（单位：秒）
                    text: '10秒有亮点！'
                },
                {
                    time: 45,
                    text: '45秒有彩蛋'
                }
            ],
            // 废弃方案
            // logo: 'https://i.postimg.cc/wx0Zb7Z6/Logo-AI-48-328x200px.png'


        });

        onMounted(() => {
            // 进入视频播放页面，禁用滚动条
            document.body.style.overflow = 'hidden'
        })

        onUnmounted(() => {
            // 离开页面时恢复滚动条
            document.body.style.overflow = 'auto'
        })

        return {
            playerOptions, ChatDotSquare, MoreFilled, FolderRemove, activeTab, HomeFilled
        };
    },

};
</script>


<style lang="less" scoped>
.video_box {
    display: flex; // 使用flex布局，左右两部分会自动对齐
    width: 88%;
    height: 580px; // 固定整体高度，确保两边的高度一致
    margin: 0 auto;

    // 播放器部分样式
    .video-wrapper {
        width: 100%;
        min-width: 800px;
        aspect-ratio: 16 / 9; // 保持16:9比例
        position: relative;
        height: 100%; // 保证播放器高度继承父容器高度

        // logo样式
        .custom-logo {
            position: absolute;
            top: 15px;
            left: 15px;
            width: 120px;
            height: auto;
            z-index: 999;
        }
    }




    // 右边列表部分
    .list_all {
        // background-color: yellow;
        height: 100%; // 让右边部分跟左边播放器高度一致
        display: flex;
        margin-left: -40px;
        flex-direction: column; // 确保子元素垂直排列
        justify-content: space-between; // 确保子元素分布合理

        .el-row {
            height: 100%;
            display: flex;
            justify-content: space-between;
        }

        // 列表tab样式
        .list_tab {
            background-color: #434a50;
            height: 100%; // 让每个tab的高度与右侧一致
            box-shadow: 0 4px 8px rgba(193, 146, 146, 0.9);
            border-radius: 10px 0 0 10px;

            >ul {
                color: #fff;
                width: 100%;
                list-style: none; // 去掉默认的点
                padding: 0;
                padding-top: 50px; // 去除默认内边距
                // padding-left: 10px;
                margin: 0; // 去除默认外边距

                //路由样式
                .nav-link {
                    display: block;
                    text-decoration: none;
                    color: inherit;

                    >li {
                        width: 100%;
                        height: 50px;
                        list-style: none; // 保守写法，li也加一遍
                        padding: 0;
                        padding-left: 10px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;

                        >div {
                            width: 50%;
                            margin-left: 5px;
                        }

                        // 鼠标悬停效果
                        &:hover {
                            background-color: #5a626a; // 深一点背景色
                            color: #4bf8be; // 字体变亮
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                        }
                    }

                    >li.active {
                        background-color: #3a3f45; // 比 hover 更深
                        color: #ffd700; // 金色字体
                        font-weight: bold;
                        border-left: 4px solid #409eff; // 左边高亮条
                    }
                }
            }
        }

        // 列表内容样式
        .list_value {
            background-color: #191919;
            height: 100%; // 保证内容部分填满
            border-radius: 0 10px 10px 0;
        }
    }
}
</style>