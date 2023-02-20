<template>
  <div class="homeBox">
    <!-- 头部 -->
    <div class="headBox">
      <!-- 用户名 -->
      <b>{{ ApiUserInfo.userName }}</b>
      <!-- 诊所数量 -->
      <p @click="toClinicBtn">{{ ApiClinicListNumber }}家诊所></p>
      <button @click="autoLogin">退出登录</button>
    </div>
    <!-- 主体 -->
    <div class="tbodyBox">
      <!-- 提现 -->
      <div class="withdraw">
        <dl>
          <dt>今日收入</dt>
          <b>{{ this.install(ApiUserInfo.todayIncome) }}</b>
        </dl>
        <dl>
          <dt>账户余额</dt>
          <b>{{ this.install(ApiUserInfo.accountBalance) }}</b>
        </dl>
        <button @click="toBalanceBtn()">提现</button>
      </div>
      <!-- 未开单 -->
      <div class="NoBilling" @click="toBillingNoBtn()">
        <p>
          <i class="el-icon-bell"></i>
          近七日未开单诊所 {{ ApiNoorderCount }} 家
        </p>
        <i class="el-icon-arrow-right"></i>
      </div>
      <!-- 数据概览 -->
      <div class="dataBox">
        <!-- 数据概览头部-今日本月全部 -->
        <div class="data-headbox">
          <b>数据概览</b>
          <ul>
            <li
              v-for="(item, index) in ['今日', '本月', '全部']"
              :key="index"
              @click="handleClick(index)"
              :class="{ lion: index === current }"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 切换数据 -->
        <div class="data-tbodybox">
          <!-- 收入明细 -->
          <div class="data-tbodybox-DL">
            <dl>
              <dt>收入</dt>
              <b>{{ this.install(ApiStatsInfoList.income) }}</b>
            </dl>
            <dl>
              <dt>开单诊所</dt>
              <b>{{ ApiStatsInfoList.clinicCount }}</b>
            </dl>
            <dl>
              <dt>开单总数</dt>
              <b>{{ ApiStatsInfoList.orderCount }}</b>
            </dl>
          </div>
          <!-- 排行 -->
          <div class="data-tbodybox-Ranking">
            <ul>
              <li>排名</li>
              <li>诊所</li>
              <li>开单数</li>
            </ul>
            <div class="RankingOL" v-if="newList.length >= 1">
              <ol v-for="(val, key, index) in ApiStatsList" :key="index">
                <li v-if="key + 1 == 1">
                  <img
                    src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/c36861cecc3c4711804027fa03153518_mergeImage.png"
                    alt=""
                  />
                </li>
                <li v-else-if="key + 1 == 2">
                  <img
                    src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/f7796267b119482787ca47afe526c102_mergeImage.png"
                    alt=""
                  />
                </li>
                <li v-else-if="key + 1 == 3">
                  <img
                    src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/16ae72f535904503acc70333af2920f5_mergeImage.png"
                    alt=""
                  />
                </li>
                <li v-else>{{ key + 1 }}</li>
                <li>{{ val.clinicName }}</li>
                <li>{{ val.orderCount }}</li>
              </ol>
            </div>
            <div class="RankingOL" v-else>
              <div class="noListBox">
                <img
                  src="https://official.changenhealth.cn/%E7%BC%BA%E7%9C%81%EF%BC%8F%E6%9A%82%E6%97%A0%E7%BD%91%E7%BB%9C.png"
                  alt=""
                />
                <p>暂无数据</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 绑卡遮罩层 -->
    <div :class="maskBox">
      <div class="masks">
        <div>
          <p>请先完成身份认证和银行卡绑定</p>
          <p>绑卡后才能正常提现</p>
        </div>
        <dl>
          <dt @click="cancelBtn">取消</dt>
          <dd @click="myBankCard">去绑卡</dd>
        </dl>
      </div>
    </div>
    <!-- 退出登录遮罩层 -->
    <div :class="LogMaskBox">
      <div class="masks">
        <div>
          <p>您确定要退出登录吗？</p>
        </div>
        <dl>
          <dt @click="cancelBtnLog">取消</dt>
          <dd @click="myBankCardLog">确定</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUserInfo, apiClinicList, apinoOrderCount } from "@/api/api"; // 用户信息，业务员服务诊所列表，近期未开单诊所数量
import { apiStatsInfo, apiStatsList, logout } from "@/api/api"; // 统计相关
import { wxJS } from "@/api/api"; // 微信
import wx from "jweixin-1.6.0";

export default {
  data() {
    return {
      userToken: {}, //用户登录信息
      ApiUserInfo: {}, //用户信息
      ApiClinicListNumber: 0, //业务员服务诊所数量
      ApiNoorderCount: 0, //近期未开单诊所数量
      ApiStatsInfoList: {}, // 统计信息
      ApiStatsList: {}, //统计列表
      current: 1, //tab栏的核心是当前下标的变量
      maskBox: "TureMask", //绑卡遮罩层
      LogMaskBox: "TureMask", //登录遮罩层
      newList: [], //排序过的数据
    };
  },
  created() {
    // 获取存储在本地的用户信息
    this.userToken = JSON.parse(sessionStorage.getItem("token")); // token
    this.APIuserinfo(); // 获取用户信息
    this.APIcliniclist(); // 业务员服务诊所列表-数量
    this.APInoordercount(); // 近期未开单诊所数量
    this.APIstatsinfo(2); // 统计信息
    this.APIstatslist(2); //统计列表
    this.getWxJS(); //微信
  },
  methods: {
    // 微信config
    getWxJS() {
      var url = window.location.href;
      wxJS(url).then((res) => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: [
            // 用的方法都要加进来
            "updateAppMessageShareData",
          ],
        });
        // 处理成功验证
        wx.ready(function () {
          //需在用户可能点击分享按钮前就先调用
          // 分享接口
          wx.updateAppMessageShareData({
            title: "长济伙伴", // 分享标题
            desc: "欢迎加入长济伙伴，赋能基层医疗，服务百姓健康", // 分享描述
            link: "https://salesman.changenhealth.cn/#/login", // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
            imgUrl: "https://official.changenhealth.cn/1111111.png", // 分享图标
            success(res) {
              console.log(res);
            },
            fail(err) {
              console.log(err);
            },
          });
          // 测试当前客户端是否支持指定js接口
          // wx.checkJsApi({
          //   jsApiList: ["updateAppMessageShareData"],
          //   success: function (res) {
          //     console.log('11111111',res);
          //     if (res.checkResult.updateAppMessageShareData) {
          //     }
          //   },
          //   fail:function(res){
          //     console.log(res);
          //   }
          // });
        });
        // 处理失败验证
        wx.error(function () {});
      });
    },
    // 获取用户信息
    APIuserinfo() {
      // 获取用户信息
      apiUserInfo({ data: {} }).then((res) => {
        // accountBalance账户余额,bindCardStatus绑卡状态：0未进件 1审核中 2审核通过,clinicCount诊所数量
        // mobile手机号码,todayIncome今日收入,uid用户ID,userName用户姓名,userStatus用户状态：1-正常, 2-冻结，3-注销
        this.ApiUserInfo = res.data;
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        // 判断是否绑卡
        if (res.data.bindCardStatus == 0) {
          this.maskBox = "FalseMask";
        }
      });
    },
    // 业务员服务诊所列表-数量
    APIcliniclist() {
      apiClinicList({
        data: {
          pageNo: 1,
          pageSize: 20,
        },
      }).then((res) => {
        this.ApiClinicListNumber = res.data.rows.length;
      });
    },
    // 近期未开单诊所数量
    APInoordercount() {
      apinoOrderCount({ data: {} }).then((res) => {
        this.ApiNoorderCount = res.data;
      });
    },
    // 统计信息
    APIstatsinfo(err) {
      apiStatsInfo({
        data: {
          timeType: err, // 时间类型：1-今日，2-本月，3-全部
        },
      }).then((res) => {
        // clinicCount开单诊所,income收入,orderCount开单总数
        this.ApiStatsInfoList = res.data;
      });
    },
    // 统计列表
    APIstatslist(err) {
      apiStatsList({
        data: {
          pageNo: 1,
          pageSize: 20,
          timeType: err, // 1今天2本月3全部//默认本月
        },
      }).then((res) => {
        this.ApiStatsList = res.data.rows;
        // 调用时间排序
        this.sortRant(res.data.rows);
      });
    },
    //Tab切换点击的时候改变current
    handleClick(index) {
      console.log(index + 1);
      this.current = index;
      this.APIstatslist(index + 1); // 统计列表
      this.APIstatsinfo(index + 1); //统计信息
    },
    // 数据排序
    sortRant(err) {
      this.newList = err.sort(function (a, b) {
        return b.orderCount - a.orderCount;
      });
    },
    // 去诊所管理
    toClinicBtn() {
      var str = localStorage.getItem("userInfo") || "[]";
      var arr = JSON.parse(str);
      if (arr.bindCardStatus == 0) {
        this.maskBox = "FalseMask";
      } else {
        this.$router.push("/clinic");
      }
    },
    // 未开单
    toBillingNoBtn() {
      var str = localStorage.getItem("userInfo") || "[]";
      var arr = JSON.parse(str);
      if (arr.bindCardStatus == 0) {
        this.maskBox = "FalseMask";
      } else {
        this.$router.push("/billingNo");
      }
    },
    // 提现/去余额
    toBalanceBtn() {
      var str = localStorage.getItem("userInfo") || "[]";
      var arr = JSON.parse(str);
      if (arr.bindCardStatus == 0) {
        this.maskBox = "FalseMask";
      } else {
        this.$router.push("/balance");
      }
    },
    // 取消绑卡
    cancelBtn() {
      this.maskBox = "TureMask";
    },
    // 跳转到我的银行卡
    myBankCard() {
      this.$router.push("/myBankCard"); //跳转到银行卡绑定页面
      this.maskBox = "TureMask";
    },
    // 退出登录
    autoLogin() {
      this.LogMaskBox = "FalseMask";
    },
    // 取消退出登录
    cancelBtnLog() {
      this.LogMaskBox = "TureMask";
    },
    // 确定退出登录
    myBankCardLog() {
      logout({ data: {} }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          // window.localStorage.removeItem('key') //清空指定key
          window.localStorage.clear(); //清空所有localStorage存储
          this.LogMaskBox = "TureMask"; //关闭遮罩层
          this.$router.push("/login"); //跳转到登录
          //第一个参数一定要对应，不然找不到这个Cookie
          //第二个参数可写可不写
          //第三个参数设置为-1
          this.setCookie("token", "", -1);
        }
      });
    },
    // 价格优化
    install(err) {
      if (
        /^(([1-9][0-9]*)|(([1-9]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(err)
      ) {
        const moneyArr = Number(err).toFixed(2).split(".");
        return `${Number(moneyArr[0]).toLocaleString()}.${moneyArr[1]}`;
      }
      if (err === undefined) {
        return "--";
      }
      return err;
    },
    // cookie存储
    setCookie(name, val, min) {
      var now = new Date();
      //设置时间
      now.setMinutes(now.getMinutes() + min);
      //设置Cookie
      document.cookie = name + "=" + val + ";expires=" + now.toUTCString();
    },
  },
};
</script>

<style lang="less">
button{
  font-family: 'JDZY';
}
.homeBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // 头部
  .headBox {
    width: 100%;
    height: 180px;
    background: repeating-linear-gradient(to right, #4c5fffff, #417dffff);
    display: flex;
    align-items: center;
    flex: none;
    position: relative;
    b {
      display: block;
      margin-left: 14px;
      font-size: 24pt;
      color: white;
    }
    p {
      width: 76px;
      height: 26px;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      margin-left: 10px;
    }
    button {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 70px;
      height: 30px;
      border-radius: 10px;
      border: 1px solid #ccc;
      background-color: #fff;
      color: #4969ff;
    }
  }
  // 主体
  .tbodyBox {
    width: 100%;
    height: 100%;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    position: relative;
    // 提现
    .withdraw {
      position: absolute;
      width: 90%;
      height: 100px;
      background-color: white;
      left: 5%;
      top: -50px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      dl {
        width: 130px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        b {
          margin-top: s5px;
          font-size: 20px;
        }
      }
      button {
        position: absolute;
        right: 0;
        width: 60px;
        height: 35px;
        background-color: #4969ff;
        color: #fff;
        border: 0px;
        border-radius: 50px 0 0 50px;
      }
    }
    // 未开单
    .NoBilling {
      flex: none;
      color: rgba(255, 125, 0, 1);
      background-color: rgba(252, 247, 238, 1);
      margin-top: 70px;
      width: 90%;
      height: 35px;
      margin-left: 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      i {
        margin: 0 10px 0 10px;
      }
    }
    // 数据概览
    .dataBox {
      width: 90%;
      height: 100%;
      margin-top: 15px;
      margin-left: 5%;
      background-color: white;
      border-radius: 10px 10px 0 0;
      display: flex;
      flex-direction: column;
      // 数据概览头部
      .data-headbox {
        flex: none;
        width: 100%;
        height: 50px;
        background-color: white;
        border-radius: 10px 10px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        b {
          margin-left: 10px;
        }
        ul {
          margin-right: 10px;
          list-style-type: none;
          display: flex;
          li {
            width: 35px;
            height: 25px;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            font-size: 15px;
            border-radius: 5px;
            color: #ccc;
          }
          .lion {
            background-color: #4969ff;
            color: white;
          }
        }
      }
      // 切换的数据概览主体
      .data-tbodybox {
        width: 100%;
        height: 100%;
        background-color: white;
        // 明细
        .data-tbodybox-DL {
          width: 100%;
          height: 100px;
          margin-top: 10px;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: space-around;
          dl {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            b {
              margin-top: 5px;
              font-size: 18px;
            }
          }
        }
        // 排行
        .data-tbodybox-Ranking {
          width: 90%;
          margin-left: 5%;
          margin-top: 10px;
          height: auto;
          background-color: #fafafe;
          border: 1px solid #eee;
          border-radius: 5px;
          .RankingOL {
            width: 100%;
            height: 289px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            ol {
              flex: none;
              li:nth-child(1) {
                color: rgba(255, 125, 0, 1);
                img {
                  width: 30px;
                  height: 30px;
                }
              }
            }
            .noListBox {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              img {
                width: 140px;
                height: 140px;
              }
              p {
                color: #ccc;
              }
            }
          }
          // 头部
          ul,
          ol {
            list-style-type: none;
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            li:nth-child(1) {
              justify-content: center;
              flex: none;
              width: 40px;
              margin-left: 10px;
              display: flex;
              align-items: center;
            }
            li:nth-child(2) {
              width: 100%;
              padding-left: 20px;
              // 省略号
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            li:nth-child(3) {
              justify-content: center;
              flex: none;
              width: 60px;
              display: flex;
            }
          }
        }
      }
    }
  }
}
.TureMask {
  display: none;
}
.FalseMask {
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
      font-size: 15px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
::-webkit-scrollbar {
  display: none;
}
</style>
