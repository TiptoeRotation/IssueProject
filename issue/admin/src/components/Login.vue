<template>
  <div id="login-wrap">
    <div class="bg-div">
    <el-carousel :interval="5000" trigger="click">
    <el-carousel-item v-for="item in 4" :key="item">
    </el-carousel-item>
  </el-carousel>
    </div>
    <div class="content">
      <el-form
      :model="ruleForm"
      label-width="100px"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm login-container"
    >
      <!-- 这有个样式需要写 -->
      <h3 style="text-align: center">欢迎来到Issue管理系统</h3>
      <el-form-item label="登录ID" prop="Username">
        <el-input v-model="ruleForm.Username" placeholder=""></el-input>
      </el-form-item>
      <!-- required 必填 ，max限制长度等等，规则写在rules里面 ，写在input部分无效,和表单的对应prop-->

      <el-form-item label="密码" prop="Passwd">
        <el-input
          type="password"
          v-model="ruleForm.Passwd"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode" class="VerifyCode"  :inline="true" style="height: 41px;">
      <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"><el-input v-model="ruleForm.verifyCode" placeholder=""></el-input></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"><el-image
        style="width: 70px; height: 40px;margin-left: 55px;"
        :src="verifyCodeImg"
        id="verifyCodeImg"
        @click="getVerifyCode()"></el-image></div></el-col>
    </el-row>
        
    </el-form-item>
      <!-- autocomplete 关闭 ，关闭自动完成功能 -->
      <div id="loginerror">
        <el-alert
        title="登录名或登录密码不正确"
        type="error"
        center
        show-icon>
      </el-alert>
      </div>
      <div id="usernoexit">
      <el-alert
        title="用户不存在"
        type="error"
        center
        show-icon>
      </el-alert>
      </div>
      <div id="logout">
      <el-alert
        title="用户已注销"
        type="error"
        center
        show-icon>
      </el-alert>
      </div>
      <div id="VerificationCode">
        <el-alert
        title="验证码错误"
        type="error"
        center
        show-icon>
      </el-alert>
      </div>
      <div id="loginsuccess">
      <el-alert
        title="登录成功"
        type="success"
        center
        show-icon>
      </el-alert>
      </div>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button
                type="primary"
                style="width: 60%"
                @click="doLogin('ruleForm')"
                >登录</el-button
              >
              <!--  这有个内联的样式 -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button
                type="primary"
                style="width: 60%"
                @click="resetForm('ruleForm'),open2()"
                >重置</el-button
              >
              <!--  这有个内联的样式 -->
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-link type="success" @click="toRegister">用户注册</el-link>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    </div>
    
    
  </div>
</template>
<script>
import axios from "axios";
// import Register from "./Register";   // 注册页面 ，调用另一个组建，已经遗弃，还是加个路径比较好     
export default {
  routes:[{name:'HomePage',path:'/HomePage'}],
  //单页面中不支持前面的data:{}方式
  data() {
    var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入ID'));
        } else {
          callback();
        }
      };
    return {
      //之前是在里面直接写username，password等等，但是这里要写return
      //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
      //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
      //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
      //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
      //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
      ruleForm: {
        Username: "",   //装载用户输入的用户名
        Passwd: "",     //装载用户输入的密码
        flag:'',        //装载后端返回的状态码
        verifyCode:''
        // Username:'admin',
        // Passwd:'123',
        //为了测试登录方便，可以直接在这里写好用户名和密码的值
      },
        // RegisterShow:false

      rules: {
        // rules 是elementui 中表单组件的，和prop一起对应
        //负责表单内数据格式校验
        Username: [
          { validator: validateUser, trigger: 'blur',},
          { required: true, message: "登录ID不能为空" },
          { max: 30, message: "长度不能超过30位" , trigger: 'change',},
        ],
        Passwd: [
          { trigger: "blur", required: true, message: "密码不能为空" },
          { max: 30, message: "长度不能超过30位",trigger: "change", },
          {min: 8,message: "长度不能少于8位",trigger: "blur", },
          // {
          //   pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.])[a-zA-Z\d!#@*&.]*$/,
          //   message: "请输入含大小写，数字和字符的密码",
          //   trigger: "blur",
          // },
        ],
      },
      fits: ['contain'],
      
    };
  },
  methods: {
    getVerifyCode(){
        //获取验证码的方法
        //调用后端接口获取验证码图片装入verifyCodeImg中
        this.verifyCodeImg="http://192.168.43.193:9090/verifyCode";

        //输出验证是否收到验证码图片     
        //console.log(this.verifyCodeImg);

        //调用时间戳，防止验证码因浏览器缓存无法刷新，设置verifyCodeImg元素src属性为验证码图片url
        document.getElementById("verifyCodeImg").src=this.timestamp("http://192.168.0.70:9090/verifyCode");
    },
    timestamp(url) {
      //生成时间戳，用于验证码图片刷新
            var getTimestamp = new Date().getTime();
            //console.log(url);
            if (url.indexOf("?") > -1) {
                url = url + "&timestamp=" + getTimestamp
              //console.log("1" + url);
            } else {
                url = url + "?timestamp=" + getTimestamp
              //console.log("2" + url);
            }
            return url;
        },
    doLogin(formName) {
      //一点击登录按钮，这个方法就会执行  ，方法都要放在这个methods里面
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // 在这里写登录成功之后的操作
        let formName = this.ruleForm                  //创建formNmae对象载入ruleForm对象--ruleForm对象用于装载用户的键入值
        axios.post('http://192.168.43.193:9090/Login',{
          //利用ajax，post请求向后台提交数据
            username:formName.Username,               //username：用户名 
            passwd:formName.Passwd,                   //passwd：账号密码
            code:this.ruleForm.verifyCode,            //code：验证码
        }).then(ret=>{
            //将后台返回数据载入ruleForm对象中
            this.ruleForm.flag=ret.data
            //console.log(this.ruleForm.flag)  
            //声明缓存  
            var storage = window.sessionStorage;

        //判断后台返回状态码
        if(this.ruleForm.flag =="601"){
          //将用户名存入缓存中，便于其他页面向后台标识当前登陆用户
          storage.setItem('loginName', formName.Username);
          this.nonedisplay();
          document.getElementById("loginsuccess").style.display = "block";
          let that = this;
          setTimeout(function(){that.$router.push("/homepage");}, 1000);
          //刷新验证码
          //this.getVerifyCode();
          //普通用户登陆成功
        }
        else if(this.ruleForm.flag =="602"){
          storage.setItem('loginName', formName.Username);
          // redirect: '/homePage/issueReport', // 重定向，
          this.nonedisplay();
          document.getElementById("loginsuccess").style.display = "block";
          let that = this;
          setTimeout(function(){that.$router.push("/homePage/issueReport");}, 1000);
          //刷新验证码
          // this.getVerifyCode();
          //经理用户登陆成功
        }
        else if(this.ruleForm.flag =="603"){
          storage.setItem('loginName', formName.Username);
          this.nonedisplay();
          document.getElementById("loginsuccess").style.display = "block";
          let that = this;
          setTimeout(function(){that.$router.push("/homePage/accountManagement");}, 1000);
          //刷新验证码
          // this.getVerifyCode();
           //超级用户登陆成功
        }
        else if(this.ruleForm.flag =="653"){
          this.nonedisplay();
          document.getElementById("usernoexit").style.display = "block";
          //刷新验证码
          this.getVerifyCode();
          // alert("用户不存在")
        }
        else if(this.ruleForm.flag =="652"){
          this.nonedisplay();
          document.getElementById("loginerror").style.display = "block";
          //刷新验证码
          this.getVerifyCode();
          // alert("密码错误")
        }    
        else if(this.ruleForm.flag =="651"){
          this.nonedisplay();
          document.getElementById("logout").style.display = "block";
          //刷新验证码
          this.getVerifyCode();
          // alert("用户已注销(销毁)")
        }else if(this.ruleForm.flag =="611"){
          this.nonedisplay();
          document.getElementById("VerificationCode").style.display = "block";
          //刷新验证码
          this.getVerifyCode();
          // alert("验证码错误")
        }
        })
          } else {
            //若表单验证不通过
            console.log('error submit!!');
            document.getElementById("loginerror").style.display = "block";
            return false;
          }
        });
    },
    toRegister() {
      //跳转用户注册页面
      this.$router.push("/Register"); // 路由的方法跳转到注册页面
    },
    resetForm(formName) {
      this.$refs[formName].resetFields(); // 重置的函数，清空警告信息,elementui表单的方法
    },
    nonedisplay(){
      document.getElementById("loginerror").style.display = "none";
      document.getElementById("VerificationCode").style.display = "none";
      document.getElementById("logout").style.display = "none";
      document.getElementById("loginerror").style.display = "none";
      document.getElementById("usernoexit").style.display = "none";
      document.getElementById("loginsuccess").style.display = "none";
    },
    open2(){
        this.$message({
          message: '清空成功',
          duration: 1500
        });
      },
  },

    created() {
      //页面加载是进行的操作
        //清空缓存
        window.sessionStorage.clear();
        //刷新验证码
        this.getVerifyCode();
    },
  components: {
    // 同一路径调用另一个vue才使用
    // Register,
  },
};
</script>


<style scoped>
.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 40px 20px 35px;
  background-color: #ffffff;
  opacity: 0.8;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
#logout,#loginerror,#usernoexit,#VerificationCode,#loginsuccess{
  display: none;
  margin-bottom: 15px;
}
  .el-carousel__item:nth-child(5) {
    background: url("/image/bg10.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
  }
  
  .el-carousel__item:nth-child(6) {
    background: url("/image/bg5.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-child(3) {
    background: url("/image/bg6.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .el-carousel__item:nth-child(4) {
    background: url("/image/bg9.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .content{
    position: relative;
    z-index: 100;
    box-sizing: border-box;
    padding-top: 10%;
  }
  .bg-div{
    position: absolute;
    z-index: -100;
    width: 100%;
  }
  .bg-div /deep/ .el-carousel{
    height: 657px;
  }
  
  .bg-div /deep/ .el-carousel__container{
    height: 657px;
  }
  .bg-div /deep/ .el-carousel__arrow{
    display:none;
  }
  .VerifyCode /deep/ .el-input{
    width: 170px;
  }
  .el-image /deep/ .VerifyCode{
    margin-left: 10px;
  }
  .el-image__inner /deep/ .VerifyCode{
    margin-bottom: 0;
    margin-top: 10px;
  }
</style>