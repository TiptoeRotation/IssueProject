<template>
  <div>
    <div class="AccountManagement">
    <el-row>
        <el-col :span="1"><div class="grid-content bg-purple logo">
        <el-image
        style="width: 38px; height: 38px"
        :src="url"></el-image></div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple title">GBA Issue管理系统</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light pfont">
                  {{"超级管理员您好，"+this.loginname}}
                  <el-button @click="exitLogin(),open3()" size="small" round style="width:80px;height:28px;">退出登录</el-button>
              </div></el-col>
        </el-row>
        <div class="title1">
        <h4>查询条件</h4>
        <hr>
        </div>
        <div class="form1">
            <el-form :model="numberValidateForm" :inline="true" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                label="用户ID"
                prop="username"
                :rules="[
                { max:30,message:'数值不能超过30',trigger: 'change'},
                ]">
                <el-input type="age" v-model="numberValidateForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                label="用户姓名"
                prop="name"
                :rules="[
                {max:30,message:'数值不能超过30',trigger: 'change'}
                ]"
                class="name">
                <el-input type="age" v-model="numberValidateForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <div class="tbutton">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('numberValidateForm'),open1()">查询</el-button>
                    <el-button @click="resetForm('numberValidateForm'),open2()">清空</el-button>
                </el-form-item>
            </div>
            </el-form>
        </div>
        <div class="title1">
        <h4>统计报表</h4>
        <hr>
        </div>
        <div class="table">
            <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            height="380"
            :default-sort="{prop: 'username', order: 'ascending'}"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            type="index"
            label="序号"
            width="120">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户ID"
            width="120">
            </el-table-column>
            <el-table-column
            prop="name"
            label="用户姓名"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="signInDate"
            label="注册时间"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="identity"
            label="用户身份"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="uStatus"
            label="账户状态"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="Operation"
                label="操作"
                show-overflow-tooltip
                id="Operation"
                width="150">
                <template slot-scope="scope">
                    
                    <el-button
                    size="mini"
                    round
                    @click="handleEdit(scope.$index, scope.row),open5()" v-if="hideButton2(scope.row)" >注销</el-button>
                    
                     <el-button
                    size="mini"
                    round
                    @click="handleManage(scope.$index, scope.row),open4()"  v-if="hideButton(scope.row)" >经理</el-button> 
                                   
                </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20,]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                background
                :total="this.total">
            </el-pagination>
        </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  routes:[{name:'HomePage',path:'/HomePage'}],
  name: "AccountManagement",
  data() {
    return {
      userList:[],
      loginname:window.sessionStorage.getItem("loginName"),
      list: [],
      numberValidateForm: {
          pageNum:"", // 页码，当前的
          username:"",
          name:"",
      },
      tableData:[],
      multipleSelection: [],
      currentPage: 1,
      total:20,   // 总条数
      url: '/image/logo1.png'
    };
  },
  created() {
    axios.post('http://192.168.0.70:9090/getUserAdmin',{
            username:"",
            name:""
        })
        .then(ret=>{
           this.tableData=ret.data;

           if(ret.data.length!=0){
              this.total=ret.data[0].total
            }
        })
        .catch(function (error) {
            console.log(error);
          });

  },
  mounted(){

  },
  methods:{
    exitLogin(){
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      submitForm(formname) {
        this.$refs[formname].validate((valid) => {
          if (valid) {
          axios.post('http://192.168.0.70:9090/getUserAdmin',{
            username:this.numberValidateForm.username,
            name:this.numberValidateForm.name,
            pageNum:this.numberValidateForm.pageNum
        }).then(ret=>{
           this.tableData=ret.data;
           if(ret.data.length!=0){
              this.total=ret.data[0].total
            }
          //  this.tableData.forEach(element=>{
          //    console.log(element);
          //  })
        }).catch(function (error) {
            console.log(error);
          });

          } else {
            console.log('错误查询!!');
            return false;
          }
        });
      },
      resetForm(formname) {
        this.$refs[formname].resetFields();
      },
      // 分页
         // 每页显示的条数
        handleSizeChange(val) {
            // 改变每页显示的条数 
            this.PageSize=val
            // 点击每页显示的条数时，显示第一页
            this.getData(val,1)
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currentPage=1  
        },
          // 显示第几页
        handleCurrentChange(val) {
            // 改变默认的页数
            this.numberValidateForm.pageNum=val
            // 切换页码时，要获取每页显示的条数
            // this.getData()

            this.submitForm('numberValidateForm');

        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        // console.log(row);
        // var status=row.uStatus;
        // // alert(status);
        // if(status==="注销"){
        //   status="激活"
        // }else{
        //   status="注销"
        // }
        console.log(index);
        axios.post('http://192.168.0.70:9090/updateUserStatus',{
            uStatus:"注销",
            username:row.username
        })
        .then( 
           this.submitForm('numberValidateForm')
      )
        .catch(function (error) {
            console.log(error);
          });
      },
      handleManage(index, row) {
        // var identity=row.identity;
        // // alert(identity);
        // if(identity==="普通用户"){
        //   identity="经理"
        // }else{
        //   identity="普通用户"
        // }
        console.log(index);
        axios.post('http://192.168.0.70:9090/updateUserIdentity',{
            identity:"经理",
            username:row.username
        })
        .then( 
           this.submitForm('numberValidateForm')
      )
        .catch(function (error) {
            console.log(error);
          });
      },
      hideButton(row){
        console.log(row.identity);
        if(row.identity=="经理"||row.identity=="Admin"){
          return false;
        }else{
          return true;
        }
      },
      hideButton2(row){
        console.log(row.uStatus);
        if(row.uStatus=="注销" ||row.identity=="Admin"){
          return false;
        }else{
          return true;
        }
      },
      open1() {
        this.$message({
          message: '查询成功',
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
      open3(){
        this.$message({
          message: '退出登录成功',
          duration: 1500
        });
      },
      open4() {
        this.$message({
          message: '提权成功',
          type: 'success',
          duration: 1500
        });
      },
      open5(){
        this.$message({
          message: '注销成功',
          duration: 1500
        });
      },
  },
  components: {
  },
};
</script>

<style scoped>
.AccountManagement{
  margin:10px;
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
        margin-left: 346px;
        margin-top: 10px;
    }
    .title1{
        margin-left: 15px;
        margin-right: 15px;
    }
    .form1{
        margin-top: 30px;
        margin-left: 200px;
    }
    .name{
        margin-left: 100px;
    }
    .tbutton{
        text-align: center;
    }
    .tbutton /deep/ .el-button{
        width: 100px;
    }
    .el-table /deep/ th{
      background-color: #94b9cd;
      color:white;
      text-align: center;
      height: 61px;
    }
    .el-table /deep/ td{
        text-align: center;
    }
    .table{
        padding: 15px;
    }
    .el-pagination /deep/{
      text-align: center;
      margin-top: 15px;
    }
    .AccountManagement{
      margin: 10px;
    }
</style>