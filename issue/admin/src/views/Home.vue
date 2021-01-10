<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <home-page></home-page>
    <login></login>
    <register></register>
    <update-info></update-info>
    <new-issue></new-issue>>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomePage from '@/components/HomePage.vue';
import Login from '@/components/Login.vue';
import Register from '../components/Register'   //  这种也行
// import Register from '@/components/Register.vue';
import UpdateInfo from '@/components/UpdateInfo.vue';
import NewIssue from '@/components/NewIssue.vue';

export default {
  name: 'Home',
  components: {
    HomePage,     // 主页面
    Login,        // 登录
    Register,     // 注册
    UpdateInfo,   // 修改个人信息页面
    NewIssue,     // 创建Issue
  }
}
</script>
   