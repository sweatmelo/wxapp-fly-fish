<template>
  <div class="home-contaniner">
    <!-- 录音动画 -->
    <record-voice v-if="isVoicing"></record-voice>
		<!-- 消息提示 -->
    <i-message ref="message" />
    <!-- 左侧设置栏 -->
 <i-drawer mode="left" :visible="showLeft1" >
	 
        <div style="position: absolute; top:-47vh; width:50vw">
          <i-button v-on:click="toggleLeft1" size="small" type="info">关闭</i-button>
        </div>
        <div style="position:absolute;  top:-36vh; left:5vw;font-size:33rpx; width:50vw">设置</div>
			
        <div style="position: absolute; top:-32vh; width:50vw; overflow:hidden">
          <div class="caption-wrap">
            <i-collapse :name="name">
              <i-collapse-item title="语种" name="name1">
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
							<!-- </div> -->
              <i-collapse-item title="单说模式" name="name2">
                <div slot="content">
                  <div style=" display:flex;  justify-content: space-between;">
                    <label style="font-size:35rpx">单说模式</label>
                    <!-- <switch :checked="dsSwitch" @change="switchChange" color="#2DB7F5" /> -->
										<i-switch :value="dsSwitch" @change="switchChange" color="#2DB7F5"  ></i-switch>
                  </div>
                </div>
              </i-collapse-item>
              <i-collapse-item title="TTS播报" name="name3">
                <div slot="content">
                  <div style=" display:flex;  justify-content: space-between;">
                    <label style="font-size:35rpx">TTS</label>
										<i-switch :value="ttsSwitch" @change="switchTTSChange" color="#2DB7F5"  ></i-switch>
                  </div>
                </div>
              </i-collapse-item>
            </i-collapse>
          </div>
        </div>
		<!-- </scroll-view> -->
      </i-drawer>
    <div class="home-chat">
     
      <!-- 头部 -->
      <!-- <div class="iconheadBox">
        <head-detail @ToggleLeft1="ToggleLeft1" @scrollTop="scrollTop"></head-detail>
      </div> -->
      <div class="home-content">
				<!-- 滚动区域 -->
        <scroll-view
          scroll-y="true"
          :style="{'height':'90vh'}" 
          :scroll-into-view="toView"
          enhanced='true'
          scroll-top="0"
         scroll-with-animation = "true"
        > 
          <div class="chat-box" v-for="(chat,ind) in chatBoxData" :key="ind">
						  <!-- 左侧初始化的提示语 -->
            <div style="margin:4vh 0; margin-left: 8rpx" v-if="chat.type == '0'">
              <img
                src="/static/img/xf.png"
                style="float:left; width:100rpx;height:100rpx;margin-top:-50rpx"
              />
              <div class="dialogBox" >
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
            <!--左侧语义展示-->
              <div
              class="text_show"
              style="margin-left: 8rpx;margin-top:8vh;"
              v-if="chat.type == '3'"
            >
              <img
                src="/static/img/xf.png"
                style="margin-top:-50rpx"
              />
              <div class="text_content">
              <div class="text_dialogBox"  @click="handleRate(chat,'cancel')">
                <p @click="detail(chat.intent)">
                 
                  <wxParse :content="chat.textDesc" />
                </p>
                <p
                  v-if="chat.time"
                  style="font-size:20rpx; margin-left:200rpx; display:flex;"
                >
                  {{chat.time}}ms
                  <i-icon type="time_fill" size="18" color="#80848f" />
                </p>
              </div>
              <div class="rate">
                
                   <div  @click="handleRate(chat,'smile')"
                   class="smile"
                   :class="{
                   'text_Scale': chat.isRate == 'smile',
                   'text_normalScale': chat.isRate == 'cry',
                   'text_left': chat.isRate == 'normal'}"> 
                   
                    <img src="/static/img/smile.png" 
                    style="width:50rpx;height:50rpx"
                     />                  
                   </div> 
                   <div  @click="handleRate(chat,'normal')"class="smile"
                   :class="{
                   'text_Scale': chat.isRate == 'normal',
                   'text_normalScale': (chat.isRate == 'smile' || chat.isRate == 'cry'),
                   }"
                   > 
                    <img src="/static/img/meh.png" style="width:50rpx;height:50rpx"
                     />
                   </div> 
                    <div  @click="handleRate(chat,'cry')"  class="smile"
                    :class="{
                    'text_Scale': chat.isRate == 'cry',
                    'text_normalScale': ( chat.isRate == 'smile'),
                    'text_right': chat.isRate == 'normal'
                    }"
                   > 
                    <img src="/static/img/cry.png" style="width:50rpx;height:50rpx"                   
                    />  
                   </div> 
                   
              </div>
               <div id="rate_input" v-if="chat.isRate == 'smile' && chat.show  ">
                    <input type="text" 
                    v-model="chat.msg"
                    placeholder="请写出评分理由"
                    confirm-type="send"
                    @confirm="sendRateMsg(chat)"
                    selection-start='15'
                    style="text-indent: 10px"
                    ></input>
              </div>
              
              <div id="rate_input" v-if="chat.isRate == 'cry'&& chat.show ">
                    <input type="text" 
                    class="cry_input"
                    placeholder="请写出评分理由(必填)"
                    v-model="chat.msg"
                    confirm-type="send"
                    @confirm="sendRateMsg(chat)"
                    selection-start='15'
                    style="text-indent: 10px"
                    ></input>
              </div> 
              
              </div>
             
            </div>
						<!--文本输入的展示 -->
            <div class="animationText"  v-if="chat.type == '1'">
                 <div class="animationContent">
                   <div class="V_me" 
                   @click="chat.isSubmit = false">{{chat.text}}</div>
        
                 </div>
                  <img src="/static/img/client.png" style="float:right; width:100rpx;height:100rpx" />
            </div>
						<!-- 语音识别结果的展示 -->
            <div class="animationText" :class="{'Scale':chat.isSubmit}" v-if="chat.type == '11'">
                 <div class="animationContent">
                   <div class="animationV_me" :class="{'scaleText':chat.isSubmit}"
                   @click="chat.isSubmit = false">{{chat.text}}</div>
                   <div  class="animationRate" :class="{'removeItem':chat.isSubmit}" >
                     <div class="rate" ><i-icon type="right" size="25" color="#fff" /></div>
                     <div class="rate" ><i-icon type="close" size="25" color="#fff" /></div>
                   </div>
                 </div>
                  <img src="/static/img/client.png" style="float:right; width:100rpx;height:100rpx" />
            </div>
            <!-- music -->
            <div class="audioPage" v-if="chat.type == '2' ">             
              <audio-ios :audioItem="chat" :myaudio="`myaudio${ind}`"></audio-ios>
            </div>
            <!-- telephone -->
            <div style="margin-top: 28rpx; margin-left: 8rpx"
            class="text_show" v-if="chat.type == '5'">
              <img
                src="/static/img/xf.png"
                style="margin-top:-50rpx"
              />
              <div class="text_content">
              <div class="text_dialogBox"  @click="handleRate(chat,'cancel')">
                <p @click="detail(chat.intent)">
                 {{chat.textDesc}}
                </p>
                <div
                  v-if="chat.time"
                  style="width:100%; display:flex; justify-content: space-between"
                >
                <button @click="toDial(chat.code)" type="warn" 
                class="dialbutton" >拨打</button>
                  <div>{{chat.time}}ms
                  <i-icon type="time_fill" size="18" color="#80848f" />
                  </div>
                </div>
              </div>
              <div class="rate" :class="{'text_centerScale': chat.isRate == 'normal' }">
                
                   <div  @click="handleRate(chat,'smile')"
                   class="smile"
                   :class="{
                   'text_Scale': chat.isRate == 'smile',
                   'text_normalScale': (chat.isRate == 'cry'),
                   'text_left': chat.isRate == 'normal'}"> 
                   
                    <img src="/static/img/smile.png" 
                    style="width:50rpx;height:50rpx"
                    
                     />                  
                   </div> 
                   <div  @click="handleRate(chat,'normal')" class="smile"
                   :class="{'text_normalScale': chat.isRate == 'normal',
                   'text_Scale': chat.isRate == 'normal',
                   'text_normalScale': (chat.isRate == 'smile' || chat.isRate == 'cry'),
                   }"
                   > 
                    <img src="/static/img/meh.png" style="width:50rpx;height:50rpx"
                    :class= "{'text_normalScale': (chat.isRate == 'smile' || chat.isRate == 'cry')}" />
                   </div> 
                    <div  @click="handleRate(chat,'cry')"  class="smile"
                    :class="{
                    'text_Scale': chat.isRate == 'cry',
                    'text_normalScale': ( chat.isRate == 'smile'),
                    'text_right': chat.isRate == 'normal'
                    }"
                   > 
                    <img src="/static/img/cry.png" style="width:50rpx;height:50rpx"                   
                    />  
                   </div> 
                   
              </div>
               <div id="rate_input" v-if="chat.isRate == 'smile'">
                    <input type="text" 
                    placeholder="请写出评分理由"
                    @confirm="sendRateMsg(chat)"
                    confirm-type="send"
                    selection-start='15'
                    style="text-indent: 10px"
                    ></input>
              </div>
              
              <div id="rate_input" class="cry_input" v-if="chat.isRate == 'cry'">
                    <input type="text" 
                    placeholder="请写出评分理由(必填)"
                    @confirm="sendRateMsg(chat)"
                    confirm-type="send"
                    selection-start='15'
                    style="text-indent: 10px"
                    ></input>
              </div> 
              
              </div>
            </div>
            <!-- mapU -->
            <div style="margin-top:28rpx; margin-left: 25rpx; "
             v-if="chat.type == '4' ">
             <div class='text_show'>
               <img
                src="/static/img/xf.png"
                style="margin-top:-50rpx"
              />
              <div class="text_content">
              <div class="text_dialogBox"  @click="handleRate(chat,'cancel')">
                <p @click="detail(chat.intent)">
                 {{chat.textDesc}}
                </p>
                <p
                  v-if="chat.time"
                  style="font-size:20rpx; margin-left:200rpx; display:flex;"
                >
                  {{chat.time}}ms
                  <i-icon type="time_fill" size="18" color="#80848f" />
                </p>
              </div>
              <div class="rate">
                   <div  @click="handleRate(chat,'smile')"
                   class="smile"
                   :class="{
                   'text_Scale': chat.isRate == 'smile',
                   'text_normalScale': chat.isRate == 'cry',
                   'text_left': chat.isRate == 'normal'}"> 
                   
                    <img src="/static/img/smile.png" 
                    style="width:50rpx;height:50rpx"
                     />                  
                   </div> 
                   <div  @click="handleRate(chat,'normal') "class="smile"
                   :class="{
                   'text_Scale': chat.isRate == 'normal',
                   'text_normalScale': (chat.isRate == 'smile' || chat.isRate == 'cry'),
                   }"
                   > 
                    <img src="/static/img/meh.png" style="width:50rpx;height:50rpx"
                     />
                   </div> 
                    <div  @click="handleRate(chat,'cry')"  class="smile"
                    :class="{
                    'text_Scale': chat.isRate == 'cry',
                    'text_normalScale': ( chat.isRate == 'smile'),
                    'text_right': chat.isRate == 'normal'
                    }"
                   > 
                    <img src="/static/img/cry.png" style="width:50rpx;height:50rpx"                   
                    />  
                   </div> 
                   
              </div>
               <div id="rate_input" v-if="chat.isRate == 'smile'">
                    <input type="text" 
                    placeholder="请写出评分理由"
                    confirm-type="send"
                    selection-start='15'
                    style="text-indent: 10px"
                    ></input>
              </div>
              
              <div id="rate_input" v-if="chat.isRate == 'cry'">
                    <input type="text" 
                    class="cry_input"
                    placeholder="请写出评分理由(必填)"
                    confirm-type="send"
                    selection-start='15'
                    style="text-indent: 10px"
                    ></input>
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
          <!-- 锚点 -->
          <div :id="'bottom' + chatBoxData.length" style="height:5rpx; margin-top:-30rpx"></div>
        </scroll-view>
      </div>
    </div>
    <!-- 底部语音文字交互 -->
    <div class="fotterBox">
      <foot-component
        @sendContent="sendContent"
        @sendTextInput="sendTextInput"
        @recordStart="recordStart"
        @recordEnd="recordEnd"
        @toggleLeft1="toggleLeft1"
				@handleMessage="handleMessage"
				@JRTtxtAnswer="JRTtxtAnswer"
				@DStxtAnswer="DStxtAnswer"
				@JRTVoicetxtAnswer="JRTVoicetxtAnswer"
        :optionsText="optionsText"
        :transformWrite="transformWrite"
      ></foot-component>
    </div>
    <!--文字和图片答案的详情-->
    <text-detail
      :visible="textData.visible"
      @close="textData.visible = false"
      :textTitle="textData.title"
      :textContent="textData.content"
    ></text-detail>
  
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
import recordVoice from "@/components/recording";
import audioIos from "@/components/audioIOS";
import footComponent from "@/components/footer";
import { program, TTS, Text } from "@/utils/wxRequest";
import { formatNavigateTo } from "@/utils/index";
import iButton from "../../../static/iview_dist/components/button/button";
import iDrawer from "../../../static/iview_dist/components/drawer/drawer";
import iRadioGroup from "../../../static/iview_dist/components/radio-group/radio-group";
import iCollapse from "../../../static/iview_dist/components/collapse/collapse";
import iCollapseItem from "../../../static/iview_dist/components/collapse-item/collapse-item";
import iSwitch from "../../../static/iview_dist/components/switch/switch";
import iMessage from "../../../static/iview_dist/components/message/message";
import iModal from "../../../static/iview_dist/components/modal/modal";
import icon from "../../../static/iview_dist/components/icon/icon";
import store from "../../store";
import textDetail from "@/components/textDetail";
import { $Message } from "../../../static/iview_dist/components/base/index";
import service from "./serviceList"; //集中处理的技能列表

let QQMapWX = require("../../utils/qqmap-wx-jssdk.js").default;
let qqmapsdk = new QQMapWX({
	key: "6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD", //腾讯路线规划申请的key(要换的。。)
});

export default {
	onLoad() {
		this.chatBoxData = [
			{
				type: 0,
				textDesc:
					"你好，你可以使用文本或者语音跟我对话,点击左下角图标可以进入设置栏",
			},
		];
		//页面分享功能
		wx.showShareMenu({
			withShareTicket: true,
		});
	},
	onUnload() {
		this.chatBoxData = [];
	},
	data() {
		return {
			toView: "bottom0", //锚点
			isVoicing: false, //控制正在说话的动画
			chatBoxData: [], //数据
			map: {},
			latitude: "",
			longitude: "", 
			innerAudioContext: "", //mp3
			showLeft1: false,
			dsSwitch: true, //左侧设置栏的单说开关
			ttsSwitch: true, //左侧设置栏的tts开关
			tts: TTS, //控制tts开关,
			optionsText: "输入你想知道的问题", //键盘提示语
			transformWrite: "false",
			chat: {},
			textData: {
				title: "",
				content: "",
				visible: false,
			},
			fangYan: [
				{
					id: 1,
					value: "普通话",
				},
				{
					id: 2,
					value: "四川话",
				},
				{
					id: 3,
					value: "粤语",
				},
				{
					id: 4,
					value: "东北话",
				},
				{
					id: 5,
					value: "上海话",
				},
				{
					id: 6,
					value: "英语",
				},
				{
					id: 7,
					value: "日语",
				},
				{
					id: 8,
					value: "泰语",
				},
				{
					id: 9,
					value: "俄语",
				},
			],
			current: "普通话",
		};
	},
	mounted() {
		console.log(Vue)
		let that = this;
		wx.getLocation({
			type: "wgs84",
			success(res) {
				that.latitude = res.latitude;
				that.longitude = res.longitude;
				let location = {
					latitude: res.latitude,
					longitude: res.longitude,
				};
				that.$store.commit("editLocation", location);
				console.log(store.state.current.longitude);
			},
		});
		that.innerAudioContext = wx.createInnerAudioContext();
	},
	components: {
		wxParse,
		recordVoice,
		footComponent,
		//headDetail,
		textDetail,
		audioIos,
		"i-button": iButton,
		"i-drawer": iDrawer,
		"i-radio-group": iRadioGroup,
		"i-collapse": iCollapse,
		"i-collapse-item": iCollapseItem,
		"i-switch": iSwitch,
		"i-icon": icon,
		"i-message": iMessage,
	},
	methods: {
		//单说模式切换
		switchDSChange() {
			this.dsSwitch = !this.dsSwitch;
			this.$store.commit("dsSwitch");
			console.log(this.$store.state.current.ds);
		},
		//tts开关切换
		switchTTSChange() {
			this.ttsSwitch = !this.ttsSwitch;
			console.log(this.tts);
			if (JSON.stringify(this.tts) == "{}") {
				this.tts = TTS;
			} else {
				this.tts = {};
			}
		},
		//方言切换
		handlefangYanChange(evt) {
			this.current = evt.value;
			console.log(this.current);
			switch (this.current) {
				case "粤语":
					this.$store.commit("MODEL_CONFIG", "cantonese");
					break;
				case "四川话":
					this.$store.commit("MODEL_CONFIG", "lmz");
					break;
				case "普通话":
					this.$store.commit("MODEL_CONFIG", "mandarin");
					break;
				case "东北话":
					this.$store.commit("MODEL_CONFIG", "dongbeiese");
					break;
				case "上海话":
					this.$store.commit("MODEL_CONFIG", "shanghainese");
					break;
				case "英语":
					this.$store.commit("MODEL_CONFIG", "us");
					break;
				case "日语":
					this.$store.commit("MODEL_CONFIG", "ja_jp");
					break;
				case "泰语":
					this.$store.commit("MODEL_CONFIG", "th_TH");
					break;
				case "俄语":
					this.$store.commit("MODEL_CONFIG", "ru-ru");
					break;
			}
		},
		getService(data) {
			let value;
			service.forEach((item) => {
				if (item.key == data) {
					value = item.value;
				}
			});
			return value;
		},
		searchService(data) {
			let value;
			service.forEach((item) => {
				if (item.key == data) {
					value = item.key;
				}
			});
			return value;
		},
		toggleLeft1() {
			this.showLeft1 = !this.showLeft1;
		},
		handleRate(chat, type) {
			console.log(chat);
			if (type == "cancel") {
				chat.isRate = null;
				chat.msg = "";
			} else if (type == "normal" || type == "smile") {
				//chat.isRate = type
				let judgeObj = {
					text: chat.intent.text ? chat.intent.text : "",
					type: "rate",
					rateType: type,
					sid: chat.sid,
				};
				// wx.idatastat.sendEvent("yu_yi", judgeObj);
			}
			chat.isRate = type;
			chat.show = true;
			console.log(chat.isRate);
		},

		//转写结果判断
		// handleType(chat, type) {
		// 	console.log(chat);
		// 	chat.isSubmit = type;
		// 	if (type == "right") {
		// 		let judgeObj = {
		// 			text: !!chat.text ? chat.text : "",
		// 			type: "judge",
		// 			judgeType: type,
		// 			sid: chat.content.intent.sid,
		// 		};
		// 		// wx.idatastat.sendEvent("yu_yi", judgeObj);
		// 	} else {
		// 		this.handleFocus = true;
		// 		this.optionsText = "请输入正确的转写结果";
		// 		this.transformWrite = true;
		// 	}
		// },
		handleMessage(text) {
			this.handleFocus = false;
			console.log("上传");
			if (!text || text == "") {
				$Message(this, {
					content: "请输入正确转写内容",
					type: "error",
				});
				return;
			}
			console.log(text);
			let judgeObj = {
				text: chat.text ? chat.text : "",
				type: "judge",
				judgeType: "wrong",
				sid: chat.sid,
				message: text,
			};
			// wx.idatastat.sendEvent("yu_yi", judgeObj);
			this.transformWrite = false;
			this.optionsText = "请输入你想知道的问题";
			//this.chat = {}
		},
		sendRateMsg(chat) {
			if (chat.isRate == "cry" && (!chat.msg || chat.msg == "")) {
				$Message(this, {
					content: "请输入评分理由",
					type: "error",
				});
				return;
			}
			const rateObj = {
				type: "rate",
				message: chat.msg,
				text: chat.intent.text ? chat.intent.text : "",
				sid: chat.intent.sid,
				rateType: chat.isRate,
			};
			// wx.idatastat.sendEvent("yu_yi", rateObj);
			setTimeout(() => {
				chat.show = false;
				chat.msg == "";
			}, 500);
		},
		//进入详情字段页面
		detail(intent) {

			// wx.setStorageSync("intent", intent);
			// formatNavigateTo("/pages/paramDetail/main?");
		},

		jokeStory(data) {
			this.textData.title = data.title;
			this.textData.content = data.content;
		},
		ttsPlay(data) {
			this.innerAudioContext.src = data;
			this.innerAudioContext.play();
		},
		/**故事展示 */
		toStoryJoke(data) {
			this.textData.title = data.title;
			this.textData.content = data.content;
			this.textData.visible = true;
		},
		toMap(item) {
			this.map.latitude = item.latitude;
			this.map.longitude = item.longitude;
			this.map.address = item.address;
			let referer = "fly-fish-voice"; //调用插件的app的名称
			let endPoint = JSON.stringify({
				//终点
				name: this.map.address,
				latitude: parseFloat(this.map.latitude),
				longitude: parseFloat(this.map.longitude),
			});

			wx.navigateTo({
				url:
					"plugin://routePlan/index?key=" +
					this.key +
					"&referer=" +
					referer +
					"&endPoint=" +
					endPoint +
					"&navigation=1",
			});
		},
		//拨号
		toDial(code) {
			if (!code) {
				wx.showModal({
					title: "提示",
					content: "没有找到可拨打的号码",
				});
			}
			wx.makePhoneCall({
				phoneNumber: code,
			});
		},
		recordStart() {
			this.isVoicing = true;
			this.innerAudioContext.stop();
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
				audioName:
					a.albumName.length < 10
						? a.albumName
						: a.albumName.slice(0, 9) + "..", //歌名
			};
			this.pushData(audioObj);
		},
		slice(data) {
			data.forEach((e, ind) => {
				e.list = ind + 1;
			});
			let result = [];
			for (let i = 0, len = data.length; i < len; i += 5) {
				result.push(data.slice(i, i + 5));
			}
			return result;
		},
		pushData(opt) {
			console.log(opt);
			let that = this;
			/**加个字段控制建议框的展示 */
			if (opt.type == "3" || opt.type == "4" || opt.type == "5") {
				opt.show = true;
			}
			that.chatBoxData.push(opt);

					that.toView = "bottom" + that.chatBoxData.length;

		},
		//文字输入
		txtAnswer(resData) {
			let that = this;
			const timeStart = wx.getPerformance().now();
			Text(resData)
				.then((res) => {
					const TimeContract = wx.getPerformance().now() - timeStart;
					if (res.data.code == "0") {
						let answerData = res.data.data;
						answerData.data.forEach((e) => {
							if (e.sub == "tpp") {
								let content = JSON.parse(e.content);
								if (content.rc == 1) {
									let tempObj = {
										type: 3,
										textDesc: "参数缺失或无效或项目没配置技能",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									return;
								}
								let intent = content.intent;
								console.log(intent);

								switch (intent.service) {
									case "train":
										//console.log('train')
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 7,
												//textDesc: intent.answer.text,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											//console.log('answer')
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
											};
											that.pushData(tempObj);
											return;
										} else {
											//console.log('else')
											let textDesc = "已为你实现火车操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isDisAgree: false,
												isAgree: false,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										}
										break;

									//case "story":
									case "joke":
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 9,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											// console.log('answer')
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										} else {
											console.log("else");
											let textDesc = "已为你实现笑话操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										}
										break;

									case "flight":
										if (intent.hasOwnProperty("data")) {
											let result = this.slice(intent.data.result);
											const tempObj = {
												type: 8,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										} else {
											let textDesc = "已为你实现航班操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										}

										break;
									case "telephone":
										if (!intent.hasOwnProperty("answer")) {
											let textDesc = "已为你实现通讯操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										}
										let tempObj1 = {
											type: 5,
											textDesc: intent.answer.text,
											code: intent.searchSemantic.code,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj1);
										return;
										break;
									case "mapU":
										if (
											intent.operation == "POS_RANK" ||
											!intent.hasOwnProperty("data")
										) {
											let tempObj = {
												type: 3,
												textDesc: "已为您实现导航操作",
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										}
										if (intent.hasOwnProperty("data")) {
											let data = intent.data.result;
											//计算地点距离
											let toadd = [];
											data.forEach((e) => {
												let obj = {
													latitude: parseFloat(e.latitude),
													longitude: parseFloat(e.longitude),
												};
												toadd.push(obj);
											});
											qqmapsdk.calculateDistance({
												from: {
													latitude: that.latitude,
													longitude: that.longitude,
												},
												to: toadd,
												success: function (res) {
													//成功后的回调
													if (res.hasOwnProperty("result")) {
														data.forEach((e) => {
															e.distance =
																res.result.elements[0].distance > 1000
																	? (
																			res.result.elements[0].distance / 1000
																	  ).toFixed(1) + "公里"
																	: res.result.elements[0].distance + "米";
														});
													}
												},
												fail: function (error) {
													data.forEach((e) => {
														e.distance =
															e.distance > 1000
																? (e.distance / 1000).toFixed(1) + "公里"
																: e.distance + "米";
													});
												},
											});
											let result = this.slice(data);
											if (intent.hasOwnProperty("answer")) {
												let tempObj = {
													type: 4,
													textDesc: intent.answer.text,
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												return;
											} else {
												let tempObj = {
													type: 3,
													textDesc: "已为您实现导航操作",
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												return;
											}
										}
										break;
									case "musicX":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												return;
											} else if (
												intent.semantic.slots.hasOwnProperty("presenter")
											) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												return;
											} else if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
											} else {
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												let audioObj = {
													type: 2,
													audioSinger: intent.data.result[0].singerName, //歌手
													audioSrc: intent.data.result[0].playUrl, //播放地址
													audioPic: intent.data.result[0].picMin, //专辑图片
													audioName: intent.data.result[0].songName, //歌名
												};
												//console.log(audioObj)
												that.pushData(tempObj);
												that.pushData(audioObj);
												return;
											}
										} else {
											let textDesc = "已为你实现音乐操作";
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										}
										break;

									case "internetRadio":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												return;
											} else if (
												intent.semantic.slots.hasOwnProperty("presenter")
											) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												return;
											} else if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
											} else {
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												let audioObj = {
													type: 2,
													audioSinger: intent.data.result[0].singerName, //歌手
													audioSrc: intent.data.result[0].playUrl, //播放地址
													audioPic: intent.data.result[0].picMin, //专辑图片
													audioName: intent.data.result[0].songName, //歌名
												};
												//console.log(audioObj)
												that.pushData(tempObj);
												that.pushData(audioObj);
												return;
											}
										} else {
											let textDesc = "已为你实现节目操作";
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											return;
										}
										break;
								}

								//其他所有技能模块
								if (this.searchService(intent.service)) {
									if (intent.hasOwnProperty("answer")) {
										let text = intent.answer.display_text
											? intent.answer.display_text
											: intent.answer.text;
										let tempObj = {};
										tempObj.type = 3;
										tempObj.textDesc = text;
										tempObj.intent = intent;
										tempObj.time = TimeContract;
										tempObj.isRate = null;
										tempObj.msg = "";

										this.pushData(tempObj);
									} else {
										let serviceList = "";
										let textDesc, se;
										if (intent.moreResults.length != 0) {
											let content = intent.moreResults;
											content.forEach((e) => {
												if (e.multi_intent == "true") {
													serviceList += " " + this.getService(e.service) + " ";
												}
											});
											se = (
												this.getService(intent.service) + serviceList
											).fontcolor("red");

											//console.log(se)
										} else {
											se = this.getService(intent.service).fontcolor("red");

											//console.log(se)
										}
										if (intent.multi_intent == "true") {
											let multi = "多意图".fontcolor("red");

											textDesc =
												multi +
												"：已为你实现 ".fontcolor("black") +
												se +
												" 操作".fontcolor("black");
										}
										if (intent.multi_intent != "true")
											textDesc =
												"已为你实现 ".fontcolor("black") +
												se +
												" 操作".fontcolor("black");

										const tempObj = {
											type: 3,
											textDesc: textDesc,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj);
									}
									return;
								}

								if (intent.rc == "4") {
									let tempObj = {
										type: 3,
										textDesc: "Error rc4",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									return;
								} else {
									let tempObj = {
										type: 3,
										textDesc: "抱歉，我现在还不会这个技能，正在学习中~",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
								}
							}
						});
					} else {
						let tempObj = {
							type: 3,
							textDesc: "服务出错了",
							time: TimeContract,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
					}
				})
				.catch(() => {
					let tempObj = {
						type: 3,
						textDesc: "服务出错了",
						time: TimeContract,
						isRate: null,
						msg: "",
					};
					that.pushData(tempObj);
				});
		},

		//东北话上海话语义非车载，通用语音接口通过识别文本再次调用文本接口（tts）
		DStxtAnswer(resData) {
			let that = this;
			const timeStart = wx.getPerformance().now();

			Text(resData)
				.then((res) => {
					const TimeContract = wx.getPerformance().now() - timeStart;
					if (res.data.code == "0") {
						let answerData = res.data.data;
						// console.log(answerData)
						answerData.data.forEach((e) => {
							if (e.sub == "tpp") {
								let content = JSON.parse(e.content);
								if (content.rc == 1) {
									let tempObj = {
										type: 3,
										textDesc: "参数缺失或无效或项目没配置技能",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									this.playTTS("参数缺失或无效或项目没配置技能");
									return;
								}
								let intent = content.intent;
								console.log(intent);
								switch (intent.service) {
									case "train":
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 7,
												//textDesc: intent.answer.text,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											//console.log('answer')
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											//console.log('else')
											let textDesc = "已为你实现火车操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS("已为您实现火车操作");
											return;
										}
										break;

									case "joke":
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 9,
												//textDesc: intent.answer.text,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现笑话操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;

									case "flight":
										if (intent.hasOwnProperty("data")) {
											let result = this.slice(intent.data.result);
											const tempObj = {
												type: 8,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现航班操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;
									case "telephone":
										if (!intent.hasOwnProperty("answer")) {
											let textDesc = "已为你实现通讯操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										let tempObj1 = {
											type: 5,
											textDesc: intent.answer.text,
											code: intent.searchSemantic.code,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj1);
										this.playTTS(intent.answer.text);
										return;
										break;
									case "mapU":
										if (
											intent.operation == "POS_RANK" ||
											!intent.hasOwnProperty("data")
										) {
											let tempObj = {
												type: 3,
												textDesc: "已为您实现导航操作",
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS("已为您实现导航操作");
											return;
										}
										if (intent.hasOwnProperty("data")) {
											let data = intent.data.result;
											//计算地点距离
											let toadd = [];
											data.forEach((e) => {
												let obj = {
													latitude: parseFloat(e.latitude),
													longitude: parseFloat(e.longitude),
												};
												toadd.push(obj);
											});
											qqmapsdk.calculateDistance({
												from: {
													latitude: that.latitude,
													longitude: that.longitude,
												},
												to: toadd,
												success: function (res) {
													if (res.hasOwnProperty("result")) {
														data.forEach((e) => {
															e.distance =
																res.result.elements[0].distance > 1000
																	? (
																			res.result.elements[0].distance / 1000
																	  ).toFixed(1) + "公里"
																	: res.result.elements[0].distance + "米";
														});
													}
												},
												fail: function (error) {
													data.forEach((e) => {
														e.distance =
															e.distance > 1000
																? (e.distance / 1000).toFixed(1) + "公里"
																: e.distance + "米";
													});
												},
											});
											let result = this.slice(data);
											if (intent.hasOwnProperty("answer")) {
												let tempObj = {
													type: 4,
													textDesc: intent.answer.text,
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											} else {
												let tempObj = {
													type: 3,
													textDesc: "已为您实现导航操作",
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS("以为您实现导航操作");
												return;
											}
										}
										break;
									case "musicX":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.semantic.slots.hasOwnProperty("presenter")) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													this.playTTS(intent.answer.text);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}

											//音乐
											let tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											let audioObj = {
												type: 2,
												audioSinger: intent.data.result[0].singerName, //歌手
												audioSrc: intent.data.result[0].playUrl, //播放地址
												audioPic: intent.data.result[0].picMin, //专辑图片
												audioName: intent.data.result[0].songName, //歌名
											};
											that.pushData(audioObj);
											return;
										} else {
											let textDesc = "已为你实现音乐操作";
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS("以为您实现音乐操作");
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(
												"抱歉我没有找到对应的结果呢！我会继续努力学习的呢"
											);
											return;
										}
										break;
									case "internetRadio":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.semantic.slots.hasOwnProperty("presenter")) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													this.playTTS(intent.answer.text);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}

											//音乐
											let tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											let audioObj = {
												type: 2,
												audioSinger: intent.data.result[0].singerName, //歌手
												audioSrc: intent.data.result[0].playUrl, //播放地址
												audioPic: intent.data.result[0].picMin, //专辑图片
												audioName: intent.data.result[0].songName, //歌名
											};
											that.pushData(audioObj);
											return;
										} else {
											let textDesc = "已为你实现节目操作";
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS("已为您实现音乐操作");
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(
												"抱歉我没有找到对应的结果呢！我会继续努力学习的呢"
											);
											return;
										}
										break;
									case "cmd":
										if (intent.semantic.slots.insType == "CHANGE") {
											if (
												intent.semantic.slots.name == "粤语" ||
												intent.semantic.slots.name == "广东话"
											) {
												{
													let tempObj = {
														type: 3,
														textDesc: "已为您切换到粤语",
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													this.pushData(tempObj);
													//console.log('change')
													this.$store.commit("MODEL_CONFIG", "cantonese");
													this.current = "粤语";
													this.playTTS("为您切换到粤语");
													return;
												}
											} else if (
												intent.semantic.slots.insType == "CHANGE" &&
												intent.semantic.slots.name == "四川话"
											) {
												let tempObj = {
													type: 3,
													textDesc: "已为您切换到四川话",
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.$store.commit("MODEL_CONFIG", "lmz");
												this.current = "四川话";
												this.playTTS("以为您切换到四川话");
												return;
											} else {
												$Message(this, {
													content: "暂不支持切换其他方言",
													type: "error",
												});
												let tempObj = {
													type: 3,
													textDesc: "暂不支持切换其他方言",
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS("暂不支持切换其他方言");
												return;
											}
										} else {
											let tempObj = {
												type: 3,
												textDesc: "已为您实现命令操作",
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS("已为您实现命令操作");
											return;
										}
										break;
								}

								//所有技能模块
								if (this.searchService(intent.service)) {
									if (intent.hasOwnProperty("answer")) {
										let text = intent.answer.display_text
											? intent.answer.display_text
											: intent.answer.text;
										const tempObj = {
											type: 3,
											textDesc: text,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj);
										this.playTTS(text);
									} else {
										let serviceList = "";
										let textDesc, se;
										if (intent.moreResults.length != 0) {
											let content = intent.moreResults;
											content.forEach((e) => {
												if (e.multi_intent == "true") {
													serviceList += " " + this.getService(e.service) + " ";
												}
											});
											se = (
												this.getService(intent.service) + serviceList
											).fontcolor("red");
										} else {
											se = this.getService(intent.service).fontcolor("red");
										}
										if (intent.multi_intent == "true") {
											let multi = "多意图".fontcolor("red");
											textDesc = multi + "：已为你实现 " + se + " 操作1";
										}
										if (intent.multi_intent != "true")
											textDesc = "已为你实现 " + se + " 操作";

										const tempObj = {
											type: 3,
											textDesc: textDesc,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj);
										if (intent.multi_intent == "true") {
											this.playTTS(
												"多意图 已为你实现" +
													this.getService(intent.service) +
													serviceList +
													"操作"
											);
										} else {
											this.playTTS(
												" 已为你实现" +
													this.getService(intent.service) +
													serviceList +
													"操作"
											);
										}
									}
									return;
								}

								if (intent.rc == "4") {
									let tempObj = {
										type: 3,
										textDesc: "Error rc4",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									return;
								} else {
									let tempObj = {
										type: 3,
										textDesc: "抱歉，我现在还不会这个技能，正在学习中~",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
								}
							}
						});
					} else {
						let tempObj = {
							type: 3,
							textDesc: "服务出错了",
							//intent: err,
							time: TimeContract,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("服务出错了");
					}
				})
				.catch(() => {
					let tempObj = {
						type: 3,
						textDesc: "服务出错了",
						time: TimeContract,
						isRate: null,
						msg: "",
					};
					that.pushData(tempObj);
					this.playTTS("服务出错了");
				});
		},
		//日俄泰英上海话语义非车载，通用语音接口通过识别文本再次调用文本接口（tts）
		//  提示语也不同
		JRTtxtAnswer(resData) {
			let that = this;
			const timeStart = wx.getPerformance().now();
			Text(resData.text)
				.then((res) => {
					const TimeContract = wx.getPerformance().now() - timeStart;
					if (res.data.code == "0") {
						let answerData = res.data.data;
						answerData.data.forEach((e) => {
							if (e.sub == "tpp") {
								let content = JSON.parse(e.content);
								if (content.rc == 1) {
									let tempObj = {
										type: 3,
										textDesc: "参数缺失或无效或项目没配置技能",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									this.playTTS("参数缺失或无效或项目没配置技能");
									return;
								}
								let intent = content.intent;
								console.log(intent);
								let arr = ['telephone','musicX','mapU','radio','cmd','airControl','carControl']
								let service = intent.service
									 if (intent.rc == "4") {
									let tempObj = {
										type: 3,
										textDesc: "Error rc4",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									return;
								}
								arr.forEach(e=>{
									if(service.indexOf(e) != -1) {
										service = e
									} 
								})
								switch (service) {									
									case "train":
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 7,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											//console.log('answer')
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现火车操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS("已为您实现火车操作");
											return;
										}
										break;

									case "joke":
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 9,
												//textDesc: intent.answer.text,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现笑话操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;

									case "flight":
										if (intent.hasOwnProperty("data")) {
											let result = this.slice(intent.data.result);
											const tempObj = {
												type: 8,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现航班操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;
									case "telephone":
										if (!intent.hasOwnProperty("answer")) {
											let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = '通信操作を実行しました'
											}else if(resData.type == 'th_TH') {
													textDesc = 'การดำเนินงานการสื่อสารสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = 'операция связи'
											}else if (resData.type == 'us') {
												textDesc = ' telephone operation has been realized for you'
											}
											
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										let tempObj1 = {
											type: 5,
											textDesc: intent.answer.text,
											code: intent.searchSemantic.code,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj1);
										this.playTTS(intent.answer.text);
										return;
										break;
									case "mapU":
										if (
											intent.operation == "POS_RANK" ||
											!intent.hasOwnProperty("data")
										) {
											let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = 'ナビゲーションを実行しました'
											}else if(resData.type == 'th_TH') {
													textDesc = 'คุณได้ดำเนินการนำร่องสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' навигация для вас'
											}else if (resData.type == 'us') {
												textDesc = 'Navigation has been realized for you'
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										if (intent.hasOwnProperty("data")) {
											let data = intent.data.result;
											//计算地点距离
											let toadd = [];
											data.forEach((e) => {
												let obj = {
													latitude: parseFloat(e.latitude),
													longitude: parseFloat(e.longitude),
												};
												toadd.push(obj);
											});
											qqmapsdk.calculateDistance({
												from: {
													latitude: that.latitude,
													longitude: that.longitude,
												},
												to: toadd,
												success: function (res) {
													if (res.hasOwnProperty("result")) {
														data.forEach((e) => {
															e.distance =
																res.result.elements[0].distance > 1000
																	? (
																			res.result.elements[0].distance / 1000
																	  ).toFixed(1) + "公里"
																	: res.result.elements[0].distance + "米";
														});
													}
												},
												fail: function (error) {
													data.forEach((e) => {
														e.distance =
															e.distance > 1000
																? (e.distance / 1000).toFixed(1) + "公里"
																: e.distance + "米";
													});
												},
											});
											let result = this.slice(data);
											if (intent.hasOwnProperty("answer")) {
												let tempObj = {
													type: 4,
													textDesc: intent.answer.text,
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											} else {
												let tempObj = {
													type: 3,
													textDesc: "已为您实现导航操作",
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS("以为您实现导航操作");
												return;
											}
										}
										break;
									case "musicX":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
								
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.semantic.slots.hasOwnProperty("presenter")) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													this.playTTS(intent.answer.text);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}

											//音乐
											let tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											let audioObj = {
												type: 2,
												audioSinger: intent.data.result[0].singerName, //歌手
												audioSrc: intent.data.result[0].playUrl, //播放地址
												audioPic: intent.data.result[0].picMin, //专辑图片
												audioName: intent.data.result[0].songName, //歌名
											};
											that.pushData(audioObj);
											return;
										} else {
														let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = '音楽操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = ' การดำเนินงานเพลงสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' музыка для вас'
											}else if (resData.type == 'us') {
												textDesc = 'Music operation has been realized for you '
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(
												"抱歉我没有找到对应的结果呢！我会继续努力学习的呢"
											);
											return;
										}
										break;
									case "internetRadio":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.semantic.slots.hasOwnProperty("presenter")) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													this.playTTS(intent.answer.text);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
											this.playTTS(intent.answer.text);
												return;
											}
											if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}

											//音乐
											let tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											let audioObj = {
												type: 2,
												audioSinger: intent.data.result[0].singerName, //歌手
												audioSrc: intent.data.result[0].playUrl, //播放地址
												audioPic: intent.data.result[0].picMin, //专辑图片
												audioName: intent.data.result[0].songName, //歌名
											};
											that.pushData(audioObj);
											return;
										} else {
														let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = 'ラジオ操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = 'การดำเนินงานของวิทยุสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = 'работа с радио'
											}else if(resData.type == 'us') {
												textDesc = 'Radio operation has been realized for you '
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
										//	this.playTTS(textDesc);
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											// this.playTTS(
											// 	"抱歉我没有找到对应的结果呢！我会继续努力学习的呢"
											// );
											return;
										}
										break;
									case "cmd":
										if (intent.semantic.slots.insType == "CHANGE") {
											if (
												intent.semantic.slots.name == "粤语" ||
												intent.semantic.slots.name == "广东话"
											) {
												{
													let tempObj = {
														type: 3,
														textDesc: "已为您切换到粤语",
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													this.pushData(tempObj);
													//console.log('change')
													this.$store.commit("MODEL_CONFIG", "cantonese");
													this.current = "粤语";
													this.playTTS("为您切换到粤语");
													return;
												}
											} else if (
												intent.semantic.slots.insType == "CHANGE" &&
												intent.semantic.slots.name == "四川话"
											) {
												let tempObj = {
													type: 3,
													textDesc: "已为您切换到四川话",
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.$store.commit("MODEL_CONFIG", "lmz");
												this.current = "四川话";
												this.playTTS("以为您切换到四川话");
												return;
											} else {
												$Message(this, {
													content: "暂不支持切换其他方言",
													type: "error",
												});
												let tempObj = {
													type: 3,
													textDesc: "暂不支持切换其他方言",
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS("暂不支持切换其他方言");
												return;
											}
										} else {
													let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = 'コマンド操作を実行しました '
											}else if(resData.type == 'th_TH') {
													textDesc = ' การดำเนินงานคำสั่งสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' для выполнения команды '
											} else if(resData.type == 'us') {
												textDesc = ' The command operation has been realized for you  '
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;
								}

								//所有技能模块
								if (this.searchService(service)) {
									if (intent.hasOwnProperty("answer")) {
										let text = intent.answer.display_text
											? intent.answer.display_text
											: intent.answer.text;
										const tempObj = {
											type: 3,
											textDesc: text,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj);
										this.playTTS(text);
									} 
									else {
										console.log(service)
										let textDesc
									
										if(service == 'carControl') {
												if(resData.type == 'ja_jp') {
												 textDesc = ' 車のコントロール操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = ' ได้ตระหนักถึงการควบคุมรถสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' управление машиной'
											} else if (resData.type == 'us') {
												textDesc = ' car control operation has been realized for you'
											}
										}else if(service == 'airControl') {
											console.log('ac')
											console.log(resData)
												if(resData.type == 'ja_jp') {
												 textDesc = ' エアコンの操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = ' การดำเนินงานของเครื่องปรับอากาศสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' у вас есть кондиционер'
											}else if (resData.type == 'us') {
												console.log('yy')
												textDesc = ' Air conditioning operation has been realized for you'
											}
										}
											const tempObj = {
											type: 3,
											textDesc: textDesc,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										this.pushData(tempObj)
										this.playTTS(textDesc);
									}
									
								}
							}
						});
					} else {
						let tempObj = {
							type: 3,
							textDesc: "服务出错了",
							//intent: err,
							time: TimeContract,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("服务出错了");
					}
				})
				.catch(() => {
					let tempObj = {
						type: 3,
						textDesc: "服务出错了",
						time: TimeContract,
						isRate: null,
						msg: "",
					};
					that.pushData(tempObj);
					this.playTTS("服务出错了");
				});
		},
		JRTVoicetxtAnswer(resData) {
			console.log(resData)
			let that = this;
			that.enter(11,resData)
			const timeStart = wx.getPerformance().now();
			Text(resData.text)
				.then((res) => {
					const TimeContract = wx.getPerformance().now() - timeStart;
					if (res.data.code == "0") {
						let answerData = res.data.data;
						answerData.data.forEach((e) => {
							if (e.sub == "tpp") {
								let content = JSON.parse(e.content);
								if (content.rc == 1) {
									let tempObj = {
										type: 3,
										textDesc: "参数缺失或无效或项目没配置技能",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									this.playTTS("参数缺失或无效或项目没配置技能");
									return;
								}
								let intent = content.intent;
								console.log(intent);
								let arr = ['telephone','musicX','mapU','radio','cmd','airControl','carControl']
								let service = intent.service
									 if (intent.rc == "4") {
									let tempObj = {
										type: 3,
										textDesc: "Error rc4",
										intent: intent,
										time: TimeContract,
										isRate: null,
										msg: "",
									};
									that.pushData(tempObj);
									return;
								}
								arr.forEach(e=>{
									if(service.indexOf(e) != -1) {
										service = e
									} 
								})
								switch (service) {									
									case "train":
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 7,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											//console.log('answer')
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现火车操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS("已为您实现火车操作");
											return;
										}
										break;

									case "joke":
										if (intent.hasOwnProperty("data")) {
											let result = that.slice(intent.data.result);
											const tempObj = {
												type: 9,
												//textDesc: intent.answer.text,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现笑话操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;

									case "flight":
										if (intent.hasOwnProperty("data")) {
											let result = this.slice(intent.data.result);
											const tempObj = {
												type: 8,
												data: result,
												simData: intent.data.result,
												intent: intent,
												time: TimeContract,
											};
											const tempObj1 = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj1);
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										}
										if (
											intent.hasOwnProperty("answer") &&
											!intent.hasOwnProperty("data")
										) {
											const tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											return;
										} else {
											let textDesc = "已为你实现航班操作";
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;
									case "telephone":
										if (!intent.hasOwnProperty("answer")) {
											let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = '通信操作を実行しました'
											}else if(resData.type == 'th_TH') {
													textDesc = 'การดำเนินงานการสื่อสารสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = 'операция связи'
											}else if (resData.type == 'en-us') {
												textDesc = ' telephone operation has been realized for you'
											}
											
											const tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										let tempObj1 = {
											type: 5,
											textDesc: intent.answer.text,
											code: intent.searchSemantic.code,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj1);
										this.playTTS(intent.answer.text);
										return;
										break;
									case "mapU":
										if (
											intent.operation == "POS_RANK" ||
											!intent.hasOwnProperty("data")
										) {
											let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = 'ナビゲーションを実行しました'
											}else if(resData.type == 'th_TH') {
													textDesc = 'คุณได้ดำเนินการนำร่องสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' навигация для вас'
											}else if (resData.type == 'en-us') {
												textDesc = 'Navigation has been realized for you'
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										if (intent.hasOwnProperty("data")) {
											let data = intent.data.result;
											//计算地点距离
											let toadd = [];
											data.forEach((e) => {
												let obj = {
													latitude: parseFloat(e.latitude),
													longitude: parseFloat(e.longitude),
												};
												toadd.push(obj);
											});
											qqmapsdk.calculateDistance({
												from: {
													latitude: that.latitude,
													longitude: that.longitude,
												},
												to: toadd,
												success: function (res) {
													if (res.hasOwnProperty("result")) {
														data.forEach((e) => {
															e.distance =
																res.result.elements[0].distance > 1000
																	? (
																			res.result.elements[0].distance / 1000
																	  ).toFixed(1) + "公里"
																	: res.result.elements[0].distance + "米";
														});
													}
												},
												fail: function (error) {
													data.forEach((e) => {
														e.distance =
															e.distance > 1000
																? (e.distance / 1000).toFixed(1) + "公里"
																: e.distance + "米";
													});
												},
											});
											let result = this.slice(data);
											if (intent.hasOwnProperty("answer")) {
												let tempObj = {
													type: 4,
													textDesc: intent.answer.text,
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											} else {
												let tempObj = {
													type: 3,
													textDesc: "已为您实现导航操作",
													data: result,
													simData: intent.data.result,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS("以为您实现导航操作");
												return;
											}
										}
										break;
									case "musicX":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
								
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.semantic.slots.hasOwnProperty("presenter")) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													this.playTTS(intent.answer.text);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}

											//音乐
											let tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											let audioObj = {
												type: 2,
												audioSinger: intent.data.result[0].singerName, //歌手
												audioSrc: intent.data.result[0].playUrl, //播放地址
												audioPic: intent.data.result[0].picMin, //专辑图片
												audioName: intent.data.result[0].songName, //歌名
											};
											that.pushData(audioObj);
											return;
										} else {
														let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = '音楽操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = ' การดำเนินงานเพลงสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' музыка для вас'
											}else if (resData.type == 'en-us') {
												textDesc = 'Music operation has been realized for you '
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(
												"抱歉我没有找到对应的结果呢！我会继续努力学习的呢"
											);
											return;
										}
										break;
									case "internetRadio":
										if (intent.hasOwnProperty("answer")) {
											if (intent.operation == "INSTRUCTION") {
												//提示语
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.semantic.slots.hasOwnProperty("presenter")) {
												if (intent.data.hasOwnProperty("error")) {
													let tempObj = {
														//节目提示
														type: 3,
														textDesc: intent.answer.text,
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													that.pushData(tempObj);
													this.playTTS(intent.answer.text);
													return;
												}
												let album = intent.data.result[0].albumId;
												program(album).then((res) => {
													this.programer(res);
												});
												let tempObj = {
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}
											if (intent.data.hasOwnProperty("error")) {
												let tempObj = {
													//歌曲播放提示
													type: 3,
													textDesc: intent.answer.text,
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS(intent.answer.text);
												return;
											}

											//音乐
											let tempObj = {
												type: 3,
												textDesc: intent.answer.text,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(intent.answer.text);
											let audioObj = {
												type: 2,
												audioSinger: intent.data.result[0].singerName, //歌手
												audioSrc: intent.data.result[0].playUrl, //播放地址
												audioPic: intent.data.result[0].picMin, //专辑图片
												audioName: intent.data.result[0].songName, //歌名
											};
											that.pushData(audioObj);
											return;
										} else {
														let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = 'ラジオ操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = 'การดำเนินงานของวิทยุสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = 'работа с радио'
											}else if(resData.type == 'en-us') {
												textDesc = 'Radio operation has been realized for you '
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
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
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(
												"抱歉我没有找到对应的结果呢！我会继续努力学习的呢"
											);
											return;
										}
										break;
									case "cmd":
										if (intent.semantic.slots.insType == "CHANGE") {
											if (
												intent.semantic.slots.name == "粤语" ||
												intent.semantic.slots.name == "广东话"
											) {
												{
													let tempObj = {
														type: 3,
														textDesc: "已为您切换到粤语",
														intent: intent,
														time: TimeContract,
														isRate: null,
														msg: "",
													};
													this.pushData(tempObj);
													//console.log('change')
													this.$store.commit("MODEL_CONFIG", "cantonese");
													this.current = "粤语";
													this.playTTS("为您切换到粤语");
													return;
												}
											} else if (
												intent.semantic.slots.insType == "CHANGE" &&
												intent.semantic.slots.name == "四川话"
											) {
												let tempObj = {
													type: 3,
													textDesc: "已为您切换到四川话",
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.$store.commit("MODEL_CONFIG", "lmz");
												this.current = "四川话";
												this.playTTS("以为您切换到四川话");
												return;
											} else {
												$Message(this, {
													content: "暂不支持切换其他方言",
													type: "error",
												});
												let tempObj = {
													type: 3,
													textDesc: "暂不支持切换其他方言",
													intent: intent,
													time: TimeContract,
													isRate: null,
													msg: "",
												};
												that.pushData(tempObj);
												this.playTTS("暂不支持切换其他方言");
												return;
											}
										} else {
													let textDesc
											if(resData.type == 'ja_jp') {
												 textDesc = 'コマンド操作を実行しました '
											}else if(resData.type == 'th_TH') {
													textDesc = ' การดำเนินงานคำสั่งสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' для выполнения команды '
											} else if(resData.type == 'en-us') {
												textDesc = ' The command operation has been realized for you  '
											}
											let tempObj = {
												type: 3,
												textDesc: textDesc,
												intent: intent,
												time: TimeContract,
												isRate: null,
												msg: "",
											};
											that.pushData(tempObj);
											this.playTTS(textDesc);
											return;
										}
										break;
								}

								//所有技能模块
								if (this.searchService(service)) {
									if (intent.hasOwnProperty("answer")) {
										let text = intent.answer.display_text
											? intent.answer.display_text
											: intent.answer.text;
										const tempObj = {
											type: 3,
											textDesc: text,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										that.pushData(tempObj);
										this.playTTS(text);
									} 
									else {
										console.log(service)
										let textDesc
									
										if(service == 'carControl') {
												if(resData.type == 'ja_jp') {
												 textDesc = ' 車のコントロール操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = ' ได้ตระหนักถึงการควบคุมรถสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' управление машиной'
											} else if (resData.type == 'en-us') {
												textDesc = ' car control operation has been realized for you'
											}
										}else if(service == 'airControl') {
											console.log('ac')
											console.log(resData)
												if(resData.type == 'ja_jp') {
												 textDesc = ' エアコンの操作を実現しました'
											}else if(resData.type == 'th_TH') {
													textDesc = ' การดำเนินงานของเครื่องปรับอากาศสำหรับคุณ'
											} else if (resData.type == 'ru-ru') {
												textDesc = ' у вас есть кондиционер'
											}else if (resData.type == 'en-us') {
												console.log('yy')
												textDesc = ' Air conditioning operation has been realized for you'
											}
										}
											const tempObj = {
											type: 3,
											textDesc: textDesc,
											intent: intent,
											time: TimeContract,
											isRate: null,
											msg: "",
										};
										this.pushData(tempObj)
										this.playTTS(textDesc);
									}
									
								}
							}
						});
					} else {
						let tempObj = {
							type: 3,
							textDesc: "服务出错了",
							//intent: err,
							time: TimeContract,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("服务出错了");
					}
				})
				.catch(() => {
					let tempObj = {
						type: 3,
						textDesc: "服务出错了",
						time: TimeContract,
						isRate: null,
						msg: "",
					};
					that.pushData(tempObj);
					this.playTTS("服务出错了");
				});
		},

		//回答问题的接口
		answerOperate(resData, type) {
			console.log("jinru");
			let that = this;
			console.log("nomoral");
			that.txtAnswer(resData);
		},
		enter(type, opt) {
			let obj = JSON.parse(JSON.stringify(opt));
			if (type == 11) {
				obj.type = 11;
				obj.isSubmit = false;
				this.pushData(obj);
			} else if (type == 1) {
				obj = {
					text: opt.text,
					type:1
				};
				//obj.isSubmit = false
				this.pushData(obj);
			}
			//this.chatBoxData.push(obj)

		//	this.$nextTick(() => {
				//setTimeout(() => {
					this.toView = "bottom" + this.chatBoxData.length;
				//}, 10);
			//});
		},
		//输入框发送
		sendTextInput(val) {
				if(val.type == 'ja_jp'||
			val.type == 'ru-ru'||
			val.type == 'th_TH'||
			val.type == 'us' ) {
				console.log('send')
				this.enter(11, val);
				this.JRTtxtAnswer(val);
				return;
			}
			this.enter(1, val);
			//东北话 上海话
			if (val.type == "DongbeiShanghai") {
				this.DStxtAnswer(val.text);
				return;
			}
		
			this.answerOperate(val.text, "noVoice");
		},
		/**播放tts */
		playTTS(text) {
			let self = this;
			if (JSON.stringify(this.tts) !== "{}") {
				self.tts(text)
					.then((res) => {
						self.ttsPlay(res.data.data);
					})
					.catch(() => {
						this.$Message({
							content: "tts超时",
							type: "error",
						});
					});
			}
		},
		//语音发送
		sendContent(val) {
			console.log(val)
			let that = this
			let tts = ""
			if (val.text == "" && val.content.rc == 1) {
				let tempObj = {
					textDesc: '抱歉，我还没有听清你的问题呢',
					type: 3,
					time: val.time,
					isRate: null
				}
				this.pushData(tempObj)
				this.playTTS("抱歉，我还没有听清你的问题呢")
				return
			}
			if (val.flag == 1) {
				let tempObj = {
					textDesc: '抱歉，我好像出错了',
					type: 3,
					time: val.time,
					isRate: null
				}
				this.playTTS("抱歉，可能出错了")
				return
			}
			that.enter(11, val);
			let intent = val.content.intent;
			let service = intent.service;
			console.log(service);
			/**处理单独开发的功能 例如 火车航班 笑话 音乐.... */
			switch (service) {
				case "train":
					if (intent.hasOwnProperty("data")) {
						//数据列表对象
						let result = that.slice(intent.data.result);
						const tempObj = {
							type: 7,
							data: result,
							simData: intent.data.result,
							intent: intent,
							time: val.time,
						};
						const textObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							idRate: null,
						};
						/**先提示语后数据 */
						that.pushData(textObj);
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						return;
					} else if (
						/**有回答 无数据的对象 */
						intent.hasOwnProperty("answer") &&
						!intent.hasOwnProperty("data")
					) {
						const tempObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						return;
					} else {
						let textDesc = "已为你实现火车操作";
						const tempObj = {
							type: 3,
							textDesc: textDesc,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("已为您实现火车操作");
						return;
					}
					break;
				/**笑话内容展示 */
				case "joke":
					if (intent.hasOwnProperty("data")) {
						let result = that.slice(intent.data.result);
						/**笑话列表 */
						const tempObj = {
							type: 9,
							data: result,
							simData: intent.data.result,
							intent: intent,
							time: val.time,
						};
						const textObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(textObj);
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						return;
					} else if (
						intent.hasOwnProperty("answer") &&
						!intent.hasOwnProperty("data")
					) {
						const tempObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						return;
					} else {
						let textDesc = "已为你实现笑话操作";
						const tempObj = {
							type: 3,
							textDesc: textDesc,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS(textDesc);
						return;
					}
					break;

				case "flight":
					if (intent.hasOwnProperty("data")) {
						let result = this.slice(intent.data.result);
						const tempObj = {
							type: 8,
							data: result,
							simData: intent.data.result,
							intent: intent,
							time: val.time,
						};
						const textObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(textObj);
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						return;
					} else if (
						intent.hasOwnProperty("answer") &&
						!intent.hasOwnProperty("data")
					) {
						const tempObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						return;
					} else {
						let textDesc = "已为你实现航班操作";
						const tempObj = {
							type: 3,
							textDesc: textDesc,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						that.playTTS(textDesc);
						return;
					}
					break;

				case "telephone":
					if (!intent.hasOwnProperty("answer")) {
						let textDesc = "已为你实现通讯操作";
						const tempObj = {
							type: 3,
							textDesc: textDesc,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						that.playTTS(textDesc);
						return;
					}
					let tempObj1 = {
						type: 5,
						textDesc: intent.answer.text,
						code: intent.searchSemantic.code,
						intent: intent,
						time: val.time,
						isRate: null,
						msg: "",
					};
					this.playTTS(intent.answer.text);
					that.pushData(tempObj1);
					return;
					break;
				case "mapU":
					if (
						intent.operation == "POS_RANK" ||
						!intent.hasOwnProperty("data")
					) {
						let tempObj = {
							type: 3,
							textDesc: "已为您实现导航操作",
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("已为您实现导航操作");
						return;
					}
					if (intent.hasOwnProperty("data")) {
						let data = intent.data.result;
						//计算地点距离
						let toadd = [];
						data.forEach((e) => {
							let obj = {
								latitude: parseFloat(e.latitude),
								longitude: parseFloat(e.longitude),
							};
							toadd.push(obj);
						});
						qqmapsdk.calculateDistance({
							from: {
								latitude: that.latitude,
								longitude: that.longitude,
							},
							to: toadd,
							success: function (res) {
								//成功后的回调
								if (res.hasOwnProperty("result")) {
									data.forEach((e) => {
										e.distance =
											res.result.elements[0].distance > 1000
												? (res.result.elements[0].distance / 1000).toFixed(1) +
												  "公里"
												: res.result.elements[0].distance + "米";
									});
								}
							},
							fail: function (error) {
								data.forEach((e) => {
									e.distance =
										e.distance > 1000
											? (e.distance / 1000).toFixed(1) + "公里"
											: e.distance + "米";
								});
							},
						});
						let result = this.slice(data);
						if (intent.hasOwnProperty("answer")) {
							let tempObj = {
								type: 4,
								textDesc: intent.answer.text,
								data: result,
								simData: intent.data.result,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS(intent.answer.text);
							return;
						} else {
							let tempObj = {
								type: 3,
								textDesc: "已为您实现导航操作",
								data: result,
								simData: intent.data.result,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS("以为您实现导航操作");
							return;
						}
					}
					break;
				case "musicX":
					if (intent.hasOwnProperty("answer")) {
						if (intent.operation == "INSTRUCTION") {
							//提示语
							let tempObj = {
								type: 3,
								textDesc: intent.answer.text,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS(intent.answer.text);
							return;
						}
						if (intent.semantic.slots.hasOwnProperty("presenter")) {
							if (intent.data.hasOwnProperty("error")) {
								let tempObj = {
									//节目提示
									type: 3,
									textDesc: intent.answer.text,
									intent: intent,
									time: val.time,
									isRate: null,
									msg: "",
								};
								that.pushData(tempObj);
								this.playTTS(intent.answer.text);
								return;
							}
							let album = intent.data.result[0].albumId;
							program(album).then((res) => {
								this.programer(res);
							});
							let tempObj = {
								type: 3,
								textDesc: intent.answer.text,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS(intent.answer.text);
							return;
						}
						if (intent.data.hasOwnProperty("error")) {
							let tempObj = {
								//歌曲播放提示
								type: 3,
								textDesc: intent.answer.text,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS(intent.answer.text);
							return;
						}
						//音乐
						let tempObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						let audioObj = {
							type: 2,
							audioSinger: intent.data.result[0].singerName, //歌手
							audioSrc: intent.data.result[0].playUrl, //播放地址
							audioPic: intent.data.result[0].picMin, //专辑图片
							audioName: intent.data.result[0].songName, //歌名
						};
						that.pushData(audioObj);
						return;
					} else {
						let textDesc = "已为你实现音乐操作";
						let tempObj = {
							type: 3,
							textDesc: textDesc,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("以为您实现音乐操作");
						return;
					}
					if (
						intent.answer.type == "NULL" &&
						intent.hasOwnProperty("semantic")
					) {
						let tempObj = {
							type: 3,
							textDesc: "抱歉我没有找到对应的结果呢！我会继续努力学习的呢",
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("抱歉我没有找到对应的结果呢！我会继续努力学习的呢");
						return;
					}
					break;
				case "internetRadio":
					if (intent.hasOwnProperty("answer")) {
						if (intent.operation == "INSTRUCTION") {
							//提示语
							let tempObj = {
								type: 3,
								textDesc: intent.answer.text,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS(intent.answer.text);
							return;
						}
						if (intent.semantic.slots.hasOwnProperty("presenter")) {
							if (intent.data.hasOwnProperty("error")) {
								let tempObj = {
									//节目提示
									type: 3,
									textDesc: intent.answer.text,
									intent: intent,
									time: val.time,
									isRate: null,
									msg: "",
								};
								that.pushData(tempObj);
								this.playTTS(intent.answer.text);
								return;
							}
							let album = intent.data.result[0].albumId;
							program(album).then((res) => {
								this.programer(res);
							});
							let tempObj = {
								type: 3,
								textDesc: intent.answer.text,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS(intent.answer.text);
							return;
						}
						if (intent.data.hasOwnProperty("error")) {
							let tempObj = {
								//歌曲播放提示
								type: 3,
								textDesc: intent.answer.text,
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS(intent.answer.text);
							return;
						}
						//音乐
						let tempObj = {
							type: 3,
							textDesc: intent.answer.text,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS(intent.answer.text);
						let audioObj = {
							type: 2,
							audioSinger: intent.data.result[0].singerName, //歌手
							audioSrc: intent.data.result[0].playUrl, //播放地址
							audioPic: intent.data.result[0].picMin, //专辑图片
							audioName: intent.data.result[0].songName, //歌名
						};
						that.pushData(audioObj);
						return;
					} else {
						let textDesc = "已为你实现节目操作";
						let tempObj = {
							type: 3,
							textDesc: textDesc,
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("以为您实现节目操作");
						return;
					}
					if (
						intent.answer.type == "NULL" &&
						intent.hasOwnProperty("semantic")
					) {
						let tempObj = {
							type: 3,
							textDesc: "抱歉我没有找到对应的结果呢！我会继续努力学习的呢",
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("抱歉我没有找到对应的结果呢！我会继续努力学习的呢");
						return;
					}
					break;
				case "cmd":
					if (intent.semantic.slots.insType == "CHANGE") {
						if (
							intent.semantic.slots.name == "粤语" ||
							intent.semantic.slots.name == "广东话"
						) {
							{
								let tempObj = {
									type: 3,
									textDesc: "已为您切换到粤语",
									intent: intent,
									time: val.time,
									isRate: null,
									msg: "",
								};
								that.pushData(tempObj);
								this.$store.commit("MODEL_CONFIG", "cantonese");
								this.current = "粤语";
								this.playTTS("为您切换到粤语");
								return;
							}
						} else if (
							intent.semantic.slots.insType == "CHANGE" &&
							intent.semantic.slots.name == "四川话"
						) {
							let tempObj = {
								type: 3,
								textDesc: "已为您切换到四川话",
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.$store.commit("MODEL_CONFIG", "lmz");
							this.current = "四川话";
							this.playTTS("以为您切换到四川话");
							return;
						} else {
							$Message(this, {
								content: "暂不支持切换其他方言",
								type: "error",
							});
							let tempObj = {
								type: 3,
								textDesc: "暂不支持切换其他方言",
								intent: intent,
								time: val.time,
								isRate: null,
								msg: "",
							};
							that.pushData(tempObj);
							this.playTTS("暂不支持切换其他方言");
							return;
						}
					} else {
						let tempObj = {
							type: 3,
							textDesc: "已为您实现命令操作",
							intent: intent,
							time: val.time,
							isRate: null,
							msg: "",
						};
						that.pushData(tempObj);
						this.playTTS("已为您实现命令操作");
						return;
					}
					break;
			}

			if (intent.rc == "4") {
				let tempObj = {
					type: 3,
					textDesc: "Error rc4",
					intent: intent,
					time: val.time,
					isRate: null,
					msg: "",
				};
				that.pushData(tempObj);
				return;
			}

			if (this.searchService(intent.service)) {
				if (intent.hasOwnProperty("answer")) {
					let text = intent.answer.display_text
						? intent.answer.display_text
						: intent.answer.text;
					console.log("11.12");
					const tempObj = {
						type: 3,
						textDesc: text,
						intent: intent,
						time: val.time,
						isRate: null,
						msg: "",
					};
					this.pushData(tempObj);
					this.playTTS(text);
				} else {
					let serviceList = "";
					let textDesc, se;
					if (intent.moreResults.length != 0) {
						let content = intent.moreResults;
						content.forEach((e) => {
							if (e.multi_intent == "true") {
								serviceList += " " + this.getService(e.service) + " ";
							}
						});
						se = (this.getService(intent.service) + serviceList).fontcolor(
							"red"
						);
					} else {
						se = this.getService(intent.service).fontcolor("red");
					}
					if (intent.multi_intent == "true") {
						let multi = "多意图".fontcolor("red");
						textDesc =
							multi +
							"：已为你实现 ".fontcolor("black") +
							se +
							" 操作".fontcolor("black");
					}
					if (intent.multi_intent != "true")
						textDesc =
							"已为你实现 ".fontcolor("black") +
							se +
							" 操作".fontcolor("black");

					const tempObj = {
						type: 3,
						textDesc: textDesc,
						intent: intent,
						time: val.time,
						isRate: null,
						msg: "",
					};
					that.pushData(tempObj);
					if (intent.multi_intent == "true") {
						this.playTTS(
							"多意图 已为你实现" +
								this.getService(intent.service) +
								serviceList +
								"操作"
						);
					} else {
						this.playTTS(
							" 已为你实现" +
								this.getService(intent.service) +
								serviceList +
								"操作"
						);
					}
				}
				return;
			} else {
				let tempObj = {
					type: 3,
					textDesc: "抱歉，我现在还不会这个技能，正在学习中~",
					intent: intent,
					time: val.time,
					isRate: null,
					msg: "",
				};
				that.pushData(tempObj);
				this.playTTS("抱歉，我现在还不会这个技能，正在学习中");
			}
		},
	},
	/**切换输入方式文本 */
	toTxt() {
		this.textAreaValue = "";
		this.iconShow = false;
	},
};
</script>

<style lang="less" scoped>
@import url("../../../static/css/base.css");
.home-contaniner {
	height: 100vh;
	width: 100vw;
	position: fixed;
	background: #ffffff;
	overflow: hidden;
	overflow: hidden;
}

.text_show {
	position: relative;
	display: flex;
	max-width: 90vw;
	min-width: 40vw;
	justify-content: flex-start;
	margin-left: 2vw;
}
.dialbutton {
	height: 4vh;
	line-height: 3vh;
	margin-bottom: 1vh;
}
.text_show img {
	width: 100rpx;
	height: 100rpx;
}
.text_show .text_content {
	display: flex;
	flex-direction: column;
	min-width: 20vw;
	max-width: 60vw;
	min-height: 30vh;
	overflow: hidden;
}
.text_show .text_content .text_dialogBox {
	background-color: #ededed;
	color: black;
	min-height: 12vh;
	border: 1px solid #ccc;
	border-radius: 8px 8px 0 0;
}
.text_dialogBox p {
	text-indent: 20rpx;
	padding: 20rpx 36rpx 20rpx 36rpx;
	font-size: 28rpx;
	color: black;
}
.text_show .text_content .rate {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	background-color: #939393;
	height: 5vh;
	border: 1px solid #ccc;
	border-radius: 0 0 8px 8px;
}
.cry_input {
	border: 1rpx solid red;
}
.smile {
	transition: 1s all cubic-bezier(0.46, 1, 0.23, 1.52);
	text-align: center;
	overflow: hidden;
}
.normal {
	transition: 1s all cubic-bezier(0.46, 1, 0.23, 1.52);
	text-align: center;
}
.text_Scale {
	flex-grow: 1;
}
.text_normalScale {
	z-index: 1;
	// width: 0;
	//flex-basis: 0;
}
.text_left {
	transform: translateX(-10vw);
}
.text_right {
	transform: translateX(10vw);
}
#rate_input {
	margin-bottom: 2vh;
	height: 7vh;
}
#rate_input input {
	margin-top: 1vh;
	background-color: #ededed;
	height: 6vh;
	border-radius: 9px 9px 9px 9px;
	line-height: 6vh;
}

.chat-box {
	overflow: hidden;
}

.title {
	position: absolute;
	margin-left: 150rpx;
	margin-top: 2vh;
}

.home-content {
	position: relative;
	height: 90vh;
	margin-top: 3rpx;
	overflow: hidden;
}

.home-chat {
	position: relative;
	height: 90vh;
}
.fotterBox {
	border: 1px solid rgba(4, 4, 20, 0.356);
	position: relative;
	width: 100%;
	height: 10vh;
	box-shadow: 0px -1px rgba(219, 219, 219, 0.849);
	background-color: #ffffff;
}

.animationText {
	display: flex;
	height: auto;
	width: 100vw;
	justify-content: flex-end;
	transition: 0.5s;
	margin-bottom: 4vh;
	margin-top: 1vh;
}
.animationText .animationContent {
	display: flex;
	flex-direction: column;
	max-width: 70vw;
	min-width: 20vw;
	border-radius: 8px 8px 8px 8px;
	transition: 0.5s;
}
.V_me {
	text-indent: 15rpx;
	padding: 20rpx 36rpx 20rpx 36rpx;
	font-size: 28rpx;
	max-width: 70vw;
	min-height: 4vh;
	min-width: 20vw;
	background-color: #ededed;
	border-radius: 8px 8px 8px 8px;
	transition: 0.5s;
	z-index: 1;
}
.animationText .animationV_me {
	text-indent: 15rpx;
	padding: 20rpx 36rpx 20rpx 36rpx;
	font-size: 28rpx;
	max-width: 70vw;
	min-height: 4vh;
	min-width: 20vw;
	background-color: #ededed;
	border-radius: 8px 8px 0px 0px;
	transition: 0.5s;
	z-index: 1;
}
.animationText .animationRate {
	position: relative;
	display: flex;
	background-color: #939393;
	transition: 0.5s;
	border-radius: 0px 0px 8px 8px;
}
.animationText img {
	margin-left: 3vw;
}
.animationText .animationRate .rate {
	border-right: 1px solid #ccc;
	width: 50%;
	height: 5vh;
	border-radius: 0px 0px 8px 0px;
	text-align: center;
	line-height: 5vh;
}
.removeItem {
	position: relative;
	transform: translateY(-100%);
	opacity: 0;
}

.scaleText {
	border-radius: 8px 8px 8px 8px !important;
	padding: 20rpx 36rpx 20rpx 36rpx;
}

.text-input-column {
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

.dialogBox {
	border-radius: 0 15rpx 15rpx 15rpx;
	position: relative;
	background-color: #ededed;
	width: 50vw;
	color: black;
	margin-left: 110rpx;
	min-height: 50rpx;
	padding: 20rpx 0;
	font-size: 28rpx;
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

.audioPage {
	position: relative;
	width: 100%;
	margin: 5rpx 0 0 10rpx;
}
</style>

