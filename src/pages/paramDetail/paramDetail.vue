<template>
    <div id ="detail">       
    <wxParse :content="msg" />
    
    </div>
</template>

<script>

import wxParse from 'mpvue-wxparse'

export default {
    data(){
        return{
            msg:'',
            
        }
    },
      components: {
    wxParse
  },
    mounted() {
         let msg =wx.getStorageSync('intent')
        let tem = JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse( JSON.stringify(JSON.parse( JSON.stringify(msg,null,2),null,2 ))),null,2)),null,2)),null,2)
        console.log(this.msg)
        this.msg = '<pre>'+tem+'</pre>'
      
    },
    
}
</script>

<style>
 
 @import url("~mpvue-wxparse/src/wxParse.css"); 
</style>