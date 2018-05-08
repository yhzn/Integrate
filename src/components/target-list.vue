<style lang="less" scoped="">
  .pop{

      position: absolute;
      z-index: 60;
      top: 80px;
      bottom: 80px;
      left: 100px;
      right: 100px;
      min-width:700px;
      font-size: 14px;
      padding-bottom: 10px;
      background: #fff;
      overflow: auto;
    .pop-title{
      position: relative;
      height: 30px;
      color: #142f75;
      background: #f3e0c1;
      text-align: center;
      line-height: 30px;
      font-weight: bold;
      margin-bottom:10px;
      .close{
        position: absolute;
        color:#fff;
        font-size:28px;
        top:0;
        right:10px;
        font-weight: normal;
      }
      .search{
        position: relative;
        width:202px;
        text-align: left;
        input{
          height:22px;
          width:150px;
          margin-left:20px;
          border-radius: 5px;
          padding:0 26px 0 5px;
        }
        .search-icon{
          position: absolute;
          top: 4px;
          right: 6px;
          width: 18px;
          height: 16px;
          img{
            width:100%;
            height:100%;
          }
        }
      }
    }
    .nav{
      margin:0 20px 10px;
      li{
        float:left;
        margin-right:20px;
        margin-bottom:10px;
        a{
          display: inline-block;
          width: 80px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          border-radius: 8px;
          background: #f3e0c1;
          color:#269056;
          &.active{
            background:#ffc76c;
          }
        }
        span{
          display: inline-block;
          cursor: pointer;
          border:1px solid #656565;
          padding:0 2px;
          color:#656565;
          margin-left:10px;
        }

      }
    }
    .checked-con{
      margin:0 20px;
      padding-bottom:10px;
      .checked{
        padding-bottom:10px;
        p{
          height:22px;
          line-height: 22px;
          padding-left:10px;
          background:#ffe3e3;
        }
        ul{
          padding-top:10px;
          li{
            padding:5px 0;
            font-weight: bold;
            cursor: pointer;
            color:#515a85;
            text-align: center;
          }
        }

        .right{
          float:right;
          width:49%;
          p{
            background:#d0e8f0;
          }
          ul{
            background:#83c1d6;
          }
        }
        .left{
          width: 49%;
          background:#ff9595;
          padding-bottom:10px;
          input[type=button]{
            display: block;
            width: 80px;
            height: 26px;
            background: #ffcaca;
            color: #bd763e;
            margin: 0 auto;
          }
        }

      }
    }


  }
  .mark{
    position: absolute;
    top:0;
    width:calc( 100vw );
    height:calc( 100vh );
    z-index:50;
    background:rgba(155,155,155,0.6);
  }
</style>
<template>
  <div>
    <div class="mark"></div>
    <div class="pop">
      <div class="pop-title">
        <div class="search">
          <input type="text" placeholder="请输入指标名称" v-model="value"/>
          <div class="search-icon" @click="search()"><img src="../assets/image/icon/search.png"></div>
        </div>
        <a class="add-data-close close" @click="reload()">
          x
        </a>
      </div>
      <ul class="nav clearfix">
        <li v-for="item,index in storage">
          <a :class="{active:storageIndex===index}" @click="readStorage(item,index)">{{item.list}}</a>
          <span @click="deleteItemList(index)">x</span>
        </li>
      </ul>
      <div class="checked-con">
        <div class="checked clearfix">
          <div class="right">
            <p>未选列：</p>
            <ul>
              <li v-for="item in targetListData" v-show="!item.checked&&!item.filter" @click="item.checked=true">{{item.text}}</li>
            </ul>
          </div>
          <div class="left">
            <p>已选列：</p>
            <ul>
              <li v-for="item in targetListData" v-show="item.checked" @click="item.checked=false">{{item.text}}</li>
            </ul>
            <input type="button" value="订阅" @click="readItem()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import targetListData from '@/data/target-list'
  import {clone} from '@/tool/tool'
  let storageData=null;
  let getItem=localStorage.getItem("patientList");
  if(getItem===null){
    storageData={
      "readItemList":0,
      "storage":[]
    }
  }else{
    storageData=JSON.parse(getItem)
  }
  export default {
    data () {
      return {
        targetListData:clone(targetListData),
        cloneData:clone(targetListData),
        storage:storageData.storage,
        readItemList:storageData.readItemList,
        storageIndex:null,
        value:'',
      }
    },
    methods:{
      reload () {
        this.$emit('reload');
        this.$router.push("/patient");
      },
      readItem () {
        let flag=false;
        let arr=[];
        this.targetListData.filter(x=>{
          x.filter=false;
          if(x.checked){
            arr.push(x.key);
            flag=true;
          }
        });
        if(!flag){
          alert("请选择指标")
        }
        // 订阅数据储存
        if(this.storage[this.storageIndex]===undefined){
          this.readItemList++;
          this.storage.push({
            list:"订阅"+this.readItemList,
            key:arr,
            data:clone(this.targetListData)

          });
          storageData.readItemList=this.readItemList;

        }else{
          this.storage[this.storageIndex].data=clone(this.targetListData);
          this.storage[this.storageIndex].key=arr;
        }
        storageData={
          "readItemList":this.readItemList,
          "storage":this.storage
        }
        localStorage.setItem("patientList",JSON.stringify(storageData));
        this.targetListData=clone(this.cloneData);

        this.storageIndex=null;

      },
      readStorage (item,index) {
        this.storageIndex=index;
        this.targetListData=item.data;
      },
      deleteItemList (index) {
        // 如果删除的的是正在查看的订阅信息，则重置展示数据
        if(this.storageIndex===index){
          this.targetListData=clone(this.cloneData);
          this.storageIndex=null;
        }
        if(this.storageIndex>index){
          this.storageIndex--;
        }
        this.storage.splice(index,1);
        if(this.storage.length===0){
          this.readItemList=0;
        }
        storageData={
          "readItemList":this.readItemList,
          "storage":this.storage
        }
        localStorage.setItem("patientList",JSON.stringify(storageData));
      },
      search () {
        this.targetListData.filter(x=>{
          x.filter=true;
          if (!x.checked && x.text.indexOf(this.value.replace(/\s+/g, ""))!=-1){
            x.filter=false;
          }
          return true;
        })
      }
    },
    mounted () {

    }
  }
</script>
