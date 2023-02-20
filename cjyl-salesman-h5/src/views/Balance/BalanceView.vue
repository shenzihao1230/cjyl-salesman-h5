<template>
  <div class="balanceBox">
    <!-- 头部 -->
    <div class="balanceHead">
      <img
        src="https://official.changenhealth.cn/Icon%EF%BC%8FMore.png"
        alt=""
        @click="goHome"
      />
      <b>账户余额</b>
      <span @click="gomyBankCard">我的银行卡</span>
    </div>
    <!-- 余额 -->
    <div class="balance">
      <dl>
        <dt>账户余额</dt>
        <dd>
          <b>{{ this.install(ApiAccountInfo.balance) }}</b>
        </dd>
      </dl>
      <button @click="toWithdraw">提现</button>
    </div>
    <!-- 时间 -->
    <div class="balanceTime">
      <span>{{ date }}&nbsp;至&nbsp;{{ date2 }}</span>
      <p @click="timeScreen">
        筛选<img
          src="https://official.changenhealth.cn/Icon%EF%BC%8FPulldown%EF%BC%88Black%EF%BC%89.png"
          alt=""
        />
      </p>
    </div>
    <!-- 流水 -->
    <div class="listBox" v-if="this.ApiAccountRecordList.rows != ''">
      <div
        v-for="(val, key, index) in ApiAccountRecordList.rows"
        :key="index"
        @click="listCli(val)"
      >
        <dl>
          <dt>{{ val.bizTypeStr }}</dt>
          <dd>{{ timestampToTime(val.tradeTime) }}</dd>
        </dl>
        <b>
          <!-- 14-提现手续费, 15-检验收入, 16-分账手续费 -->
          <span v-if="val.bizType == 15">+</span>
          <span v-if="val.bizType == 16">-</span>
          {{ install(val.tradeAmount) }}
        </b>
      </div>
    </div>
    <!-- 没有流水 -->
    <div v-else class="listBoxNorows">
      <img
        src="https://official.changenhealth.cn/wx_mini_program_Icon/%E7%BC%BA%E7%9C%81%EF%BC%8F%E6%9A%82%E6%97%A0%E7%BD%91%E7%BB%9C.png"
        alt=""
      />暂无数据
    </div>
    <!-- 时间选择器遮罩层 -->
    <div :class="timeMaskBox">
      <div class="timeMasks">
        <div class="btnBox">
          <button @click="today" :class="button1">今日</button>
          <button @click="sevenDays" :class="button2">近七天</button>
          <button @click="month" :class="button3">本月</button>
        </div>
        <div class="inputBox">
          <input type="text" @click="setDate" v-bind:value="date" />
          <span>至</span>
          <input type="text" @click="setDate2" v-bind:value="date2" />
        </div>
        <dl>
          <dt><button @click="month" class="dtBtn">重置</button></dt>
          <dd><button @click="ensureBtn" class="ddBtn">确定</button></dd>
        </dl>
      </div>
    </div>
    <!-- 提醒 -->
    <div :class="remindCss">
      <p>{{ remind }}</p>
    </div>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import { Toast } from "vant";
import { toFixed } from "../../utils/global";
import { apiAccountInfo, apiAccountRecordList } from "@/api/api"; // 账户相关

export default {
  components: { DatePick },
  data() {
    return {
      ApiAccountInfo: {}, // 账户信息
      ApiAccountRecordList: {}, //账户流水列表
      timeMaskBox: "timeMaskBoxOFF", //时间选择器遮罩层
      date: "", //左边时间
      date2: "", //右边时间
      Year: new Date().getFullYear(), //日历上的年份
      Month: new Date().getMonth() + 1, //日历上的月份
      Day: new Date().getDate(), //日历上的天份
      button1: "buttonOFF", //今日on
      button2: "buttonOFF", //七天on
      button3: "buttonOFF", //本月on
      remind: "", //提醒
      remindCss: "remindBoxError", //提醒css
    };
  },
  created() {
    this.APIaccountinfo(); // 账户信息
    this.month(); //默认本月
  },
  methods: {
    // 账户信息
    APIaccountinfo() {
      apiAccountInfo({
        data: {},
      }).then((res) => {
        this.ApiAccountInfo = res.data;
        // accountId账户ID,accountType账户类型：10:C端用户 21:诊所, 22:药店, 23:业务员, 24:门店, 30:厂商, 40:平台
        // balance余额,bindCardStatus绑卡状态：0未进件 1审核中 2审核通过,businessLicense营业执照号码,legalPerson法人
        // mobile手机号,openStatus开通状态：0-初始, 1-正常, 2-钱包开通中,orgId机构ID,orgName机构名称
        // totalIncome总收入,totalWithdraw总提现,uid用户ID,withdrawing提现中
      });
    },
    // 账户流水列表
    APIaccountrecordlist(res) {
      apiAccountRecordList({
        data: {
          pageNo: 1, // 当前页码
          pageSize: 20, // 每页条数
          timeType: res.timeType, // 时间类型：1-今日，2-近七日，3-本月，4-今年，5-全部
          startTime: res.startTime, // 开始时间
          endTime: res.endTime, // 结束时间
        },
      }).then((res) => {
        this.ApiAccountRecordList = res.data;
        console.log(res);
      });
    },
    // 返回首页
    goHome() {
      this.$router.push("/");
    },
    // 时间选择
    timeScreen() {
      this.timeMaskBox = "timeMaskBoxON";
    },
    // 时间戳转换为日期
    timestampToTime(time) {
      var err = Number(time);
      var date = new Date(err);
      var len = err.toString().length;
      if (len < 13) {
        var sub = 13 - len;
        sub = Math.pow(10, sub);
        date = new Date(err * sub);
      }
      var y = date.getFullYear() + "-"; //年
      var M = date.getMonth() + 1; //月
      M = (M < 10 ? "0" + M : M) + "-";
      var d = date.getDate(); //日
      d = (d < 10 ? "0" + d : d) + "  ";
      var h = date.getHours(); //时
      h = (h < 10 ? "0" + h : h) + ":";
      var m = date.getMinutes(); //分
      m = (m < 10 ? "0" + m : m) + ":";
      var s = date.getSeconds(); //秒
      s = s < 10 ? "0" + s : s;
      return y + M + d + h + m + s;
    },
    // 去提现
    toWithdraw() {
      // 0未进件 1审核中 2审核通过
      if (this.ApiAccountInfo.bindCardStatus != 2) {
        this.$router.push("/BankCardBindResultAwaitVue");
      } else {
        this.$router.push("/withdraw");
      }
    },
    // 我的银行卡
    gomyBankCard() {
      console.log(this.ApiAccountInfo.bindCardStatus);
      if (this.ApiAccountInfo.bindCardStatus == 1) {
        this.$router.push("/BankCardBindResultAwaitVue"); //跳转到等待审核页面
      } else {
        this.$router.push("/myBankCard"); //跳转到银行卡绑定页面
      }
    },
    // 点击流水
    listCli(res) {
      this.$router.push({
        path: "/Billing",
        query: res,
      });
    },
    // 左边时间选择
    setDate() {
      document.activeElement.blur(); //防止手机键盘弹出
      this.$picker.show({
        type: "datePicker",
        onOk: (date) => {
          this.date = date;
        },
      });
    },
    // 右边时间选择
    setDate2() {
      document.activeElement.blur();
      this.$picker.show({
        type: "datePicker",
        onOk: (date2) => {
          this.date2 = date2;
        },
      });
    },
    // 今天
    today() {
      let myDate = new Date(); // 获取今天日期
      let newdate = myDate.toLocaleDateString(); //转字符串
      let newlist = newdate.split("/"); //分割
      let newInfo = newlist.join("-"); //拼接
      this.date = newInfo;
      this.date2 = newInfo;
      // 高亮
      this.button1 = "buttonON";
      this.button2 = "buttonOFF";
      this.button3 = "buttonOFF";
      this.APIaccountrecordlist({ timeType: 1 }); // 账户流水列表
    },
    // 近7天
    sevenDays() {
      let myDate = new Date(); // 获取今天日期
      const dateArray = [];
      for (let i = 0; i < 7; i++) {
        dateArray.push(myDate.toLocaleDateString());
        myDate.setDate(myDate.getDate() - 1);
      }
      let newlist = dateArray[0].split("/"); //分割
      let newlist2 = dateArray[6].split("/"); //分割
      let newInfo = newlist.join("-"); //拼接
      let newInfo2 = newlist2.join("-"); //拼接
      this.date = newInfo2;
      this.date2 = newInfo;
      // 高亮
      this.button1 = "buttonOFF";
      this.button2 = "buttonON";
      this.button3 = "buttonOFF";
      this.APIaccountrecordlist({ timeType: 2 }); // 账户流水列表
    },
    // 本月
    month() {
      let myDate = new Date(); // 获取今天日期
      let newday = myDate.getDate(); //当前几号
      const dateArray = [];

      // 31天
      if (
        this.Month == 1 ||
        this.Month == 3 ||
        this.Month == 5 ||
        this.Month == 7 ||
        this.Month == 8 ||
        this.Month == 10 ||
        this.Month == 12
      ) {
        for (let i = 0; i <= newday - 1; i++) {
          dateArray.push(myDate.toLocaleDateString());
          myDate.setDate(myDate.getDate() - 1);
        }
        let newlist = dateArray[0].split("/"); //分割
        let newlist2 = dateArray[newday - 1].split("/"); //分割
        let newInfo = newlist.join("-"); //拼接
        let newInfo2 = newlist2.join("-"); //拼接
        this.date = newInfo2;
        this.date2 = newInfo;
      }
      // 30天
      if (
        this.Month == 4 ||
        this.Month == 6 ||
        this.Month == 9 ||
        this.Month == 11
      ) {
        for (let i = 0; i <= newday - 1; i++) {
          dateArray.push(myDate.toLocaleDateString());
          myDate.setDate(myDate.getDate() - 1);
        }
        let newlist = dateArray[0].split("/"); //分割
        let newlist2 = dateArray[newday - 1].split("/"); //分割
        let newInfo = newlist.join("-"); //拼接
        let newInfo2 = newlist2.join("-"); //拼接
        this.date = newInfo2;
        this.date2 = newInfo;
      }
      // 判断平年闰年
      if (
        (this.Year % 4 == 0 && this.Year % 100 != 0) ||
        this.Year % 400 == 0
      ) {
        if (this.Month == 2) {
          // 平年/2月28天
          for (let i = 0; i <= newday - 1; i++) {
            dateArray.push(myDate.toLocaleDateString());
            myDate.setDate(myDate.getDate() - 1);
          }
          let newlist = dateArray[0].split("/"); //分割
          let newlist2 = dateArray[newday - 1].split("/"); //分割
          let newInfo = newlist.join("-"); //拼接
          let newInfo2 = newlist2.join("-"); //拼接
          this.date = newInfo2;
          this.date2 = newInfo;
        }
      } else {
        if (this.Month == 2) {
          // 闰年/2余额29天
          for (let i = 0; i <= newday - 1; i++) {
            dateArray.push(myDate.toLocaleDateString());
            myDate.setDate(myDate.getDate() - 1);
          }
          console.log(dateArray);
          let newlist = dateArray[0].split("/"); //分割

          let newlist2 = dateArray[newday - 1].split("/"); //分割
          let newInfo = newlist.join("-"); //拼接
          let newInfo2 = newlist2.join("-"); //拼接
          this.date = newInfo2;
          this.date2 = newInfo;
        }
      }
      // 高亮
      this.button1 = "buttonOFF";
      this.button2 = "buttonOFF";
      this.button3 = "buttonON";
      this.APIaccountrecordlist({
        startTime: this.date,
        endTime: this.date2,
        timeType: 3,
      }); // 账户流水列表
    },
    // 确定
    ensureBtn() {
      // 开始时间不能大于结束时间
      if (this.date > this.date2) {
        this.remindFun("开始时间不能大于结束时间");
      }
      // 结束时间不能小于开始时间
      if (this.date2 < this.date) {
        this.remindFun("结束时间不能小于开始时间");
      }
      // 今天
      if (this.date == this.date2) {
        this.APIaccountrecordlist({ timeType: 1 }); // 账户流水列表
        this.timeMaskBox = "timeMaskBoxOFF"; //关闭遮罩层
      }
      //调用接口改时间
      if (this.date <= this.date2) {
        // 时间类型timeType：1-今日，2-近七日，3-本月，4-今年，5-全部,开始时间startTime，结束时间endTime
        this.APIaccountrecordlist({
          startTime: this.timeToTimestamp(this.date),
          endTime: this.timeToTimestamp(this.date2),
        }); // 账户流水列表
        this.timeMaskBox = "timeMaskBoxOFF"; //关闭遮罩层
      }
    },
    // 提醒
    remindFun(e) {
      var time = 4;
      var remTime;
      this.remindCss = "remindBoxCorrs";
      this.remind = e;
      remTime = setInterval(() => {
        if (time > 1) {
          time--;
        } else {
          this.remindCss = "remindBoxError";
          this.remind = "";
          clearInterval(remTime);
        }
      }, 1000);
    },
    // 时间转换时间戳
    timeToTimestamp(res) {
      let timestamp = Date.parse(new Date(res).toString());
      // timestamp = timestamp / 1000; //时间戳不为13位需除1000，时间戳为13位的话不需除1000
      console.log(res + "的时间戳为：" + timestamp);
      return timestamp;
      //2021-11-18 22:14:24的时间戳为：1637244864707
    },
    //
    // 时间戳转换为时间
    // timestampToTime(timestamp) {
    //   timestamp = timestamp ? timestamp : null;
    //   let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //   let Y = date.getFullYear() + '-';
    //   let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    //   let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    //   let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    //   let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    //   let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    //   return Y + M + D + h + m + s;
    // }

    // 价格优化
    install(err) {
      let bar = err;
      bar = toFixed(bar);
      return bar;
    },
  },
};
</script>

<style lang="less">
button {
  font-family: "JDZY";
}
.balanceBox {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .balanceHead {
    flex: none;
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
      margin-right: 10px;
      color: #ccc;
    }
  }
  .balance {
    flex: none;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to right, #4c5fff, #417dff);
    display: flex;
    align-items: center;
    justify-content: space-between;
    dl {
      height: 100%;
      margin-left: 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      color: white;
      dt {
        font-size: 15px;
      }
      dd {
        font-size: 25px;
        margin-top: 5px;
      }
    }
    button {
      margin-right: 20px;
      width: 100px;
      height: 40px;
      background-color: #fff;
      border: 0;
      border-radius: 20px;
      color: #4c5fff;
    }
  }
  .balanceTime {
    flex: none;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      margin-left: 10px;
      font-size: 15px;
    }
    p {
      display: flex;
      align-items: center;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .listBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-color: white;

    div {
      width: 90%;
      height: 70px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      dl {
        margin-left: 10px;
        dd {
          color: #ccc;
          font-size: 15px;
          margin-top: 5px;
        }
      }
      b {
        margin-right: 10px;
      }
    }
  }
  .listBoxNorows {
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666666;
    img {
      width: 50%;
      height: 50%;
    }
  }
}
.TureMask {
  display: none;
}
.FalseMask {
  flex: none;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  .masks {
    width: 70%;
    height: 150px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    dl {
      width: 100%;
      height: 60px;
      border-top: 1px solid #eee;
      display: flex;
      dt,
      dd {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      dt {
        color: #ccc;
        border-right: 1px solid #eee;
      }
    }
  }
}
.timeMaskBoxOFF {
  display: none;
}
.timeMaskBoxON {
  flex: none;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .timeMasks {
    flex: none;
    width: 90%;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .btnBox {
      width: 90%;
      display: flex;
      justify-content: space-between;
      // 高亮
      .buttonON {
        width: 30%;
        height: 40px;
        border: 0;
        border-radius: 20px;
        background-color: #4c5fff;
        color: #fff;
      }
      .buttonOFF {
        width: 30%;
        height: 40px;
        border: 0;
        border-radius: 20px;
        border: 1px solid #4c5fff;
        color: #4c5fff;
        background-color: white;
      }
    }
    .inputBox {
      width: 90%;
      display: flex;
      justify-content: space-between;
      input {
        width: 35%;
        border: 0;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span {
        color: #ccc;
      }
    }
    dl {
      width: 90%;
      display: flex;
      justify-content: space-between;
      dt {
        width: 45%;
        button {
          width: 100%;
          height: 40px;
          border: 0;
          border-radius: 20px;
          border: 1px solid #4c5fff;
          color: #4c5fff;
          background-color: white;
        }
      }
      dd {
        width: 45%;
        button {
          width: 100%;
          height: 40px;
          border: 0;
          border-radius: 20px;
          background-color: #4c5fff;
          color: #fff;
        }
      }
    }
  }
}
//提醒/错误
.remindBoxCorrs {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    background-color: white;
    padding: 10px 20px 10px 20px;
    color: red;
    border-radius: 50px;
  }
}
//提醒/正确
.remindBoxError {
  display: none;
  // width: 100%;
  // height: 0;
  // position: fixed;
  // top: 0;
}
</style>
