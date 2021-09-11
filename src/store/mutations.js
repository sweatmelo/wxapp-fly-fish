import {MODEL_CONFIG} from'./mutation-type'

export default{
[MODEL_CONFIG](state,value) {
    state.current.accent = value
    if(value == 'lmz'){
    state.current.isDia= true //方言播报
    state.current.character = 'xiaorong'
    } else if(value == 'cantonese'){
        state.current.isDia= true
        state.current.character = 'xiaomei'
    } else if(value == 'main'){
        state.current.isDia= false
        state.current.character = 'x_xiaoxue'
    } else if(value == 'dongbeiese') {
        state.current.character = 'x_xiaoqian'
    } else if(value == 'shanghainese') {
        state.current.character = 'x_xiaoxue' //上海话暂时用普通话
    } else if(value == 'ru-ru') {
        state.current.character = 'x2_keshu'
    } else if(value == 'ja_jp') {
        state.current.character = 'x2_zhongcun'
    } else if(value == 'th_TH') {
        state.current.character = 'yingying'
    } else if(value == 'us') {
        state.current.character = 'x2_john'
    }
    
},

dsSwitch(state) {
    state.current.ds = !state.current.ds
},
editLocation(state,value) {
    state.current.latitude = value.latitude
    state.current.longitude = value.longitude
},

}