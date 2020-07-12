import store from '../store'
let md5 = require('md5-node');
import { formatNavigateTo,hex_sha1,sha1} from "@/utils/index"
const URL = 'https://openapi.xfyun.cn/v2/aiui'
const APPID = '5ec777cd'
const API_KEY = '9b2092171fa9c2bac40025784016bef0'
const AUTH_ID = '4445f41e175bf2f3c699edf706884767'
const SCENE = 'main'
     function answerTextz( data) {
	
const DATA_TYPE = 'text'
const RESULT_LEVEL = 'complete'

	let param = "{\"result_level\":\""+RESULT_LEVEL+"\",\"auth_id\":\""+AUTH_ID+"\",\"data_type\":\""+DATA_TYPE+"\",\"scene\":\""+SCENE+"\"}"
    let paramBase64 = new Buffer(param).toString('base64');
	let X_CurTime = Math.floor(Date.now()/1000);
    let checkSum = md5(API_KEY +X_CurTime +paramBase64);
	
	return new Promise((resolve, reject) => {
		wx.request({
			url: URL,
			method: 'POST',
			data: data,
            header: {
                'X-CurTime': X_CurTime ,
                'X-Param': paramBase64,
                'X-Appid': APPID,
                'X-CheckSum': checkSum,
            },
			success: function(res) {
				resolve(res)
			},
			fail: function(res) {
				reject(res)
			}
		})
	})

}
function Text(data){
	let accent = store.state.current.accent
	  const url = 'https://autotest.openspeech.cn/wechat-aiui/aiui/text'
	   return new Promise((resolve,reject) =>{
		wx.request({
			url: url,
			//method: 'POST',
            header: {
				openId: 'gzcui',
				auth_id: 'gzcui',
				data_type: 'text'
			},
			body:{
				json:JSON.parse(data)
			},
			success: function(res) {
				resolve(res)
			},
			fail: function(res) {
				reject(res)
			}
		})
	})
	  

}

	 function Voice(data)  {
	  let saccent = store.state.current.accent
	  //let time = new Date().getTime()
		const url = 'https://autotest.openspeech.cn/wechat-aiui/aiui/file'
			return new Promise((resolve, reject) => {
				
				let time = new Date().getTime()
				 wx.uploadFile({
					 url: url,
					 filePath: data,
					 name:'file' ,
					header: {
						openId: 'gzcui',
						auth_id: 'gzcui',
						data_type: 'audio',
						//scene: saccent,
						//accent:saccent,
						//language: 'zh_cn',
						
							
					},
					success: function(res) {
						console.log(new Date().getTime()-time)
						resolve(res.data)
						
						console.log()
					},
					fail: function(res) {
						reject(res)
					},
					
				})
			})
	}
		 
		 

	 function program(album){
		return new Promise((resolve,reject) =>{
        var value='aiuicusclientType0pageSize14c19ac6f5e4b11e88762d00d525b3d86'
       var sha1_result=sha1(value);
         wx.request({
             url: 'https://autopre.openspeech.cn/api/v2.0/programe/album/'+album+'/track',
             method: 'get',
             data :{
                 //hostId: '1000202',
                 pageSize:'1',
                 clientType:'0', 
                 openId:'aiuicus',
                 sign: sha1_result,
                
             },
             success: function(res) {
				resolve(res)
			},
			fail: function(err){
				reject(err)
			}
			 
		 })
		})

}



 function TTS(data)  {

	const url = 'https://autotest.openspeech.cn/wechat-aiui/aiui/ttsPlay'
	//http://172.31.198.24:10090/wechat-aiui/ttsPlay HTTP/1.1
		return new Promise((resolve, reject) => {
			 wx.request({
				 url: url,
				 method:'get',
				 timeout:5000,
				data:{
					text:data,
					character: 'x_xiaoxue'
					
				},
				success: function(res) {
					resolve(res)
					//console.log(res)
				},
				fail: function(res) {
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