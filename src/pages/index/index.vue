<template>
  <div class="home-contaniner">
    <record-voice v-if="isVoicing"></record-voice>

    <i-message ref="message" />

    <div class="home-chat">
      <i-drawer mode="left" :visible="showLeft1" :mask-closable="false">
        <div style="position: absolute; top:-47vh; width:50vw">
          <i-button v-on:click="ToggleLeft1" size="small" type="info">关闭</i-button>
        </div>
        <div style="position:absolute;  top:-36vh; left:5vw;font-size:33rpx; width:50vw">设置</div>
        <div style="position: absolute; top:-32vh; width:50vw">
          <div class="caption-wrap">
            <i-collapse :name="name">
              <i-collapse-item title="方言" name="name1">
                <div slot="content">
                  <i-panel>
                    <i-radio-group
                      @change="handlefangYanChange"
                      :current="current"
                      :groups="fangYan"
                      :position="position"
                    ></i-radio-group>
                  </i-panel>
                </div>
              </i-collapse-item>
              <i-collapse-item title="单说模式" name="name2">
                <div slot="content">
                  <div style=" display:flex;  justify-content: space-between;">
                    <label style="font-size:35rpx">单说模式</label>
                    <switch :checked="dsSwitch" @change="switch1Change" color="#2DB7F5" />
                  </div>
                </div>
              </i-collapse-item>
              <i-collapse-item title="TTS播报" name="name3">
                <div slot="content">
                  <div style=" display:flex;  justify-content: space-between;">
                    <label style="font-size:35rpx">TTS</label>
                    <switch :checked="ttsSwitch" @change="switch2Change" color="#2DB7F5" />
                  </div>
                </div>
              </i-collapse-item>
              <!-- <i-collapse-item title="清除对话历史" name="name2">
                    <div slot="content">
                     <i-button v-on:click="ToggleLeft1" size="small" type="info">清除</i-button>
                    </div>
              </i-collapse-item>-->
            </i-collapse>
          </div>
        </div>
      </i-drawer>
      <!-- 头部 -->
      <div class="iconheadBox">
        <head-detail @ToggleLeft1="ToggleLeft1" @scrollTop="scrollTop"></head-detail>
      </div>
      <div class="home-content">
        <scroll-view
          scroll-y="true"
          :style="{'height':'82vh'}" 
          class="scrollWidth"
          :scroll-into-view="toView"
          enhanced='true'
          scroll-top="0"
         scroll-with-animation = "true"
        >
          
          <i-message ref="message" />
          <!-- 设置栏抽屉 -->
          <div class="chat-box" v-for="(chat,ind) in chatBoxData" :key="ind">
            <!--左侧文字输入问题显示-->
            <div class="text-input-column column" v-if="chat.type == '1'">
              <img src="/static/img/client.png" style="float:right; width:100rpx;height:100rpx" />
              <div class="v_me">{{chat.text}}</div>
            </div>
            <!-- music -->
            <div class="audioPage" v-if="chat.type == '2' ">             
              <audio-ios :audioItem="chat" :myaudio="`myaudio${ind}`"></audio-ios>
            </div>
            <!-- 提示语回答 -->
            <div
              class="text_show"
              style="margin-top: 68rpx; margin-left: 8rpx"
              v-if="chat.type == '3'"
            >
              <img
                src="/static/img/xf.png"
                style="float:left; width:100rpx;height:100rpx;margin-top:-50rpx"
              />
              <div class="dialogBox">
                 <p class="titleAnswer"  @click="detail(chat.intent)">
                 <wxParse :content="chat.textDesc" /></p>
                <p
                  v-if="chat.time"
                  style="font-size:20rpx; margin-left:290rpx; display:flex; color:rgba(223, 223, 240, 0.801);"
                >
                  {{chat.time}}ms
                  <i-icon type="time_fill" size="18" color="#80848f" />
                </p>
              </div>
              <div class="agreeBox">
                <div class="smallAgreeBox">
                  <div class="zan" @click="handleType(chat,'yes',ind)">
                    <img
                      src="/static/img/agreeNo.png"
                      style="width:50rpx;height:50rpx"
                      v-if="!chat.isAgree"
                    />
                    <img src="/static/img/agree.png" style="width:50rpx;height:50rpx" v-else />
                    <span>赞</span>
                  </div>
                  <div class="cai" @click="handleType(chat,'no',ind)">
                    <img
                      src="/static/img/disAgreeNo.png"
                      style="width:50rpx;height:50rpx"
                      v-if="!chat.isDisAgree"
                    />
                    <img src="/static/img/disAgree.png" style="width:50rpx;height:50rpx" v-else />
                    <span>踩</span>
                  </div>
                </div>
              </div>
              <swiper
                
                  :interval="3000"
                  :duration="1000"
                  :circular="true"
                  style="height:5rpx;"
                >
              </swiper>
            </div>

            <div style="margin-top: 68rpx; margin-left: 8rpx" v-if="chat.type == '0'">
              <img
                src="/static/img/xf.png"
                style="float:left; width:100rpx;height:100rpx;margin-top:-50rpx"
              />
              <div class="dialogBox" @click="detail(chat.intent)">
                <p class="titleAnswer">{{chat.textDesc}}</p>
                <p
                  v-if="chat.time"
                  style="font-size:20rpx; margin-left:290rpx; display:flex; color:rgba(223, 223, 240, 0.801);"
                >
                  {{chat.time}}ms
                  <i-icon type="time_fill" size="18" color="#80848f" />
                </p>
              </div>
            </div>
            <!-- telephone -->
            <div style="margin-top: 28rpx; margin-left: 8rpx" v-if="chat.type == '5'">
              <img
                src="/static/img/xf.png"
                style="float:left; width:100rpx;height:100rpx;margin-top:-50rpx"
              />
              <div class="dialogBoxDial">
                <p class="titleAnswer" @click="detail(chat.intent)">{{chat.textDesc}}</p>
                <p
                  style="font-size:20rpx; margin-left:350rpx; display:flex; color:rgba(223, 223, 240, 0.801);"
                >
                  {{chat.time}}ms
                  <i-icon type="time_fill" size="18" color="#80848f" />
                </p>
                <div style="float:left;margin-top:-20rpx; margin-left:30rpx;">
                  <button class="mini-btn" type="primary" size="mini" @click="toDial(chat.code)">拨打</button>
                </div>
              </div>
              <div class="agreeBox">
                <div class="smallAgreeBox">
                  <div class="zan" @click="handleType(chat,'yes',ind)">
                    <img
                      src="/static/img/agreeNo.png"
                      style="width:50rpx;height:50rpx"
                      v-if="!chat.isAgree"
                    />
                    <img src="/static/img/agree.png" style="width:50rpx;height:50rpx" v-else />
                    <span>赞</span>
                  </div>
                  <div class="cai" @click="handleType(chat,'no',ind)">
                    <img
                      src="/static/img/disAgreeNo.png"
                      style="width:50rpx;height:50rpx"
                      v-if="!chat.isDisAgree"
                    />
                    <img src="/static/img/disAgree.png" style="width:50rpx;height:50rpx" v-else />
                    <span>踩</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- mapU -->
            <div style="margin-top:28rpx; margin-left: 25rpx; " v-if="chat.type == '4' ">
              <img
                src="/static/img/xf.png"
                style="float:left; width:100rpx;height:100rpx;margin-top:-50rpx"
              />
              <div class="dialogBox">
                <p class="titleAnswer" @click="detail(chat.intent)">{{chat.textDesc}}</p>
                <p
                  style="font-size:20rpx; margin-left:285rpx; display:flex; color:rgba(223, 223, 240, 0.801);"
                >
                  {{chat.time}}ms
                  <i-icon type="time_fill" size="18" color="#80848f" />
                </p>
              </div>
              <div class="agreeBox">
                <div class="smallAgreeBox">
                  <div class="zan" @click="handleType(chat,'yes',ind)">
                    <img
                      src="/static/img/agreeNo.png"
                      style="width:50rpx;height:50rpx"
                      v-if="!chat.isAgree"
                    />
                    <img src="/static/img/agree.png" style="width:50rpx;height:50rpx" v-else />
                    <span>赞</span>
                  </div>
                  <div class="cai" @click="handleType(chat,'no',ind)">
                    <img
                      src="/static/img/disAgreeNo.png"
                      style="width:50rpx;height:50rpx"
                      v-if="!chat.isDisAgree"
                    />
                    <img src="/static/img/disAgree.png" style="width:50rpx;height:50rpx" v-else />
                    <span>踩</span>
                  </div>
                </div>
              </div>
              <!-- 五条数据以上分页 -->
              <div v-if="chat.simData.length>=5">
                <swiper
                  :indicator-dots="true"
                  :interval="3000"
                  :duration="1000"
                  :circular="true"
                  style="height:500rpx;"
                >
                  <swiper-item v-for="(add,index) in chat.data" :key="index">
                    <div
                      v-for="(add1,index1) in add"
                      :key="index1"
                      class="mapDetail"
                      @click="toMap(add1)"
                    >
                      <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                      <div style="margin-left: 8vw; float:left; max-height:70rpx">
                        <span
                          style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                        >{{add1.name}}</span>
                        <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                          <span
                            style="display:block;max-width:360rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                          >{{add1.address}}</span>
                        </div>
                      </div>
                      <div
                        style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                      >{{add1.distance }}</div>
                    </div>
                  </swiper-item>
                </swiper>
              </div>
              <!-- 一页展示 -->
              <div v-else>
                <div
                  v-for="(add1,index1) in chat.simData"
                  :key="index1"
                  class="mapDetail"
                  @click="toMap(add1)"
                >
                  <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                  <div style="margin-left: 8vw; float:left; max-height:70rpx">
                    <span
                      style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                    >{{add1.name}}</span>
                    <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                      <span
                        style="display:block;max-width:330rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                      >{{add1.address}}</span>
                    </div>
                  </div>
                  <div
                    style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                  >{{add1.distance }}</div>
                </div>
              </div>
            </div>
            <!-- flight -->
            <div style="margin-top:28rpx; margin-left: 25rpx; " v-if="chat.type == '8' ">
              <div v-if="chat.simData.length>=5">
                <swiper
                  :indicator-dots="true"
                  :interval="3000"
                  :duration="1000"
                  :circular="true"
                  style="height:500rpx;"
                >
                  <swiper-item v-for="(add,index) in chat.data" :key="index">
                    <div v-for="(add1,index1) in add" :key="index1" class="mapDetail">
                      <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                      <div style="margin-left: 8vw; float:left; max-height:70rpx">
                        <span
                          style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                        >{{add1.departCity}}--->{{add1.arriveCity}}</span>
                        <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                          <span
                            style="display:block;max-width:360rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                          >{{add1.startTime}}</span>
                        </div>
                      </div>
                      <div
                        style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                      >{{add1.flightInfo }}</div>
                    </div>
                  </swiper-item>
                </swiper>
              </div>
              <div v-else>
                <div v-for="(add1,index1) in chat.simData" :key="index1" class="mapDetail">
                  <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                  <div style="margin-left: 8vw; float:left; max-height:70rpx">
                    <span
                      style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                    >{{add1.departCity}}--->{{add1.arriveCity}}</span>
                    <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                      <span
                        style="display:block;max-width:330rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                      >{{add1.startTime}}</span>
                    </div>
                  </div>
                  <div
                    style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                  >{{add1.flightInfo}}</div>
                </div>
              </div>
            </div>
            <!-- train -->
            <div style="margin-top:28rpx; margin-left: 25rpx; " v-if="chat.type == '7' ">
              <div v-if="chat.simData.length>=5">
                <swiper
                  :indicator-dots="true"
                  :interval="3000"
                  :duration="1000"
                  :circular="true"
                  style="height:500rpx;"
                >
                  <swiper-item v-for="(add,index) in chat.data" :key="index">
                    <div v-for="(add1,index1) in add" :key="index1" class="mapDetail">
                      <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                      <div style="margin-left: 8vw; float:left; max-height:70rpx">
                        <span
                          style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                        >{{add1.originStation}}--->{{add1.terminalStation}}</span>
                        <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                          <span
                            style="display:block;max-width:360rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                          >{{add1.startTime}}</span>
                        </div>
                      </div>
                      <div
                        style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                      >{{add1.trainNo }}</div>
                    </div>
                  </swiper-item>
                </swiper>
              </div>
              <div v-else>
                <div v-for="(add1,index1) in chat.simData" :key="index1" class="mapDetail">
                  <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                  <div style="margin-left: 8vw; float:left; max-height:70rpx">
                    <span
                      style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                    >{{add1.originStation}}--->{{add1.terminalStation}}</span>
                    <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                      <span
                        style="display:block;max-width:330rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                      >{{add1.startTime}}</span>
                    </div>
                  </div>
                  <div
                    style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                  >{{add1.trainNo }}</div>
                </div>
              </div>
            </div>

            <!-- joke story -->
            <div style="margin-top:28rpx; margin-left: 25rpx; " v-if="chat.type == '9' ">
              <div v-if="chat.simData.length>=5">
                <swiper
                  :indicator-dots="true"
                  :interval="3000"
                  :duration="1000"
                  :circular="true"
                  style="height:500rpx;"
                >
                  <swiper-item v-for="(add,index) in chat.data" :key="index">
                    <div
                      v-for="(add1,index1) in add"
                      :key="index1"
                      class="mapDetail"
                      @click="toStoryJoke(add1)"
                    >
                      <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                      <div style="margin-left: 8vw; float:left; max-height:70rpx">
                        <span
                          style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                        >{{add1.title}}</span>
                        <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                          <span
                            style="display:block;max-width:360rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                          >{{add1.content}}</span>
                        </div>
                      </div>
                      <div
                        style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                      >{{add1.category}}</div>
                    </div>
                  </swiper-item>
                </swiper>
              </div>
              <div v-else>
                <div v-for="(add1,index1) in chat.simData" :key="index1" class="mapDetail">
                  <div style="float:left; margin-left:4vw; margin-top:1vh;">{{add1.list}}</div>
                  <div style="margin-left: 8vw; float:left; max-height:70rpx">
                    <span
                      style="display:block;max-width:300rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:30rpx;"
                    >{{add1.title}}</span>
                    <div style="margin-top:9rpx; max-width:200rpx; min-width: 0">
                      <span
                        style="display:block;max-width:330rpx;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;font-size:20rpx;"
                      >{{add1.content}}</span>
                    </div>
                  </div>
                  <div
                    style=" margin-right: 4vw;float:right;font-size:18rpx;margin-top:2vh;"
                  >{{add1.category }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 定位锚点 -->
          <div :id="'bottom' + chatBoxData.length" style="height:5rpx; margin-top:-30rpx"></div>
        </scroll-view>
      </div>
    </div>
    <!-- 底部交互 -->
    <div class="fotterBox">
      <foot-component
        @sendContent="sendContent"
        @sendTextInput="sendTextInput"
        @recordStart="recordStart"
        @recordEnd="recordEnd"
      ></foot-component>
    </div>
    <!-- <div style="height: 60rpx;background-color: #F8FAFF;width: 100vw" v-if="isIphoneX"></div> -->
    <!--文字和图片答案的详情-->
    <text-detail
      :visible="textData.visible"
      @close="textData.visible = false"
      :textTitle="textData.title"
      :textContent="textData.content"
    ></text-detail>
    <!--	<video-detail :videoVisible="videoShow" :videoSrc="videoCompentSrc" @close="videoShow = false"></video-detail>
    <mb-detail :modelVisible="mbVisible" @close="mbVisible = false" :modelData="modelData"></mb-detail>-->
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
import recordVoice from "@/components/recording"
import audioIos  from '@/components/audioIOS'
import footComponent from "@/components/footer"
import { answerTextz, program, TTS,Text } from "@/utils/wxRequest"
import { formatNavigateTo } from "@/utils/index"
import headDetail from "@/components/head"
import iButton from "../../../static/dist/components/button/button"
import iDrawer from "../../../static/dist/components/drawer/drawer"
import iRadioGroup from "../../../static/dist/components/radio-group/radio-group"
import iCollapse from "../../../static/dist/components/collapse/collapse"
import iCollapseItem from "../../../static/dist/components/collapse-item/collapse-item"
import iSwitch from "../../../static/dist/components/switch/switch"
import iMessage from "../../../static/dist/components/message/message"
import iModal from "../../../static/dist/components/modal/modal"
import icon from "../../../static/dist/components/icon/icon"
import store from "../../store"
import textDetail from "@/components/textDetail"
import { $Message } from '../../../static/dist/components/base/index'


let QQMapWX = require("../../utils/qqmap-wx-jssdk.js").default //查询城市
let qqmapsdk = new QQMapWX({
  key: "6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD"
})
//技能列表
const service = [
  { key: "airControl", value: "空调" },
  { key: "animalCries", value: "动物叫" },
  { key: "app", value: "应用" },
  { key: "calc", value: "计算" },
  { key: "carCare", value: "车服务" },
  { key: "cmd", value: "命令" },
  { key: "constellation", value: "星座" },
  { key: "datetime", value: "时间" },
  //{ key: "flight", value: "航班" },
  { key: "haidilao", value: "海底捞" },
  { key: "help", value: "帮助" },
  { key: "idiom", value: "成语" },
  { key: "idiomGame", value: "成语接龙游戏" },
  { key: "musicGame", value: "音乐游戏" },
  { key: "motorViolation", value: "违章查询" },
  { key: "mediaControl", value: "媒体控制" },
  { key: "story", value: "故事"},
  //{ key: "mapU", value: "导航" },
  //{ key: "internetRadio", value: "节目" },
  { key: "news", value: "新闻" },
  { key: "personalName", value: "重命名" },
  { key: "poetry", value: "诗词" },
  { key: "poetryGame", value: "对诗游戏" },
  { key: "weixin", value: "微信" },
  { key: "message", value: "短信" },
  { key: "viewCmd", value: "可见即可说" },
  { key: "warmTips", value: "主动提醒" },
  { key: "vehicleInfo", value: "车辆信息" },
  { key: "video", value: "视频" },
  //{ key: "train", value: "火车" },
  { key: "smartHome", value: "智能家居" },
  //{ key: "telephone", value: "电话" },
  { key: "scheduleX", value: "日程安排" },
  { key: "sceneInsurance", value: "场景险" },
  { key: "preResearch", value: "预言" },
  { key: "radio", value: "电台" },
  //{ key: "musicX", value: "音乐" },
  { key: "cityOfPro", value: "国内城市查询" },
  { key: "carControl", value: "车身控制" },
  { key: "carWash", value: "洗车" },
  { key: "carNumber", value: "限行尾号查询" },
  { key: "lottery", value: "彩票" },
  { key: "relationShip", value: "家族关系神器" },
  { key: "chineseZodiac", value: "生肖运势" },
  { key: "canlendar", value: "万年历" },
  { key: "holiday", value: "假期安排" },
  { key: "duoidiomSolita", value: "成语接龙" },
  { key: "Riddle", value: "谜语" },
  { key: "college", value: "高校查询" },
  { key: "cookbook", value: "菜谱" },
  { key: "wordsMeaning", value: "词语解释" },
  { key: "parkingLot", value: "停车场" },
  { key: "gasStation", value: "加油站" },
  { key: "FamilyName", value: "百家姓" },
  { key: "captalInfo", value: "首都查询" },
  { key: "queryCapital", value: "省会查询" },
  { key: "garbageClassif", value: "垃圾分类" },
  { key: "volumeScaler", value: "体积换算" },
  { key: "powerScaler", value: "功率换算" },
  { key: "weather", value:"天气"},
  { key: "areaScaler", value: "面积换算" },
  { key: "numberScaler", value: "进制换算" },
  { key: "weightScaler", value: "重量换算" },
  { key: "temperature", value: "温度换算" },
  { key: "dream", value: "周公解梦" },
  { key: "translation", value: "翻译" },
  { key: "wordFinding", value: "同反义词" },
  { key: "sentenceMaking", value: "造句" },
  { key: "petrolPrice", value: "今日油价" },
  { key: "joke", value: "笑话" },
  { key: "brainTeaser", value: "脑筋急转弯" },
  { key: "stroke", value: "写字笔画" },
  { key: "historyToday", value: "历史上的今天" },
  { key: "forex", value: "汇率查询与货币" },
  { key: "chat", value:"聊天" },
  { key: "changba", value: "唱吧" },
  { key: "stock", value: "股票" },
  { key: "all_smartHome", value: "智能家居" },
  { key: "poetry", value: "诗词" },
  { key: "warmTips", value:"温馨提示" },
  { key: "orderFood", value: "点餐" },
  { key: "datetimeX", value: "日期" },
  { key: "coupletGame", value: "对联游戏" },
  { key: "baike", value: "百科" },
  { key: "AIchannel", value:"AI频道" },
  { key: "playControl", value:"播放控制" },
  { key: "feedback", value: "反馈" },
  { key: "scenicSpots", value: "二次交互" },
  { key: "oilprice", value: "油价" },
  { key: "ppersonalChat", value: "角色问答" },
  { key: "photoView", value:"查看图片" },


];
export default {
  onLoad() {
    this.chatBoxData = [
      {
        type: 0,
        textDesc: "你好，你可以使用文本或者语音跟我对话,点击右上角图标可以进入设置栏~",
      }
    ]
    //页面分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onUnload() {
    this.chatBoxData = []
    
  },
  onPageScroll(e){
   console.log('df')
 },
  data() {
    return {
      isIphoneX: false,
      toView: "bottom0",
      isVoicing: false, //控制正在说话的动画
      isAgree: false,
      isDisAgree: false,
      chatBoxData: [],
      textDetailVisable: false,
      key:'6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD',
      //bottomRequests: [],
      map: {},
      latitude: "",
      longitude: "",
      innerAudioContext: "",
      showLeft1: false,
      dsSwitch: false,
      ttsSwitch: false,
      tts: {},
      indexList:[],
      textData:{
         title: '',
         content : '',
         visible: false,
      },
      fangYan: [
        {
          id: 1,
          value: "普通话"
        },
        {
          id: 2,
          value: "四川话"
        },
        {
          id: 3,
          value: "粤语"
        },{
          id: 4,
          value: '东北话'
        },
        {
          id: 5,
          value: '上海话'
         },
         //{
        //   id : 6,
        //   value: '英语'
        // }
      ],
      current: "普通话"
    }
  },
  mounted() {
    wx.hideHomeButton()
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        if (
          res.model.search("iPhone X") != -1 ||
          res.model.search("unknown<iPhone11,6>") != -1 ||
          res.model.search("iPhone Xs") != -1 ||
          res.model.search("iPhone Xs Max") != -1 ||
          res.model.search("iPhone Xr") != -1
        ) {
          that.isIphoneX = true;
        }
      }
    })
    wx.getLocation({
      type: "wgs84",
      success(res) {
        that.latitude = res.latitude
        that.longitude = res.longitude
        let location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        that.$store.commit('editLocation',location)
        console.log(store.state.current.longitude)
      }
    })
    // setTimeout(function() {
    //   qqmapsdk.reverseGeocoder({
    //     location: {
    //       latitude: that.latitude,
    //       longitude: that.longitude
    //     },
    //     success: res => {
    //       //成功后的回调
    //       console.log(res)
    //       let city = res.result.address_component.city
    //       city = city.split("市")[0]
    //       that.$store.commit("editCity", city)
    //       console.log(store.state.current.city)
    //     }
    //   });
    // }, 2000)

    //播报tts
    that.innerAudioContext = wx.createInnerAudioContext()
    
  },
  components: {
    wxParse,
    recordVoice,
    footComponent,
    headDetail,
    textDetail,
    audioIos,
    "i-button": iButton,
    "i-drawer": iDrawer,
    "i-radio-group": iRadioGroup,
    "i-collapse": iCollapse,
    "i-collapse-item": iCollapseItem,
    "i-switch": iSwitch,
    "i-icon": icon,
    "i-message": iMessage
  },

  created() {
    
  },
  methods: {
    scrollTop() {
      wx.pageScrollTo({
        selector:'#top',      
        duration: 300
      })
    },
    //单说模式切换
    switch1Change() {
      this.dsSwitch = !this.dsSwitch
      this.$store.commit("dsSwitch")
      console.log(this.$store.state.current.ds)
    },
    //tts开关切换
    switch2Change() {
      this.ttsSwitch = !this.ttsSwitch
      console.log(this.tts)
      if (JSON.stringify(this.tts) == "{}") {
        this.tts = TTS
      } else {
        this.tts = {}
      }
    },
    //方言选择
    handlefangYanChange(evt) {
      this.current = evt.value;
      if (this.current == "粤语") {
        this.$store.commit("MODEL_CONFIG", "cantonese")
      }
      else if (this.current == "四川话") {
        this.$store.commit("MODEL_CONFIG", "lmz")
        
      }
      else if (this.current == "普通话") {
        this.$store.commit("MODEL_CONFIG", "main")
      }
      else if(this.current == '东北话') {
        this.$store.commit('MODEL_CONFIG','dongbeiese')
      }
      else if(this.current == '上海话') {
        this.$store.commit('MODEL_CONFIG','shanghainese')
      }
      else if(this.current == '英语') {
        this.$store.commit('MODEL_CONFIG','us')
      }
    },
    getService(data) {
      let value
      service.forEach(item => {
        if (item.key == data) {
          value = item.value
        }
      })
      return value
    },
    playMu(){
      const a = wx.createAudioContext('audio3')
      console.log(a)
      a.play()
      console.log('3')
    },

    searchService(data) {
      let value
      service.forEach(item =>{
        if(item.key == data)
        {
         value = item.key
        }
      })
      return value
    },
    ToggleLeft1() {
      this.showLeft1 = !this.showLeft1
    },
    //点踩
    handleType(chat, type,ind) {
    let flag = 0
    if(type == 'yes'){
      if(chat.isDisAgree == true){
        $Message(this, {
        content: "请先取消踩，再进行操作",
        type:'error'
      })  
      return  
      }
      
    }

    if(type == 'no'){
      if(chat.isAgree == true){
         $Message(this, {
        content: "请先取消赞，再进行操作",
        type:'error'
      })
      return    
      }
     
    }  
  	if(type == 'no') {
  		chat.isDisAgree = !chat.isDisAgree
  		chat.isAgree = false
  	} else {
  		chat.isAgree = !chat.isAgree
  		chat.isDisAgree = false
    }
    
  	if(chat.isAgree && chat.isDisAgree == false) {
  		wx.idatastat.sendEvent('yu_yi', {
          type: 'zan',
          text: chat.intent.text,
          sid:chat.intent.sid
      })     
    }else if(chat.isAgree == false && chat.isDisAgree ){
      	wx.idatastat.sendEvent('yu_yi', {
          type: 'cai',
          text: chat.intent.text,
          sid:chat.intent.sid
      })
    } else if(chat.isAgree == false && chat.isDisAgree == false){
         wx.idatastat.sendEvent('yu_yi', {
          type: 'cancel',
          text: chat.intent.text,
          sid:chat.intent.sid
      })
    }
    
      //this.indexList.push(ind) 	
  },
    //进入详情字段页面
    detail(intent) {
      wx.setStorageSync("intent", intent)
      formatNavigateTo("/pages/paramDetail/main?")
    },

    jokeStory(data){
      this.textData.title = data.title
      this.textData.content = data.content
    },
    ttsPlay(data) {
       this.innerAudioContext.src = data
       this.innerAudioContext.play()
    },
    toStoryJoke(data) {
      this.textData.title = data.title
      this.textData.content = data.content
      this.textData.visible = true
      //console.log(this.textData)
      //formatNavigateTo("/pages/paramDetail/main?title=" +title+"&content="+ content)
    },
     toMap(item){				
			this.map.latitude =item.latitude
			this.map.longitude = item.longitude
			this.map.address = item.address
			let referer = 'fly-fish-voice';   //调用插件的app的名称
			let endPoint = JSON.stringify({  //终点
			'name': this.map.address,
			'latitude': parseFloat(this.map.latitude),
			'longitude': parseFloat(this.map.longitude)
			})
		
			wx.navigateTo({
				url: 'plugin://routePlan/index?key=' + this.key+ '&referer=' + referer + '&endPoint=' + endPoint +'&navigation=1'
			
			})
      }, 
      //拨号
    toDial(code) {
      if (!code) {
        wx.showModal({
          title: "提示",
          content: "没有找到可拨打的号码"
        })
      }
      wx.makePhoneCall({
        phoneNumber: code
      })
    },
    recordStart() {
      this.isVoicing = true
      this.innerAudioContext.stop()
    },
    recordEnd() {
      this.isVoicing = false;
    },
    //节目
    programer(res) {
      let a = res.data.data;
      let audioObj = {
        type: 2,
        audioSrc: a.trackList[0].playUrl, //播放地址
        audioPic: a.logoUrl, //专辑图片
        audioName: a.albumName.length < 10? a.albumName :a.albumName.slice(0,9)+'..'//歌名
      };
      this.pushData(audioObj)
    },
    slice(data){
    data.forEach((e, ind) => {
      e.list = ind + 1
    })
    let result = []
    for (let i = 0, len = data.length; i < len; i += 5) {
      result.push(data.slice(i, i + 5))
    }
      return result
    },
    pushData(opt) {
      let that = this
      that.chatBoxData.push(opt);
      that.$nextTick(() => {
        setTimeout(() => {

          //异步更新dom
          that.toView = "bottom" + that.chatBoxData.length
        }, 10)
      })
    },
    //文字输入
    txtAnswer(resData) {
      let that = this
      const timeStart = wx.getPerformance().now()

      Text(resData).then(res => {
        const TimeContract = wx.getPerformance().now() - timeStart
        if (res.data.code == "0") {
          let answerData = res.data.data
         // console.log(answerData)
          answerData.data.forEach(e => {
            if (e.sub == "tpp") {
              let content = JSON.parse(e.content)
              if(content.rc == 1){
                   let tempObj = {
                  type: 3,
                  textDesc: '参数缺失或无效或项目没配置技能',
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
                return
              }
              let intent = content.intent
              console.log(intent)

              switch(intent.service){
                case "train":
                  //console.log('train')
                if(intent.hasOwnProperty("data") ){
                  let result = that.slice(intent.data.result)
                    const tempObj = {
                    type: 7,
                    //textDesc: intent.answer.text,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,                  
                  }
                  const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
                  return
                }
                if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                     //console.log('answer')
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return             
                } else {
                  //console.log('else')
                  let textDesc =
                    "已为你实现火车操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                }
                break

                //case "story":
                case "joke":
                   if(intent.hasOwnProperty("data") ){
                  let result = that.slice(intent.data.result)
                    const tempObj = {
                    type: 9,
                    //textDesc: intent.answer.text,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,                  
                  }
                  const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
                  return
                }
                if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                    // console.log('answer')
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return             
                } else {
                  console.log('else')
                  let textDesc =
                    "已为你实现笑话操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                }
                  break

                case "flight":
                  if (intent.hasOwnProperty("data")) {
                let result = this.slice(intent.data.result)
                  const tempObj = {
                    type: 8,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,
                  }
                   const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
                  return
                } 
                  if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                } else {
                  let textDesc =
                    "已为你实现航班操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                }
          
                break  
                 case "telephone" :
                  if(!intent.hasOwnProperty('answer')){
                   let textDesc =
                    "已为你实现电话操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                }
                let tempObj1 = {
                  type: 5,
                  textDesc: intent.answer.text,
                  code: intent.searchSemantic.code,
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj1)
                return
                   break   
                 case "mapU":
                    if (intent.operation == "POS_RANK" || !intent.hasOwnProperty("data")) {
                  let tempObj = {
                    type: 3,
                    textDesc: "已为您实现导航操作",
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj);
                  return
                }
                if(intent.hasOwnProperty("data")){
                let data = intent.data.result
                //计算地点距离
                let toadd = []
                data.forEach(e => {
                  let obj = {
                    latitude: parseFloat(e.latitude),
                    longitude: parseFloat(e.longitude)
                  }
                  toadd.push(obj)
                })
                qqmapsdk.calculateDistance({
                  from: {
                    latitude: that.latitude,
                    longitude: that.longitude
                  },
                  to: toadd,
                  success: function(res) {
                    //成功后的回调
                    if (res.hasOwnProperty("result")) {
                      data.forEach(e => {
                        e.distance =
                          res.result.elements[0].distance > 1000
                            ? (res.result.elements[0].distance / 1000).toFixed(
                                1
                              ) + "公里"
                            : res.result.elements[0].distance + "米"
                      })
                    }
                  },
                  fail: function(error) {
                    data.forEach(e => {
                      e.distance =
                        e.distance > 1000
                          ? (e.distance / 1000).toFixed(1) + "公里"
                          : e.distance + "米";
                    })
                  }
                }) 
                let result = this.slice(data)
                if (intent.hasOwnProperty("answer")) {
                  let tempObj = {
                    type: 4,
                    textDesc: intent.answer.text,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                } else {
                  let tempObj = {
                    type: 3,
                    textDesc: "已为您实现导航操作",
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                }
                }
                break
                case "musicX":
                case "internetRadio":
                     if (intent.hasOwnProperty("answer")) {
                   if( intent.operation == 'INSTRUCTION'){
                      //提示语
                      let tempObj = {
                        type: 3,
                        textDesc: intent.answer.text,
                        intent: intent,
                        time: TimeContract,
                        isDisAgree: false,
                        isAgree: false,
                      }
                      that.pushData(tempObj)
                      return
                    
                   }
                  if (intent.semantic.slots.hasOwnProperty("presenter")) {
            
                    if (intent.data.hasOwnProperty("error")) {
                      let tempObj = {
                        //节目提示
                        type: 3,
                        textDesc: intent.answer.text,
                        intent: intent,
                        time: TimeContract,
                        isDisAgree: false,
                        isAgree: false,
                      }
                      that.pushData(tempObj)
                      return
                    }
                    let album = intent.data.result[0].albumId    
                    program(album).then(res => {
                      this.programer(res)
                    })
                    let tempObj = {
                      type: 3,
                      textDesc: intent.answer.text,
                      intent: intent,
                      time: TimeContract,
                      isDisAgree: false,
                      isAgree: false,
                    }
                    that.pushData(tempObj)
                    return
                  }
                  if (intent.data.hasOwnProperty("error")) {
                    
                    let tempObj = {
                      //歌曲播放提示
                      type: 3,
                      textDesc: intent.answer.text,
                      intent: intent,
                      time: TimeContract,
                      isDisAgree: false,
                      isAgree: false,
                    }
                    that.pushData(tempObj)
                    return
                  }
                 
                  //音乐
                  let tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  };
                  that.pushData(tempObj)
                  let audioObj = {
                    type: 2,
                    audioSinger: intent.data.result[0].singerName, //歌手
                    audioSrc: intent.data.result[0].playUrl, //播放地址
                    audioPic: intent.data.result[0].picMin, //专辑图片
                    audioName: intent.data.result[0].songName //歌名
                  }
                  that.pushData(audioObj)
                  return
                } else {
                
                  let textDesc =
                    "已为你实现音乐操作"
                  let tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                }
                if (
                  intent.answer.type == "NULL" &&
                  intent.hasOwnProperty("semantic")
                ) {
                  let tempObj = {
                    type: 3,
                    textDesc:
                      "抱歉我没有找到对应的结果呢！我会继续努力学习的呢",
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  return
                }
                  break
                  case 'cmd':
                  if(intent.semantic.slots.insType == 'CHANGE'){
                    if(intent.semantic.slots.name == '粤语' || intent.semantic.slots.name == '广东话'){
                        {
                    let tempObj = {
                    type: 3,
                    textDesc:'已为您切换到粤语',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  this.pushData(tempObj) 
                  console.log('change')
                    this.$store.commit("MODEL_CONFIG", "cantonese")
                    this.current = '粤语'
                   
                     return 
                  }
                    }else if(intent.semantic.slots.insType == 'CHANGE' && intent.semantic.slots.name == '四川话'){
                     
                    let tempObj = {
                    type: 3,
                    textDesc:'已为您切换到四川话',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                this.$store.commit("MODEL_CONFIG", "lmz")
                this.current = '四川话'  
                 return 
              }else{
                     $Message(this, {
                    content: "赞不支持切换其他方言",
                    type:'error'
                  })  
                     let tempObj = {
                    type: 3,
                    textDesc:'暂不支持切换其他方言',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                
                 return 
                  } 
                  }else {
                     let tempObj = {
                    type: 3,
                    textDesc:'已为您实现命令操作',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                 return 
                  }
            break  
              }
                       
           //所有技能模块     
              if( this.searchService(intent.service)){
                if (intent.hasOwnProperty("answer")) {
                   let text = intent.answer.display_text ? intent.answer.display_text : intent.answer.text
                  const tempObj = {
                    type: 3,
                    textDesc: text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                } else {
                  let serviceList = '' 
                  let textDesc,se
                  if(intent.moreResults.length != 0){
                    let content = intent.moreResults
                    content.forEach(e=>{
                      if(e.multi_intent == 'true'){
                        serviceList += (' '+ this.getService(e.service)+" ")
                      }
                      
                    })
                    se = (this.getService(intent.service)+serviceList).fontcolor('red')                    
                  }else {
                     se = (this.getService(intent.service)).fontcolor('red')
                  }
                   if(intent.multi_intent == 'true'){
                     let multi = '多意图'.fontcolor('red')
                     textDesc = multi+'：已为你实现 ' + se + " 操作"
                   }
                  if(intent.multi_intent != 'true')
                  textDesc = "已为你实现 " + se+ " 操作"
                  // se = (this.getService(intent.service)).fontcolor('red')
                  // if(intent.multi_intent == 'true'){
                  //    let multi = '多意图'.fontcolor('red')
                  //    textDesc = multi+'：已为你实现 ' + se + " 操作"
                  //  }
                  // if(intent.multi_intent != 'true')
                  // textDesc = "已为你实现 " + se+ " 操作"
                   
                   
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                }
                return
              }
               
              if (intent.rc == "4") {
                let tempObj = {
                  type: 3,
                  textDesc: 'Error rc4',
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
                return
              } else{
                let tempObj = {
                  type: 3,
                  textDesc: '抱歉，我现在还不会这个技能，正在学习中~',
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
              }
            }
          })
        } else{
           let tempObj = {
                  type: 3,
                  textDesc: '服务出错了',
                  //intent: err,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
        }
      }).catch(()=>{
           let tempObj = {
                  type: 3,
                  textDesc: '服务出错了',
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
      }
        
      )
    },
  //东北话上海话使用（tts）
    DStxtAnswer(resData) {
      let that = this
      const timeStart = wx.getPerformance().now()

      Text(resData).then(res => {
        const TimeContract = wx.getPerformance().now() - timeStart
        if (res.data.code == "0") {
          let answerData = res.data.data
         // console.log(answerData)
          answerData.data.forEach(e => {
            if (e.sub == "tpp") {
              let content = JSON.parse(e.content)
              if(content.rc == 1){
                   let tempObj = {
                  type: 3,
                  textDesc: '参数缺失或无效或项目没配置技能',
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
                  this.playTTS ("参数缺失或无效或项目没配置技能")
                return
              }
              let intent = content.intent
              console.log(intent)

              switch(intent.service){
                case "train":
                  //console.log('train')
                if(intent.hasOwnProperty("data") ){
                  let result = that.slice(intent.data.result)
                    const tempObj = {
                    type: 7,
                    //textDesc: intent.answer.text,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,                  
                  }
                  const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return
                }
                if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                     //console.log('answer')
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return             
                } else {
                  //console.log('else')
                  let textDesc =
                    "已为你实现火车操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                   this.playTTS('已为您实现火车操作')
                  return
                }
                break

                case "joke":
                   if(intent.hasOwnProperty("data") ){
                  let result = that.slice(intent.data.result)
                    const tempObj = {
                    type: 9,
                    //textDesc: intent.answer.text,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,                  
                  }
                  const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return
                }
                if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                    
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return             
                } else {
                  let textDesc =
                    "已为你实现笑话操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(textDesc)
                  return
                }
                  break

                case "flight":
                  if (intent.hasOwnProperty("data")) {
                let result = this.slice(intent.data.result)
                  const tempObj = {
                    type: 8,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,
                  }
                   const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return
                } 
                  if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return
                } else {
                  let textDesc =
                    "已为你实现航班操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(textDesc)
                  return
                }
                break  
                 case "telephone" :
                  if(!intent.hasOwnProperty('answer')){
                   let textDesc =
                    "已为你实现电话操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(textDesc) 
                  return
                }
                let tempObj1 = {
                  type: 5,
                  textDesc: intent.answer.text,
                  code: intent.searchSemantic.code,
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj1)
                this.playTTS(intent.answer.text)
                return
                   break   
                 case "mapU":
                    if (intent.operation == "POS_RANK" || !intent.hasOwnProperty("data")) {
                  let tempObj = {
                    type: 3,
                    textDesc: "已为您实现导航操作",
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj);
                  this.playTTS("已为您实现导航操作") 
                  return
                }
                if(intent.hasOwnProperty("data")){
                let data = intent.data.result
                //计算地点距离
                let toadd = []
                data.forEach(e => {
                  let obj = {
                    latitude: parseFloat(e.latitude),
                    longitude: parseFloat(e.longitude)
                  }
                  toadd.push(obj)
                })
                qqmapsdk.calculateDistance({
                  from: {
                    latitude: that.latitude,
                    longitude: that.longitude
                  },
                  to: toadd,
                  success: function(res) {
                    //成功后的回调
                    if (res.hasOwnProperty("result")) {
                      data.forEach(e => {
                        e.distance =
                          res.result.elements[0].distance > 1000
                            ? (res.result.elements[0].distance / 1000).toFixed(
                                1
                              ) + "公里"
                            : res.result.elements[0].distance + "米"
                      })
                    }
                  },
                  fail: function(error) {
                    data.forEach(e => {
                      e.distance =
                        e.distance > 1000
                          ? (e.distance / 1000).toFixed(1) + "公里"
                          : e.distance + "米";
                    })
                  }
                }) 
                let result = this.slice(data)
                if (intent.hasOwnProperty("answer")) {
                  let tempObj = {
                    type: 4,
                    textDesc: intent.answer.text,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text) 
                  return
                } else {
                  let tempObj = {
                    type: 3,
                    textDesc: "已为您实现导航操作",
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS('以为您实现导航操作') 
                  return
                }
                }
                break
                case "musicX":
                case "internetRadio":
                     if (intent.hasOwnProperty("answer")) {
                   if( intent.operation == 'INSTRUCTION'){
                      //提示语
                      let tempObj = {
                        type: 3,
                        textDesc: intent.answer.text,
                        intent: intent,
                        time: TimeContract,
                        isDisAgree: false,
                        isAgree: false,
                      }
                      that.pushData(tempObj)
                      this.playTTS(intent.answer.text)
                      return
                    
                   }
                  if (intent.semantic.slots.hasOwnProperty("presenter")) {
            
                    if (intent.data.hasOwnProperty("error")) {
                      let tempObj = {
                        //节目提示
                        type: 3,
                        textDesc: intent.answer.text,
                        intent: intent,
                        time: TimeContract,
                        isDisAgree: false,
                        isAgree: false,
                      }
                      that.pushData(tempObj)
                      this.playTTS(intent.answer.text)
                      return
                    }
                    let album = intent.data.result[0].albumId    
                    program(album).then(res => {
                      this.programer(res)
                    })
                    let tempObj = {
                      type: 3,
                      textDesc: intent.answer.text,
                      intent: intent,
                      time: TimeContract,
                      isDisAgree: false,
                      isAgree: false,
                    }
                    that.pushData(tempObj)
                    this.playTTS(intent.answer.text)
                    return
                  }
                  if (intent.data.hasOwnProperty("error")) {
                    
                    let tempObj = {
                      //歌曲播放提示
                      type: 3,
                      textDesc: intent.answer.text,
                      intent: intent,
                      time: TimeContract,
                      isDisAgree: false,
                      isAgree: false,
                    }
                    that.pushData(tempObj)
                    this.playTTS(intent.answer.text)
                    return
                  }
                 
                  //音乐
                  let tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  };
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  let audioObj = {
                    type: 2,
                    audioSinger: intent.data.result[0].singerName, //歌手
                    audioSrc: intent.data.result[0].playUrl, //播放地址
                    audioPic: intent.data.result[0].picMin, //专辑图片
                    audioName: intent.data.result[0].songName //歌名
                  }
                  that.pushData(audioObj)
                  return
                } else {
                
                  let textDesc =
                    "已为你实现音乐操作"
                  let tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS('以为您实现音乐操作')
                  return
                }
                if (
                  intent.answer.type == "NULL" &&
                  intent.hasOwnProperty("semantic")
                ) {
                  let tempObj = {
                    type: 3,
                    textDesc:
                      "抱歉我没有找到对应的结果呢！我会继续努力学习的呢",
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS("抱歉我没有找到对应的结果呢！我会继续努力学习的呢")
                  return
                }
                  break
                  case 'cmd':
                  if(intent.semantic.slots.insType == 'CHANGE'){
                    if(intent.semantic.slots.name == '粤语' || intent.semantic.slots.name == '广东话'){
                        {
                    let tempObj = {
                    type: 3,
                    textDesc:'已为您切换到粤语',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  this.pushData(tempObj) 
                  //console.log('change')
                    this.$store.commit("MODEL_CONFIG", "cantonese")
                    this.current = '粤语'
                   this.playTTS('为您切换到粤语')
                     return 
                  }
                    }else if(intent.semantic.slots.insType == 'CHANGE' && intent.semantic.slots.name == '四川话'){
                     
                    let tempObj = {
                    type: 3,
                    textDesc:'已为您切换到四川话',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                this.$store.commit("MODEL_CONFIG", "lmz")
                this.current = '四川话'
                this.playTTS('以为您切换到四川话')
                 return 
              }else{
                     $Message(this, {
                    content: "赞不支持切换其他方言",
                    type:'error'
                  })  
                     let tempObj = {
                    type: 3,
                    textDesc:'暂不支持切换其他方言',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS('暂不支持切换其他方言')
                 return 
                  } 
                  }else {
                     let tempObj = {
                    type: 3,
                    textDesc:'已为您实现命令操作',
                    intent: intent,
                    time:  TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS('已为您实现命令操作')
                 return 
                  }
            break  
              }
                       
           //所有技能模块     
              if( this.searchService(intent.service)){
                if (intent.hasOwnProperty("answer")) {
                   let text = intent.answer.display_text ? intent.answer.display_text : intent.answer.text
                  const tempObj = {
                    type: 3,
                    textDesc: text,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(text)
                } else {
                  let serviceList = '' 
                  let textDesc,se
                  if(intent.moreResults.length != 0){
                    let content = intent.moreResults
                    content.forEach(e=>{
                      if(e.multi_intent == 'true'){
                        serviceList += (' '+ this.getService(e.service)+" ")
                      }
                      
                    })
                    se = (this.getService(intent.service)+serviceList).fontcolor('red')                    
                  }else {
                     se = (this.getService(intent.service)).fontcolor('red')
                  }
                   if(intent.multi_intent == 'true'){
                     let multi = '多意图'.fontcolor('red')
                     textDesc = multi+'：已为你实现 ' + se + " 操作"
                   }
                  if(intent.multi_intent != 'true')
                  textDesc = "已为你实现 " + se+ " 操作"
                  // se = (this.getService(intent.service)).fontcolor('red')
                  // if(intent.multi_intent == 'true'){
                  //    let multi = '多意图'.fontcolor('red')
                  //    textDesc = multi+'：已为你实现 ' + se + " 操作"
                  //  }
                  // if(intent.multi_intent != 'true')
                  // textDesc = "已为你实现 " + se+ " 操作"
                   
                   
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: TimeContract,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  if(intent.multi_intent == 'true'){
                       this.playTTS(('多意图 已为你实现'+this.getService(intent.service)+serviceList+'操作'))
                      }else{
                        this.playTTS((' 已为你实现'+this.getService(intent.service)+serviceList+'操作'))
                      }
                }
                return
              }
               
              if (intent.rc == "4") {
                let tempObj = {
                  type: 3,
                  textDesc: 'Error rc4',
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
                return
              } else{
                let tempObj = {
                  type: 3,
                  textDesc: '抱歉，我现在还不会这个技能，正在学习中~',
                  intent: intent,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
              }
            }
          })
        } else{
           let tempObj = {
                  type: 3,
                  textDesc: '服务出错了',
                  //intent: err,
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
                this.playTTS('服务出错了')
        }
      }).catch(()=>{
           let tempObj = {
                  type: 3,
                  textDesc: '服务出错了',
                  time: TimeContract,
                  isDisAgree: false,
                  isAgree: false,
                }
                that.pushData(tempObj)
                this.playTTS('服务出错了')
      }
        
      )
    },

    //回答问题的接口
    answerOperate(resData, type) {
      console.log('jinru')
      let that = this;
      if (this.tts !== {}) {
        console.log('tts')
        that.DStxtAnswer(resData)
      } else {
        console.log('nomoral');
        that.txtAnswer(resData);
      }
    },
    enter(type, opt) {
      let obj = {};
      if (type == 1) {
        obj = {
          text: opt
        };
        obj.type = type;
      } else {
        obj = opt;
      }
      this.chatBoxData.push(obj);
      this.$nextTick(() => {
        setTimeout(() => {
          this.toView = "bottom" + this.chatBoxData.length;
        }, 10);
      });
    },
    //输入框发送
    sendTextInput(val) {
      this.enter(1, val.text)
      this.answerOperate(val.text, "noVoice")
    },
    playTTS(text) {
      let self = this
      if(JSON.stringify(this.tts) !== '{}') {
        this.tts(text).then(res =>{
          self.ttsPlay(res.data.data)
        }).catch(()=>{
            $Message(this, {
                    content: "tts超时",
                    type:'error'
                  })
        })
      }
    },
    //语音发送
    sendContent(val) {
      console.log(val)
      let that = this
      let tts = ""
      if (val.text == "" && val.content.rc == 1) {
        let tempObj = {}
        tempObj.textDesc = "抱歉，我还没有听清你的问题呢"
        tempObj.type = 3
        tempObj.time = val.time
        this.pushData(tempObj)
        // if(JSON.stringify(this.tts) != '{}'){
        //   this.tts("抱歉，我还没有听清你的问题呢").then(res => {
        //        that.ttsPlay(res.data.data)
        // })
        // }  
        this.playTTS ("抱歉，我还没有听清你的问题呢")
        return
      }
      if(val.flag == 1) {
          let tempObj = {}
        tempObj.textDesc = "抱歉，可能出错了"
        tempObj.type = 3
        tempObj.time = val.time
        this.pushData(tempObj)
        
        this.playTTS ("抱歉，可能出错了")
        return
      }
      that.enter(1, val.text)
      let intent = val.content.intent
      let service = intent.service
      //console.log(intent)
      //console.log(service)
      switch(service){
                case "train":
                if(intent.hasOwnProperty("data") ){
                  let result = that.slice(intent.data.result)
                    const tempObj = {
                    type: 7,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: val.time,                  
                  }
                  const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)   
          this.playTTS(intent.answer.text)
                  return
                }
                if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                     //console.log('answer')
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
        //            if(JSON.stringify(this.tts) != '{}'){
        //        this.tts(intent.answer.text).then(res => {
        //        that.ttsPlay(res.data.data)
        // })
        // }   
                  this.playTTS(intent.answer.text)
                  return             
                } else {
                  let textDesc =
                    "已为你实现火车操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
        //            if(JSON.stringify(textDesc) != '{}'){
        //        this.tts(intent.answer.text).then(res => {
        //        that.ttsPlay(res.data.data)
        // })
        // }   
                   this.playTTS('已为您实现火车操作')
                  return
                }
                break

                //case "story":
                case "joke":
                 // console.log('joke')
                   if(intent.hasOwnProperty("data") ){
                    // console.log('enter')
                  let result = that.slice(intent.data.result)
                    const tempObj = {
                    type: 9, 
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: val.time,                  
                  }
                  const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return
                }
                if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                    // console.log('answer')
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
              this.playTTS(intent.answer.text)
                  return             
                } else {
                  
                  let textDesc =
                    "已为你实现笑话操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(textDesc)
                  return
                }
                  break

                case "flight":
                  if (intent.hasOwnProperty("data")) {
                let result = this.slice(intent.data.result)
                  const tempObj = {
                    type: 8,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: val.time,
                  }
                   const tempObj1 = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj1)
                  that.pushData(tempObj)
              //      if(JSON.stringify(this.tts) != '{}'){
              //  this.tts(intent.answer.text).then(res => {
              //  that.ttsPlay(res.data.data)
              // })
              // }   
                    this.playTTS(intent.answer.text)
                  return
                } 
                  if (intent.hasOwnProperty("answer")&& !intent.hasOwnProperty("data")) {
                  const tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS(intent.answer.text)
                  return
                } else {
                  let textDesc =
                    "已为你实现航班操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                 this.playTTS(textDesc)   
                  return
                }
                break  
                 case "telephone" :
                  if(!intent.hasOwnProperty('answer')){
                   let textDesc =
                    "已为你实现电话操作"
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                   this.playTTS(textDesc)   
                  return
                }
                let tempObj1 = {
                  type: 5,
                  textDesc: intent.answer.text,
                  code: intent.searchSemantic.code,
                  intent: intent,
                  time: val.time,
                  isDisAgree: false,
                  isAgree: false,
                }
                this.playTTS(intent.answer.text)
                that.pushData(tempObj1)
                return
                   break   
                 case "mapU":
                    if (intent.operation == "POS_RANK" || !intent.hasOwnProperty("data")) {
                  let tempObj = {
                    type: 3,
                    textDesc: "已为您实现导航操作",
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
              this.playTTS("已为您实现导航操作")   
                  return
                }
                if(intent.hasOwnProperty("data")){
                let data = intent.data.result
                //计算地点距离
                let toadd = []
                data.forEach(e => {
                  let obj = {
                    latitude: parseFloat(e.latitude),
                    longitude: parseFloat(e.longitude)
                  }
                  toadd.push(obj)
                })
                qqmapsdk.calculateDistance({
                  from: {
                    latitude: that.latitude,
                    longitude: that.longitude
                  },
                  to: toadd,
                  success: function(res) {
                    //成功后的回调
                    if (res.hasOwnProperty("result")) {
                      data.forEach(e => {
                        e.distance =
                          res.result.elements[0].distance > 1000
                            ? (res.result.elements[0].distance / 1000).toFixed(
                                1
                              ) + "公里"
                            : res.result.elements[0].distance + "米"
                      })
                    }
                  },
                  fail: function(error) {
                    data.forEach(e => {
                      e.distance =
                        e.distance > 1000
                          ? (e.distance / 1000).toFixed(1) + "公里"
                          : e.distance + "米";
                    })
                  }
                }) 
                let result = this.slice(data)
                if (intent.hasOwnProperty("answer")) {
                  let tempObj = {
                    type: 4,
                    textDesc: intent.answer.text,
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
               this.playTTS(intent.answer.text)   
                  return
                } else {
                  let tempObj = {
                    type: 3,
                    textDesc: "已为您实现导航操作",
                    data: result,
                    simData: intent.data.result,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                this.playTTS('以为您实现导航操作')  
                  return
                }
                }
                break
                case "musicX":
                case "internetRadio":
                     if (intent.hasOwnProperty("answer")) {
                   if( intent.operation == 'INSTRUCTION'){
                      //提示语
                      let tempObj = {
                        type: 3,
                        textDesc: intent.answer.text,
                        intent: intent,
                        time: val.time,
                        isDisAgree: false,
                        isAgree: false,
                      }
                      that.pushData(tempObj)
                     this.playTTS(intent.answer.text)  
                   return                   
                   }
                  if (intent.semantic.slots.hasOwnProperty("presenter")) {
            
                    if (intent.data.hasOwnProperty("error")) {
                      let tempObj = {
                        //节目提示
                        type: 3,
                        textDesc: intent.answer.text,
                        intent: intent,
                        time: val.time,
                        isDisAgree: false,
                        isAgree: false,
                      }
                      that.pushData(tempObj)
                       this.playTTS(intent.answer.text)   
                      return
                    }
                    let album = intent.data.result[0].albumId    
                    program(album).then(res => {
                      this.programer(res)
                    })
                    let tempObj = {
                      type: 3,
                      textDesc: intent.answer.text,
                      intent: intent,
                      time: val.time,
                      isDisAgree: false,
                      isAgree: false,
                    }
                    that.pushData(tempObj)
                    this.playTTS(intent.answer.text) 
                    return
                  }
                  if (intent.data.hasOwnProperty("error")) {
                    
                    let tempObj = {
                      //歌曲播放提示
                      type: 3,
                      textDesc: intent.answer.text,
                      intent: intent,
                      time: val.time,
                      isDisAgree: false,
                      isAgree: false,
                    }
                    that.pushData(tempObj)
                      this.playTTS(intent.answer.text)   
                    return
                  }                 
                  //音乐
                  let tempObj = {
                    type: 3,
                    textDesc: intent.answer.text,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                    this.playTTS(intent.answer.text)  
                  let audioObj = {
                    type: 2,
                    audioSinger: intent.data.result[0].singerName, //歌手
                    audioSrc: intent.data.result[0].playUrl, //播放地址
                    audioPic: intent.data.result[0].picMin, //专辑图片
                    audioName: intent.data.result[0].songName //歌名
                  }
                  that.pushData(audioObj)
                  return
                } else {
                
                  let textDesc =
                    "已为你实现音乐操作"
                  let tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                   this.playTTS('以为您实现音乐操作')   
                  return
                }
                if (
                  intent.answer.type == "NULL" &&
                  intent.hasOwnProperty("semantic")
                ) {
                  let tempObj = {
                    type: 3,
                    textDesc:
                      "抱歉我没有找到对应的结果呢！我会继续努力学习的呢",
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                  this.playTTS("抱歉我没有找到对应的结果呢！我会继续努力学习的呢")   
                  return
                }
                  break
                case 'cmd':
                  if(intent.semantic.slots.insType == 'CHANGE'){
                    if(intent.semantic.slots.name == '粤语' || intent.semantic.slots.name == '广东话'){
                        {
                    let tempObj = {
                    type: 3,
                    textDesc:'已为您切换到粤语',
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                    this.$store.commit("MODEL_CONFIG", "cantonese")
                    this.current = '粤语'
                    this.playTTS('为您切换到粤语')
                     return 
                  }
                    }else if(intent.semantic.slots.insType == 'CHANGE' && intent.semantic.slots.name == '四川话'){
                     
                    let tempObj = {
                    type: 3,
                    textDesc:'已为您切换到四川话',
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                this.$store.commit("MODEL_CONFIG", "lmz")
                this.current = '四川话'
                this.playTTS('以为您切换到四川话')  
                 return 
              }else{
                     $Message(this, {
                    content: "赞不支持切换其他方言",
                    type:'error'
                  })  
                     let tempObj = {
                    type: 3,
                    textDesc:'暂不支持切换其他方言',
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                this.playTTS('暂不支持切换其他方言')   
                 return 
                  } 
                  }else {
                     let tempObj = {
                    type: 3,
                    textDesc:'已为您实现命令操作',
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                 this.playTTS('已为您实现命令操作')
                 return 
                  }
            break  
      }
       
      
      if (intent.rc == "4") {
        let tempObj = {
          type: 3,
          textDesc: 'Error rc4',
          intent: intent,
          time: val.time,
          isAgree: false,
          isDisAgree: false
        }
        that.pushData(tempObj)
        return
      }


        if( this.searchService(intent.service))
        {
        if (intent.hasOwnProperty("answer")) {
          let text = intent.answer.display_text ? intent.answer.display_text : intent.answer.text
          const tempObj = {
            type: 3,
            textDesc: text,
            intent: intent,
            time: val.time,
            isAgree: false,
            isDisAgree: false
          }
          that.pushData(tempObj);
          this.playTTS(text)
        } else {  
         let serviceList = '' 
                  let textDesc,se
                  if(intent.moreResults.length != 0){
                    let content = intent.moreResults
                    content.forEach(e=>{
                      if(e.multi_intent == 'true'){
                        serviceList += (' '+ this.getService(e.service)+" ")
                      }
                      
                    })
                    se = (this.getService(intent.service)+serviceList).fontcolor('red')                    
                  }else {
                     se = (this.getService(intent.service)).fontcolor('red')
                  }
                  if(intent.multi_intent == 'true'){
                     let multi = '多意图'.fontcolor('red')
                     textDesc = multi+'：已为你实现 ' + se + " 操作"
                   }
                  if(intent.multi_intent != 'true')
                  textDesc = "已为你实现 " + se+ " 操作"
                 
                   
                   
                  const tempObj = {
                    type: 3,
                    textDesc: textDesc,
                    intent: intent,
                    time: val.time,
                    isDisAgree: false,
                    isAgree: false,
                  }
                  that.pushData(tempObj)
                      if(intent.multi_intent == 'true'){
                       this.playTTS(('多意图 已为你实现'+this.getService(intent.service)+serviceList+'操作'))
                      }else{
                        this.playTTS((' 已为你实现'+this.getService(intent.service)+serviceList+'操作'))
                      }
          
        }
        return
      }else{
          let tempObj = {
            type: 3,
            textDesc: '抱歉，我现在还不会这个技能，正在学习中~',
            intent: intent,
            time: val.time,
            isDisAgree: false,
            isAgree: false,
          }
          that.pushData(tempObj)
        this.playTTS('抱歉，我现在还不会这个技能，正在学习中')
        }

     }
  },

  toTxt() {
    this.textAreaValue = ""
    this.iconShow = false
  }, 
}
</script>

<style lang="less" scoped>
@import url("../../../static/css/base.css");
@import url("~mpvue-wxparse/src/wxParse.css"); 
.home-contaniner {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: #ffffff;
  overflow: hidden;
  -webkit-overflow: hidden;
  //background: #78FA55;
}

.view-button {
  width: 100rpx;
  height: 100rpx;
  border: none;
}
.text_show {
  position: relative;
}
.chat-box {
  overflow: hidden;
  
}

.title {
  position: absolute;
  margin-left: 150rpx;
  margin-top: 2vh;
}

.iconheadBox {
  position: relative;
  height: 8vh;
}

.home-content {
  position: relative;
  height: 82vh;
  margin-top: 3rpx;
  overflow: hidden;
}

.home-chat {
  position: relative;
  height: 90vh;
  /* border: 1px solid rgba(4, 4, 20, 0.356);  */
}
.fotterBox {
  border: 1px solid rgba(4, 4, 20, 0.356);
  position: relative;
  width: 100%;
  height: 10vh;
  //background-color: #FFFFFF;
  background-color: #ffffff;
}
/*飞鱼形象*/
.wx-swiper-dots {
  position: relative;

  left: unset !important;

  right: 0;
}

.headImg {
  width: 234rpx;
  height: 112rpx;
  background: url("https://autopre.openspeech.cn/aimind/static/aimind/bckImg/headbck1.png")
    no-repeat;
}

.topImg {
  width: 124rpx;
  height: 124rpx;
  margin: 24rpx 24rpx 0 42rpx;
}


.text-input-column

	 {
  overflow: hidden;
  margin-top: 30rpx;
  margin-bottom: 35rpx;
}

.text-input-column div.v_me {
  float: right;
  padding: 20rpx 36rpx 20rpx 36rpx;
  margin-right: 15rpx;
  max-width: 580rpx;
  box-sizing: border-box;
  border-radius: 15px 1px 15px 15px;
  line-height: 34rpx;
  font-size: 29rpx;
  color: #ffffff;
  background-color: rgb(69, 72, 77);
  box-shadow: 0 4rpx 16rpx 0 rgba(149, 150, 156, 0.24);
  margin-top: 44rpx;
}

.mini-btn {
  height: 60rpx;
}

.dialogBox {
  border-radius: 0 15rpx 15rpx 15rpx;
  position: relative;
  //float: left;
  width: 462rpx;
  background-color: rgba(69, 72, 77, 0.918);
  color: #ffffff;
  margin-left: 110rpx;
  min-height: 50rpx;
  padding: 20rpx 0;
  font-size: 28rpx;
  //margin-top: 50rpx;
  p {
    text-indent: 15rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
  }
}
.mapDetail {
  border-radius: 15rpx 15rpx;
  position: relative;
  width: 532rpx;
  font-size: 28rpx;
  min-height: 90rpx;
  border-bottom: 1px solid white;
  background-color: #5e5d5d;
  color: #ffffff;
}
.mapDetail:hover {
  border-radius: 15rpx 15rpx;
  position: relative;
  width: 532rpx;
  font-size: 28rpx;
  min-height: 80rpx;
  border-bottom: 1px solid white;
  //background-color:#5E5D5D;
  background-color: rgba(69, 72, 77, 0.918);
  color: #ffffff;
}

.dialogBoxDial {
  padding: 20rpx 0;
  font-size: 27rpx;
  border-radius: 0 15rpx 15rpx 15rpx;
  position: relative;
  width: 532rpx;
  min-height: 136rpx;
  background-color: rgba(69, 72, 77, 0.918);
  //margin-bottom: 40rpx;
  color: #ffffff;
  margin-left: 110rpx;
  p {
    text-indent: 15rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
  }
}
.agreeBox {
  border-radius: 0 0 40rpx 0;
  position: relative;
  bottom: 0;
  width: 432rpx;
  height: 60rpx;
  margin-bottom: 20rpx;
}

.smallAgreeBox {
  font-size: 28rpx;
  color: #333;
  line-height: 62rpx;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}

.zan,
.cai {
  width: 100rpx;
  //flex-direction: row;
}

.btn {
  color: #2a5caa;
  font-size: 28rpx;
  line-height: 30rpx;
  text-align: right;
  margin: 20rpx 20rpx 0 0;
}

.audioPage {
  position: relative;
  width: 100%;
  //height: 30vh;

  margin: 25rpx 0 0 10rpx;
}
</style>

