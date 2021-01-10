<template>
  <div>
    <div class="modifyIssue">
    <el-row>
        <el-col :span="1"><div class="grid-content bg-purple logo">
        <el-image
        style="width: 38px; height: 38px"
        :src="url"></el-image></div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple title">GBA Issue管理系统</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light pfont">
                  {{"您好，"+this.loginName}}
                  <el-button @click="toHomePage()" size="small" round style="width:80px;height:28px;">返回</el-button>
              </div></el-col>
        </el-row>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon >
        <!-- status-icon是小勾 和 叉的显示 -->
        <div class="issueT">
                <el-form-item label="Issue的题目" label-width="200px" class="IssueTitle" prop="iTitle">
                  <el-input
                    v-model="form.iTitle"
                    :placeholder=this.rowInfo.iTitle
                    class="content"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
        </div>
        
        <div class="title1">
          <h4>基本信息</h4>
        </div>
        <div class="message">
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="grid-content bg-purple">Issue No.</div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple" style="margin-left: 19px">
                创建时间
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple" style="margin-left: 40px">
                Issue类型
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple" style="margin-left: 61px">
                Issue等级
              </div></el-col
            >
          </el-row>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-form-item label="" class="IssueMessage" >
                  <!-- issueId 的 -->
                  <el-input
                    v-model="form.issueId"
                    :placeholder=this.rowInfo.issueId
                    class="content"
                    :disabled="true"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="" class="IssueMessage" prop="createDate">
                <!-- 创建时间 -->
                  <el-input
                    v-model="form.createDate"
                    value-format=“yyyy-MM-dd”
                    format=“yyyy-MM-dd”        
                    :placeholder=this.rowInfo.createDate
                    class="content"
                    :disabled="true"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-form-item label="" class="IssueMessage" prop="iType">
                <!-- 类型 -->
                  <el-input
                    v-model="form.iType"
                    :placeholder=this.rowInfo.iType
                    class="content"
                    :disabled="true"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="" class="IssueMessage"  prop="ilevel">
                <!-- 等级 -->
                  <el-input v-model="form.ilevel" :placeholder=this.rowInfo.ilevel :disabled="true" >
                  </el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
        </div>

        <div class="message">
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="grid-content bg-purple">影响版本</div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple" style="margin-left: 19px">
                计划修改时间
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple" style="margin-left: 40px">
                实际完成时间
              </div></el-col
            >
            <el-col :span="6"
              ><div
                class="grid-content bg-purple"
                style="margin-left: 61px"
              ></div
            ></el-col>
          </el-row>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-form-item label="" class="IssueMessage" prop="aVersion">
                <!-- 版本-->
                  <el-input
                    v-model="form.aVersion"
                    :placeholder=this.rowInfo.aVersion
                    class="content"
                    :disabled="true"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="" class="IssueMessage" prop="planDate">
                <!-- 计划修改时间 -->
                  <el-date-picker
                    type="date"
                    :placeholder=this.rowInfo.planDate
                    v-model="form.planDate"
                    class="IssueMessage"
                    style="width: 220px" 
                    :disabled="true"
                    :picker-options="pickerOptions"    
                  >
                  </el-date-picker>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-form-item label="" class="IssueMessage">
                <!-- 实际完成时间 -->
                  <el-input
                    v-model="form.finalDate"
                    :placeholder=this.rowInfo.finalDate
                    class="content"
                    :disabled="true"
                    
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light"></div
            ></el-col>
          </el-row>
        </div>
        <div>
          <h4>重现步骤</h4>
        </div>
          <el-form-item label="" class="step" prop="reSteps">
            <el-input
              v-model="form.reSteps"
              :placeholder=this.rowInfo.reSteps
              class="content"
              :disabled="true"
              type="textarea"
            ></el-input>
          </el-form-item>

        <div>
          <h4>指派修改人</h4>
        </div>
            <el-form-item label="" class="IssueMessage"  prop="alterId">
                <!-- 等级 -->
                  <el-input v-model="form.alterId" :placeholder=this.rowInfo.alterId :disabled="true">
                  </el-input>
          </el-form-item>
      </el-form>    
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon v-if="hideButton()">
        <h4>解决方案</h4>
            <el-form-item label="" prop="solution">
                <el-input v-model="form.solution" class="form" placeholder="内容" type="textarea"></el-input>
            </el-form-item>
            <div class="submit">
                <el-form-item>
                    <el-button round @click="onSubmit('form')" style="width: 173px;">提交验证</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModifyIssue",
  // beforeCreate() {
  //   document
  //     .querySelector("body")
  //     .setAttribute("style", "background-color:#ffffff;");
  // },
  // beforeDestroy() {
  //   document.querySelector("body").removeAttribute("style");
  // },
  data() {
     var validaSolution = (rule, value, callback) => {
        if (!value ) {
         return callback(new Error('请输入解决方案'));
        } 
        else {
          callback();
        }
      };
    return {
      loginName:window.sessionStorage.getItem("loginName"),//提取出session中的loginName
      rowInfo:JSON.parse(window.sessionStorage.getItem("row")),//接收HomePage传来的row对象并解封装
      list: [],
      form: {
          solution: '',     // 解决方案
          iTitle: '',       // 题目
          issueId: "",          // no
          createDate: "",        // 创建时间
          iType: "",        // 类型
          ilevel: "",       // 等级
          aVersion: "",     // 版本
          planDate: "",         // 计划修改时间
          finalDate: "",        // 实际完成时间
          reSteps: "",       // 重现步骤
          alterId: ""     // 指派修改人
        },
      pickerOptions:{   // 当前时间之前的不能选择
          disabledDate(time){
            return time.getTime()<Date.now()-8.64e7;
          }
        },
     
      rules: {
        // rules 是elementui 中表单组件的，和prop一起对应
        solution:[
          {required: true,message: "不能为空", trigger: 'change' }, 
          { validator: validaSolution, trigger: 'blur', },
          // { max: 80, message: "长度不能超过80位" },
        ],
      },
      url: '/image/logo1.png'
    };
  },
  created() {
    // axios({
    //   url: "/data/data.json",
    //   method: "get",
    //   data:{}
    // })
    //   .then((data) => {
    //     this.list = data.data;
    //   })
    //   .catch((err) => {
    //     console.log("error...", err);
    //   });
    // console.log(this.rowInfo);
  },
  mounted(){

  },
  methods:{
      onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
             //如果通过验证 to do...  
             // 这里需要传ID和解决方案给post后端
             let form=this.form;
            axios.post('http://192.168.0.70:9090//waitVerifyIssue',{
              issueId:this.rowInfo.issueId,   // issue的id
              solution:form.solution, // 解决方案
            }).then(ret=>{
              console.log(form.solution);
              console.log(this.rowInfo.issueId);
              // this.flag="1";
              this.flag=ret.data;
              if(this.flag=="1"){
                // alert("修改成功！");
                this.open1();
                this.$router.push("/homepage");
              }else{
                this.open2();
                // alert("修改失败！");
              }
            })
        } else {
          // alert('error submit!!');
          this.open3();
          return false;
        }
      });
      },
    toModifyIssue(){
        this.$router.push("/homepage/modifyIssue");
    },
    toHomePage(){
        this.$router.push("/homepage");
    },
    hideButton(){
      if (this.rowInfo.status==="待解决"&&this.rowInfo.alterId==this.loginName) {
        // 状态为待解决，并且登录用户为修改人，才有权修改
        return true
      }
      else{
        return false
      }
      // this.rowInfo.status
    },
    open1() {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1500
        });
      },
      open2() {
        this.$message.error('修改失败');
      },
      open3() {
        this.$message.error('提交失败');
      }
  },
  components: {
  },
};
</script>

<style scoped>
.modifyIssue{
  margin: 10px;
}
.logo{
      margin-top: 6px;
      margin-left: 10px;
    }
    .title {
        font-size: 1.5em;
        font-weight: bold;
        width: 300px;
        margin-top: 10px;
        margin-left: 10px;
    }
    .pfont {
        color: #9b07fd;
        margin-bottom: 40px;
        width: 500px;
        right: 0;
        margin-left: 449px;
        margin-top: 10px;
    }
.issueT {
  font-size: 23px;
  margin-top: 20px;
}
.issueT /deep/ .el-form-item__label{
  font-size: 23px;
  width: 200px;
  margin-left: 300px;
  font-weight: bold;
}
.IssueTitle /deep/ .el-input {
  width: 494px;
  height: 35px;
}

.message {
  margin-left: 81px;
  margin-top: 20px;
  font-size: 9px;
}
.title1 {
  margin-right: 20px;
}
.step /deep/ .el-input {
  width: 1230px;
  height: 126px;
  text-align: left;
}
.IssueMessage /deep/ .el-input {
  width: 220px;
  text-align: left;
}

.content /deep/ .el-input{
    height: 126px;
}
.submit{
    text-align: center;
}
.modifyIssue h4{
    margin-left: 80px;
}
.modifyIssue .form{
    width: 1163px;
    height: 170px;
}
.form /deep/ .el-textarea__inner{
    height: 170px;
    width: 1236px;
}
.submit{
    text-align: center;
}
.step /deep/ .el-textarea__inner{
    height: 126px;
    width: 1236px;
}
</style>