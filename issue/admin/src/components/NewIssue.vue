<template>
  <div>
    <el-row>
        <el-col :span="1"><div class="grid-content bg-purple logo">
        <el-image
        style="width: 38px; height: 38px"
        :src="url"></el-image></div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple title">GBA Issue管理系统</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light pfont">
                  {{"您好，"+this.loginName}}
                  <el-button @click="returnHome()" size="small" round style="width:80px;height:28px;">返回</el-button>
              </div></el-col>
        </el-row>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon >
        <!-- status-icon是小勾 和 叉的显示 -->
        <!-- <h4 >修改页</h4> -->
        <div class="issueT">
                <el-form-item label="Issue的题目" label-width="200px" class="IssueTitle" prop="iTitle">
                  <el-input
                    v-model="form.iTitle"
                    placeholder="题目"
                    class="content"
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
                    placeholder="系统自动生成"
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
                    placeholder="系统自动生成"
                    class="content"
                    :disabled="true"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="" class="IssueMessage"  prop="iType">
                <!-- 类型 -->
                  <el-select v-model="form.iType" placeholder="类型" >
                    <el-option label="字符型" value="字符型"></el-option>
                    <el-option label="功能型" value="功能型"></el-option>
                    <el-option label="界面型" value="界面型"></el-option>
                    <el-option label="其他类型" value="其他类型"></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="" class="IssueMessage"  prop="ilevel">
                <!-- 等级 -->
                  <el-select v-model="form.ilevel" placeholder="等级" >
                    <el-option label="最高" value="最高"></el-option>
                    <el-option label="较高" value="较高"></el-option>
                    <el-option label="一般" value="一般"></el-option>
                    <el-option label="低" value="低"></el-option>
                  </el-select>
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
                    placeholder="影响版本"
                    class="content"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="" class="IssueMessage" prop="planDate">
                <!-- 计划修改时间 -->
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    v-model="form.planDate"
                    class="IssueMessage"
                    style="width: 220px" 
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
                    placeholder="系统自动生成"
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
        <div style="margin-left: 22px">
          <h4>重现步骤</h4>
        </div>
          <el-form-item label="" class="step" prop="reSteps">
            <el-input
              v-model="form.reSteps"
              placeholder="请输入重现步骤"
              class="content"
              type="textarea"
            ></el-input>
          </el-form-item>

        <div style="margin-left: 22px">
          <h4>指派修改人</h4>
        </div>
          <el-form-item label="" class="IssueMessage" prop="alterId">
                <!-- 等级 -->
                  <el-select id="modifyId" v-model="form.alterId" placeholder="指派人" >
                    <ul v-for="user in reUserName" :key="user.id">
                        <el-option :label="user.username" :value="user.username"></el-option>
                    </ul>
                  </el-select>
          </el-form-item>
        <div class="submit">
        <el-form-item>
          <el-button @click="onSubmit('form')"  style="width: 173px;">提交</el-button>
        </el-form-item>
        </div>
      </el-form>
    </div>

</template>

<script>
import axios from "axios";
export default {
  name: "NewIssue",
  data() {
    return {
      loginName:window.sessionStorage.getItem("loginName"),
      list: [],
      reUserName:[],     //接收后端返回Users表的全部UserName
      flag:"",           //接收成功创建issue的返回值
      form: {              //建立form对象装载用户输入数据
        iTitle: "",        // 题目
        issueId: "",       // Issueno
        createDate: "",    // 创建时间
        iType: "",         // Issue类型
        ilevel: "",        // Issue等级
        aVersion: "",      // 版本
        planDate: "",      // 计划修改时间   date
        finalDate: "",     // 实际完成时间
        reSteps: "",       // 重现步骤
        alterId: "" ,      // 指派修改人
      },
      pickerOptions:{   // 当前时间之前的不能选择
          disabledDate(time){
            return time.getTime()<Date.now()-8.64e7;    // 8.64e7毫秒是一天
          }
        },
     
      rules: {
        // rules 是elementui 中表单组件的，和prop一起对应
        iTitle: [
            { required: true, message: '不能为空', trigger: 'blur' },
          { max: 80, message: "长度不能超过80位" },
        ],
        iType: [
          { max: 30, message: "长度不能超过30位" },
          {required: true,message: "不能为空"  , trigger: 'blur'},
        ],
        ilevel: [
          {required: true,message: "不能为空", trigger: 'blur' },  // 输入框才有required
          // { validator: validateilevel, trigger: 'blur', },
        ],
        aVersion: [
          // {required: true,message: "不能为空" },   //可以为空
          { max: 30, message: "长度不能超过30位" },
        ],     
        planDate: [
          {required: true,message: "不能为空" },   //可以为空         
        ], 
        reSteps: [
          // {required: true,message: "不能为空" },  //可以为空
          { max: 2000, message: "长度不能超过2000位" },
        ],
        alterId: [
          {required: true,message: "不能为空" },
          { max: 30, message: "长度不能超过30位" },
        ],
      },
      url: '/image/logo1.png'
    };
  },
  created() {   // 页面加载时候执行
    axios({           //在网页加载阶段从后端获取user表中所有的username
      url: "http://192.168.0.70:9090//getAllUsernames",
      method: "get",
      data: {},
    })
      .then((data) => {
        this.reUserName=data.data;  
        //测试能否获得user表中username
        // this.reUserName.forEach(element => { 
        //   console.log(element.element);
        // });
      })
      .catch((err) => {
        console.log("error...", err);
      });
  },
  mounted() {},
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
        //     // 如果通过验证 to do...  
        let form=this.form;  // 这样form才是对象  this.form是绑定传数据的form，let form是自定义的局部对象
        // var date = new Date();
        // var seperator1 = "-";     //  改日期格式
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1;
        // var strDate = date.getDate();
        // if (month >= 1 && month <= 9) {      
        //     month = "0" + month;
        // }
        // if (strDate >= 0 && strDate <= 9) {    //  效果是2020-09-05
        //     strDate = "0" + strDate;
        // }
        // var nowDate =  year + seperator1 + month + seperator1 + strDate;
        // form.createDate = nowDate;
        //在此调用接口，提交数据到后端
        // var a=document.getElementById("modifyId").value;
        axios.post('http://192.168.0.70:9090/CreateIssue',{
          iTitle:form.iTitle,        // 题目
          //issueId: form.issueId,       // Issueno
          createDate: form.createDate,    // 创建时间
          iType: form.iType,         // Issue类型
          ilevel: form.ilevel,        // Issue等级
          aVersion: form.aVersion,      // 版本
          planDate: form.planDate,      // 计划修改时间
          //finalDate: form.finalDate,     // 实际完成时间
          reSteps: form.reSteps,       // 重现步骤
          alterId: form.alterId,      // 指派修改人
          assignId: this.loginName,        //创建人
          
        }).then(ret=>{        
          // form=ret.data;
          // this.open1();
          // Issue创建成功
          if (ret.data==1) {
            this.open1();
            this.$router.push("/homepage");
          }

          // 创建成功，发送邮件失败
          else if (ret.data==201) {
            this.open2();
            this.$router.push("/homepage");
          }
          // 创建成功，发送邮件成功
          else if (ret.data==202) {
            this.open3();
            this.$router.push("/homepage");
          }
          // 创建失败
          else{
            this.open4();
          }
          
            
        })        

        } else {
          // console.log('error submit!!')
          this.open4();
          return false
        }
      });
      
      
        //let form=this.form;
      /* console.log(form.iTitle);
        console.log(form.iType);
        console.log(form.ilevel);
        console.log(form.aVersion);
        console.log(form.planDate);
        console.log(form.reSteps);
        console.log(form.alterId);*/
        
    },

    returnHome(){
      this.$router.go(-1);
    },
    open1() {
        this.$message({
          message: '创建成功',
          type: 'success',
          duration: 1500
        });
      },
      open2(){
      this.$message({
        message: '创建成功，发送邮件失败',
        type: 'warning',
        duration: 1500,
      });
    },
    open3(){
      this.$message({
        message: '创建成功，发送邮件成功',
        type: 'success',
        duration: 1500
      });
    },
    open4() {
        this.$message({
          showClose: true,
          message: '创建失败',
          type: 'error',
        });
      },
    // open5() {
    //     this.$message({
    //       showClose: true,
    //       message: '创建失败',
    //       type: 'error',
    //     });
    //   },
  },
  components: {},
};
</script>

<style scoped>
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
  margin-left: 22px;
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

.step /deep/ .el-input__inner {
  height: 126px;
}
.content /deep/ .el-textarea__inner{
    height: 126px;
    width: 1247px;
}
.submit{
    text-align: center;
}
</style>