<template>
    <div class="head">
         <image src="/static/img/head.png" @click="to" > </image>
        
        <div class="title">飞鱼语音助理</div>
    </div>
</template>
<script>

import { Text,TTS } from "@/utils/wxRequest.js"
import { request } from "@/utils/wxRequest.js"
import iButton from 'iview-mpvue/dist/components/button/button'


export default {

    components:{
        'i-button':iButton
    },
    methods: {
        tomap (){
          
                formatNavigateTo(
					"/pages/map/main" 
				)
           
        },
        toggleLeft1(){
            this.$emit("toggleLeft1")
        },
        to(){
           this.$emit("ToggleLeft1")
           console.log(this)
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

    image{
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


