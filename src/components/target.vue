<style lang="less" scoped>
  .pop {
    position: absolute;
    z-index:60;
    top:80px;
    bottom:80px;
    left:100px;
    right:100px;
    font-size: 14px;
    padding-bottom:10px;
    background:#fff;
    overflow: auto;
    .pop-title{
      position: relative;
      height: 30px;
      color: #142f75;
      background: #f3e0c1;
      text-align: center;
      line-height: 30px;
      font-weight: bold;
      .close{
        position: absolute;
        color:#fff;
        font-size:28px;
        top:0;
        right:10px;
        font-weight: normal;
      }
    }
    .list{
      li{
        font-size: 14px;
        position: relative;
        &:nth-child(even){
          .left{
            background:#e9f3c1;
          }
          .right{
            background:#f6fae7;
          }
        }
      }
      p{
        padding-bottom:5px;
      }
      .left{
        position: absolute;
        width:80px;
        top:0;
        bottom:0;
        background:#c1ddf3;
        span{
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%);

        }
      }
      .right{
        padding:5px 10px 0;
        margin-left:80px;
        background:#e7f2fa;
      }
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
    .checked-target{
      margin-top:10px;
      font-weight: bold;
      .checked-left{
        float:left;
        padding-top: 6px;
        width:76px;
        margin-left:20px;
      }
      ul{
        margin-left:98px;
      }
      li{
        float:left;
        margin-right:20px;
        margin-bottom:10px;
      }
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
    .read-target{
      padding:10px;
      margin:0 20px 10px;
      background:#ff9595;
      li{
        float: left;
        width:150px;
        margin-bottom:10px;
        color:#756488;
        span{
          display:inline-block;
          cursor: pointer;
          margin-left:10px;
          padding:0 2px;
          color:#fff;
          border:1px solid #fff;
        }
      }
      button{
        display: block;
        width: 80px;
        height: 26px;
        background: #ffcaca;
        color: #bd763e;
        margin: 0 auto;
      }
    }
    .unchecked-target{
      margin:0 20px;
      font-weight: bold;
      p{
        margin-bottom:10px;
      }
      ul{
        background:#d0e8f0;
      }
      li{
        float:left;
      }
      .tab{
        li{
          cursor:pointer;
          background:#fff;
          border:1px solid #9a9a9a;
          height:28px;
          color:#666;
          line-height: 28px;
          text-align: center;
          width:160px;
          &.active{
            color:#e55859;
            background:#c7d0dc;
            background: linear-gradient(#f4f5f5,#c7d0dc);
          }
        }
      }
    }
    .tab-list{
      padding-top:10px;
      li{
        cursor:pointer;
        margin:0 10px 10px;
        width:100px;
        color:#1f4f83;
        overflow: hidden;
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
    <div class="pop bg-gray">
      <div class="pop-title">
        <div class="search">
          <input type="text" placeholder="请输入指标名称" v-model="val"/>
          <div class="search-icon" @click="searchData(val)"><img src="../assets/image/icon/search.png"></div>
        </div>
        <a class="add-data-close close" @click="reload()">
          x
        </a>
      </div>
      <div class="checked-target">
        <div class="checked-left">已选指标：</div>
        <ul class="checked-target-list clearfix">
          <li v-for="storageItem,index in storage"><a @click="navReadItem(storageItem.data,index)" :class="{active:storageIndex===index}">{{storageItem.list}}</a><span @click="deleteReadItem(index)">X</span></li>
        </ul>
      </div>
      <div class="read-target">
        <ul class="read-target-list clearfix" v-for="items,index in detailData">
          <li v-for="item,sbIndex in items" v-show="item.checked">{{item.text}}<span @click="hideItem(item)">X</span></li>
        </ul>
        <button class="sub-btn" @click="readItem()">订阅</button>
      </div>
      <div class="unchecked-target">
        <p>
          未选指标：
        </p>
        <ul class="tab clearfix">
          <li :class="{active:tabIndex==0}" @click="showList(0)">1类指标</li>
          <li :class="{active:tabIndex==1}" @click="showList(1)">2类指标</li>
          <li :class="{active:tabIndex==2}" @click="showList(2)">3类指标</li>
        </ul>
        <ul class="tab-list clearfix" v-for="items,index in detailData" v-show="tabIndex==index">
          <li v-for="item in items" v-show="!item.checked&&item.filter" @click="showItem(item)">{{item.text}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import oriDetailData from '@/data/target'
//  import storageData from '@/data/storage'
  let isBasic = (it) => {
    return it === null || ( typeof it !== 'object' && typeof it !== 'array' );
  }
  let clone = function (it) {
    if (isBasic(it)) {
      return it;
    }
    let result = Array.isArray(it) ? [] : {};
    for (let i in it) {
      result[i] = clone(it[i]);
    }
    return result;
  }
  let storageData=null;
  let getItem=localStorage.getItem("target");
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
        storage:storageData.storage,
        detailData:clone(oriDetailData),
        val:'',
        tabIndex:0,
        storageIndex:9999,
        readItemList:storageData.readItemList,
        readFlag:false,
      }
    },
    methods:{
      reload () {
        this.$emit('reload');
        this.$router.push("/");
      },
      showList (res) {
        this.tabIndex=res;

      },
      showItem (item) {
        item.checked=true;
      },
      hideItem (item) {
        item.checked=false;
      },
      readItem () {
        // 未选定指标时，禁止订阅操作
        let flag=false;
        // 过滤参数初始化
        let filterData=clone(this.detailData).map(x=>{
          return x.filter(v=>{
            if(v.checked){
              flag=true;
            }
            v.filter=true
            return true
          })
        });
        if(!flag){
          alert("请选择指标");
          return false;
        }
        // 订阅参数储存
        if(this.storage[this.storageIndex]===undefined&&!this.readFlag){
          this.readItemList++;
          this.storage.push({
            list:"订阅"+this.readItemList,
            data:filterData

          });
          storageData.readItemList=this.readItemList;
        }else{
          this.storage[this.storageIndex].data=filterData;
        }
        storageData={
          "readItemList":this.readItemList,
          "storage":this.storage
        }
        localStorage.setItem("target",JSON.stringify(storageData));
        // 展示指标初始数据
        this.detailData=clone(oriDetailData);
        this.storageIndex=99999;
        this.val='';
        this.readFlag=false;
      },
      navReadItem (msg,index) {
        this.readFlag=true;
        this.storageIndex=index;
        this.detailData=msg;
      },
      // 删除数据
      deleteReadItem (index) {
        // 如果删除的的是正在查看的订阅信息，则重置展示数据
        if(this.storageIndex===index){
          this.detailData=clone(oriDetailData);
          this.storageIndex=99999;
          this.readFlag=false;
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
        localStorage.setItem("target",JSON.stringify(storageData));

      },
      // 数据搜索
      searchData (val) {
          this.detailData.map(x => {
            return x.filter(v => {
              v.filter=false;
              if (v.checked || v.text.indexOf(val) != -1) {
                v.filter = true;
                return true
              }
              return false
            })
          })
        }
    },
    mounted () {
    }
  }
</script>
