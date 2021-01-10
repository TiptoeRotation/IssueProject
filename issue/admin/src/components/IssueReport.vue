<template>
  <div class="issuereport">
    <!-- 标题 -->
        <el-row>
        <el-col :span="1"><div class="grid-content bg-purple logo">
        <el-image
        style="width: 38px; height: 38px"
        :src="url"></el-image></div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple title">GBA Issue管理系统</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light pfont">
                  {{"经理您好，"+this.loginName}}
                  <el-button @click="exitLogin(),open3()" size="small" round style="width:80px;height:28px;">退出登录</el-button>
              </div></el-col>
        </el-row>
    <div class="IssueReport">
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
                {max:30,message:'长度不能超过30位'}
                ]">
                <el-input type="age" v-model="numberValidateForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                label="用户姓名"
                prop="name"
                :rules="[
                {max:30,message:'长度不能超过30位'}
                ]"
                class="userName">
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
        <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple" style="font-weight: bold;">统计报表</div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light oexcel"><el-button type="success" @click="exportExcel()">导出EXCEL</el-button></div></el-col>
                </el-row>
        <hr>
        </div>
        <!--  :default-sort="{prop: 'xxxx', order: 'ascending'} 顺序排序 -->
        <div class="table">
          
            <el-table id="battery" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" stripe height="380"
             @selection-change="handleSelectionChange" @row-click="turnTo"
             :default-sort="{prop: 'username', order: 'ascending'}">
            
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="序号" width="120" type="index"></el-table-column>
              <el-table-column prop="username" label="用户ID" width="120"></el-table-column>
              <el-table-column prop="name" label="用户姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="createINum" label="创建Issue数"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="receiveINum" label="收到Issue数" show-overflow-tooltip></el-table-column>
              <el-table-column prop="alterINum" label="修改Issue数" show-overflow-tooltip></el-table-column>
              <el-table-column prop="iperCom" label="完成率" show-overflow-tooltip></el-table-column> 
            
            </el-table>
            
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20,]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                background
                :total="this.total" >
            </el-pagination>
        </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { format } from 'date-fns';
export default {
  name: "IssueReport",
  data() {
    return {
      loginName:window.sessionStorage.getItem("loginName"),
      list: [],
      numberValidateForm: {
          pageNum:"", // 页码，当前的
          username:"",
          name:"",
          
    },
    tableData: [],
    multipleSelection: [],
    currentPage: 1,       //  默认为1的页码
    total:20,   // 总条数,默认20
    url: '/image/logo1.png'
    };
  },
  created() {
    axios.post('http://192.168.0.70:9090/getUserReport',{
            username:"",
            name:""
        }).then(ret=>{
            this.tableData=ret.data;
            if(ret.data.length!=0){
              this.total=ret.data[0].total
            }
            // console.log(this.tableData[0].total);
        });
    
  },
  mounted(){

  },
  methods:{
    exportExcel() {
      let execelDate = format(new Date(), 'yyyy-mm-dd')
      let excelName='所有用户'+execelDate+'.xlsx'
      var wb = XLSX.utils.table_to_book(document.querySelector('#battery'))
 
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }),excelName)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
 
      return wbout
    },
    turnTo(val){
        //创建缓存session--storage
        var storage = window.sessionStorage;  
        //将列表中选中行对象row封装
        var checkedIdStr = JSON.stringify(val);
        //将封装后的checkedIdStr装入row中
        storage.setItem("iRRow", checkedIdStr);
        this.$router.push("/homepage/UserPoReport");
    },

    exitLogin(){
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            axios.post('http://192.168.0.70:9090/getUserReport',{
              pageNum:this.numberValidateForm.pageNum,
              username:this.numberValidateForm.username,
              name:this.numberValidateForm.name
            }).then(ret=>{
              this.tableData=ret.data;
              if(ret.data.length!=0){
              this.total=ret.data[0].total
            }
            });

            // alert('查询成功!');
          } else {
            console.log('错误查询!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
            
            // 重复调用这个查询函数来重复刷新
            this.submitForm('numberValidateForm');
        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
  },
  components: {
  },
};
</script>

<style scoped>
.issuereport{
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
        margin-left: 390px;
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
    .userName{
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
    .oexcel /deep/ .el-button{
      margin-left: 531px;
      background-color: #569ed7;
    }
</style>