<template>
  <div class="myBankBox">
    <!-- 头部 -->
    <div class="headBox">
      <img
        src="https://official.changenhealth.cn/Icon%EF%BC%8FMore.png"
        alt=""
        @click="goHome"
      />
      <b>我的银行卡</b>
      <span></span>
    </div>
    <!-- 有卡 -->
    <div v-if="myBankCard" class="haveBankBox">
      <div>
        <img src="https://official.changenhealth.cn/Icon%EF%BC%8FCard.png" alt="">
        <dl>
          <dt>{{dataInfo.bankName}}</dt>
          <dd>****&nbsp;****&nbsp;****&nbsp;{{newbank}}</dd>
        </dl>
      </div>
    </div>
    <!-- 没卡 -->
    <div v-else class="noBankBox">
      <div class="binding" @click="APIbankcardbinding">+添加银行卡</div>
    </div>
    <a href=""></a>
  </div>
</template>

<script>
import {apiBankCardBinding,apiBankCardInfo,apiAccountInfo} from '@/api/api' // 银行卡相关
export default {
  data() {
    return {
      myBankCard: true,
      dataInfo:{},
      newbank:'',
    };
  },
  created() {
    this.APIaccountinfo(); // 账户信息-判断是否绑卡
    this.APIbankcardinfo(); // 我的银行卡
  },
  methods: {
    // 获取账户信息判断是否绑卡
    APIaccountinfo() {
      var str = localStorage.getItem('userInfo') || "[]"
      var arr = JSON.parse(str)
      console.log(arr);
      if(arr.bindCardStatus==2){// 0未进件 1审核中 2审核通过
        this.myBankCard=true
      }else if(arr.bindCardStatus==0){
        this.myBankCard=false
      }
    },
    // 银行卡绑定
    APIbankcardbinding() {
      apiBankCardBinding({
        data: {
          bindingFailUrl:"https://salesman.changenhealth.cn/BankFailing", // 绑卡失败跳转页面
          bindingSuccessUrl:"https://salesman.changenhealth.cn/BankSucceed" // 绑卡成功跳转页面
        },
      }).then((res) => {
        console.log("银行卡绑定", res);
        if(res.code==200){
          var dataUrl=res.data
          console.log(dataUrl);
          window.location.href=dataUrl
        }
      });
    },
    // 我的银行卡
    APIbankcardinfo() {
      apiBankCardInfo({
        data: {},
      }).then((res) => {
        console.log("我的银行卡", res);
        if(res.data==null){
          this.myBankCard=false
        }else{
          this.dataInfo=res.data
          this.newbank=res.data.bankCard.substr(-4);// 银行卡处理
          if(res.code==200){
            localStorage.setItem('bankcard',JSON.stringify(res.data))
          }
        }
        
      });
    },
    // 返回上一页
    goHome(){
      // this.$router.push('/')
      this.$router.go(-1)
    },
  },
};
</script>

<style lang="less">
button{
  font-family: 'JDZY';
}
.myBankBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  // 头部
  .headBox {
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 22px;
      height: 22px;
      margin-left: 10px;
    }
    span {
      margin-right: 10px;
      color: #ccc;
    }
  }

  // 有卡
  .haveBankBox{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
      width: 90%;
      height: 100px;
      // background:repeating-linear-gradient(to right,#4DC586,#3DA66E);
      background-color: white;
      border-radius: 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 20px;
      }
      dl{
        margin-left: 20px;
        color: black;
        dd{
          margin-top: 20px;
        }
      }
    }
  }

  // 没卡
  .noBankBox{
    width: 100%;
    height: 100px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .binding{
      width: 90%;
      height: 50%;
      border: 1px solid #4C5FFF;
      color: #4C5FFF;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 18px;
    }
  }
}
</style>