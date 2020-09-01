<template>
  <div class="footer">
    <div class="footer-voice flexRowAlign" v-if="footShow">
      <image src="/static/img/inputIcon.png" @click="showIcon" />
      <!--  <div class="voice flexRowJustify"><img src="/static/img/yuyin.png" alt="" @touchend="voiceInputEnd" @touchstart="voiceInputStart" @touchmove="voiceInputMove" ></div> -->
      <div
        class="voice flexRowJustify"
        @touchend="voiceInputEnd"
        @touchstart="voiceInputStart"
        @touchmove="voiceInputMove"
      >按住说话</div>
    </div>
    <div class="footer-textarea flexRowAlign" v-if="!footShow">
      <image src="/static/img/voiceIcon.png" @click="toTxt" />
      <input
        v-model="textcontent"
        @confirm="sendTextInput($event,'textInput')"
        type="text"
        cursor-spacing="15"
        confirm-type="send"
        placeholder="输入你想知道的问题"
        placeholder-style="color:##0e08086e;font-size:28rpx;margin-left:10rpx;"
      />

      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script>
import { answerTextz } from "@/utils/wxRequest";
import { Voice } from "@/utils/wxRequest";
let voiceing = {
  timeStamp: 0,
  clientY: 0,
  status: "success"
};
const recorderManager = wx.getRecorderManager();
const options = {
  duration: 30000,
  numberOfChannels: 1,
  sampleRate: 16000,
  format: "wav",
  frameSize: 50
};
export default {
  onUnload() {
    recorderManager.stop();
  },
  data() {
    return {
      footShow: true,
      textcontent: ""
    };
  },
  mounted() {
	  /**
	   * 录音开始回调
	   */
    recorderManager.onStart(() => {  
      let that = this;
      if (voiceing.status == "end") {
        recorderManager.stop();
      } else {
        voiceing.status = "success";
        wx.vibrateShort();
        that.$emit("recordStart");
      }
	})
	/**
	 * 录音结束回调
	 */
    recorderManager.onStop(res => {
      let that = this
      let tempSendArr = []
      let text = ""
      let answer = {}
      let resData = {}
      this.$emit("recordEnd")
      if (voiceing.status == "cancel") return
      const timeStart = wx.getPerformance().now()
      
      Voice(res.tempFilePath).then(res => {
        const timeContract = wx.getPerformance().now() - timeStart
        let voice = {
          text: ""
        }
        let data = JSON.parse(res)
        let voiceData = data.data.data
        voiceData.forEach(item => {
          if (item.result_id == "0" || item.result_id == "1") {
            tempSendArr.push(item)
          }
        })
        console.log(tempSendArr)
        tempSendArr.forEach(item => {
          if (item.sub == "iat") {
            that.text = item.text
          }
          if (item.sub == "tpp") {
            that.answer = JSON.parse(item.content)
          }
          resData.text = that.text
          resData.content = that.answer
          resData.time = timeContract
        })
        that.$emit("sendContent", resData)
      }).catch( err =>{
        console.log('错误')
          resData.text = "抱歉，可能出了点问题"
          resData.content = err ? err : {}
          resData.time = timeContract
          resData.flag = 1
          that.$emit("sendContent", resData)
      })
    })
  },
  methods: {
    //控制显示图标
    showIcon() {
      this.footShow = false
    },
    toTxt() {
      let that = this;
      that.textcontent = ""
      that.footShow = true
	},
    sendTextInput(val) {
		//根据网络状态提示
		wx.getNetworkType({
        success(res) {
          if (res.networkType == "none") {
            wx.showModal({
              title: "提示",
              content: "您的网络可能出了点问题"
            });
          }
        }
      })
      let txt = val.mp.detail.value;
      if (txt == undefined || txt == "") {
        return;
      }
      let txtData = {
        text: txt,
        type: "textInput"
      }
      this.$emit("sendTextInput", txtData)
      this.textcontent = ""
      this.footShow = false
    },
    /** 同sendTextInput方法 */
    send() {
      wx.getNetworkType({
        success(res) {
          if (res.networkType == "none") {
            wx.showModal({
              title: "提示",
              content: "您的网络可能出了点问题"
            })
          }
        }
      })
      if (this.textcontent == "") return
      let that = this;
      let txtData = {
        text: that.textcontent,
        type: "textInput"
      };
      that.$emit("sendTextInput", txtData)
      that.textcontent = ""
    },

    voiceInputStart(event) {
      this.$emit("recordStart") //录音图标 this.tts暂停
      voiceing.status = "start"
      recorderManager.start(options)
      voiceing.clientY = event.clientY
      voiceing.timeStamp = new Date().getTime();
    },
    voiceInputEnd() {
      this.$emit("recordEnd");
      wx.getNetworkType({
        success(res) {
          if (res.networkType == "none") {
            wx.showModal({
              title: "提示",
              content: "您的网络可能出了点问题"
            })
          }
        }
      })
      if (new Date().getTime() - voiceing.timeStamp < 400) {
        voiceing.status = "end"
        recorderManager.stop()
        wx.showToast({
          title: "说话时间太短",
          duration: 1000,
          icon: "none"
        })
      } else {
        if (voiceing.status == "start") {
          wx.showToast({
            title: "说话时间太短",
            duration: 1000,
            icon: "none"
          })
          voiceing.status = "end"
        }
        recorderManager.stop()
      }
    },
    voiceInputMove(event) {
      if (voiceing.clientY - event.clientY > 50) {
        voiceing.status = "cancel"
        recorderManager.stop()
        let that = this;
        that.$emit("recordEnd")
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../static/css/base.css");
.footer {
  height: 100%;
  width: 100%;
  //background-color: #ffff88;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 0;
}

.footer-textarea input {
  margin-top: 8rpx;
  margin-left: 2vw;
  margin-right: 20rpx;
  width: 60vw;
  height: 50%;
  background-color: rgba(3, 17, 17, 0.164);
}

.footer-textarea image {
  margin-top: 8rpx;
  margin-left: 2vw;
  margin-right: 20rpx;
  width: 10vw;
  height: 71rpx;
}
.footer-textarea button {
  margin-top: 8rpx;
  margin-left: 2vw;
  width: 17vw;
  height: 70rpx;
  background-color: #2d8cf0;
  text-align: center;
  font-size: 25rpx;
  line-height: 70rpx;
}

.voice {
  margin-top: 8rpx;
  margin-left: 8vw;
  width: 58vw;
  height: 75rpx;
  font-size: 30rpx;
  text-align: center;
  line-height: 70rpx;
  background-color:#2d8cf0;
  border-radius: 15px 15px 15px 15px;
}

.footer-voice image {
  margin-top: 8rpx;
  margin-left: 5vw;
  width: 70rpx;
  height: 70rpx;
}
</style>



