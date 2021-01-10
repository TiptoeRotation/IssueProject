<template>
    <div class="homepage">
        <!-- 标题 -->
        <el-row>
        <el-col :span="1"><div class="grid-content bg-purple logo">
        <el-image
        style="width: 38px; height: 38px"
        :src="url"></el-image></div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple title">GBA Issue管理系统</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light pfont">
                  <el-button size="mini" round @click="toNewIssue()">创建新Issue</el-button>
                  <el-button size="mini" round @click="exitLogin(),open3()">退出登录</el-button> {{"您好，"+this.login}}
                  <el-button size="mini" round @click="toUpdateInfo()">修改个人信息</el-button>
              </div></el-col>
        </el-row>
        
        <!-- 注册登录 -->
        
        
        <!-- Issue查询 -->
        <div class="Issueq">
            <div>
                <h4>Issue查询</h4>
                <hr>
            </div>
            <div class="fIssue">
                <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="Issue No" prop="issueId">
                    <el-input v-model="ruleForm.issueId"  style="width: 217px" maxlength="30" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="Issue 状态" prop="status">
                    <el-select v-model="ruleForm.status" style="width: 217px">
                      <el-option label="待解决" value="待解决"></el-option>
                      <el-option label="待验证" value="待验证"></el-option>
                      <el-option label="已关闭" value="已关闭"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <el-col :span="11">
                      <el-form-item prop="createStartTime">
                        <el-date-picker type="date" v-model="ruleForm.createStartTime" style="width: 100%;" value-format="yyyy-MM-dd" ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">至</el-col>
                    <el-col :span="11">
                      <el-form-item prop="createEndTime">
                        <el-date-picker type="date" v-model="ruleForm.createEndTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="创建人" prop="assignId">
                    <el-input v-model="ruleForm.assignId"  style="width: 217px" maxlength="30" show-word-limit></el-input>
                  </el-form-item>
                    <el-form-item label="修改人" prop="alterId">
                      <el-input v-model="loginName"  style="width: 217px" maxlength="30" show-word-limit></el-input>
                    <!--<label style="width: 217px" :value="loginName"></label>-->
                  </el-form-item>
                  <el-form-item label="修改时间">
                    <el-col :span="11">
                      <el-form-item prop="planStartTime">
                        <el-date-picker type="date" v-model="ruleForm.planStartTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">至</el-col>
                    <el-col :span="11">
                      <el-form-item prop="planEndTime">
                        <el-date-picker type="date" v-model="ruleForm.planEndTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <div class="querybtn">
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm'),open1()">查询</el-button>
                      <el-button @click="resetForm('ruleForm'),open2()">清空</el-button>
                    </el-form-item>
                  </div>
                  
                </el-form>
            </div>
            <!-- Issue列表 -->
            <div>
                <div>
                    <h4>Issue列表</h4>
                    <hr>
                </div>
                <div class="table">
                      <el-table
                        ref="multipleTable"
                        :data="reIssueList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        stripe
                        height="380"
                        :default-sort="{prop: 'issueId', order: 'descending'}"
                        @selection-change="handleSelectionChange">
                        
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        type="index"
                        prop="ID"
                        label="序号"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="issueId"
                        label="Issue ID"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="iTitle"
                        label="Issue 标题"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="assignId"
                        label="创建人"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="createDate"
                        label="创建时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="alterId"
                        label="修改人"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="status"
                        label="Issue状态"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="planDate"
                        label="计划完成时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="finalDate"
                        label="实际完成时间"
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
                            @click="handleEdit(scope.$index, scope.row),toIssueDetails(scope.row)">详情</el-button>
                         <el-button
                            size="mini"
                            round
                            v-if="hideButton(scope.row)"
                            @click="handleDelete(scope.$index, scope.row),toModifyIssue(scope.row)">修改</el-button>
        
                        
                         
                        </template>
                         <!-- v-if="ruleForm.status==='待解决'" -->
                        </el-table-column>
                    </el-table>
                    <!-- Issue列表的 分页-->
                    <el-pagination 
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"              
                      :current-page="currentPage"
                      :page-sizes="[20]"
                      :page-size="20"
                      layout="total, sizes, prev, pager, next, jumper"
                       background
                      :total="this.total">
                    <!-- current-change当前页面改变事件 page-size 每页条数 total-->
                    </el-pagination>
                    
                </div>
            </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomePage",
  // beforeCreate () {
  //     document.querySelector('body').setAttribute('style', 'background-color:#e4c9e4;')
  //   },
  //   beforeDestroy () {
  //     document.querySelector('body').removeAttribute('style')
  //   },
  data() {
    return {
      total:0,
      reIssueList:[],
      loginName:window.sessionStorage.getItem("loginName"),
      login:window.sessionStorage.getItem("loginName"),
      list: "",
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        options: [{
          value: '选项1',
          label: '待解决'
        }, {
          value: '选项2',
          label: '待验证'
        }, {
          value: '选项3',
          label: '已关闭'
        }],
        value: '',
        multipleSelection: [],
        currentPage: 1,  // 当前页面
        
        ruleForm: {
          issueId: '',                // Issue NO
          status: '',                 // Issue状态
          assignId: '',               // 创建人
          alterId: '',                // 修改人
          createStartTime: '',        // 创建时间 起
          createEndTime: '',          // 创建时间 尾
          planStartTime: '',          // 修改时间 起
          planEndTime: '',            // 修改时间 起
          pageNum:'',                 //第几页
          pageSize:'',                //每页多少条数据
        },
        rules: {
          // issueId: [
          //   // { required: true, message: '请输入活动名称', trigger: 'blur' },
          //   { max: 30, message: '输入长度最多为30个字符', trigger: 'change' }
          // ],
          // assignId: [
          //   // { required: true, message: '请输入活动名称', trigger: 'blur' },
          //   { max: 30, message: '输入长度最多为30个字符', trigger: 'change' }
          // ],
          // // alterId: [
          // //   // { required: true, message: '请选择活动区域', trigger: 'change' }
          // //   { max: 30, message: '输入长度最多为30个字符', trigger: 'change' }
          // // ],
          // loginName: [
          //   // { required: true, message: '请选择活动区域', trigger: 'change' }
          //   { max: 30, message: '输入长度最多为30个字符', trigger: 'change' }
          // ],
        },
        url: '/image/logo1.png'
    };
  },
  created() {   
      axios.post('http://192.168.0.70:9090/QueryIssue',{
        //ajax post请求后台数据
        //提交数据：
            pageNum:this.ruleForm.pageNum,                  //页码
            pageSize:this.ruleForm.pageSize,                //每页的条数
            assignId:"",                                    //创建人ID
            alterId:this.loginName,                         //修改人ID
            status:"",                                      //issue状态
            createStartTime:"",                             //查询条件-创建时间-start
            createEndTime:"",                               //查询条件-创建时间-end
            planStartTime:"",                               //查询条件-计划完成时间-start
            planEndTime:""                                  //查询条件-计划完成时间-end
        }).then(ret=>{                                      //接受后台返回数据
            this.reIssueList=ret.data;                      //载入reIssueList对象中
            // console.log(ret.data.length);                //验证是否收到
            if(ret.data.length!=0){
              //若返回数据中列表不为空                        
              this.total=ret.data[0].total                  //接收total   根据模糊查询查得数据总条数
            }
            // this.reIssueList.forEach(element => {        //验证后台返回数据
              // console.log(this.reIssueList[0].total);
            // });
        });
  },
  mounted(){

  },
  methods:{
    // getTotal(){
    //     if(this.reIssueList===null){
    //           this.reIssueList[0].total = 20;
    //         }
    //     return this.reIssueList[0].total;
    // },

    //？？？
     toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
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

      onSubmit() {
        console.log('submit!');
      },
      // getData(){
      //        // 这里使用axios，使用时请提前引入
      //        axios.post(url,{
      //             orgCode:1
      //        },{emulateJSON: true},
      //        {
      //          headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
      //         }
      //         ).then(reponse=>{
      //              console.log(reponse)
      //              // 将数据赋值给tableData
      //              this.tableData=data.data.body
      //              // 将数据的长度赋值给totalCount
      //              this.totalCount=data.data.body.length
      //         }) 
      //    },


        // 分页实现
        // 每页显示的条数
        handleSizeChange(val) {
            // 改变每页显示的条数 
            // 点击每页显示的条数时，显示第一页
            // this.getData(val,1)
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.PageSize=val             //每页的条数
            this.currentPage=1            //默认显示第一页
        },

        // 显示第几页
        handleCurrentChange(val) {
            // 改变默认的页数
            // 切换页码时，要获取每页显示的条数
            // this.getData()
            // 重复调用这个查询函数来重复刷新
            this.ruleForm.pageNum=val      //页数
            this.submitForm('ruleForm');   //表单输入验证       
        },

        //点击查询按钮触发事件，模糊查询
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          // 表单验证通过
          //ajax post请求提交数据
          axios.post('http://192.168.0.70:9090/QueryIssue',{
            issueId:this.ruleForm.issueId,                    //查询条件-问题ID
            pageNum:this.ruleForm.pageNum,                    //页数
            pageSize:this.ruleForm.pageSize,                  //每页的条数
            assignId:this.ruleForm.assignId,                  //创建人
            alterId:this.loginName,                           //当前登录的账号
            status:this.ruleForm.status,                      //issue状态
            createStartTime:this.ruleForm.createStartTime ,   //查询条件-创建事件-start
            createEndTime:this.ruleForm.createEndTime,        //查询条件-创建事件-end
            planStartTime:this.ruleForm.planStartTime,        //查询条件-计划完成时间-start
            planEndTime:this.ruleForm.planEndTime             //查询条件-计划完成事件-end
        }).then(ret=>{                          //ret接收后台返回数据
            this.reIssueList=ret.data;          //载入reIssueList对象
            //console.log(ret.data[0].total);   //验证后台返回总条数是否正确
            //判断返回后台数据是否为空
            if(ret.data.length!=0){
              //不为0则把列表显示总条数刷新为后台返回值         
              this.total=ret.data[0].total
            }
        //     this.reIssueList.forEach(element => { //控制台查看后台返回数据
        //       console.log(element);
        // });
        });
          } else {
            //表单验证不通过
            console.log('error submit!!');
            return false;
          }
        });

      },
      //？？？
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //退出登录按钮
      exitLogin(){
        window.sessionStorage.clear();    //清空缓存
        this.$router.push('/login');
      },
      //修改个人信息按钮
      toUpdateInfo(){
        this.$router.push('/HomePage/UpdateInfo');
      },
      //创建新issue按钮
      toNewIssue(){
        this.$router.push('/HomePage/NewIssue');
      },
      //
      toIssueReport(){
        this.$router.push('/HomePage/IssueReport');
      },
      toAccountManagement(){
        this.$router.push('/HomePage/AccountManagement');
      },
      toIssueDetails(row){
         //创建缓存session--storage
        var storage = window.sessionStorage;  
        //将列表中选中行对象row封装
        var checkedIdStr = JSON.stringify(row);
        //将封装后的checkedIdStr装入row中
        storage.setItem("row", checkedIdStr);
        //跳转之修改Issue页面
        this.$router.push('/HomePage/IssueDetails');
      },
      toModifyIssue(row){
        //创建缓存session--storage
        var storage = window.sessionStorage;  
        //将列表中选中行对象row封装
        var checkedIdStr = JSON.stringify(row);
        //将封装后的checkedIdStr装入row中
        storage.setItem("row", checkedIdStr);
        //跳转之修改Issue页面
        this.$router.push("/HomePage/ModifyIssue");
      },
      hideButton(row){
        console.log(row.status);
        if(row.status=="已关闭"){
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
  },
  components: {
  },
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
        margin-bottom: 64px;
        width: 500px;
        right: 0;
        margin-left: 200px;
        margin-top: 10px;
    }
    .newIssue{
        margin-left: 240px;
        margin-top: 33px;
    }
    .el-button{
        border: 1px solid #569ed7;
    }
    .fIssue{
        margin-bottom: 30px;
        margin-left: 50px;
        margin-top: 30px;
    }
    #person1{
        padding-left: 15px;
    }
    #person2{
        padding-left: 31px;
    }
    .querybtn{
        margin-top: 30px;
        text-align: center;
    }
    .querybtn button{
        width: 95px;
        height: 34px;
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
    .homepage{
      margin: 10px;
    }
</style>