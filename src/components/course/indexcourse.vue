<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">

        <el-col :span="2"><el-button type="success" 
        @click="addcoursedialogvisible = true">增加</el-button></el-col>
        <el-col :span="2"><el-button type="danger" @click="DeleteCourseCno">删除</el-button></el-col>
        <el-col :span="4"><span><font size="5px">学院:</font></span></el-col>
        <el-col :span="7">
          <el-select v-model="collegevalue" placeholder="请选择" @change="selectCourseChange()">
            <el-option key="全部" label="全部" value="">
            </el-option>
            <el-option v-for="item in collegeoptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    
    <!-- 用户表单区域 -->
      <el-table :data="courselist.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe height='500px' ref="courseRef"
      tooltip-effect="dark">
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="学院" prop="college"></el-table-column>
        <el-table-column label="课程类别" prop='ctype'></el-table-column>
        <el-table-column label="课程代码" sortable prop='cno'></el-table-column>
        <el-table-column label="名称" prop='cname'></el-table-column>
        <el-table-column label="学分" sortable prop='credit'></el-table-column>
        <el-table-column label="计分方式" prop='scoreway'></el-table-column>
        <el-table-column label="教学来源" prop='source'></el-table-column>
        <el-table-column label="学时" prop='class_hours'></el-table-column>
        <el-table-column label="卷面比例%" sortable prop='ratio'></el-table-column> 
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <!-- el-tooltip提示信息 -->
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="showcourseEditDialog(scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="showcourseDeleteDialog(scope.row)" circle></el-button>
            </el-tooltip>
           
          </template>
        </el-table-column> 
      </el-table>

      <!-- 分页效果 -->
      <el-pagination
      @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[5,8,10,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="courselist.length"
      >
    </el-pagination>
  </el-card>

  <!-- 添加课程的对话框 -->
  <el-dialog
  title="添加课程"
  :visible.sync="addcoursedialogvisible"
  width="42%" @close="addcourselistClosed">

  <!-- 内容主体区域 -->
  <el-form label-width="100px" :model="addcourselist" ref="addcourselistRef">

    <el-form-item label="学院:">
      <el-select v-model="addcollegevalue" placeholder="请选择"style="width: 100%;">
        <el-option v-for="item in addcollegeoptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="教学来源:">
      <el-select v-model="addcoursesourcevalue" placeholder="请选择"style="width: 100%;">
        <el-option v-for="item in addcoursesourceoptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="课程名:" prop="cname">
      <el-input v-model="addcourselist.cname"></el-input>
    </el-form-item>
    <el-form-item label="课程代码:" prop="cno">
      <el-input v-model="addcourselist.cno"></el-input>
    </el-form-item>
    <el-form-item label="课程类型:" prop="ctype">
      <el-input v-model="addcourselist.ctype"></el-input>
    </el-form-item>

    <el-form-item label="学分:" prop="credit">
      <el-input v-model="addcourselist.credit"></el-input>
    </el-form-item>
    <el-form-item label="卷面比例%:" prop="scoreway">
      <el-input v-model="addcourselist.scoreway"></el-input>
    </el-form-item>
    
    <el-form-item label="计分方式:" prop="ratio">
      <el-input v-model="addcourselist.ratio"></el-input>
    </el-form-item>
    <el-form-item label="学时:" prop="class_hours">
      <el-input v-model="addcourselist.class_hours"></el-input>
    </el-form-item>
    <el-form-item label="开始周:" prop="begin_week">
      <el-input v-model="addcourselist.begin_week"></el-input>
    </el-form-item>
    <el-form-item label="结束周:" prop="end_week">
      <el-input v-model="addcourselist.end_week"></el-input>
    </el-form-item>
  
    <el-form-item label="课程描述:" prop="dscb">
      <el-input type="textarea" v-model="addcourselist.dscb"></el-input>
    </el-form-item>
  </el-form>


    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
    <el-button @click="addcoursedialogvisible = false">取 消</el-button>
    <el-button type="primary" @click="Addcourse">确 定</el-button>
    </span>
  </el-dialog>









<!-- 修改课程的对话框 -->
<el-dialog
title="修改课程"
:visible.sync="editcoursedialogvisible"
width="42%" @close="exitcourselistClosed">


<!-- placeholder="请选择" -->
<!-- 内容主体区域 -->
<el-form label-width="100px" :model="editcourseForm" ref="editcourselistRef">

  <el-form-item label="学院:">
    <el-select v-model="editcollegevalue" style="width: 100%;">
      <el-option v-for="item in editcollegeoptions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="教学来源:">
    <el-select v-model="editcoursesourcevalue" placeholder="请选择"style="width: 100%;">
      <el-option v-for="item in editcoursesourceoptions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="课程名:" prop="cname">
    <el-input v-model="editcourseForm.cname"></el-input>
  </el-form-item>
  <el-form-item label="课程代码:" prop="cno">
    <el-input v-model="editcourseForm.cno" :disabled="true"></el-input>
  </el-form-item>

  <el-form-item label="课程类型:" prop="ctype">
    <el-input v-model="editcourseForm.ctype"></el-input>
  </el-form-item>
  <el-form-item label="学分:" prop="credit">
    <el-input v-model="editcourseForm.credit"></el-input>
  </el-form-item>
  <el-form-item label="计分方式:" prop="scoreway">
    <el-input v-model="editcourseForm.scoreway"></el-input>
  </el-form-item>
  <el-form-item label="学时:" prop="class_hours">
    <el-input v-model="editcourseForm.class_hours"></el-input>
  </el-form-item>
  <el-form-item label="开始周:" prop="begin_week">
    <el-input v-model="editcourseForm.begin_week"></el-input>
  </el-form-item>
  <el-form-item label="结束周:" prop="end_week">
    <el-input v-model="editcourseForm.end_week"></el-input>
  </el-form-item>
  
  <el-form-item label="卷面比例%:" prop="ratio">
    <el-input v-model="editcourseForm.ratio"></el-input>
  </el-form-item>

  <el-form-item label="课程描述:" prop="dscb">
    <el-input type="textarea" v-model="editcourseForm.dscb"></el-input>
  </el-form-item>
</el-form>


  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
  <el-button @click="editcoursedialogvisible = false">取 消</el-button>
  <el-button type="primary" @click="Editcourse">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>


<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->



<script>
  export default{
    data() {
      return {
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 8 ,// 每页的数据条数

        // 课程管理主页面数据的数组
        courselist:[],

        // 存要删除的cno
        coursecnos:[],

        // 课程管理主页面学院下拉值
        collegevalue:'',
        collegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],

        // 新增课程学院的下拉框值
        addcollegevalue:'',
        addcollegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],

        // 新增课程教学来源的下拉框值
        addcoursesourcevalue:'',
        addcoursesourceoptions:["教学计划"],


        // 新增课程的表单数据
        addcourselist:{
          college:'',
          ctype:'',
          cno:'',
          cname:'',
          credit:'',
          scoreway:'',
          ratio:'',
          dscb:'',
          source:'',
          class_hours:'',
          begin_week:'',
          end_week:'',
        },
        
        // 修改课程学院的下拉框值
        editcollegevalue:'',
        editcollegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],
        // 修改课程教学来源的下拉框值
        editcoursesourcevalue:'',
        editcoursesourceoptions:["教学计划"],
        // 修改数据的表单内容
        editcourseForm:{
          college:'',
          ctype:'',
          cno:'',
          cname:'',
          credit:'',
          scoreway:'',
          ratio:'',
          dscb:'',
          source:'',
          class_hours:'',
          begin_week:'',
          end_week:'',
        },
        // 添加课程的显示与隐藏
        addcoursedialogvisible:false,
        // 修改课程的显示与隐藏
        editcoursedialogvisible:false,


    

      }
    },
    created(){
      this.getCourseList();      
    },
    methods: {
      // 获取课程主页面数据
      getCourseList(){
        var me = this
        this.$http.post('/course/showbycollege',{'college':''})
        .then((res)=>{
          this.courselist = res.data.data
          console.log("课程主页面获取到了"+this.courselist)
        })
        .catch((err)=>{
          console.log(err)
        })
        // this.$refs.courseRef.toggleRowSelection(this.courselist[2],true)
      },
      // 分页数据
      handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },


      // 课程主页面下拉框
      selectCourseChange(){
        this.$http.post('/course/showbycollege',{'college':this.collegevalue})
        .then((res)=>{
          this.courselist = res.data.data
          console.log("通过课程主页面下拉框获取到了"+this.courselist)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 监听添加课程的关闭事件
      addcourselistClosed(){
        this.$refs.addcourselistRef.resetFields()
      },

      // 监听修改课程的关闭事件
      exitcourselistClosed(){
        this.$refs.editcourselistRef.resetFields()
      },

      // 点击添加课程
      Addcourse(){
        this.$http.post('/course/add',
        {
          'college':this.addcollegevalue,
          'cname':this.addcourselist.cname,
          'ctype':this.addcourselist.ctype,
          'cno':this.addcourselist.cno,
          'credit':this.addcourselist.credit,
          'scoreway':this.addcourselist.scoreway,
          'ratio':this.addcourselist.ratio,
          'dscb':this.addcourselist.dscb,
          'source':this.addcoursesourcevalue,
          'class_hours':this.addcourselist.class_hours,
          'begin_week':this.addcourselist.begin_week,
          'end_week':this.addcourselist.end_week,
        })
        .then((res)=>{
          console.log(res.data)
          this.$message.success("添加成功！")
          this.addcoursedialogvisible=false
          this.getCourseList()
        })
        .catch((err)=>{
          console.log(err)
        })
      },

      // 修改课程信息并提交
      Editcourse(){
        this.$http.post('/course/modify',{
          'college': this.editcollegevalue,
          'ctype': this.editcourseForm.ctype,
          'cno':this.editcourseForm.cno,
          'cname':this.editcourseForm.cname,
          'credit':this.editcourseForm.credit,
          'scoreway':this.editcourseForm.scoreway,
          'ratio':this.editcourseForm.ratio,
          'dscb':this.editcourseForm.dscb,
          'source':this.editcoursesourcevalue,
          'class_hours':this.editcourseForm.class_hours,
          'begin_week':this.editcourseForm.begin_week,
          'end_week':this.editcourseForm.end_week,
        })
        .then((res)=>{
          console.log("修改成功")
          console.log(res.data)
          this.$message.success("修改成功！")
          
          this.editcoursedialogvisible=false
          this.getCourseList()
        })
        .catch((err)=>{
          console.log(err)
        })
      },

      // 修改课程的对话框
      showcourseEditDialog(row){
        console.log("展示修改行的内容")
        console.log(row)
        this.editcoursedialogvisible=true
        this.$http.post('/course/showbycno',{'cno':row.cno})
        .then((res)=>{
          console.log("展示修改后传的值")
          console.log(res.data.data)
          this.editcourseForm=res.data.data
          console.log("这一行值"+res.data.data)
          this.editcollegevalue=res.data.data.college
          this.editcoursesourcevalue=res.data.data.source
        })
        .catch((err)=>{
          console.log(err)
        })
      },

      // 删除对应的列
      showcourseDeleteDialog(row){
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/course/delete',[row.cno])
          .then((res)=>{
            this.$message.success("课程号为"+row.cno+"的课程删除成功")
            console.log(row.cno+"删除成功")
            this.getCourseList();
          })
          .catch((err)=>{
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        
      },
      // 删除多列
      DeleteCourseCno(selection){
        this.$confirm('此操作将永久删除这些课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$refs.courseRef.selection.length!=0){
          var coursecno =[]
          for (let i = 0; i < this.$refs.courseRef.selection.length; i++) {
            coursecno.push(this.$refs.courseRef.selection[i].cno)
          }
          this.coursecnos=coursecno
          this.$http.post('/course/delete',this.coursecnos)
          .then((res)=>{
            console.log(this.coursecnos+"们删除成功")
            this.$message.success("课程号为"+this.coursecnos+"的课程删除成功")
            this.getCourseList();
          })
          .catch((err)=>{
            console.log(err)
          })
        }else{
          this.$message.error("请勾选要删除的课程")
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        
      },

    }
  }
</script>
<style>
</style>