<template>
    <!-- 第一分类 -->
    <div class="kindclass">
        <div class="title">
            <div class="title_left">XXXXX</div>
            <div class="title_right">查看更多 ></div>
        </div>
        <CarComp v-for="item in KindObj" :key="item.login" :message="item" class="cardOne"></CarComp>
    </div>
    <!-- 第二分类 -->
    <div class="kindclass">
        <div class="title">
            <div class="title_left">XXXXX</div>
            <div class="title_right">查看更多 ></div>
        </div>
        <CarComp v-for="item in KindObj" :key="item.login" :message="item" class="cardOne"></CarComp>
    </div>
    <!-- 第三分类 -->
    <div class="kindclass">
        <div class="title">
            <div class="title_left">XXXXX</div>
            <div class="title_right">查看更多 ></div>
        </div>
        <CarComp v-for="item in KindObj" :key="item.login" :message="item" class="cardOne"></CarComp>
    </div>
</template>

<script>
import CarComp from './comp/index.vue'
export default {
    name: "ListClass",
    setup() {
        // 数据集合
        const KindObj = [{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },{ class: '第一类', login: 1,path:'/video',id:'11223' },  ]

        return { KindObj }
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
.title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
    .title_left{
        font-size: 30px;
    }
    .title_right{
    height: 30px;
    line-height: 30px; /* 行高等于高度 */
    text-align: center; 
    padding: 5px;
    background-color: red;
    border-radius: 10px;
    margin-top: 2px;
    color: #e5e5e5;
    }
}
</style>