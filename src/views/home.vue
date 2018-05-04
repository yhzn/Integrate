<style lang="less" scoped>
  .bg-gray{
    background:#eaeaea;
  }
  .home{
    overflow: auto;
  }
  .portrait {
    font-size:14px;
    min-width:700px;

    .header{
      padding:6px 20px;
      font-size:16px;
      font-weight: bold;
      color:#fff;
      background:#5c84b0;
    }
    .nav{
      padding:10px 20px;
      .right{
        float:right;
        width:90px;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
        text-align: right;
        color:#0c437f;
        font-size: 16px;
        span:nth-of-type(1){
          display: inline-block;
          float:left;
          width: 18px;
          height:18px;
          margin-top: 3px;
          img{
            width:100%;
            height:100%;
          }
        }
      }
      .left{
        margin-right:92px;
        li{
          float:left;
          height:30px;
          line-height: 30px;
          margin-right:10px;
          margin-bottom: 6px;
          padding:0 18px;
          color:#269056;
          font-weight: bold;
          border-radius: 8px;
          background:#f3e0c1;
          &.active{
              background:#ffc76c;
          }
        }
      }
    }
    .info>li{
      float:left;
      width:14.1857%;
      padding-bottom:5px;
      background:#f3e0c1;
      margin-right:0.1%;
      &:nth-child(even){
        background:#d0fcff;
      }
      &:last-child{
        margin-right:0;

      }
    }
    .info-con{
      margin-left:66px;
      margin-right:20px;
      padding-bottom:20px;
    }
    .info{
      li ul{
        padding:0 5px;
        overflow: hidden;
        height: 180px;
        li{
          margin-bottom:5px;
        }
      }
      a{
        display: block;
        background: #5c84b0;
        margin: 0 auto;
        width: 50px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        border-radius: 4px;
        text-align: center;
      }
      p{
        color:#d08f37;
        text-align: center;
        margin-bottom:5px;
        padding-top:10px;
      }
    }
    #chart{
      height:360px;
      margin-bottom:10px;
    }
    .chart-con{
      position: relative;
    }
    .condition{
      position: absolute;
      left:66px;
      right:20px;
      top:93px;
      ul{
        float:left;
        width:14.2857%;
        padding:5px 0;
        li{
          text-align: center;
          margin:0 10px 5px;

        }
      }
    }
  }

</style>
<template>
  <div class="home">
    <div class="portrait">
      <div class="header">白血病疾病画像</div>
      <div class="nav clearfix">
        <div class="right">
          <router-link to="/target">
          <span><img src="../assets/image/icon/set.png" alt=""></span><span>指标订阅</span>
          </router-link>
        </div>
        <ul class="subscribe left clearfix">
          <li v-for="items,index in storageData" :class="{active:readNum===index}" @click="upData(index)">{{items.list}}</li>
        </ul>
      </div>
      <div class="chart-con">
      <div class="condition clearfix">
         <ul>
           <li>发热</li>
           <li>头疼疼</li>
         </ul>
         <ul>
           <li>发热</li>
           <li>发热</li>
           <li>头疼疼</li>
         </ul>
         <ul>
           <li>发热</li>
           <li>头疼疼</li>
         </ul>
         <ul>
           <li>发热</li>
           <li>头疼疼</li>
         </ul>
         <ul>
           <li>发热</li>
           <li>头疼疼</li>
           <li>发热</li>
           <li>头疼疼</li>
           <li>发热</li>
           <li>头疼疼</li>
         </ul>
         <ul>
           <li>发热</li>
           <li>头疼疼</li>
         </ul>
         <ul>
           <li>发热</li>
           <li>头疼疼</li>
         </ul>
      </div>
      <div id="chart"></div>
      </div>
      <div class="info-con">
        <ul class="info clearfix">
          <li>
            <p>医嘱信息</p>
            <ul>
              <li>04-01：</li>
              <li>第三方公司的时都会如果我</li>
            </ul>
            <router-link to="/detail">详情</router-link>
          </li>
          <li>
            <p>医嘱信息</p>
            <ul>
              <li>04-01：</li>
              <li>第三方公司的时都会如果我</li>
            </ul>
            <router-link to="/detail">详情</router-link>

          </li>
          <li>
            <p>医嘱信息</p>
            <ul>
              <li>04-01：</li>
              <li>第三方公司的时都会如果我</li>
            </ul>
            <router-link to="/detail">详情</router-link>

          </li>
          <li>
            <p>医嘱信息</p>
            <ul>
              <li>04-01：</li>
              <li>第三方公司的时都会如果我</li>
            </ul>
            <router-link to="/detail">详情</router-link>

          </li>
          <li>
            <p>医嘱信息</p>
            <ul>
              <li>04-01：</li>
              <li>第三方公司的时都会如果我</li>
            </ul>
            <router-link to="/detail">详情</router-link>

          </li>
          <li>
            <p>医嘱信息</p>
            <ul>
              <li>04-01：</li>
              <li>第三方公司的时都会如果我</li>
            </ul>
            <router-link to="/detail">详情</router-link>

          </li>
          <li>
            <p>医嘱信息</p>
            <ul>
              <li>04-01：</li>
              <li>第三方公司的时都会如果我</li>
            </ul>
            <router-link to="/detail">详情</router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
//  import storageData from '@/data/storage'
  import eChart from 'echarts'
  let getItem=localStorage.getItem("target");
let storageData=null;
if(getItem===null){
  storageData={
    "readItemList":0,
    "storage":[]
  }
}else{
  storageData=getItem.storage
}
  export default {
    data () {
      return {
        storageData: storageData,
        readNum:9999,
      }
    },
    components:{

    },
    methods:{
      upData (num) {
        this.readNum=num;
      }
    },
    mounted () {
      let myChart = eChart.init(document.getElementById('chart'));
      myChart.setOption({
        // title: { text: 'ECharts 入门示例' },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['红细胞','白细胞','血红蛋白','其他']
        },
        grid: {
          left: '20px',
          right: '20px',
          bottom: '0px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine:{
            show:true
          },
          data: ['04-05', '04-10', '04-15', '04-20', '04-25', '04-30', '05-05']
        },
        yAxis: {
          type: 'value',

        },
        series: [
          {
            name:'红细胞',
          data: [820, 9320, 5000, 3000, 1290, 7000, 1320],
          type: 'line',
          smooth: true
        },
          {
            name:'白细胞',
            data: [82, 6030, 2000, 7000, 5000, 13, 132],
            type: 'line',
            smooth: true
          },
          {
            name:'血红蛋白',
            data: [8, 3000, 6000, 2000, 8000, 10, 1320],
            type: 'line',
            smooth: true
          },
          {
            name:'其他',
            data: [820, 932, 901, 934, 1290, 13, 1],
            type: 'line',
            smooth: true
          }
        ]
      });
      window.onresize=function(){
        myChart.resize();
      }
    }
  }

</script>
