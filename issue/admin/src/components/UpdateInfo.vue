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
      <h3 style="text-align: center">修改个人信息</h3>
      <el-form-item label="登录ID" prop="Username">
        <el-input v-model="ruleForm.Username"  :disabled="true"></el-input>
      </el-form-item>
      <!-- required 必填 ，max限制长度等等，规则写在rules里面 ，写在input部分无效,和表单的对应prop-->

    <el-form-item label="姓名" prop="Name"  type="text/css">
        <el-input v-model="ruleForm.Name" placeholder="请输入汉字"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="Email">
        <el-input v-model="ruleForm.Email"></el-input>
      </el-form-item>

    <el-form-item label="密码" prop="Passwd">
    <el-input type="password" v-model="ruleForm.Passwd" autocomplete="off"  ></el-input>
  </el-form-item>
    <!-- autocomplete 关闭 ，关闭自动完成功能 -->
  <el-form-item label="确认密码" prop="checkPasswd">
    <el-input type="password" v-model="ruleForm.checkPasswd" autocomplete="off" ></el-input>
  </el-form-item>
      
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button type="primary" style="width: 60%" @click="doUpdainfo('ruleForm')" >修改</el-button>  
               <!--  这有个内联的样式 -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button type="primary" style="width: 60%" @click="resetForm('ruleForm')" >重置</el-button> 
               <!--  这有个内联的样式 -->
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-link type="success" @click="toHome">回到主页面</el-link>
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
     
      return {
        ruleForm: {
          Username:window.sessionStorage.getItem("loginName"),
          Name: "",
          Email: "",
          Passwd: "",
          checkPasswd: "",
        },

        // rules 输入的规则 ,都在这里写，放进return
        // validator异步请求；prop="Passwd"的名字和里面一样，blur是失去焦点
        // 如需要判断两个输入框的密码对比验证的，要函数验证
        rules: {    
          Username:[
            // {required: true,message: "不能为空" ,trigger: 'blur',  },
            
            {max: 30,message: "长度不能超过30位" },            
          ],
          Name:[
            // { validator: checkName, trigger: 'blur', },
            {required: true,message: "不能为空" },
            {max: 30,message: "长度不能超过30位" },    
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
            {min: 8,message: "长度不能少于8位" , trigger: 'blur'},
            {pattern:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.])[a-zA-Z\d!#@*&.]*$/,message: "请输入含大小写，数字和字符的密码"}, 
          ],
          checkPasswd: [
            { validator: validatePass2, trigger: 'blur', },
            {required: true,message: "不能为空" },
            {max: 30,message: "长度不能超过30位" },
            {min: 8,message: "长度不能少于8位" , trigger: 'blur'},
          ],
        }
      };
    },


    methods: {
      doUpdainfo(formName) {   // 提交后的注册函数
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let ruleForm=this.ruleForm;
            // alert('submit!');  // 成功提交要进行的操作，目前alert测试下
            axios.post('http://192.168.0.70:9090/updateUser',{
            username:ruleForm.Username,
            email:ruleForm.Email,
            name:ruleForm.Name,
            passwd:ruleForm.Passwd,

        }).then(ret=>{
            this.ruleForm.flag=ret.data,
            console.log(this.ruleForm.flag)  
            if(this.ruleForm.flag == 1){
            // alert("修改成功!") 
            this.open1();
            this.$router.go(-1);    // 返回主页面           
        }else{
          // alert("修改失败!")
          this.open2();
        }
        })       
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();   // 重置的函数，毕竟清空下，免得一片红,elementui表单的方法
      },
      toHome(){
        this.$router.go(-1)     // 路由的方法跳转到登录页面
      },
      open1(){
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1500
        });
      },
      open2(){
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

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 40px 20px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>