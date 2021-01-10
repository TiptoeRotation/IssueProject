<template>
    <div class="UserPoReport">
        <el-row>
        <el-col :span="1"><div class="grid-content bg-purple logo">
        <el-image
        style="width: 38px; height: 38px"
        :src="url"></el-image></div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple title">GBA Issue管理系统</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light pfont">
                  {{"您好，"+this.loginName}}
                  <el-button @click="toIssueReport()" size="small" round style="width:80px;height:28px;">返回</el-button>
              </div></el-col>
        </el-row>
        <!-- 标题 -->
        <div>
            <h3>{{this.iRRow.name+"的个人Issue列表"}}</h3> 
        </div>
        <!-- Issue查询 -->
        <div class="Issueq">
            <div>
                <h4>Issue查询</h4>
                <hr>
            </div>
            <div class="fIssue">
                <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="Issue No" prop="issueId">
                    <el-input v-model="ruleForm.issueId"  style="width: 217px"></el-input>
                  </el-form-item>
                  <el-form-item label="Issue 状态" prop="IssueState">
                    <el-select v-model="ruleForm.status" style="width: 217px">
                      <el-option label="待解决" value="待解决"></el-option>
                      <el-option label="待验证" value="待验证"></el-option>
                      <el-option label="已关闭" value="已关闭"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <el-col :span="11">
                      <el-form-item prop="createStartTime">
                        <el-date-picker type="date" v-model="ruleForm.createStartTime" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">至</el-col>
                    <el-col :span="11">
                      <el-form-item prop="createEndTime">
                        <el-date-picker type="date" v-model="ruleForm.createEndTime" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="创建人" prop="assignId">
                    <el-input v-model="iRRassignId"  style="width: 217px"></el-input>
                  </el-form-item>
                  <el-form-item label="修改人" prop="alterId">
                    <el-input v-model="iRRalterId"  style="width: 217px" ></el-input>
                    <!--<label style="width: 217px" :value="loginName"></label>-->
                  </el-form-item>
                  <el-form-item label="修改时间">
                    <el-col :span="11">
                      <el-form-item prop="planStartTime">
                        <el-date-picker type="date" v-model="ruleForm.planStartTime" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">至</el-col>
                    <el-col :span="11">
                      <el-form-item prop="planEndTime">
                        <el-date-picker type="date" v-model="ruleForm.planEndTime" style="width: 100%;"></el-date-picker>
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
                <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple" style="font-weight: bold;">Issue列表</div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light oexcel"><el-button type="success" @click="exportExcel()">导出EXCEL</el-button></div></el-col>
                </el-row>
                    <hr>
                    
                </div>
                <div class="table">
                      <el-table
                        id="battery"
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
                        prop="ID"
                        label="序号"
                        width="120"
                        type="index">
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
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- Issue列表的 分页-->
                    <el-pagination 
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[20,]"
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { format } from 'date-fns';
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
      iRRow:JSON.parse(window.sessionStorage.getItem("iRRow")),//接收HomePage传来的row对象并解封装
      iRRassignId:JSON.parse(window.sessionStorage.getItem("iRRow")).username,
      iRRalterId:JSON.parse(window.sessionStorage.getItem("iRRow")).username,
      loginName:window.sessionStorage.getItem("loginName"),
      reIssueList:[],
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
        total:20,   // 总条数
        ruleForm: {
          issueId: '',      // Issue NO
          status: '',       // Issue状态
          assignId: "",      // 创建人
          alterId: "",      // 修改人
          createStartTime: '',        // 创建时间 起
          createEndTime: '',        // 创建时间 尾
          planStartTime: '',        // 修改时间 起
          planEndTime: '',        // 修改时间 起
          pageNum:1,        //第几页
          pageSize:20,   //每页多少条数据
          
        },
        rules: {
          issueId: [
            // { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 30, message: '输入长度最多为30个字符', trigger: 'blur' }
          ],
          region: [
            // { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          assignId: [
            // { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 30, message: '输入长度最多为30个字符', trigger: 'blur' }
          ],
          alterId: [
            // { required: true, message: '请选择活动区域', trigger: 'change' }
            { max: 30, message: '输入长度最多为30个字符', trigger: 'blur' }
          ]
        },
        url: '/image/logo1.png'
    };
  },
  created() {
    console.log(this.iRRow);
    /*axios({           //在网页加载阶段从后端获取issue表中所有的issue
      url: "http://localhost:9090/QueryIssue",
      method: "post",
      data: {},
    })
      .then((data) => {
        this.reIssueList=data.data;
        //测试能否获得issue表中issue
        this.reIssueList.forEach(element => { 
          // console.log(element);
          this.tableData.push(element);
        });
        this.tableData.forEach(element=>{
          console.log(element);
        });
      })
      .catch((err) => {
        console.log("error...", err);
      });
    */

      axios.post('http://192.168.0.70:9090/QueryIssue',{
            pageNum:this.ruleForm.pageNum,
            pageSize:this.ruleForm.pageSize,
            assignId:"",
            alterId:this.iRRow.username,
            status:"",
            createStartTime:"",
            createEndTime:"",
            planStartTime:"",
            planEndTime:""
        }).then(ret=>{
            this.reIssueList=ret.data;
            console.log(this.reIssueList[0].total);
            if(ret.data.length!=0){
              this.total=ret.data[0].total
            }
            // this.reIssueList.forEach(element => { 
            //   console.log(element);
        // });
        });
  },
  mounted(){

  },
  methods:{
    exportExcel() {
      let execelDate = format(new Date(), 'yyyy-mm-dd')
      let excelName=this.iRRow.name+execelDate+'.xlsx'
      var wb = XLSX.utils.table_to_book(document.querySelector('#battery'))
 
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }),excelName)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
 
      return wbout
    },
    toIssueReport(){
      // this.$router.go(-1);
      this.$router.push({name:'IssueReport',params:{loginName:this.loginName}});
    },
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

          // 显示第几页,分页刷新的函数
        handleCurrentChange(val) {
            // 改变默认的页数
            this.ruleForm.pageNum=val
            // 切换页码时，要获取每页显示的条数
            // this.getData()

            // 重复调用这个查询函数来重复刷新
            this.submitForm('ruleForm');               
        },
        // 查询的函数
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');

          axios.post('http://192.168.0.70:9090/QueryIssue',{
            issueId:this.ruleForm.issueId,
            pageNum:this.ruleForm.pageNum,
            pageSize:this.ruleForm.pageSize,
            assignId:this.iRRassignId,
            alterId:this.iRRalterId,
            status:this.ruleForm.status,
            createStartTime:this.ruleForm.createStartTime,
            createEndTime:this.ruleForm.createEndTime,
            planStartTime:this.ruleForm.planStartTime,
            planEndTime:this.ruleForm.planEndTime
        }).then(ret=>{
          console.log(this.ruleForm.status);
          console.log(this.ruleForm.assignId);
          console.log(this.ruleForm.createStartTime);
          console.log(this.ruleForm.createEndTime);
          console.log(this.ruleForm.planStartTime);
          console.log(this.ruleForm.planEndTime);

            this.reIssueList=ret.data;
            this.reIssueList.forEach(element => { 
              console.log(element);
            
            if(ret.data.length!=0){
              this.total=ret.data[0].total
            }
        });
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      exitLogin(){
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      toUpdateInfo(){
        this.$router.push('/HomePage/UpdateInfo');
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
      }
  },
  components: {
  },
};
</script>

<style scoped>
.UserPoReport{
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
    h3 {
        text-align: center;
        margin-top: 0;
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
    .UserPoReport{
      margin: 10px;
    }
    .oexcel /deep/ .el-button{
      margin-left: 531px;
      background-color: #569ed7;
    }
</style>