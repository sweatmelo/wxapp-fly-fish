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

        // let qqmapsdk = new QQMapWX({
			// 			key: '6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD'
			// 		})
         //    data.forEach(e =>{
				// 	console/log('111')
				// 		//调用距离计算接口
				// 		qqmapsdk.calculateDistance({
				// 			//mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
				// 			//from参数不填默认当前地址
				// 			//获取表单提交的经纬度并设置from和to参数（示例为string格式）
				// 			from: {
				// 				latitude:that.latitude,
				// 				longitude:that.longitude
				// 			}, 
				// 			to:{
				// 				latitude:e.latitude,
				// 				longitude:e.longitude
				// 			}, 
				// 			success: function(res) {//成功后的回调
				// 			console.log(res);	
				// 				},
				// 			fail: function(error) {
				// 			console.error(error);
				// 			},
				// 			complete: function(res) {
				// 			console.log(res);
				// 			}
				// 		});
				//    })
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


