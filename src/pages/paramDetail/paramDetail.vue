<template>
    <div id ="detail" @touchstart="precopy" @touchend="copy">       
    <wxParse :content="msg"  />
    
    </div>
</template>

<script>

import wxParse from 'mpvue-wxparse'

export default {
    data(){
        return{
            msg:'',
            time:'',
            
        }
    },
      components: {
    wxParse
  },
    mounted() {
         let msg =wx.getStorageSync('intent')
        let tem = JSON.stringify(JSON.parse( JSON.stringify(JSON.parse( JSON.stringify(msg,null,2),null,2 ))),null,2)
        this.msg = '<pre>'+tem+'</pre>'    
    },
   	onLoad() {
			
	  wx.showShareMenu({
      withShareTicket: true
    })
    },
    methods:{
      precopy(){
        this.time = new Date().getTime()
      },
    copy() {
        if(new Date().getTime() - this.time > 800){
           wx.setClipboardData({
            data: this.msg.replace('<pre>','').replace('</pre>',''),
            success (res) {
              wx.getClipboardData({
                success (res) {
                  console.log('已复制') 
                }
              })
            }
          })
        }
          this.time  = ''
      
    }
    }
    
    
}
</script>

<style>
  @import url("~mpvue-wxparse/src/wxParse.css"); 
  #detail {
    overflow: auto;
    -webkit-overflow: auto;
    position: fixed;
    width: 100vw;
    height:100vh;
  }
</style>