<template>
     <div id="text" v-if="visible">
        <p>{{textTitle}}</p>
        <div class="con">
        <scroll-view scroll-y="true" style="height:30vh"  >
          <p>{{textContent}}</p>
        </scroll-view> 
            <div class="close" @click="close"> <i-icon type="close" size="20" color="#fff" /> </div>
        </div>
    </div>
</template>
<script>
import icon from "../../static/iview_dist/components/icon/icon"
export default {
    props:[
       'textContent',
       'textTitle',
       'visible'
    ],
    components:{
        "i-icon": icon
    },
    methods:{
        close(){
            this.$emit("close")
        }
    }
}
</script>
<style lang="less" scoped>


#text{
   z-index: 2;
   position: fixed;
   width: 70vw;
   height: 40vh;
   background-color: rgb(69, 72, 77);;
   top:10vh;
   left:15vw;
   //border-radius: ;
   //text-align: center;
   //box-shadow:4px 4rpx 4rpx 4px rgba(20,100,255,0.17);
   border-radius: 4px 4px 4px 4px;

   p{
       font-size: 32rpx;
       font-family: 'Courier New', Courier, monospace;
       //adding-left: 15vw;
       text-align: center;
       color: #fff;
       padding-top: 2vh;
   }
}
.con{
    position: absolute;
    top:5vh;
    width:60vw;
    left:5vw;
    //overflow-y: auto;
    p{
        text-indent:10px;
        color: #fff;
    }
    .close{
        position: relative;
        left:30vw;
    }

}
</style>