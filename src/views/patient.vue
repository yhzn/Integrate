<style lang="less" scoped>
  .patient{
    font-size:14px;
    min-width:900px;
    .header{
      padding:6px 20px;
      font-size:16px;
      font-weight: bold;
      color:#fff;
      background:#5c84b0;
      margin-bottom:5px;
    }
    .search{
      margin: 0 20px 5px;
      .time{
        margin-bottom:5px;
        span{
          color:#b6b6b6;
        }
      }
      .set{
        float:right;
        height:18px;
        line-height: 18px;
        cursor: pointer;
        font-weight: bold;
        color:#0c437f;
        img{
          float: left;
          width: 18px;
          height: 18px;
          margin-right: 5px;
        }
      }
      input{
        border:1px solid #b6b6b6;
        border-radius: 5px;
        height:22px;
        padding-left:5px;
        width:160px;
        &[type=button]{
          width:60px;
          height:25px;
          cursor:pointer;
          color:#20659b;
          background:#f79f68;
          background: linear-gradient(#ffdcc0,#f79f68);

        }
      }
    }
    .nav{
      margin:0 20px;
      li{
        cursor:pointer;
        float:left;
        height:30px;
        line-height: 30px;
        padding: 0 18px;
        margin-right:10px;
        margin-bottom:5px;
        border-radius: 8px;
        font-weight: bold;
        color:#269256;
        background:#f3e0c1;
        &.active{
          background:#ffc76c;
        }
      }
    }
    table{
      thead tr{
        background:#75cdce;
        th{
          padding:6px 3px;
          text-align: center;
          color:#fff;
          &:nth-child(1){
            min-width:60px;
          }
          &:nth-child(2){
            min-width:60px;
          }
          &:nth-child(5){
            min-width:50px;
          }
          &:nth-child(6){
            min-width:160px;
          }
          &:nth-child(7){
            min-width:180px;
          }
        }
      }
      tbody tr{
        background:#deeff0;
        &:nth-child(even){
          background:#eaf6ec;
        }
        &:hover{
          background:#b3f0ba;
        }
        td{
          padding:6px 3px;
          text-align: center;
        }
      }
    }
    .table-con{
      overflow: auto;
      table{
        min-width:100%;
      }
    }
  }
</style>
<template>
  <div class="patient-con">
    <div class="patient">
      <div class="header">白血病疾病画像</div>
      <div class="search clearfix">
        <div class="set">
          <router-link to="/patient/target-list">
          <img src="../assets/image/icon/set.png" alt="">
          列订阅设置
          </router-link>
        </div>
        <div class="time">
          <input type="text" placeholder="开始时间"  class="Wdate" ref="startTime" onClick="WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm:ss'})">
          <span>—</span>
          <input type="text" placeholder="结束时间"  class="Wdate" ref="endTime" onClick="WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm:ss'})">
          <input type="button" value="查询" @click="search()">
        </div>
      </div>
      <ul class="nav clearfix">
        <li v-for="item,index in storageData" :class="{active:tabIndex===index}" @click="readItem(index)">{{item.list}}</li>
      </ul>
      <div class="table-con">
      <table>
        <thead>
          <tr>
            <th  v-for="(item,key) in tableData.header" v-show="!!showList[key]">{{item}}</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="items in tableData.body">
            <td v-for="(item,key) in items" v-show="!!showList[key]">{{item}}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <router-view @reload="reload"></router-view>
  </div>
</template>
<script>
  import tableData from '@/data/table-list'
  import {filterTime,clone} from '@/tool/tool'
  let showListObj={
    "sickNum":true,
    "name":true,
    "age":true,
    "sex":true,
    "department":true,
    "diagnosis":true,
    "time":true,
  }
  export default {
    data () {
      return {
        stoTableData:clone(tableData),
        tableData:clone(tableData),
        startTime:'',
        endTime:'',
        storageData:null,
        tabIndex:null,
        showList:clone(showListObj),
      }
    },
    computed:{
    },
    methods:{
      reload () {
        let getItem=JSON.parse(localStorage.getItem("patientList"));
        if(getItem===null){
          this.storageData=[]
        }else{
          this.storageData=getItem.storage;
          this.readItem(this.tabIndex);
        }
      },
      readItem (num) {
        this.tabIndex=num;
        this.showList=clone(showListObj);
        if(this.tabIndex===null||(this.tabIndex!==null && !this.storageData[this.tabIndex])){
          return false;
        }
        let key=this.storageData[this.tabIndex].key;
        for(let i in key){
          this.showList[key[i]]=true;
        }
      },
      search () {
        this.tableData=clone(this.stoTableData);
        this.startTime=this.$refs.startTime.value;
        this.endTime=this.$refs.endTime.value;
        if(this.startTime===''||this.endTime===''){
          alert('请选择筛选时间')
          return false;
        }
        if((new Date(this.startTime.replace(/-/g,"\/")))>(new Date(this.endTime.replace(/-/g,"\/")))){
          alert('结束时间要大于开始时间')
          return false;
        }
        let filterTimeData = this.tableData.body.filter(x=>{
          return filterTime(this.startTime,this.endTime,x.time);
        })
        this.tableData.body=filterTimeData;
      }
    },
    mounted () {
      this.reload();
    }
  }
</script>
