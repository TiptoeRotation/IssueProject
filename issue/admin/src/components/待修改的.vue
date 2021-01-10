<template>
  <div class="">

  </div>
</template>
<script>
 // 主页面 homepage：
    // <el-button size="mini" round @click="ExitUser()">退出登录</el-button> 
    // ExitUser(){
    //     window.sessionStorage.clear();
    //     this.$router.push('/login');
    //   },

   // 主页面  修改
  //  @click="handleDelete(scope.$index, scope.row),toModifyIssue(scope.row)">修改</el-button>
    // toModifyIssue(row){
    //     console.log(row);
    //     // alert(row.issueId);
    //     axios.post('http://192.168.0.50:9090//getIssueById',{
    //       date:row,
          
    //     })
    //     this.$router.push({name:'ModifyIssue',params:{loginName:this.loginName}});


    //  <!-- total：总条目数  page-sizes 每条目数  current-page：当前页数 -->
    //   },
    // 

// 页数
    // handleCurrentChange(val) {
    //         // 改变默认的页数
    //         this.currentPage=val
    //         // 切换页码时，要获取每页显示的条数
    //         this.getData()

    //         // 把页码给后端并且调用submitForm()
            
    //         axios.post('http://192.168.0.70:9090//改页码',{
    //           currentPage:this.currentPage, // 对应接口
    //         }).then(ret=>{
    //         this.reIssueList=ret.data;
    //         alert(this.currentPage);
    //         // alert(this.loginName);
    //         this.submitForm();
    //     })                 
            
    //     },


 



  //   修改页:
  //    created() {
  //   axios({
  //     url: "http://192.168.0.50:9090//getIssueById",
  //     method: "get",
  //     data:{}
  //   })
  //     .then((data) => {
  //       this.iTitle = data.iTitle;    // 后端给前端
  //       this.issueId = data.issueId; 
  //       this.createDate = data.createDate; 
  //       this.iType = data.iType; 
  //       this.ilevel = data.ilevel; 
  //       this.aVersion = data.aVersion; 
  //       this.planDate = data.planDate; 
  //       this.aVersion = data.aVersion; 
  //       this.finalDate = data.finalDate; 
  //       this.reSteps = data.reSteps; 
  //       this.reUserName = data.reUserName; 
  //       this.alterId = data.alterId; 
  //     })
  //     .catch((err) => {
  //       console.log("error...", err);
  //     });
  // },

</script>

<style scoped>


</style>