<template>
    <div class="billingBox">
      <div class="billingHead">
        <img
          src="https://official.changenhealth.cn/Icon%EF%BC%8FMore.png"
          alt=""
          @click="toHome"
        />
        <b>近七日未开单</b>
        <i>123123</i>
      </div>
      <!-- 有数据 -->
      <div v-if="maskStats">
        <div class="billingTbody">
          <div class="tbodyBox" v-for="(val, key, index) in ApiNoOrderList.rows" :key="index">
            <b>{{ val.clinicName }}</b>
            <p>{{ val.clinicAddress }}</p>
            <p>装机时间：{{ val.bindingTime }}</p>
            <ul>
              <li>
                <p>开单数量</p>
                <b v-if="val.orderCount==null">0</b>
                <b>{{ val.orderCount }}</b>
              </li>
              <li>
                <p>装机天数</p>
                <b v-if="val.bindingDays==null">0</b>
                <b v-else>{{val.bindingDays}}</b>
              </li>
              <li>
                <p>开单天数</p>
                <b v-if="val.orderDays==null">0</b>
                <b>{{ val.orderDays }}</b>
              </li>
              <li>
                <p>距离上次开单</p>
                <b v-if="val.lastOrderDays==null">0</b>
                <b>{{ val.lastOrderDays }}</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 没有数据 -->
      <div v-else>
        <div class="billingTbodys">
            <img src="https://official.changenhealth.cn/%E7%BC%BA%E7%9C%81%EF%BC%8F%E6%9A%82%E6%97%A0%E7%BD%91%E7%BB%9C.png" alt="">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import {apinoOrderList} from '@/api/api'
  export default {
    data() {
      return {
        maskStats:true,//是否有数据
        ApiNoOrderList:{},
      };
    },
    created(){
      this.APInoorderlist();// 近期未开单诊所列表
    },
    methods: {
      // 近期未开单诊所列表
      APInoorderlist(){
        apinoOrderList({
          data:{
            pageNo:1,
            pageSize:20
          }
        }).then(res=>{
          console.log('近期未开单诊所列表',res);
          this.ApiNoOrderList=res.data
          if(res.data.rows.length==0){
            this.maskStats=false
          }
        })
      },  


      toHome() {
        window.history.go(-1);
      },
      // 时间戳转换为日期
      timestampToTime(time) {
        var date = new Date(time);
        var len = time.toString().length;
        if (len < 13) {
          var sub = 13 - len;
          sub = Math.pow(10, sub);
          date = new Date(time * sub);
        }
        var y = date.getFullYear() + "年";
        var M = date.getMonth() + 1;
        M = (M < 10 ? "0" + M : M) + "月";
        var d = date.getDate();
        d = (d < 10 ? "0" + d : d) + "日";
        var h = date.getHours();
        h = (h < 10 ? "0" + h : h) + ":";
        var m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        return y + M + d + h + m;
      },
    },
  };
  </script>
  
  <style lang="less">
  button{
  font-family: 'JDZY';
}
  .billingBox {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #eee;
    position: relative;
    .billingHead {
      flex: none;
      width: 100%;
      height: 44px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 0;
      img {
        width: 22px;
        height: 22px;
        margin-left: 10px;
      }
      i {
        color: white;
      }
    }
    .billingTbody {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      align-items: center;
      padding-bottom: 50px;
      padding-top: 50px;
      background-color: #eee;
      .tbodyBox {
        flex: none;
        width: 90%;
        height: 150px;
        background-color: white;
        margin-top: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        b {
          margin-left: 10px;
          margin-top: 10px;
        }
        p {
          margin-left: 10px;
          margin-top: 10px;
          color: #ccc;
          font-size: 10px;
        }
        ul {
          margin-top: 10px;
          width: 100%;
          height: 100%;
          display: flex;
          list-style-type: none;
          align-items: center;
          justify-content: space-around;
          li {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            p {
              margin-left: 0;
              margin-top: 0;
              color: #000;
            }
            b {
              margin-left: 0px;
              margin-top: 0px;
            }
          }
        }
      }
    }
    .billingTbodys{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        margin-top: 100px;
      }
      p{
        color: #ccc;
      }
    }
  }
  </style>
  