<template>
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
        <dt><button @click="reset" class="dtBtn">重置</button></dt>
        <dd><button @click="ensureBtn" class="ddBtn">确定</button></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  components: { DatePick },
  data: () => ({
    timeMaskBox:"timeMaskBoxON",
    date: "",
    date2: "",
    Year: new Date().getFullYear(), //日历上的年份
    Month: new Date().getMonth() + 1, //日历上的月份
    Day: new Date().getDate(), //日历上的天份
    button1:'buttonOFF',
    button2:'buttonOFF',
    button3:'buttonOFF',
  }),
  methods: {
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
    // 左边时间选择
    setDate() {
      this.$picker.show({
        type: "datePicker",
        onOk: (date) => {
          this.date = date;
        },
      });
    },
    // 右边时间选择
    setDate2() {
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
      let newdate=myDate.toLocaleDateString()//转字符串
      let newlist=newdate.split("/")//分割
      let newInfo=newlist.join('-')//拼接
      console.log(newInfo);
      this.date=newInfo
      this.date2=newInfo
      // 高亮
      this.button1='buttonON'
      this.button2='buttonOFF'
      this.button3='buttonOFF'
    },
    // 近7天
    sevenDays() {
      let myDate = new Date(); // 获取今天日期
      const dateArray = [];
      for (let i = 0; i < 7; i++) {
        dateArray.push(myDate.toLocaleDateString());
        myDate.setDate(myDate.getDate() - 1);
      }
      let newlist=dateArray[0].split("/")//分割
      let newlist2=dateArray[6].split("/")//分割
      let newInfo=newlist.join('-')//拼接
      let newInfo2=newlist2.join('-')//拼接
      this.date=newInfo2
      this.date2=newInfo
      // 高亮
      this.button1='buttonOFF'
      this.button2='buttonON'
      this.button3='buttonOFF'
    },
    // 本月
    month() {
      let myDate = new Date(); // 获取今天日期
      const dateArray = [];
      // 31天
      if(this.Month==1 || this.Month==3 || this.Month==5 || this.Month==7 || this.Month==8 || this.Month==10 || this.Month==12){
        for (let i = 0; i < 31; i++) {
          dateArray.push(myDate.toLocaleDateString());
          myDate.setDate(myDate.getDate() - 1);
        }
        let newlist=dateArray[0].split("/")//分割
        let newlist2=dateArray[30].split("/")//分割
        let newInfo=newlist.join('-')//拼接
        let newInfo2=newlist2.join('-')//拼接
        this.date=newInfo2
        this.date2=newInfo
      }
      // 30天
      if(this.Month==4 || this.Month==6 || this.Month==9 || this.Month==11){
        for (let i = 0; i < 30; i++) {
          dateArray.push(myDate.toLocaleDateString());
          myDate.setDate(myDate.getDate() - 1);
        }
        let newlist=dateArray[0].split("/")//分割
        let newlist2=dateArray[29].split("/")//分割
        let newInfo=newlist.join('-')//拼接
        let newInfo2=newlist2.join('-')//拼接
        this.date=newInfo2
        this.date2=newInfo
      }
      // 判断平年闰年
      if(this.Year%4==0 && this.Year%100!=0 || this.Year%400==0){
        if(this.Month==2){
          // 平年/2月28天
          for (let i = 0; i < 28; i++) {
            dateArray.push(myDate.toLocaleDateString());
            myDate.setDate(myDate.getDate() - 1);
          }
            let newlist=dateArray[0].split("/")//分割
            let newlist2=dateArray[27].split("/")//分割
            let newInfo=newlist.join('-')//拼接
            let newInfo2=newlist2.join('-')//拼接
            this.date=newInfo2
            this.date2=newInfo
        }
      }else{
        if(this.Month==2){
          // 闰年/2余额29天
          for (let i = 0; i < 29; i++) {
            dateArray.push(myDate.toLocaleDateString());
            myDate.setDate(myDate.getDate() - 1);
          }
          let newlist=dateArray[0].split("/")//分割
            let newlist2=dateArray[28].split("/")//分割
            let newInfo=newlist.join('-')//拼接
            let newInfo2=newlist2.join('-')//拼接
            this.date=newInfo2
            this.date2=newInfo
        }
      }
      // 高亮
      this.button1='buttonOFF'
      this.button2='buttonOFF'
      this.button3='buttonON'
    },
    // 重置
    reset() {
      this.date=''
      this.date2=''
      // 高亮
      this.button1='buttonOFF'
      this.button2='buttonOFF'
      this.button3='buttonOFF'
    },
    // 确定
    ensureBtn() {
      console.log(this.date);
      console.log(this.date2);
      this.timeMaskBox='timeMaskBoxOFF'
    },
  },
  created(){
    this.today();
  }
};
</script>

<style lang="less">
button{
  font-family: 'JDZY';
}
    .timeMaskBoxOFF{
      display: none;
    }
    .timeMaskBoxON{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      .timeMasks{
        width: 90%;
        height: 200px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .btnBox{
          width: 90%;
          display: flex;
          justify-content: space-between;
          // 高亮
          .buttonON{
            width: 30%;
            height: 40px;
            border: 0;
            border-radius: 20px;
            background-color: #4C5FFF;
            color: #fff;
          }
          .buttonOFF{
            width: 30%;
            height: 40px;
            border: 0;
            border-radius: 20px;
            border: 1px solid #4C5FFF;
            color: #4C5FFF;
            background-color: white;
          }
        }
        .inputBox{
          width: 90%;
          display: flex;
          justify-content: space-between;
          input{
            width: 35%;
            border: 0;
            font-size: 20px;
            display: flex;
            justify-content: center;
          }
          span{
            color: #ccc;
          }
        }
        dl{
          width: 90%;
          display: flex;
          justify-content: space-between;
          dt{
            width: 45%;
            button{
              width: 100%;
              height: 40px;
              border: 0;
              border-radius: 20px;
              border: 1px solid #4C5FFF;
              color: #4C5FFF;
              background-color: white;
            }
          }
          dd{
            width: 45%;
            button{
              width: 100%;
              height: 40px;
              border: 0;
              border-radius: 20px;
              background-color: #4C5FFF;
              color: #fff;
            }
          }
        }
      }
    }
</style>