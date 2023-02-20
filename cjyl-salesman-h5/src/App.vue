<template>
  <div class="App">
    <!-- 公共模板 -->
    <div class="tbody">
      <router-view />
    </div>
    <!-- 底部导航栏 -->
    <!-- <div class="footer">
      <div class="item" @click="clickItem('/home')" :class="{active: $route.path==='/'}">
        <i class="iconfont icon-shouye1"></i>
        <p>home</p>
      </div>
      <div class="item" @click="clickItem('/user')" :class="{active: $route.path==='/user'}">
        <i class="iconfont icon-shouye1"></i>
        <p>user</p>
      </div>
      <div class="item" @click="clickItem('/about')" :class="{active: $route.path==='/about'}">
        <i class="iconfont icon-wode"></i>
        <p>my</p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods:{
    // clickItem:function(path){
    //     this.$router.push(path);
    // }
  }
};
// window.onload = function() {
//     document.addEventListener('touchstart', function(e) {
//       console.log("1",e.touches.length)
//       if (e.touches.length > 1) {
//         e.preventDefault()
//       }
//     })
//     document.addEventListener('gesturestart', function(e) {
//       console.log("2")
//       e.preventDefault()
//     })
//   };
</script>

<style lang="less">
.App {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'JDZY';
  background-color: #F6F6F6;
  // .tbody {
  //   width: 100%;
  //   height: 100%;
  //   background-color: white;
  // }
  // .footer {
  //   width: 100%;
  //   height: 80px;
  //   background-color: white;
  //   border-top: 1px solid #ccc;
  //   display: flex;
  //   .item{
  //     width: 100%;
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //     justify-content: center;
  //   }
  //   .active{
  //     color:#108b70;
  //   }
  // }
}
@import "@/static/font/font.css";
</style>
