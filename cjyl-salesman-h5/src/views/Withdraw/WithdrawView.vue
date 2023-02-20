<template>
  <div class="withdrawBox">
    <!-- 头部 -->
    <div class="header">
      <img
        src="https://official.changenhealth.cn/Icon%EF%BC%8FMore.png"
        alt=""
        @click="goHome"
      />
      <b>余额提现</b>
      <span></span>
    </div>
    <!-- 主体 -->
    <div class="tbody">
      <p class="p1">提现金额<span>(2小时到账)</span></p>
      <div class="moneyBox">
        <b>￥</b>
        <el-input v-model="moneyNum" clearable @input="elinput" type="number" pattern="\d*"  ></el-input>
        <span @click="moneyAll">全部提现</span>
      </div> 
      <dl v-if="inputText == 1">
        <dt>可提现余额&nbsp;￥{{ money }}</dt>
        &nbsp;|&nbsp;
        <dd>手续费每笔￥{{ procedure }}</dd>
      </dl>
      <b v-if="inputText == 2" class="b1">输入金额需大于5元</b>
      <b v-if="inputText == 3" class="b1">输入金额超过可提现余额</b>
    </div>
    <!-- 到账银行 -->
    <div class="accountBox">
      <p>到账银行卡</p>
      <p>{{ accountText }}（{{bankFooter}}）</p>
    </div>
    <!-- 确认提现 -->
    <button
      :class="withdrawBtn"
      :disabled="withdrawDis"
      @click="APIwithdrawapply"
    >
      确认提现
    </button>
    <!-- 遮罩层 -->
    <div :class="maskBox">
      <div class="masks">
        <span class="iconP" @click="closeMask"><img src="https://official.changenhealth.cn/wx_mini_program_Icon/Icon%EF%BC%8FShut%20down.png" alt=""></span>
        <p>余额提现</p>
        <h3>￥{{ moneyNum }}</h3>
        <dl>
          <dt>服务费</dt>
          <dd>￥ {{ procedure }} /每笔</dd>
        </dl>
        <button @click="APIwithdrawconfirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiWithdrawApply, apiWithdrawConfirm } from "@/api/api"; // 提现相关接口
import { apiUserInfo, apiBankCardInfo } from "@/api/api"; // 用户信息，银行卡信息
export default {
  data() {
    return {
      money: 0, //可提现余额
      procedure: 1, //手续费
      moneyNum: "", //提现金额
      accountText: "", //到账银行
      bankFooter: "", //到账银行卡号
      withdrawBtn: "withdrawBtnOFF", //按钮样式
      withdrawDis: true, //按钮禁用
      inputText: 1, //输入框提升
      maskBox: "maskBoxOFF", //遮罩层
      ApiWithdrawApply: {}, //申请提现的返回信息
    };
  },
  created() {
    this.APIuserinfo(); // 获取信息
    this.APIbankcardinfo(); // 获取信息
  },
  methods: {
    // 用户信息
    APIuserinfo() {
      // 获取用户信息
      apiUserInfo({ data: {} }).then((res) => {
        if(res.data.realBalance==null){
          this.money=0
        }else{
          this.money = (res.data.realBalance)/100;
        }
      });
    },
    // 我的银行卡
    APIbankcardinfo() {
      apiBankCardInfo({
        data: {},
      }).then((res) => {
        console.log(res);
        this.accountText = res.data.bankName;
        this.bankFooter = res.data.bankCard.substr(-4);
      });
    },

    // 返回首页
    goHome() {
      // window.history.go(-1);
      this.$router.push("/balance");
    },
    // 输入框
    elinput() {
      console.log(this.moneyNum);
      if (this.moneyNum <= 5) {
        console.log('小于5');
        this.inputText = 2;
        this.withdrawBtn = "withdrawBtnOFF";
        this.withdrawDis = true;
      }
      if (this.moneyNum > this.money) {
        console.log('大于可提现余额');
        this.inputText = 3;
        this.withdrawBtn = "withdrawBtnOFF";
        this.withdrawDis = true;
      }
      if (this.moneyNum == "") {
        console.log('空');
        this.inputText = 1;
        this.withdrawBtn = "withdrawBtnOFF";
        this.withdrawDis = true;
      }
      if (this.moneyNum <= this.money && this.moneyNum > 5) {
        console.log('大于等于可提现余额并且大于5');
        this.inputText = 1;
        this.withdrawBtn = "withdrawBtnON";
        this.withdrawDis = false;
      }
    },
    // 全部提现
    moneyAll() {
      this.moneyNum = this.money;
      if(this.money>5){
        this.withdrawBtn = "withdrawBtnON";
        this.withdrawDis = false;
      }else if(this.money<=5){
        this.inputText = 2;
        this.withdrawBtn = "withdrawBtnOFF";
        this.withdrawDis = true;
      }
    },
    //点击提现
    withdrawCli() {
      this.maskBox = "maskBoxON";
    },
    // 关闭遮罩层
    closeMask() { 
      this.maskBox = "maskBoxOFF";
    },
    // 申请提现
    APIwithdrawapply() {
      apiWithdrawApply({
        data: {
          withdrawAble:(this.moneyNum)*100
        },
      }).then((res) => {
        console.log("申请提现", res);
        this.ApiWithdrawApply = res.data;
        this.procedure = (res.data.serviceFeeAmount)/100;
        console.log(this.procedure);
      });
      this.maskBox = "maskBoxON"; //遮罩层弹出
    },
    // 确认提现
    APIwithdrawconfirm() {
      apiWithdrawConfirm({
        data: {
          bankCard: this.ApiWithdrawApply.bankCard, // 银行卡号
          bankCardId: this.ApiWithdrawApply.bankCardId, // 银行卡ID
          bankName: this.ApiWithdrawApply.bankName, // 银行名称
          serviceFeeAmount: this.ApiWithdrawApply.serviceFeeAmount, // 提现手续费
          withdrawAble: this.ApiWithdrawApply.withdrawAble, // 提现金额
        },
      }).then((res) => {
        console.log("确认提现", res);
        if (res.code == 200) {
          this.$router.push("/WithdrawSucceed");
        } else {
          this.$router.push("/WithdrawFailing");
          localStorage.setItem('FailingMsg',JSON.stringify(res.msg))
        }
      });
    },
  },
};
</script>

<style lang="less">
button{
  font-family: 'JDZY';
}
.withdrawBox {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .header {
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
    b {
      margin-left: 15%;
    }
    span {
      width: 80px;
      margin-right: 10px;
      color: white;
    }
  }
  .tbody {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: white;
    .p1 {
      margin-top: 20px;
      margin-left: 20px;
      span {
        font-size: 15px;
        color: #ccc;
        margin-left: 5px;
      }
    }
    .moneyBox {
      width: 90%;
      display: flex;
      border-bottom: 1px solid #eee;
      margin-left: 5%;
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      .el-input__suffix {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      input {
        width: 100%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 20px;
      }
      span {
        flex: none;
        font-size: 10px;
        color: #4969ff;
      }
    }
    dl {
      display: flex;
      margin-left: 20px;
      margin-top: 20px;
      padding-bottom: 20px;
      font-size: 15px;
      color: #ccc;
    }
    .b1 {
      color: red;
      margin-left: 20px;
      margin-top: 20px;
      padding-bottom: 20px;
      font-size: 15px;
    }
  }
  .accountBox {
    display: flex;
    margin-top: 10px;
    background-color: white;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    p {
      margin-left: 20px;
      margin-right: 5px;
      font-size: 15px;
    }
  }
  // 关
  .withdrawBtnOFF {
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    height: 50px;
    border: 0px;
    border-radius: 30px;
    background-color: #c2c2c2;
    color: white;
  }
  // 开
  .withdrawBtnON {
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    height: 50px;
    border: 0px;
    border-radius: 30px;
    background: repeating-linear-gradient(to right, #4c5fff, #417dff);
    color: white;
  }
}
.maskBoxON {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  .masks {
    width: 80%;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .iconP {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 18px;
      img{
        width: 25px;
        height: 25px;
      }
    }
    h3 {
      margin-top: 10px;
      font-size: 20px;
    }
    dl {
      display: flex;
      margin-top: 20px;
      width: 90%;
      justify-content: space-between;
      dt {
        color: #ccc;
      }
    }
    button {
      margin-top: 20px;
      width: 90%;
      height: 40px;
      border: 0;
      border-radius: 20px;
      color: #fff;
      background: repeating-linear-gradient(to right, #4c5fff, #417dff);
    }
  }
}
.maskBoxOFF {
  display: none;
}
</style>
