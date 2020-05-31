let md5 = require('md5-node');
export function answerTextz( data) {
const URL = 'https://openapi.xfyun.cn/v2/aiui'
const APPID = '5ec777cd'
const API_KEY = '9b2092171fa9c2bac40025784016bef0'
const AUTH_ID = '4445f41e175bf2f3c699edf706884767'
const DATA_TYPE = 'text'
const SAMPLE_RATE = '16000'
const SCENE = 'main'
const RESULT_LEVEL = 'complete'
//const PERS_PARAM = "{\\\"auth_id\\\":\\\"4445f41e175bf2f3c699edf706884767\\\"}"

	let param = "{\"result_level\":\""+RESULT_LEVEL+"\",\"auth_id\":\""+AUTH_ID+"\",\"data_type\":\""+DATA_TYPE+"\",\"scene\":\""+SCENE+"\"}"
	//param = "{\"result_level\":\""+RESULT_LEVEL+"\",\"auth_id\":\""+AUTH_ID+"\",\"data_type\":\""+DATA_TYPE+"\",\"sample_rate\":\""+SAMPLE_RATE+"\",\"scene\":\""+SCENE+"\",\"lat\":\""+LAT+"\",\"lng\":\""+LNG+"\"}"
    //#使用个性化参数时参数格式如下：
    let paramBase64 = new Buffer(param).toString('base64');
    
    let X_CurTime = Math.floor(Date.now()/1000);
    let checkSum = md5(API_KEY +X_CurTime +paramBase64);
	console.log(checkSum)
	
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


export function request(url, method, data, header = {}) {
	return new Promise((resolve, reject) => {
		wx.request({
			url:  url,
			method: method,
			data: data,
			headers: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {
				//      wx.hideLoading()
				resolve(res)
			}
		})
	})
}

