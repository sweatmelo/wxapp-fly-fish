<template>
    <div class="head">
         <img src="/static/img/head.png" > 
        <div class="title">飞鱼语音助理</div>
    </div>
</template>
<script>
import { formatNavigateTo,hex_sha1,sha1} from "@/utils/index"
import { Text,TTS } from "@/utils/wxRequest.js"
import { request } from "@/utils/wxRequest.js"


export default {
    methods: {
        tomap (){
          
                formatNavigateTo(
					"/pages/map/main" 
				)
           
        }
    },
    mounted() { 
        //   TTS('今晚月亮好圆啊').then(res =>{
        //       console.log(res)
        //       innerAudioContext.src =res.data.data
        //       innerAudioContext.autoplay = true
        //   }).catch(err =>{
        //       console.log(err)
        //   })

          //innerAudioContext.src =
    }
   
}

</script>


<style lang="less" scoped>
.head{
    width: 100%;
    height: 8vh;
    position: relative;
    display: flex;
    justify-content: left;
    border: 1px solid rgba(4, 4, 20, 0.356);

    img{
        position:absolute;
        top: 1vh;
        left:20rpx;
        width: 80rpx;
        height: 80rpx;
    }

    .title{
        position:absolute;
        margin: 20rpx 150rpx;
    }
}
</style>


