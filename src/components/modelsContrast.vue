<template>
  <div class="modelsContrast" v-if="contrastVisible">
    <div class="lognIcon">
      <img src="/static/img/maskIcon.png" alt="">
    </div>
    <div class="contrastCen">
        <div class="contrastTitel">车型对比</div>
        <div class="contrastImg">
            <div class="contrastShow">
              <div class="showImg">
                  <!-- icon_zheng -->
                <img src="/static/img/visiable.png" alt="" v-if="fontSize === '查看全部'">
                <img src="/static/img/icon_zheng.png" alt="" v-else>
              </div>
              <div class="showFont">{{fontSize}}</div>
            </div>
          <ul class="contrastCar">
              <li class="contrastItem" v-for="(contrastItem, index) in contrastList" :key="index">
                  <div class="contrastCarPath">
                      <img :src="contrastItem.similImg" alt="">
                  </div>
                  <div class="contrastCarName">{{contrastItem.similarCar}}</div>
              </li>
          </ul>
        </div>
        <div class="base">基本信息</div>
        <div class=baseMess>
            <ul class="baseList">
                <li class="baseItem">
                    <span class="baseTitle">参考价</span>
                    <span class="baseData" v-for="(baseNameItem,nameIndex) in contrastList" :key="nameIndex">{{baseNameItem.similPrice}}</span>
                </li>
                <li class="baseItem">
                    <span class="baseTitle">上市时间</span>
                    <span class="baseData" v-for="(baseNameItem,nameIndex) in contrastList" :key="nameIndex">{{baseNameItem.similTime}}</span>
                </li>
                  <li class="baseItem">
                    <span class="baseTitle">车型级别</span>
                    <span class="baseData" v-for="(baseNameItem,nameIndex) in contrastList" :key="nameIndex">{{baseNameItem.similLevel}}</span>
                </li>
            </ul>
        </div>
        
    </div>
    <div class="close" @click="closeMask">
        <img src="/static/img/closeIcon.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: [
      'contrastVisible',
      'contrastData'
  ],
  data() {
    return {
        contrastList:[],
        fontSize:'查看全部',
        baseName:[
            {
                name:'参考价'
            },
            {
                name:'上市时间'
            },
            {
                name:'车型级别'
            }
        ],
    };
  },
  watch: {
      contrastVisible:'watchContrast'
  },
  methods: {
      watchContrast(newVal,oldVal){
          if(newVal === true){
              this.contrastList = this.contrastData
          }
      },
      closeMask(){
          this.$emit('close')
      },
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.modelsContrast{
  height: 100%;
  width:100%; 
  position: fixed;
  left: 0;
  top:0;
  background: rgba(0,0,0,0.59);
  z-index: 222;
  display: flex;
  justify-content: center;
  .lognIcon{
    width: 128rpx;
    height: 110rpx;
    position: absolute;
    z-index: 888;
    left: 338rpx;
    img{
      width: 100%;
      height: 100%;
    }
  }
    .contrastCen{
      width:582rpx;
      height:840rpx;
      background:rgba(255,255,255,1);
      box-shadow:0px 4rpx 26rpx 0px rgba(20,100,255,0.17);
      border-radius:8rpx;
      left: 84rpx;
      top: 68rpx;
      position: absolute;
      // overflow-y: scroll;
        .contrastTitel{
          font-size:14px;
          height: 100rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28rpx;
          color:rgba(51,51,51,1);
          border-bottom: 1px solid rgba(249,250,252,1);
        }
        .contrastImg{
            padding: 48rpx 36rpx;
            display: flex;
            justify-content: center;
            position: relative;
            .contrastShow{
                width: 33.333%;
                display: flex;
                justify-content: center;
                position: relative;
                .showFont{
                    color:rgba(69,112,255,1);
                    font-size: 20rpx;
                    position: absolute;
                    bottom:0;
                    right: 20rpx;
                }
                .showImg{
                    width: 28rpx;
                    height: 28rpx;
                    margin-right: 12rpx;
                    position: absolute;
                    bottom:0;
                    left: 20rpx;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .contrastCar{
                display: flex;
                width: 66.6%;
                align-items: center;
                .contrastItem{
                     width: 50%;
                     text-align: center;
                    .contrastCarPath{
                        width: 140rpx;
                        height: 60rpx;
                        margin: 0 auto;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .contrastCarName{
                        margin-top: 24rpx;
                        font-size:24rpx;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                }
            }
        }
        .base{
            height:58rpx;
            background:rgba(249,250,252,1);
            font-size: 24rpx;
            color:rgba(153,153,153,1);
            padding-left: 36rpx;
            display: flex;
            align-items: center;
        }
        .baseMess{
            display: flex;
            height: 430rpx;
            overflow-y: auto;
            .baseList{
                width: 100%;
                .baseItem{
                    display: flex;
                    align-items: center;
                    height: 106rpx;
                    border-bottom: 1px solid rgba(249,250,252,1);
                    width: 100%;
                    .baseTitle{
                        font-size:24rpx;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        width: 33.33%;
                        text-align: center;
                    }
                    .baseData{
                       width: 33.33%;
                       text-align: center;
                       font-size:24rpx;
                       font-family:PingFangSC-Regular,PingFang SC;
                       font-weight:400;
                       color:rgba(51,51,51,1);
                    }
                }
            }
        }
    }
    .close{
        position: fixed;
        top:964rpx;
        color: #fff;
        width: 40rpx;
        height: 40rpx;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>