<template>

        <div class="adjust">
             <audio :src="audioItem.audioSrc" :author="audioItem.audioSinger" :name="audioItem.audioName" 
             :poster="audioItem.audioPic" action="audioAction"  controls="true" :id="myaudio" ></audio>

              <div class="ios" v-if="isIos" >
                 <!-- <i-icon v-if="iosvisiable"  type="play" @click="play" size="29" />
                 <i-icon v-if="toiosvisiable" type="suspend" @click="pause" size="29" /> -->
                 <image class="img" v-if="iosvisiable" src="../../static/img/play.png" @click="play"></image>
                 <image class="img" v-else src="../../static/img/pause.png" @click="pause"></image>
             </div>

        </div>

            
</template>

<script>
import icon from "../../static/iview_dist/components/icon/icon"
export default {
    props:[
        'audioItem',
        'myaudio'
    ],
    data() {
        return{
            audioAction: {
            method: 'pause'
            },
            iosvisiable: true,
            toiosvisiable: false,
            a:{},
            isIos:false
        }
    },
     components:{
    "i-icon": icon,
  },
  methods:{
      play() {  
          let sd = this.myaudio
          console.log(sd)
          this.a.play()
          this.iosvisiable = ! this.iosvisiable
          //this.toiosvisiable = true
         
      },
      pause() {
           
             this.a.pause()
           this.iosvisiable = !this.iosvisiable
          
      }
  },
  created(){
      let self = this
      this.a = wx.createAudioContext(this.myaudio)
      wx.getSystemInfo({
            success (res) {
                if(res.model.includes('iPhone')){
                    self.isIos = true
                }
            }
            })
  }
    
}
</script>

<style lang="less" scoped>
    
    .adjust{
        display: flex;
        justify-content: flex-start;
        width:100%;
       // height: 30vh;

    }
    .ios{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 10rpx;
            .img{
                width:  60rpx;
                height: 60rpx;
            }
        }
</style>