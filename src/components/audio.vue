<template>

  <div class="audioPage" v-if="audioVisible" >
       
         <audio :src="audioSrc" :author="audioSinger" :name="audioname" id="myAudio" :poster="audiopic" controls=true></audio>    

    </div> 
</template>

<script>

export default {
 
  mounted() {
          //this.audioCtx = wx.createAudioContext('myAudio')
          this.$httpWX.postaudio({
					url: '/athena/iss?ver=3.1&method=query&open.dialog=true&text=%E5%90%AC%E5%91%A8%E6%9D%B0%E4%BC%A6%E7%9A%84%E5%8F%8C%E8%8A%82%E6%A3%8D&appid=587ed53b&uid=6112102&debug=true&procedure=nlu',
          data: {}             
           }).then(res => {
                    this.audioSinger = res.data.result[0].singerName  //歌手
                    this.audioSrc = res.data.result[0].playUrl  //播放地址
                    this.audiopic = res.data.result[0].picMin   //专辑图片
                    this.audioname= res.data.result[0].songName
                   })
  },

   beforeDestroy() {
     this.audioCtx = null
   },
   props:[
       'audioVisible'
   ],

  data() {
    return {
     audioSrc: '',
     audioSinger: '',
     audiopic: '',
     audioname:'',
      key :'6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD', //腾讯地图导航申请的 key

    };
  },

  methods: {
      closeMask(){
          this.$emit('close')
          this.audioCtx = null
          // this.videoContext.pause()
      },

//   guide() {
//      let plugin = requirePlugin('routePlan')
//      //https://lbs.qq.com/dev/console/key/manage  配置webservice ip 网址
//      //使用在腾讯位置服务申请的key
//     let referer = 'motormaster' //调用插件的app的名称
//     let endPoint = JSON.stringify({  //终点
//     'name': '之心城购物中心',
//     'latitude': 31.85406517335539,
//     'longitude': 117.257397424867
//       })

//     wx.navigateTo({
//     url: 'plugin://routePlan/index?key=' + this.key+ '&referer=' + referer + '&endPoint=' + endPoint  //'&navigation=1'
//     })
//   },
  
//   mkphone() {
//     wx.makePhoneCall({
//     phoneNumber: '17355187010' 
//     })
//   },

//   todetail() {
//    formatNavigateTo(
// 					"/pages/detail/main" 
// 				);
//   }

      
   },

}



</script>
<style lang="less" scoped>
.audioPage{
  position: absolute;
  background: #F8FAFF;
  margin-top: 125rpx;
  

    // .gui-btn{
    //  display: flex;
    //  margin-top: 50rpx;
    //  flex:1;
    
    // .button{
    //   width: 35vh;
    // }
    // }
}

</style>