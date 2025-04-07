<template>
    <!-- 顶部评论标题 -->
    <div class="nav">
        <div class="title">评论</div>
        <!-- 发评论输入框 -->
        <el-button type="primary" size="small" @click="dialogVisible = true">发表评论</el-button>
        <div class="class">
            <el-dropdown placement="bottom-start">
                <el-button type="info" size="small">{{ comClass }}</el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="comClass = '一周时间内'">一周时间内</el-dropdown-item>
                        <el-dropdown-item @click="comClass = '一月时间内'">一月时间内</el-dropdown-item>
                        <el-dropdown-item @click="comClass = '所有时间内'">所有时间内</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>


    <!-- 评论列表 -->
    <div class="comment-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-item">
            <!-- 头像和用户名在一行 -->
            <div class="header-row">
                <img :src="comment.avatar" alt="avatar" class="avatar" />
                <el-tooltip effect="dark" :content="comment.username" placement="top-start">
                    <span class="username">{{ comment.username }}</span>
                </el-tooltip>
                <span class="time">{{ comment.time }}</span>
            </div>

            <!-- 评论正文 -->
            <div class="comment-body">
                <p :class="{ collapsed: comment.collapsed }">{{ comment.text }}</p>
                <span v-if="comment.text.length > 50" class="toggle-btn"
                    @click="comment.collapsed = !comment.collapsed">
                    {{ comment.collapsed ? '展开' : '收起' }}
                </span>
            </div>

            <!-- 操作区域：回复 -->
            <div class="comment-actions">
                <!-- 点赞 -->
                <el-tooltip :content="comment.likes" effect="dark" placement="top">
                    <font-awesome-icon :icon="comment.isLiked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'"
                        :style="{ color: comment.isLiked ? '#409EFF' : '#bbb' }" @click="toggleLike(comment)" />

                </el-tooltip>
                <!-- 热度 -->
                <el-tooltip content="热度" effect="dark" placement="top">
                    <div class="hot-indicator">
                        <font-awesome-icon icon="fas fa-fire" class="hot-icon" />
                        <span class="hot-value">{{ comment.hot }}</span>
                    </div>
                </el-tooltip>

                <span class="action" @click="comment.showReply = !comment.showReply">回复</span>
            </div>

            <!-- 回复输入框 -->
            <div class="reply-box" v-if="comment.showReply">
                <el-input type="textarea" rows="2" v-model="comment.replyText" placeholder="写下你的回复..." />
                <el-button type="primary" size="small" @click="submitReply(comment)">发送</el-button>
            </div>

            <!-- 楼中楼回复 -->
            <div class="replies" v-if="comment.replies.length > 0">
                <div v-for="(reply, idx) in comment.replies" :key="idx" class="reply-item">
                    <span class="reply-user">{{ reply.username }}：</span>{{ reply.text }}
                </div>
            </div>
        </div>
    </div>

    <!-- 发表评论弹窗 -->
    <el-dialog v-model="dialogVisible" title="发表评论" width="600px" :before-close="handleClose">
        <el-input type="textarea" v-model="newComment" rows="4" placeholder="留下你的精彩评论吧～" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose" type="info">取消</el-button>
                <el-button type="primary" @click="submitComment">发送</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    name: 'commentList',
    emits: ['changeVideo'],
    setup() {
        // 分类选项
        const comClass = ref('一周时间内');
        // 发评论
        const newComment = ref('');
        const dialogVisible = ref(false);
        // 发评论方法
        const handleClose = () => {
            dialogVisible.value = false;
            newComment.value = '';
        };

        const submitComment = () => {
            const content = newComment.value.trim();
            if (!content) return;

            comments.value.unshift({
                username: '你',
                avatar: 'https://i.pravatar.cc/48?img=30',
                text: content,
                time: new Date().toLocaleString(),
                likes: "0",
                isLiked: false,
                hot: 0,
                collapsed: true,
                showReply: false,
                replyText: '',
                replies: [],
            });

            handleClose();

            // 后续网络请求如下
            // try {
            //     // 替换成你自己真实的参数，比如文章 ID、用户 ID
            //     const res = await axios.post('/api/comments', {
            //         text: content,
            //         articleId: 123, // 文章 ID
            //         userId: 456      // 用户 ID
            //     });

            //     if (res.data.success) {
            //         // 接口返回成功后才更新本地数据
            //         comments.value.unshift({
            //             username: res.data.username || '你',
            //             avatar: res.data.avatar || 'https://i.pravatar.cc/48?img=30',
            //             text: content,
            //             time: new Date().toLocaleString(), // 或者用后端返回的时间
            //             likes: 0,
            //             isLiked: false,
            //             hot: 0,
            //             collapsed: true,
            //             showReply: false,
            //             replyText: '',
            //             replies: [],
            //         });

            //         ElMessage.success('评论成功！');
            //         handleClose();
            //     } else {
            //         ElMessage.error('评论失败，请重试');
            //     }
            // } catch (error) {
            //     console.error(error);
            //     ElMessage.error('网络错误，请稍后再试');
            // }



        };




        const comments = ref([
            {
                username: '小张',
                avatar: 'https://i.pravatar.cc/48?img=1',
                text: '这个视频太赞了！讲得清晰易懂👍',
                time: '2025-04-06 14:32',
                likes: "123",
                isLiked: false,
                hot: 156,
                collapsed: true,
                showReply: false,
                replyText: '',
                replies: [
                    { username: '小王', text: '确实讲得很棒，点赞！' },
                    { username: '大牛', text: '终于有人讲明白这个点了' }
                ],
            },
            {
                username: '程序猿-老李',
                avatar: 'https://i.pravatar.cc/48?img=5',
                text: '请问这个播放器组件是自己写的吗？能开源吗？期待后续更新和解说~这个功能真的太棒了，受益匪浅👍👍👍',
                time: '2025-04-06 15:28',
                likes: "32",
                isLiked: false,
                hot: 156,
                collapsed: true,
                showReply: false,
                replyText: '',
                replies: [
                    { username: '小陈', text: '我也想知道+1' },
                    { username: '楼主', text: '是我自己写的，后面整理完可以开源' },
                    { username: '观众', text: '有 GitHub 地址吗？' }
                ],
            },
            {
                username: '前端小白',
                avatar: 'https://i.pravatar.cc/48?img=12',
                text: '感谢大佬分享，我一直在找类似的功能，现在终于有思路了！',
                time: '2025-04-06 15:45',
                likes: "54",
                isLiked: false,
                hot: 130,
                collapsed: true,
                showReply: false,
                replyText: '',
                replies: [
                    { username: 'React粉', text: 'Vue 比 React 好用太多了' },
                    { username: '小赵', text: '学习了！准备照着做一个试试' }
                ],
            },
            {
                username: '技术狂人',
                avatar: 'https://i.pravatar.cc/48?img=18',
                text: '想问下这个评论模块支持后端分页加载吗？',
                time: '2025-04-06 16:02',
                likes:" 12",
                isLiked: false,
                hot: 88,
                collapsed: true,
                showReply: false,
                replyText: '',
                replies: [
                    { username: '项目经理', text: '分页建议后端做，性能会更好' },
                    { username: '楼主', text: '目前是静态 mock，后续会加分页' }
                ],
            },
            {
                username: '学习使我快乐',
                avatar: 'https://i.pravatar.cc/48?img=25',
                text: '能不能做成手机端适配的版本？现在在手机上看有点挤',
                time: '2025-04-06 16:15',
                likes: "5",
                isLiked: false,
                hot: 47,
                collapsed: true,
                showReply: false,
                replyText: '',
                replies: [
                    { username: '楼主', text: '感谢建议，我会优化移动端适配的' },
                    { username: '前端摸鱼人', text: '移动端可以试试 flex-wrap 和 rem 哦' },
                    { username: 'UI设计师', text: '建议加点响应式设计' },
                    { username: '小明', text: '不然竖屏看真的有点糊' }
                ],
            }
        ]);


        // 点赞功能开启
        const toggleLike = (comment: any) => {
            if (!comment.isLiked) {
                comment.likes += 1;
                comment.hot += 10; // 每次点赞增加10热度
                comment.isLiked = true;
            } else {
                comment.likes -= 1;
                comment.hot -= 10; // 取消点赞减少10热度
                comment.isLiked = false;
            }
        };

        // 回复功能
        const submitReply = (comment: any) => {
            if (comment.replyText.trim()) {
                comment.replies.push({
                    username: '你',
                    text: comment.replyText.trim(),
                });
                comment.replyText = '';
                comment.showReply = false;
            }
        };

        return {
            comClass,
            comments,
            toggleLike,
            submitReply,
            newComment,
            submitComment,
            dialogVisible,
            handleClose
        };
    },
    components: {}
};
</script>
<style lang="less" scoped>
* {
    color: #fff;
    user-select: none;
    overflow: hidden;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background-color: #282828;
    height: 48px; // 记录导航栏高度，下面用于减去
    border-radius: 0 10px 0 0;
}

.nav .el-button {
    margin-left: 8px;
    background-color: #409eff;
    border: none;
    color: #fff;
    font-size: 12px;

    &:hover {
        background-color: #66b1ff;
    }
}


.comment-list {
    background-color: #282828;
    padding: 12px 16px;
    height: 82.5%; // 自动适应剩余高度，避免底部被遮住
    overflow-y: auto;

    .comment-item {
        background-color: #3e3e3e;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 14px;
        transition: box-shadow 0.2s;

        &:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .header-row {
            display: flex;
            align-items: center;
            margin-bottom: 4px;

            .avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 8px;
            }

            .username {
                font-weight: bold;
                font-size: 11px;
                min-width: 0; //修复flex布局的溢出问题
                max-width: 50px;
                max-height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: auto;
            }

            .time {
                font-size: 12px;
                color: #ccc;
            }
        }

        .comment-body {
            font-size: 13px;
            line-height: 1.4;
            margin-bottom: 4px;

            .collapsed {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                line-clamp: 2;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .toggle-btn {
                color: #409eff;
                font-size: 12px;
                cursor: pointer;
                display: inline-block;
                margin-top: 2px;
            }
        }

        .comment-actions {
            display: flex;
            gap: 12px;
            font-size: 12px;
            color: #bbb;

            // 点赞样式
            .like-wrapper {
                display: flex;
                align-items: center;
                gap: 4px;
                cursor: pointer;
                padding: 2px 6px;
                border-radius: 4px;
                transition: background-color 0.2s;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.05);
                }

                .like-icon {
                    width: 14px;
                    height: 14px;
                }

                .like-count {
                    font-size: 12px;
                    user-select: none;
                }
            }

            // 热度样式
            .hot-indicator {
                display: flex;
                align-items: center;
                gap: 4px;
                color: #ffb347; // 更柔和的橙色
                opacity: 0.8;

                .hot-icon {
                    width: 12px;
                    height: 12px;
                }

                .hot-value {
                    font-size: 11px;
                    font-weight: 500;
                    user-select: none;
                }
            }


            .action {
                cursor: pointer;

                &:hover {
                    color: #409eff;
                }
            }
        }

        .reply-box {
            margin-top: 8px;

            .el-input {
                margin-bottom: 4px;
                font-size: 13px;
            }
        }

        .replies {
            margin-top: 8px;
            padding-left: 16px;
            border-left: 2px solid #555;

            .reply-item {
                font-size: 12px;
                margin-bottom: 3px;

                .reply-user {
                    color: #79bbff;
                    margin-right: 4px;
                }
            }
        }
    }

    /* 新增滚动条样式 */
    &::-webkit-scrollbar {
        width: 6px;
        background-color: #2b2b2b;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #f9d202;
        border-radius: 3px;

        &:hover {
            background-color: #fe9900;
        }
    }

    &::-webkit-scrollbar-track {
        background-color: #363636;
    }
}
</style>