<template>
  <div class="login">
    <!-- 头部 -->
    <h3>欢迎加入长济伙伴</h3>
    <h4>账号登录</h4>
    <!-- 手机号 -->
    <div id="phone">
      <el-input
        placeholder="请输入手机号"
        v-model="phonevul"
        clearable
        type="number"
      >
      </el-input>
    </div>
    <!-- 验证码 -->
    <div id="code">
      <el-input
        placeholder="请输入验证码"
        v-model="codevul"
        clearable
        type="number"
      >
      </el-input
      ><button @click="codeBtn" :disabled="codeDis">{{ codeBtnText }}</button>
    </div>
    <!-- 登录 -->
    <button class="logBtn" @click="loginBtn">登录</button>
    <!-- 底部 -->
    <div class="bottonBtn">
      <el-checkbox v-model="checked"></el-checkbox>
      <span
        >已阅读并同意<b @click="Servicepolicy">《服务协议》</b>和<b
          @click="Privacyagreement"
          >《隐私政策》</b
        ></span
      >
    </div>
    <!-- 提醒 -->
    <div :class="remindCss">
      <p>{{ remind }}</p>
    </div>
  </div>
</template>

<script>
import { Login, verifyCode } from "@/api/api";
export default {
  data() {
    return {
      phonevul: "", //手机号
      codevul: "", //验证码
      codeBtnText: "获取验证码", //获取验证码
      codeDis: false, //按钮禁用
      checked: false, //单选框
      remind: "", //提醒
      remindCss: "remindBoxError", //提醒css
    };
  },
  methods: {
    // 获取验证码
    codeBtn() {
      var phoneRE = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/; //手机号正则
      var codeTime = 60; //验证码倒计时
      var codeInter;
      if (this.phonevul != "") {
        // 验证手机号
        if (phoneRE.test(this.phonevul)) {
          // 调用接口
          verifyCode({
            data: {
              mobile: this.phonevul,
            },
          }).then((res) => {
            console.log(res);
            this.remindFun(res.msg); // 通知
            if (res.code == 200) {
              // 验证码禁用
              codeInter = setInterval(() => {
                if (codeTime > 1) {
                  codeTime--;
                  this.codeBtnText = codeTime + "s";
                  this.codeDis = true;
                } else {
                  clearInterval(codeInter);
                  this.codeBtnText = "获取验证码";
                  this.codeDis = false;
                }
              }, 1000);
            }
          });
        } else {
          this.remindFun("请输入正确的手机号");
        }
      } else {
        this.remindFun("请输入手机号");
      }
    },
    // 登录
    loginBtn() {
      var phoneRE = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/; //手机号正则
      var codeRE = /^\d{6}$/; //验证码正则
      if (this.phonevul != "") {
        //判断手机号不为空
        if (phoneRE.test(this.phonevul)) {
          //判断手机号正则
          if (this.codevul != "") {
            //判断验证码不为空
            if (codeRE.test(this.codevul)) {
              //判断验证码正则
              if (this.checked) {
                // 判断服务协议是否勾选
                // 调用接口
                Login({
                  data: {
                    mobile: this.phonevul,
                    verifyCode: this.codevul,
                  },
                }).then((res) => {
                  console.log(res);
                  this.remindFun(res.msg);
                  if (res.code == 200) {
                    localStorage.setItem("token", JSON.stringify(res.data)); //存储用户信息
                    localStorage.setItem("userInfo", JSON.stringify(res.data)); //存储用户信息
                    this.setCookie(
                      "token",
                      JSON.stringify(res.data),
                      60 * 24 * 7
                    ); //存储在cookie里，7天
                    this.$router.replace("/"); //跳转首页
                    // var cookietoken = this.getCookie("token");
                    // console.log(cookietoken);
                  }
                });
              } else {
                this.remindFun("请勾选服务协议和隐私政策");
              }
            } else {
              this.remindFun("验证码错误");
            }
          } else {
            this.remindFun("请输入6位验证码");
          }
        } else {
          this.remindFun("请输入正确的手机号");
        }
      } else {
        this.remindFun("请输入手机号");
      }
    },
    // 提醒
    remindFun(e) {
      var time = 2;
      var remTime;
      this.remindCss = "remindBoxCorr";
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
    // 服务协议
    Servicepolicy() {
      this.$router.push("/Servicepolicy");
    },
    // 隐私政策
    Privacyagreement() {
      this.$router.push("/Privacyagreement");
    },
    // cookie存储
    setCookie(name, val, min) {
      var now = new Date();
      //设置时间
      now.setMinutes(now.getMinutes() + min);
      //设置Cookie
      document.cookie = name + "=" + val + ";expires=" + now.toUTCString();
    },
    // cookie获取
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100vh;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  h3 {
    margin-left: 32px;
    margin-top: 108px;
    font-size: 24px;
  }
  h4 {
    margin-top: 74pt;
    margin-left: 32px;
    font-size: 18px;
  }
  // 手机号
  #phone {
    width: 80%;
    margin-left: 10%;
    margin-top: 20pt;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    .el-input__inner {
      border: none;
      padding:0;
    }
  }
  // 验证码
  #code {
    width: 80%;
    margin-left: 10%;
    display: flex;
    font-size: 14px;
    margin-top: 4pt;
    border-bottom: 1px solid #ccc;
    .el-input__inner {
      border: none;
      padding:0;
    }
    button {
      width: 100px;
      border: 0;
      background-color: white;
      font-size: 14px;
      outline: 0;
      font-family: 'JDZY';
    }
  }
  // 登录按钮
  .logBtn {
    // width: 100%;
    height: 42px;
    margin-left: 32pt;
    margin-right: 32pt;
    margin-top: 20pt;
    background-image: linear-gradient(to right , #4C5FFF, #417DFF);
    color: #fff;
    border: 0;
    border-radius: 30px;
    font-size: 14pt;
    outline: 0;
    font-family: 'JDZY';
  }
  //   底部
  .bottonBtn {
    width: 90%;
    margin-left: 40px;
    margin-top: 14px;
    font-size: 11px;
    color: #8F8F8F;
    span {
      margin-left: 5px;
    }
    .el-checkbox__inner {
      border-radius: 50%;
    }
    b {
      color: blue;
    }
  }
}
//提醒/错误
.remindBoxCorr {
  position: absolute;
  top: 105pt;
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    background-color: #000000b3;
    padding: 10px 20px 10px 20px;
    color: white;
    border-radius: 3px;
  }
}
//提醒/正确
.remindBoxError {
  display: none;
}
</style>
