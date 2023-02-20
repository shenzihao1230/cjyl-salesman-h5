<template>
  <div class="BillingBox">
    <!-- 头部 -->
    <div class="BillingHead">
      <img
        src="https://official.changenhealth.cn/Icon%EF%BC%8FMore.png"
        alt=""
        @click="goHome"
      />
      <b>账单详情</b>
      <span></span>
    </div>
    <!-- 主体 -->
    <!-- 提现 -->
    <div class="BillingTbody1" v-if="accountData.bizType=='13'">
        <div class="billingHead">
            <p>{{accountData.bizTypeStr}}</p>
            <b>{{ install(accountData.tradeAmount) }}</b>
        </div>
        <div class="billingFooter">
            <dl>
                <dt>提现金额</dt>
                <dd>{{install(accountData.tradeAmount)}}￥</dd>
            </dl>
            <dl>
                <dt>服务费</dt>
                <dd>{{install(accountData.tradeAmount)}}￥</dd>
            </dl>
            <dl>
                <dt>申请时间</dt>
                <dd>{{timestampToTime(accountData.tradeTime)}}</dd>
            </dl>
            <dl>
                <dt>到账时间</dt>
                <dd>{{accountData.tradeTimeStr}}</dd>
            </dl>
            <dl>
                <dt>提现银行</dt>
                <dd>{{accountData.bankName}}</dd>
            </dl>
            <dl>
                <dt>交易单号</dt>
                <dd>{{accountData.orderNo}}</dd>
            </dl>
        </div>
    </div>
    <!-- 服务费/血常规 -->
    <div class="BillingTbody0" v-else>
        <div class="billingHead">
            <p>{{accountData.bizTypeStr}}</p>
            <b>
              <span v-if="accountData.bizType==15">+</span>
              <span v-if="accountData.bizType==16">-</span>
              {{ install(accountData.tradeAmount) }}
            </b>
        </div>
        <div class="billingFooter">
            <dl>
                <dt>支付时间</dt>
                <dd>{{accountData.tradeTimeStr}}</dd>
            </dl>
            <dl>
                <dt>交易单号</dt>
                <dd>{{accountData.orderNo}}</dd>
            </dl>
        </div>
    </div>
  </div>
</template>

<script>
import {toFixed} from '../../utils/global'
import {apiAccountRecordInfo} from '@/api/api'; // 流水详情
export default {
  data() {
    return {
        accountData:'', // 流水ID
    };
  },
  created() {
    this.APIaccountrecordinfo();
  },
  methods: {
    // 账户流水详情
    APIaccountrecordinfo() {
      let data = this.$route.query;//携带的参数
      apiAccountRecordInfo({
        data: {
          accountRecordId:data.accountRecordId, //账户ID
        },
      }).then((res) => {
        this.accountData=res.data
      });
    },
    // 返回上一页
    goHome() {
      this.$router.push("/balance");
    },
    // 时间戳转换为日期
    timestampToTime(time) {
      var err=Number(time)
      var date = new Date(err);
      var len = err.toString().length;
      if (len < 13) {
        var sub = 13 - len;
        sub = Math.pow(10, sub);
        date = new Date(err * sub);
      }
      var y = date.getFullYear() + "-"; //年
      var M = date.getMonth() + 1;//月
      M = (M < 10 ? "0" + M : M) + "-"; 
      var d = date.getDate();//日
      d = (d < 10 ? "0" + d : d) + "  "; 
      var h = date.getHours();//时
      h = (h < 10 ? "0" + h : h) + ":"; 
      var m = date.getMinutes();//分
      m = ( m < 10 ? "0" + m : m ) + ":";
      var s = date.getSeconds(); //秒
      s = ( s < 10 ? "0" + s : s );
      return y + M + d + h + m+s;
    },
    // 价格优化
    install(err) {
      let bar=err
      bar=toFixed(bar)
      return bar;
    },
  },
  
};
</script>

<style lang="less">
button{
  font-family: 'JDZY';
}
.BillingBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .BillingHead {
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
      margin-right: 20%;
      color: white;
    }
  }
// 服务费/血常规
  .BillingTbody0,.BillingTbody1{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    .billingHead{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        p{
            margin-top: 20px;
            color: #ccc;
        }
        b{
            margin-top: 10px;
            font-size: 20px;
            padding-bottom: 20px;
        }
    }
    .billingFooter{
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        background-color: white;
        align-items: center;
        justify-content: center;
        dl{
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            padding-bottom: 10px;
            dt{
                color: #ccc;
            }
        }
    }
  }
}
</style>