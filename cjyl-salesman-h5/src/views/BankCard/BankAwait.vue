<template>
    <div class="BankSucceedBox">
      <div class="head">
        <img
          src="https://official.changenhealth.cn/Icon%EF%BC%8FMore.png"
          alt=""
          @click="goHome"
        />
        <p>我的银行卡</p>
        <p></p>
      </div>
      <div class="tbody">
          <img src="https://official.changenhealth.cn/Icon%EF%BC%8F%E7%AD%89%E5%BE%85%E5%AE%A1%E6%A0%B8.png" alt="">
          <p><b>等待审核</b></p>
          <span>您的绑卡申请已提交，等待平台审核通过后，</span>
          <span>您可以正常提现</span>
      </div>
      <div class="footerbox">
        <b>说明</b><br/>
        <span>1. 工作日审核时间为9:30-12:00，14:00-18:30</span><br/>
        <span>2. 提交绑卡申请后，一般会在当天内审核通过</span><br/>
        <span>3. 如有任何疑问，可联系客服咨询</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      // 返回上一页
      goHome() {
        this.$router.push('/balance');
      },
      goBank(){
          this.$router.push('/myBankCard');
      }
    },
  };
  </script>
  
  <style lang="less">
  button{
  font-family: 'JDZY';
}
  .BankSucceedBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    .head {
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
      p{
        padding: 20px;
      }
    }
    .tbody{
      width: 100%;
      height: 300px;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
          width: 50px;
          height: 50px;
      }
      p{
          margin-top: 20px;
      }
      span{
        color: #ccc;
        margin-top: 10px;
        font-size: 16px;
      }
      button{
          margin-top: 30px;
          width: 50%;
          height: 50px;
          border: 1px solid #4C5FFF ;
          color: #4C5FFF ;
          background-color: white;
          border-radius: 30px;
      }
    }
    .footerbox{
      width: 100%;
      height: auto;
      background-color: white;
      padding-left: 5%;
      padding-right: 5%;
      font-size: 14px;
      padding-bottom: 5%;
    }
  }
  </style>