<template>
  <div class="audioPage" >
      <div class="audioCont">
<!--         <audio :src="audioSrc" :author="audioSinger" :name="audioSinger" id="myAudio" :poster="audiopic" controls loop></audio>  -->
         <button @click="guide">测试导航</button>
      </div>
      <!-- <div class="map">
          <button @click="nearby_search">搜索周边KFC</button>
                <map id="myMap"
                 :markers="markers"
                style="width:600rpx;height:500rpx;"
                v-if="show"
                longitude="116.313972"
                latitude="39.980014" scale='16'>
               </map>

      </div> -->
      
  </div>

  

</template>

<script>
import qqmapwx from "../../utils/qqmap-wx-jssdk"
//import md5 from 'js-md5';



export default {

  components: {},
  // props: [
  //     'videoVisible',
  //     'videoSrc'
  // ],
  onHide() {
    this.audioCtx = null
  },
  data() {
    return {
     audioSrc:'',
     audioSinger:'',
     audiopic:'',
     show: false,
      key :'6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD',
    };
  },
  methods: {
      // closeMask(){
      //     this.$emit('close')
      //     this.audioCtx = null
      //     // this.videoContext.pause()
      // },

// 事件触发，调用接口
      guide() {
     let plugin = requirePlugin('routePlan');
     
 //使用在腾讯位置服务申请的key
    let referer = 'motormaster';   //调用插件的app的名称
     let endPoint = JSON.stringify({  //终点
    'name': '吉野家(北京西站北口店)',
    'latitude': 39.89631551,
    'longitude': 116.323459711
  });
  //let Key = 6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD&location=39.89631551, 116.323459711
  //let SIG = md5("plugin://routePlan/index?key=6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD&location=39.89631551, 116.323459711SWvT26ypwq5Nwb5RvS8cLi6NSoH8HlJX")
  //PXbfnyRLd6dimBHkcL3Mz3NfmtTvoKj
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + this.key+ '&referer=' + referer + '&endPoint=' + endPoint +'&navigation=1'
      
    });
      },
      
  },
  created() {
  },
//   mounted() {
// this.audioCtx = wx.createAudioContext('myAudio')
//       this.$httpWX.postaudio({
// 					url: '/athena/iss?ver=3.1&method=query&open.dialog=true&text=%E5%90%AC%E5%91%A8%E6%9D%B0%E4%BC%A6%E7%9A%84%E5%8F%8C%E8%8A%82%E6%A3%8D&appid=587ed53b&uid=6112102&debug=true&procedure=nlu',
// 					data: {}
// 				}).then(res => {
//                     this.audioSinger = res.data.result[0].singerName
//                     this.audioSrc = res.data.result[0].playUrl
//                     this.audiopic = res.data.result[0].picMin
                   
//                 })
//   }
 }



</script>
<style lang="less" scoped>
.audioPage{
    height: 100%;
    width:100%; 
    position: relative;
    left:0;
    top:0;
    
    z-index: 222;
    display: flex;
    justify-content: center;
    .audioCont{
        width: 100%;
        display: flex;
        align-items: center;
        top:200rpx;
        audio {
            width: 100%;
            height: 435rpx;
            display: inline-block;
            line-height: 0;
            overflow: hidden;
            position: relative;
            z-index: 0;
         }
    }
}

</style>