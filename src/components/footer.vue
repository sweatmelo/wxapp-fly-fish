<template>
	<div class="footer">
		
		<div class="footer-textarea" >
			<div class="setup" @click="Toggle">
				<i-icon type="setup_fill" size="38" color="#80848f" />
			</div>
			<div v-if="!footShow">
        <image src="/static/img/voiceIcon.png" @click="toTxt" />
      </div> 
      <div v-if="footShow">
        <image src="/static/img/inputIcon.png" @click="showIcon" />
      </div>
      <div
				class="voice"
				@touchend="voiceInputEnd"
				@touchstart="voiceInputStart"
				@touchmove="voiceInputMove"
        v-if="footShow"
			>
				按住说话
			</div>
        <input
        v-else
				v-model="textcontent"
				@confirm="sendTextInput($event,transformWrite)"
				type="text"
				
				cursor-spacing="15"
				confirm-type="send"
				:placeholder="optionsText"
				placeholder-style="color:##0e08086e;font-size:29rpx;margin-left:10rpx;"
			/>
			
      <!-- </div> -->
			
		</div>
	</div>
</template>

<script>
import { answerTextz } from "@/utils/wxRequest";
import { Voice } from "@/utils/wxRequest";
import icon from "../../static/iview_dist/components/icon/icon";
import store from '../store'
let voiceing = {
	timeStamp: 0,
	clientY: 0,
	status: "success",
}
const recorderManager = wx.getRecorderManager()
const options = {
	duration: 30000,
	numberOfChannels: 1,
	sampleRate: 16000,
	format: "wav",
	frameSize: 50,
}
export default {
	onUnload() {
		recorderManager.stop();
	},
	data() {
		return {
			footShow: true,
			textcontent: "",
		};
	},
	props: [
		'optionsText',
		'transformWrite',
	],
	components: {
		"i-icon": icon,
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
		});
		/**
		 * 录音结束回调
		 */
		recorderManager.onStop((res) => {
			let that = this;
			let tempSendArr = [];
			let text = "";
			let answer = {};
			let resData = {};
			let tag = true;
			this.$emit("recordEnd");
			if (voiceing.status == "cancel") return;
			const timeStart = wx.getPerformance().now();

			Voice(res.tempFilePath)
				.then((res) => {
					const timeContract = wx.getPerformance().now() - timeStart;
					let voice = {
						text: "",
					};
					let data = JSON.parse(res);
					let voiceData = data.data.data;
					let tag = 1
					voiceData.forEach((item) => {
						if (item.result_id == "0" || item.result_id == "1") {
							tempSendArr.push(item);
						}
					});
					console.log(tempSendArr)
					tempSendArr.forEach((item) => {
						if (item.sub == "iat") {
							that.text = item.text;
							if (
								item.json_args.accent == "dongbeiese" ||
								item.json_args.accent == "shanghainese"
							) {
								tag = false;
								let txtData = {
									text: item.text,
									type: "DongbeiShanghai",
								}
								that.$emit("sendTextInput", txtData)
							//	return;
							}
							else if(item.json_args.language == 'th_TH'||
							item.json_args.language == 'ja_jp'||
							item.json_args.language == 'ru-ru'||
							item.json_args.language == 'en-us') {
								let txtData = {
									text: item.text,
									type: item.json_args.language,
								
								}
								console.log('xs')
								 tag = 0
								that.$emit("JRTVoicetxtAnswer", txtData)
								return
							}
						}
						if (item.sub == "tpp") {
							console.log('tpp')
							that.answer = JSON.parse(item.content)
						}
						resData.text = that.text
						resData.content = that.answer
						resData.time = timeContract
					})
					if (tag) that.$emit("sendContent", resData)
				})
		})
	},
	methods: {
    //设置栏的开关
    Toggle() {
			this.$emit("toggleLeft1");
		},
		showIcon() {
			this.footShow = false;
		},
		toTxt() {
			let that = this;
			that.textcontent = "";
			that.footShow = true;
		},
		sendTextInput(val,type) {
			let accent = store.state.current.accent
			//console.log(type)
			if(accent == 'ja_jp'||
			accent == 'ru-ru'||
			accent == 'us'||
			accent == 'th_TH') {
				let txt = val.mp.detail.value
				let txtData = {
					text:txt,
					type: accent
				}
				this.textcontent = ''
				console.log(txtData)
				this.$emit("sendTextInput", txtData)
				return
			}

			wx.getNetworkType({
				success(res) {
					if (res.networkType == "none") {
						wx.showModal({
							title: "提示",
							content: "您的网络可能出了点问题",
						})
					}
				},
			})
			if(this.transformWrite == true ) {
				console.log(this.transformWrite)
					let txt = val.mp.detail.value
					this.textcontent = ""
					console.log(txt)
				 this.$emit('handleMessage',txt)
				 return
			} else {
					let txt = val.mp.detail.value
			if (txt == undefined || txt == "") {
				return
			}
			this.textcontent = ""
			let txtData = {
				text: txt,
				type: "textInput",
			}
			this.$emit("sendTextInput", txtData);
			}
				//console.log('发送')
		},
		/** 同sendTextInput方法 */
		// send() {
		// 	wx.getNetworkType({
		// 		success(res) {
		// 			if (res.networkType == "none") {
		// 				wx.showModal({
		// 					title: "提示",
		// 					content: "您的网络可能出了点问题",
		// 				});
		// 			}
		// 		},
		// 	});
		// 	if (this.textcontent == "") return;
		// 	let that = this;
		// 	let txtData = {
		// 		text: that.textcontent,
		// 		type: "textInput",
		// 	};
		// 	that.$emit("sendTextInput", txtData);
		// 	that.textcontent = "";
		// },

		voiceInputStart(event) {
			this.$emit("recordStart"); //录音图标 this.tts暂停
			voiceing.status = "start";
			recorderManager.start(options);
			voiceing.clientY = event.clientY;
			voiceing.timeStamp = new Date().getTime();
		},
		voiceInputEnd() {
			this.$emit("recordEnd")
			wx.getNetworkType({
				success(res) {
					if (res.networkType == "none") {
						wx.showModal({
							title: "提示",
							content: "您的网络可能出了点问题",
						});
					}
				},
			});
			if (new Date().getTime() - voiceing.timeStamp < 400) {
				voiceing.status = "end";
				recorderManager.stop();
				wx.showToast({
					title: "说话时间太短",
					duration: 1000,
					icon: "none",
				});
			} else {
				if (voiceing.status == "start") {
					wx.showToast({
						title: "说话时间太短",
						duration: 1000,
						icon: "none",
					});
					voiceing.status = "end";
				}
				recorderManager.stop();
			}
		},
		voiceInputMove(event) {
			if (voiceing.clientY - event.clientY > 50) {
				voiceing.status = "cancel"
				recorderManager.stop()
				let that = this
				that.$emit("recordEnd")
			}
		},
	},
};
</script>

<style lang="less" scoped>
@import url("../../static/css/base.css");
.footer {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: absolute;
	left: 0;
	top: 0;
}
.footer-textarea {
  display: flex;
	justify-content: space-evenly;
  align-items: center;
  flex:1;
}

.footer-textarea  input {
  width: 60vw;
  height: 6vh;
	justify-items: flex-end;
	background-color: rgba(3, 17, 17, 0.164);
}

.footer-textarea image {
	width: 10vw;
	height: 71rpx;
}
.setup {
  align-self: center;
  border-right: 1px solid #ccc;
  padding-right: 1vw;
}



.voice {
	
	width: 58vw;
	height: 6vh;
	font-size: 30rpx;
	text-align: center;
	line-height: 6vh;
	background-color: #2d8cf0;
	border-radius: 15px 15px 15px 15px;
}

.footer-voice image {
	margin-top: 8rpx;
	margin-left: 5vw;
	width: 70rpx;
	height: 70rpx;
}
</style>



