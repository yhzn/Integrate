<style lang="less" scoped>
  .pop {
    position: absolute;
    z-index:60;
    top:80px;
    bottom:80px;
    left:100px;
    right:100px;
    background:#fff;
    overflow: auto;
    font-size: 14px;
    padding-bottom:10px;
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
          display: block;
          position: absolute;
          width:36px;
          height:16px;
          top:50%;
          left:50%;
          margin-top:-8px;
          margin-left:-18px;

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
        top: 6px;
        right: 7px;
        width: 22px;
        height: 21px;
        background: green;
      }
    }
    .checked-target{
      margin-top:10px;
      margin-bottom:10px;
      font-weight: bold;
      div{
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
          background:#fff;
          border:1px solid #9a9a9a;
          height:28px;
          color:#666;
          line-height: 28px;
          text-align: center;
          width:160px;
          &.active{
            color:#e55859;
            background: linear-gradient(#f4f5f5,#c7d0dc)
          }
        }
      }
    }
    .tab-list{
      display: none;
      padding-top:10px;
      li{
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
  <div class="pop">
    <div class="pop-title">
      详细医嘱信息（04-01 ———— 04-05）
      <router-link to="/" class="close">
        x
      </router-link>
    </div>
    <ul class="list">
      <li>
        <div class="left">
          <span>04-01</span>
        </div>
        <div class="right">
          <p>dfgh</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
        </div>
      </li>
      <li>
        <div class="left">
          <span>04-01</span>

        </div>
        <div class="right">
          <p>dfgh</p>
          <p>偶是地方今后你问</p>

        </div>
      </li>
      <li>
        <div class="left">
          <span>04-01</span>

        </div>
        <div class="right">
          <p>dfgh</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
        </div>
      </li>
      <li>
        <div class="left">
          <span>04-01</span>

        </div>
        <div class="right">
          <p>dfgh</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
        </div>
      </li>
      <li>
        <div class="left">
          <span>04-01</span>

        </div>
        <div class="right">
          <p>dfgh</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
          <p>偶是地方今后你问</p>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>

</script>
