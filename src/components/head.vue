<template>
  <div class="head">
   
    <image src="/static/img/2.png" class="image" @click="scrollTop" />
    <div class="title">飞鱼语音助理</div> 
    <div class ="setup"  @click="ToggleLeft1"><i-icon type="setup" size="38" color="#80848f" /></div>
  </div>
</template>
<script>
import { Text, TTS } from "@/utils/wxRequest.js";
import icon from "../../static/iview_dist/components/icon/icon"

export default {
  methods: {
    ToggleLeft1() {
      //console.log('12')
      this.$emit("ToggleLeft1")
    },
    scrollTop() {
      console.log('top')
      this.$emit("scrollTop")
    }
  },
  mounted() {
  },
  components:{
    "i-icon": icon,
  }
}
</script>


<style lang="less" scoped>
.head {
  width: 100%;
  height: 8vh;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index:1;
  border: 1px solid rgba(4, 4, 20, 0.356);

  image {

    top: 1vh;
    left: 20rpx;
    width: 80rpx;
    height: 80rpx;
    margin-left: 1vw;
   
  }
  .setup {
    align-self: center;
  }

  .title {
   //margin-left:18vw;
  }
}
</style>


