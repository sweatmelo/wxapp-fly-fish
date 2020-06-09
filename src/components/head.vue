<template>
    <div class="head">
        <img src="/static/img/skill.png" @click="tomap">
        <div class="title">飞鱼语音助理</div>
    </div>
</template>
<script>
import { formatNavigateTo,hex_sha1,sha1} from "@/utils/index"
import { Text } from "@/utils/wxRequest.js"
import { request } from "@/utils/wxRequest.js"
export default {
    methods: {
        tomap (){
          
                formatNavigateTo(
					"/pages/map/main" 
				)
           
        }
    },
    created() { 
    //     let album = '9742774'
    //     let openId = 'aiuicus'
    //     let openKey = '4c19ac6f5e4b11e88762d00d525b3d86'
    //     var value='aiuicusclientType0pageSize14c19ac6f5e4b11e88762d00d525b3d86'
    //    var sha1_result=sha1(value);
    //      console.log(sha1_result)
    //      wx.request({
    //          url: 'https://autopre.openspeech.cn/api/v2.0/programe/album/'+album+'/track',
    //          method: 'get',
    //          data :{
    //              //hostId: '1000202',
    //              pageSize:'1',
    //              clientType:'0', 
    //              openId:'aiuicus',
    //              sign: sha1_result,
                
    //          },
    //          success: function(res) {
	// 			console.log(res)
	// 		},
			 
    //      })

    }
}

</script>


<style lang="less" scoped>
.head{
    width: 100%;
    height: 8vh;
    position: relative;
    display: flex;
    justify-content: left;
    border: 1px solid rgba(4, 4, 20, 0.356);

    img{
        position:absolute;
         margin: 20rpx 20rpx;
        width: 60rpx;
        height: 60rpx;
    }

    .title{
        position:absolute;
        margin: 20rpx 150rpx;
    }
}
</style>


