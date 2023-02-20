<template>
    <div class="BankSucceedBox">
      <!-- <div class="head">
        <img
          src="https://official.changenhealth.cn/Icon%EF%BC%8FMore.png"
          alt=""
          @click="goHome"
        />
      </div> -->
      <div class="tbody">
          <img src="../../../public/Icon／支付成功.png" alt="">
          <p><b>提现成功</b></p>
          <span>预计2小时到账</span>
          <button @click="goBank"><b>返回</b></button>
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
        window.history.go(-1);
      },
      goBank(){
          this.$router.push('/withdraw');
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
        font-size: 18px;
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
  }
  </style>