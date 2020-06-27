import store from '../store'
let md5 = require('md5-node');
import { formatNavigateTo,hex_sha1,sha1} from "@/utils/index"
const URL = 'https://openapi.xfyun.cn/v2/aiui'
const APPID = '5ec777cd'
const API_KEY = '9b2092171fa9c2bac40025784016bef0'
const AUTH_ID = '4445f41e175bf2f3c699edf706884767'
const SCENE = 'main'
export function answerTextz( data) {
	console.log(store.state.current.index)
const DATA_TYPE = 'text'
const RESULT_LEVEL = 'complete'

	let param = "{\"result_level\":\""+RESULT_LEVEL+"\",\"auth_id\":\""+AUTH_ID+"\",\"data_type\":\""+DATA_TYPE+"\",\"scene\":\""+SCENE+"\"}"
    let paramBase64 = new Buffer(param).toString('base64');
	let X_CurTime = Math.floor(Date.now()/1000);
    let checkSum = md5(API_KEY +X_CurTime +paramBase64);
	//console.log(checkSum)
	
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

	export function Voice(data)  {
		
		const url = 'https://autotest.openspeech.cn/wechat-aiui/aiui/file'
			return new Promise((resolve, reject) => {
				 wx.uploadFile({
					 url: url,
					 filePath: data,
					 name:'file' ,
					header: {
						openId: 'gzcui',
						auth_id: 'gzcui',
						data_type: 'audio',
						//language: 'zh_cn',
						//accent: 'cantonese'
						 user_defined_params:{
						 	wakeup:'true'}
						//wakeup: 'true'	
					},
					success: function(res) {
						resolve(res.data)
					},
					fail: function(res) {
						reject(res)
					}
				})
			})
	}
		 
		 

	export function program(album){
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


	//   return new Promise((resolve,reject) =>{
    //      wx.request({
    //          url: 'https://autopre.openspeech.cn/api/v2.0/programe/album/'+album+'/track',
    //          method: 'get',
    //          data :{
    //              //hostId: '1000202',
    //              pageSize:'1',
    //              clientType:'0',
    //              sign:'6b1ab395e24cf9bfd9c0c3e85f4b94bf706cd9ab',
    //              openId:'5b319aaa'
    //          },
    //          success: function(res) {
	// 			resolve(res)
	// 		},
	// 		fail: function(err){
	// 			reject(err)
	// 		}
			 
    //      })

	// })
}



export function TTS(data)  {

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