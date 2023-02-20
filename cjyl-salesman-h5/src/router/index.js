import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { isLogin: true },
  },
  {
    path: '/about',
    name: 'about',
    meta: { isLogin: true },
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { isLogin: true },
    component: () => import('../views/userView.vue')
  },
  {
    path: '/login',
    name: 'login',

    component: () => import('../views/LoginView.vue'), // 登录
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    meta: { isLogin: true },
    component: () => import('../views/Withdraw/WithdrawView.vue') // 提现
  },
  {
    path: '/WithdrawSucceed',
    name: 'WithdrawSucceed',
    meta: { isLogin: true },
    component: () => import('../views/Withdraw/WithdrawSucceed.vue') // 提现成功
  },
  {
    path: '/WithdrawFailing',
    name: 'WithdrawFailing',
    meta: { isLogin: true },
    component: () => import('../views/Withdraw/WithdrawFailing.vue') // 提现失败
  },
  {
    path: '/balance',
    name: 'balance',
    meta: { isLogin: true },
    component: () => import('../views/Balance/BalanceView.vue') // 账户余额
  },
  {
    path: '/Billing',
    name: 'Billing',
    meta: { isLogin: true },
    component: () => import('../views/Balance/BillingView.vue') // 账单详情
  },
  {
    path: '/clinic',
    name: 'clinic',
    meta: { isLogin: true },
    component: () => import('../views/HomeClinic/ClinicAdmView.vue') // 诊所管理
  },
  {
    path: '/billingNo',
    name: 'billingNo',
    meta: { isLogin: true },
    component: () => import('../views/HomeClinic/BillingNoView.vue') // 近七日未开单
  },
  {
    path: '/myBankCard',
    name: 'myBankCard',
    meta: { isLogin: true },
    component: () => import('../views/BankCard/myBankCardView.vue') // 我的银行卡
  },
  {
    path: '/BankSucceed',
    name: 'BankSucceed',
    meta: { isLogin: true },
    component: () => import('../views/BankCard/BankSucceed.vue') // 绑卡成功
  },
  {
    path: '/BankFailing',
    name: 'BankFailing',
    meta: { isLogin: true },
    component: () => import('../views/BankCard/BankFailing.vue') // 绑卡失败
  },
  {
    path: '/BankCardBindResultAwaitVue',
    name: 'BankAwait',
    meta: { isLogin: true },
    component: () => import('../views/BankCard/BankAwait.vue') // 绑卡中...
  },
  {
    path: '/Privacyagreement',
    name: 'Privacyagreement',
    meta: { isLogin: true },
    component: () => import('../views/CJHBagreement/Privacyagreement.vue')//隐私协议
  },
  {
    path: '/Servicepolicy',
    name: 'Servicepolicy',
    meta: { isLogin: true },
    component: () => import('../views/CJHBagreement/Servicepolicy.vue')//服务政策
  }
]


const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  // base: process.env.BASE_URL,
  base:'/salesmain',
  routes
})
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// 路由守卫
router.beforeEach((to, from, next) => {
  let localToken = JSON.parse(localStorage.getItem('token'))
  let localUser = JSON.parse(localStorage.getItem('userInfo'))
  if (to.matched.some(v => { return v.meta.isLogin == true })) {
    if (localToken != null && localUser != null) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})
export default router
