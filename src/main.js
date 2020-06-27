import Vue from 'vue'
import App from './App'
//import Vuex from'vuex'
import store from './store/index'
Vue.prototype.$store = store
//Vue.use(Vuex)
Vue.config.productionTip = false
App.mpType = 'app'

wx.authorize({
	scope: "scope.record",
	success: function() {},
	fail: function() {
		wx.showToast({ 
			title: '您未授权录音，功能将无法使用',
			duration: 1000,
			icon: 'none'
		});
	}
})

const app = new Vue(App)
app.$mount()
