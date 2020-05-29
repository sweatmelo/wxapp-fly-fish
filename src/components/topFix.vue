<template>
	<div class="topFix">
		<!--默认的招呼语句-->
		<div class="answer-column column">
			<div>
				<p>我是飞小助，汽车智能专家助理，我可以陪你聊天，帮你解答各种用车问题，新技能还在不断学习中。</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
      data(){
        return {}
      },
      components:{
      }
    }
</script>

<style scoped="scoped">
.column{
  	font-size: 28rpx;
  	color: #232323;
}
.answer-column div{
    display: inline-block;
    padding: 20rpx 20rpx 20rpx 33rpx;
    max-width: 580rpx;
    box-sizing: border-box;
    border-radius: 0 38rpx 38rpx 38rpx ;
    line-height: 38rpx;
    background-color: #fff;
}
.answer-column div p{
	font-size: 28rpx;
  	line-height: 38rpx;
}	
</style>