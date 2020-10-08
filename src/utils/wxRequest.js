import store from '../store'
let md5 = require('md5-node');
import {
  formatNavigateTo,
  hex_sha1,
  sha1
} from "@/utils/index"
const URL = 'https://openapi.xfyun.cn/v2/aiui'
const APPID = '5ec777cd'
const API_KEY = '9b2092171fa9c2bac40025784016bef0'
const AUTH_ID = '4445f41e175bf2f3c699edf706884767'
const SCENE = 'main'
/**
 * 
 * @param {aiui文本} data 废弃不用
 */
function answerTextz(data) {  
  const DATA_TYPE = 'text'
  const RESULT_LEVEL = 'complete'
  let param = "{\"result_level\":\"" + RESULT_LEVEL + "\",\"auth_id\":\"" + AUTH_ID + "\",\"data_type\":\"" + DATA_TYPE + "\",\"scene\":\"" + SCENE + "\"}"
  let paramBase64 = new Buffer(param).toString('base64');
  let X_CurTime = Math.floor(Date.now() / 1000);
  let checkSum = md5(API_KEY + X_CurTime + paramBase64);

  return new Promise((resolve, reject) => {
    wx.request({
      url: URL,
      method: 'POST',
      data: data,
      header: {
        'X-CurTime': X_CurTime,
        'X-Param': paramBase64,
        'X-Appid': APPID,
        'X-CheckSum': checkSum,
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })

}
/**
 * 
 * @param {集成后的文本} data 
 */
function Text(data) {
  //let current = store.state.current
  //const url = 'https://autotest.openspeech.cn/wechat-aiui/aiui/text'
  const url = 'https://autodev.openspeech.cn/wechat-aiui/aiui/text'
  let current =  store.state.current
  let lan = 'zh-cn'
  if(current.accent == 'us') {
    lan = 'en'
  }
  let paramsObject
   if(current.ds){
     paramsObject = {
    "wakeup": "true"
  }
}else{
  paramsObject = {
    "wakeup": "false"
  }
}
  
 paramsObject = JSON.stringify(paramsObject)
  let diffParams = {
    user_defined_params: paramsObject,
    "gps.lat":current.latitude,
    "gps.lng":current.longitude
  }
  console.log(diffParams)
  let params = encodeURIComponent(JSON.stringify(diffParams))
  console.log(params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      header: {
        openId: 'fly-fish',
        auth_id: 'fly-fish',
        data_type: 'text',
        dfirUserParams:params,
         //scene: current.accent,
         accent: current.accent,
         language:lan
      },
      data: {     
          "text": data
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
      }
    })
  })


}
/**
 * 
 * @param {语音} data 
 */
function Voice(data) {
  let current =  store.state.current
  let lan = 'zh-cn'
  let paramsObject
   if(current.ds){
     paramsObject = {
    "wakeup": "true"
  }
}else{
  paramsObject = {
    "wakeup": "false"
  }
}
if(current.accent == 'us') {
  lan = 'en'
}
  console.log(current.accent)
  
 paramsObject = JSON.stringify(paramsObject)
  //let params = encodeURIComponent(JSON.stringify(paramsObject))
  const url = 'https://autodev.openspeech.cn/wechat-aiui/aiui/file'
  let diffParams = {
    user_defined_params: paramsObject,
    "gps.lat":current.latitude,
    "gps.lng":current.longitude
  }
  console.log(diffParams)
  let params = encodeURIComponent(JSON.stringify(diffParams))
  return new Promise((resolve, reject) => { 
    let time = new Date().getTime()
    wx.uploadFile({
      url: url,
      filePath: data,
      name: 'file',
      header: {
         openId: 'flyfish',
         auth_id: 'flyfish',
         data_type: 'audio',
        dfirUserParams:params,
        scene: current.accent,
        accent: current.accent,
        language: lan,

      },
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      },

    })
  })
}


/**
 * 
 * @param {获取节目播放源} album 
 */
function program(album) {
  return new Promise((resolve, reject) => {
    var value = 'aiuicusclientType0pageSize14c19ac6f5e4b11e88762d00d525b3d86'
    var sha1_result = sha1(value);
    wx.request({
      url: 'https://autopre.openspeech.cn/api/v2.0/programe/album/' + album + '/track',
      method: 'get',
      data: {
        //hostId: '1000202',
        pageSize: '1',
        clientType: '0',
        openId: 'aiuicus',
        sign: sha1_result,

      },
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }

    })
  })

}


/**
 * 
 * @param tts语音播报} data 
 */
function TTS(data) {
  let current =  store.state.current
  //const url = 'https://autotest.openspeech.cn/wechat-aiui/aiui/ttsPlay'
  const url ='https://autodev.openspeech.cn/wechat-aiui/aiui/ttsPlay'
  //http://172.31.198.24:10090/wechat-aiui/this.ttsPlay HTTP/1.1
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'get',
      timeout: 6000,
      data: {
        text: data,
        character: current.character,
        isDialect: current.isDia

      },
      success: function (res) {
        resolve(res)
        //console.log(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}


export {
  TTS,
  program,
  Voice,
  answerTextz,
  Text,

}
