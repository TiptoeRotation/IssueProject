<template>
  <div class="login-wrap">
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
      status-icon :rules="rules"  ref="ruleForm"
      class="demo-ruleForm login-container"      
    >
     <!-- 这有个样式需要写 -->
      <h3 style="text-align: center">普通用户注册</h3>
      <el-form-item label="登录ID" prop="Username">
        <el-input v-model="ruleForm.Username" placeholder="登录的账号"></el-input>
      </el-form-item>
      <!-- required 必填 ，max限制长度等等，规则写在rules里面 ，写在input部分无效,和表单的对应prop ,placeholder是灰拟提示   -->
       <div id="IDExit">
        <el-alert
        title="用户ID已存在"
        type="error"
        center
        show-icon>
      </el-alert>
      </div>
    <el-form-item label="姓名" prop="Name"  type="text/css">
        <el-input v-model="ruleForm.Name" placeholder="请输入汉字"></el-input>
    </el-form-item>
      <el-form-item label="邮箱" prop="Email">
        <el-input v-model="ruleForm.Email"></el-input>
      </el-form-item>

    <el-form-item label="密码" prop="Passwd">
    <el-input type="password" v-model="ruleForm.Passwd" autocomplete="off" show-password ></el-input>
  </el-form-item>
    <!-- autocomplete 关闭 ，关闭自动完成功能 -->
  <el-form-item label="确认密码" prop="checkPasswd">
    <el-input type="password" v-model="ruleForm.checkPasswd" autocomplete="off" show-password ></el-input>
  </el-form-item>
      
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
             <!--  鼠标事件，点击执行doRegister函数进行注册 -->
              <el-button type="primary" style="width: 60%" @click="doRegister('ruleForm')" >注册</el-button>  
               <!--  这有个内联的样式 -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
            <!--  鼠标事件，点击执行resetForm函数进行清空，清空函数为elementui库表单的方法 -->
              <el-button type="primary" style="width: 60%" @click="resetForm('ruleForm'),open3()" >重置</el-button> 
               <!--  这有个内联的样式 -->
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
             <!--  鼠标事件，点击执行toLogin函数进行路由函数的跳转 -->
              <el-link type="success" @click="toLogin">用户登录</el-link>
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
export default {
  data() {        
    // 校验两个密码的是否一致，callback叫回调函数
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPasswdwd !== '') {
            this.$refs.ruleForm.validateField('checkPasswd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.Passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
     
      return {    // 返回
        //创建对象装载用户键入值
        ruleForm: {
          Username: "",       //用户名
          Name: "",           //用户信息-姓名
          Email: "",          //用户信息-邮件地址
          Passwd: "",         //账号密码
          checkPasswd: "",    //密码验证
          flag:0              //后端返回状态码
        },

        // rules 输入的规则 ,都在这里写，放进return
        // validator异步请求；prop="Passwd"的名字和里面一样，blur是失去焦点
        // 如需要判断两个输入框的密码对比验证的，要函数验证
        rules: { 
          //表单输入验证规则   
          Username:[
            {required: true,message: "不能为空" },  // , trigger: 'blur' 是变焦才，, trigger: 'blur'
            {max: 30,message: "长度不能超过30位" },            
          ],
          Name:[
            // { validator: checkName, trigger: 'blur', },
            {required: true,message: "不能为空" },
            {max: 20,message: "不超过20位" },    
            // {pattern:/^[\u4e00-\u9fa5]{0,}$/,message: "请输入汉字"},      // 限制汉字，正则表达式  
            {pattern:/^[\u4e00-\u9fa5]{0,}$/,message: "请输入纯汉字，不能带数字或者字母"},      // 限制汉字，正则表达式              
          ],
          Email:[
            {required: true,message: "不能为空" },
            {max: 30,message: "长度不能超过30位" },       
            {pattern:/^([a-zA-Z0-9]+[-_]?)+@[a-zA-Z0-9]+\.[a-z]+$/,message: "请输入正确邮箱格式"},      // 限制邮箱格式，正则表达式           
          ],
          Passwd: [
            { validator: validatePass, trigger: 'blur',required: true,},
            {max: 30,message: "长度不能超过30位" },
            {min: 8,message: "长度不能少于8位" },
            {pattern:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.])[a-zA-Z\d!#@*&.]*$/,message: "请输入含大小写，数字和字符的密码"}, 
          ],
          checkPasswd: [
            { validator: validatePass2, trigger: 'blur', },
            {required: true,message: "不能为空" },
            {max: 30,message: "长度不能超过30位" },
            {min: 8,message: "长度不能少于8位" },
          ],
        }
      };
    },

    methods: {
      doRegister(formName) {  
        // 注册按钮点击方法
        this.$refs[formName].validate((valid) => {
          //表单验证
          if (valid) {
            let rid=this.ruleForm.Username;     //提交后台的username
            let rname=this.ruleForm.Name;       //提交后台的name
            let rpw=this.ruleForm.Passwd;       //提交后台的passwd
            let remail=this.ruleForm.Email;     //提交后台的email

        axios.post('http://192.168.0.70:9090/Register',{
          //利用ajax，post请求向后台提交数据
            username:rid,                       //提交username
            passwd:rpw,                         //提交passwd
            email:remail,                       //提交email
            name:rname,                         //提交name
          
        }).then(ret=>{                          //定义ret接收后台返回数据              
            this.ruleForm.flag=ret.data         //接收后台返回flag状态码
            //console.log(this.ruleForm.flag)   //控制台打印，确认是否和收到
            //判断flag返回信息
            if(this.ruleForm.flag===1){         //flag=1 跳转登陆页面
              // alert("注册成功")                  //提示'注册成功信息'
              this.open1();
              this.$router.push('/login')       //路由跳转
            }
            else{
              // this.open2();
              // alert("注册失败!用户ID已经存在") //注册失败
              document.getElementById("IDExit").style.display = "block";
            }          
        })
          } else {
            console.log('error submit!!');      //表单验证未通过
            return false;             
          }
        });
      },    
      resetForm(formName) {
        this.$refs[formName].resetFields();     // 重置的函数，毕竟清空下，免得一片红,elementui表单的方法
      },
      toLogin(){                                // 跳转回注册页面          
        this.$router.push('/Login')             // 路由的方法跳转到登录页面
      },
      open1(){
      this.$message({
        message: '注册成功',
        type: 'success',
        duration: 1500
      });
    },
    open2() {
        this.$message({
          showClose: true,
          message: '注册失败!用户ID已经存在',
          type: 'error',
        });
      },
      open3(){
        this.$message({
          message: '清空成功',
          duration: 1500
        });
      },
    }
};
</script>

<style scoped>
.content{
    position: relative;
    z-index: 100;
    box-sizing: border-box;
    padding-top: 100px;
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


.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 40px 20px 35px;
  background: #fff;
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
#IDExit{
  display: none;
  margin-bottom: 15px;
}
</style>