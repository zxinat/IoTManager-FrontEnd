<template>
  <div class="monitoring-device-card-container">
    <el-row>
      <el-col style="margin: 5px; width: 45%; float: left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <img src="../../assets/img/chilunzu.svg">
            <span>属性信息</span>
          </div>
          <div  class="text item">
            {{'设备名称：'+deviceData.deviceName}}
          </div>
          <div  class="text item">
            {{'设备编号：'+deviceData.hardwareDeviceID}}
          </div>
          <div  class="text item">
            {{'设备类型：'+deviceData.deviceType}}
          </div>
          <!--<div  class="text item">-->
            <!--{{'东经：    '+deviceData.deviceName}}-->
          <!--</div>-->
          <!--<div  class="text item">-->
            <!--{{'北纬：    '+deviceData.deviceName}}-->
          <!--</div>-->
          <div  class="text item">
            {{'设备状态：'+deviceData.deviceState}}
          </div>
        </el-card>
      </el-col>
      <el-col style="margin: 5px;  width: 45%; float: left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <img src="../../assets/img/chilunzu.svg">
            <span>设备状态</span>
          </div>
          <div  class="text item">
            {{'启动时间：'+deviceData.startTime}}
          </div>
          <div  class="text item">
            {{'运行时长：'+deviceData.runningTime}}
          </div>
          <div  class="text item">
            {{'报警次数：'+deviceData.alarmTimes}}
          </div>
          <div  class="text item">
            {{'最近报警时间：'+deviceData.recentAlarmTime}}
          </div>
          <!--<div  class="text item">-->
            <!--{{'温度：'+deviceData.temperature}}-->
          <!--</div>-->
          <!--<div  class="text item">-->
            <!--{{'湿度：'+deviceData.humidity}}-->
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col style="margin-left: 30%;margin-right: 30%; margin-top: 5px; width: 30%">
        <div style="padding: 5px;">
          <span>设备快照</span>
          <!--<div class="bottom clearfix">-->
            <!--<time class="time">{{deviceData.updateTime}}</time>-->
            <!--<el-button class="button">操作按钮</el-button>-->
          <!--</div>-->
        </div>
        <el-card :body-style="{ padding: '0px' }">
          <img v-if="!deviceData.imageUrl" src="../../assets/img/equipment.png" class="image">
          <img v-else :src="deviceData.imageUrl" class="image">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MonitoringDeviceCard",
    data(){
      return {

      }
    },
    computed:{
      deviceData:{
        // getter
        get: function () {
          return this.$store.state.device.currentDeviceData;
        },
        // setter
        set: function (newValue) {
          console.log('newvalue',newValue)
        }
      }
    },
    watch:{
    },
    mounted(){
    }
  }
</script>

<style lang="scss" scoped>
  .monitoring-device-card-container {
    padding: 2%;
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .box-card{
      height: 100%;
    }
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      padding: 1%;
      width: 80%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
  }
</style>
