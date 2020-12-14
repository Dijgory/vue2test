<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 班级管理增删那一条卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <!-- 增加班级 -->
        <el-col :span="2"><el-button type="success" 
        @click="addclassdialogvisible = true">增加</el-button></el-col>
        <!-- 删除班级 -->
        <el-col :span="2"><el-button type="danger" 
        @click="DeleteClassNos">删除</el-button></el-col>
        <el-col :span="2"><span><font size="5px">学院:</font></span></el-col>
        <el-col :span="5">
          <el-select v-model="collegevalue" placeholder="请选择" @change="selectClassChange()">
            <el-option key="全部" label="全部" value="">
            </el-option>
            <el-option v-for="item in collegeoptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-col>
        <!-- 班级主页年级下拉框 -->
        <el-col :span="2"><span><font size="5px" >年级:</font></span></el-col>
        <el-col :span="5">
          
          <el-select v-model="classgradevalue" placeholder="请选择" @change="selectClassChange()">
            <el-option key="全部" label="全部" value="">
            </el-option>
            <el-option v-for="item in classgradeoptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-col>
        <!-- 通过班级编号查看 -->
        <el-col :span="6">
          <el-input v-model="classnos" placeholder="请输入班级编号">
            <el-button type="primary" slot="append"
            @click="selectClassChange">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
    
    <!-- 用户表单区域 -->
      <el-table :data="classlist.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
      border stripe height='500px' ref="classRef"
      tooltip-effect="dark">
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="学院" prop="college"></el-table-column>
        <el-table-column label="班级编号" prop='classno'></el-table-column>
        <el-table-column label="专业" prop='major'></el-table-column>
        <el-table-column label="人数" sortable prop='maxnum'></el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <template slot-scope="scope">
            <!-- el-tooltip提示信息 -->
            <el-tooltip effect="dark" content="查看" placement="top" :enterable="false">
              <el-button type="info" icon="el-icon-message" size="mini" @click="showclassViewDialog(scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="showclassEditDialog(scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">          
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="showclassDeleteDialog(scope.row)" circle></el-button>
            </el-tooltip>
           
          </template>
        </el-table-column> 
      </el-table>

      <!-- 分页效果 -->
      <el-pagination
      @size-change="classlisthandleSizeChange" @current-change="classlisthandleCurrentChange"
      :current-page="classlistcurrentPage" :page-sizes="[5,8,10,20]"
      :page-size="classlistpageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="classlist.length">
    </el-pagination>
  </el-card> 

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- 添加视图 -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ --> 
<!-- @close="addclasslistClosed" -->

  <!-- 添加班级的对话框 -->
  <el-dialog
  title="添加班级"
  :visible.sync="addclassdialogvisible"
  width="80%">

  <el-form label-width="100px" :model="addclasslist" ref="addclasslistRef">

    <el-form-item label="学院:">
      <el-select v-model="addclasscollegevalue" placeholder="请选择"style="width: 100%;">
        <el-option v-for="item in addclasscollegeoptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="学期:">
      <el-select v-model="addclasssemestervalue" placeholder="请选择"style="width: 100%;">
        <el-option v-for="item in addclasssemesteroptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="年级:">
      <el-select v-model="addclassgradevalue" placeholder="请选择"style="width: 100%;">
        <el-option v-for="item in addclassgradeoptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="班级编号:" prop="classno">
      <el-input v-model="addclasslist.classno"></el-input>
    </el-form-item>
    <el-form-item label="专业:" prop="major">
      <el-input v-model="addclasslist.major"></el-input>
    </el-form-item>
    <el-form-item label="人数:" prop="maxnum">
      <el-input v-model="addclasslist.maxnum"></el-input>
    </el-form-item>
  </el-form>
    <!-- 内部的增加班级时为班级选课的表单 -->

    <el-dialog
      width="72%"
      title="为班级选课"
      :visible.sync="addclassinnerVisible"
      append-to-body>


      <!-- 内部对话框的主体部分 -->
          <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <span>科目分类：</span>
          <el-select v-model="addclasskmcollegevalue" placeholder="请选择" @change="addclassselectCourseChange()">
            <el-option key="全部" label="全部" value="">
            </el-option>
            <el-option v-for="item in addclasskmcollegeoptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    
    <!-- 用户表单区域 -->
      <el-table :data="courselist.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
      border stripe height='500px' ref="addcourseRef"
      tooltip-effect="dark">
        <el-table-column type="selection" fixed></el-table-column>
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="学院" prop='college'></el-table-column>
        <el-table-column label="课程类别" prop='ctype'></el-table-column>
        <el-table-column label="课程代码" sortable prop='cno'></el-table-column>
        <el-table-column label="名称" prop='cname'></el-table-column>
        <el-table-column label="学分" sortable prop='credit'></el-table-column>
        <el-table-column label="计分方式" prop='scoreway'></el-table-column>
        <el-table-column label="教学来源" prop='source'></el-table-column>
        <el-table-column label="开始周" prop='begin_week'></el-table-column>
        <el-table-column label="结束周" prop='end_week'></el-table-column>
        <el-table-column label="学时" prop='class_hours'></el-table-column>
        <el-table-column label="卷面比例%" prop='ratio'></el-table-column>        
      </el-table>

      <!-- 分页效果 -->
      <el-pagination
      @size-change="courselisthandleSizeChange" @current-change="courselisthandleCurrentChange"
      :current-page="courselistcurrentPage" :page-sizes="[5,8,10,20]"
      :page-size="courselistpageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="courselist.length"
      >
    </el-pagination>
      <!-- <span slot="footer" class="dialog-footer"> -->
        <el-button @click="addclassinnerVisible =false,addclassdialogvisible = true">取 消</el-button>
        <el-button type="primary" @click="Addclass">确 定</el-button>
      <!-- </span> -->
    </el-card>
    </el-dialog>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="addclassdialogvisible = false">取 消</el-button>
      <el-button type="primary" @click="AddClassCourse">班级选课程</el-button>
    </span>
  </el-dialog>

  <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- 修改视图 -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ --> 



<!-- 修改班级的对话框 -->
<el-dialog
title="修改班级"
:visible.sync="editclassdialogvisible"
width="70%">

<el-form label-width="100px" :model="editclasslist" ref="editclasslistRef">

  <el-form-item label="学院:">
    <el-select v-model="editcollegevalue" placeholder="请选择"style="width: 100%;">
      <el-option v-for="item in editcollegeoptions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>


  <el-form-item label="年级:">
    <el-select v-model="editclassgradevalue" placeholder="请选择"style="width: 100%;">
      <el-option v-for="item in editclassgradeoptions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="班级编号:" prop="classno">
    <el-input v-model="editclasslist.classno" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="专业:" prop="major">
    <el-input v-model="editclasslist.major"></el-input>
  </el-form-item>
  <el-form-item label="人数:" prop="maxnum">
    <el-input v-model="editclasslist.maxnum"></el-input>
  </el-form-item>
</el-form>
  <!-- 内部的修改班级时为班级选课的表单 -->
  <el-dialog
    width="80%"
    title="为班级选课"
    :visible.sync="editclassinnerVisible"
    append-to-body>
    <!-- 内部对话框的主体部分 -->
  <el-card>
    <el-row :gutter="40">
      <el-col :span="10">
        <span>学期：</span>
        <el-select v-model="editclasssemestervalue" placeholder="请选择学期" @change="editclassselectSemesterChange()">
          <!-- <el-option key="无" label="" value="无">
          </el-option> -->
          <el-option v-for="item in editclasssemesteroptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="11">
        <span><font size="5px">班级已选的课程</font></span>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="EditDeletecnos">删除</el-button>
      </el-col>
    </el-row>
  
  <!-- 已经选了的课程 -->
    <el-table :data="editcourselist.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
    border stripe height='350px' ref="existeditcourseRef"
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
      <el-table-column label="开始周" prop='begin_week'></el-table-column>
      <el-table-column label="结束周" prop='end_week'></el-table-column>
      <el-table-column label="学时" prop='class_hours'></el-table-column>
      <el-table-column label="卷面比例%" sortable prop='ratio'></el-table-column>        
    </el-table>
    <el-pagination
    @size-change="editcourselisthandleSizeChange" @current-change="editcourselisthandleCurrentChange"
    :current-page="editcourselistcurrentPage" :page-sizes="[4,5,8,10]"
    :page-size="editcourselistpageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="editcourselist.length"
    >
    </el-pagination>
    
    <!-- 增加课程的折叠面板 -->
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="点击添加课程" name="1">
        <el-row :gutter="40">
          <el-col :span="10">
            <span>科目分类：</span>
            <el-select v-model="editclasskmcollegevalue" placeholder="请选择" @change="editclassselectCollegeChange()">
              <el-option key="全部" label="全部" value="">
              </el-option>
              <el-option v-for="item in editclasskmcollegeoptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="11">
            <span><font size="5px">全部课程</font></span>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="EditAddcnos">增加</el-button>
          </el-col>
        </el-row>
        <!-- 全部的课程 -->
        <el-table :data="alleditcourselist.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
        border stripe height='350px' ref="alleditcourseRef"
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
          <el-table-column label="开始周" prop='begin_week'></el-table-column>
          <el-table-column label="结束周" prop='end_week'></el-table-column>
          <el-table-column label="学时" prop='class_hours'></el-table-column>
          <el-table-column label="卷面比例%" sortable prop='ratio'></el-table-column>        
        </el-table>
    
        <!-- 分页效果 -->
        <el-pagination
        @size-change="alleditcourselisthandleSizeChange" @current-change="alleditcourselisthandleCurrentChange"
        :current-page="alleditcourselistcurrentPage" :page-sizes="[4,5,8,10]"
        :page-size="alleditcourselistpageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="alleditcourselist.length"
        >
        </el-pagination>
      </el-collapse-item>
    </el-collapse>
      <el-row :gutter="100">
        <!-- <el-col :span="20"><span>""</span></el-col> -->
        <el-col :span="2" :offset="18">
          <el-button @click="editclassinnerVisible =false,editclassdialogvisible = true">取 消</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="Editclass">提交修改</el-button>
        </el-col>
      </el-row>
  </el-card>
  </el-dialog>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="editclassdialogvisible = false">取 消</el-button>
    <el-button type="primary" @click="EditClassCourse">班级修改课程</el-button>
  </span>
</el-dialog>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- 查看视图 -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ --> 
<el-dialog
title="查看班级"
:visible.sync="viewclassdialogvisible"
width="70%">

<el-form label-width="100px" :model="viewclasslist" ref="viewclasslistRef">

  <el-form-item label="学院:">
    <el-select v-model="viewcollegevalue" disabled placeholder="请选择"style="width: 100%;">
      <el-option v-for="item in viewcollegeoptions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>


  <el-form-item label="年级:">
    <el-select v-model="viewclassgradevalue" disabled placeholder="请选择"style="width: 100%;">
      <el-option v-for="item in viewclassgradeoptions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="班级编号:" prop="classno">
    <el-input v-model="viewclasslist.classno" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="专业:" prop="major">
    <el-input v-model="viewclasslist.major" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="人数:" prop="maxnum">
    <el-input v-model="viewclasslist.maxnum" :disabled="true"></el-input>
  </el-form-item>
</el-form>
  <!-- 内部的修改班级时为班级选课的表单 -->
  <el-dialog
    width="80%"
    title="为班级选课"
    :visible.sync="viewclassinnerVisible"
    append-to-body>
    <!-- 内部对话框的主体部分 -->
  <el-card>
    <el-row :gutter="40">
      <el-col :span="10">
        <span>学期：</span>
        <el-select v-model="viewclasssemestervalue" placeholder="请选择" @change="viewclassselectSemesterChange()">
          <el-option key="全部" label="全部" value="">
          </el-option>
          <el-option v-for="item in viewclasssemesteroptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="11">
        <span><font size="5px">班级已选的课程</font></span>
      </el-col>
    </el-row>
  
  <!-- 已经选了的课程 -->
    <el-table :data="viewcourselist.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
    border stripe height='400px' ref="viewcourseRef"
    tooltip-effect="dark">
      <el-table-column label="序号" type="index" ></el-table-column>
      <el-table-column label="学院" prop="college"></el-table-column>
      <el-table-column label="课程类别" prop='ctype'></el-table-column>
      <el-table-column label="课程代码" sortable prop='cno'></el-table-column>
      <el-table-column label="名称" prop='cname'></el-table-column>
      <el-table-column label="学分" sortable prop='credit'></el-table-column>
      <el-table-column label="计分方式" prop='scoreway'></el-table-column>
      <el-table-column label="教学来源" prop='source'></el-table-column>
      <el-table-column label="开始周" prop='begin_week'></el-table-column>
      <el-table-column label="结束周" prop='end_week'></el-table-column>
      <el-table-column label="学时" prop='class_hours'></el-table-column>
      <el-table-column label="卷面比例%" sortable prop='ratio'></el-table-column>        
    </el-table>
    <el-pagination
    @size-change="viewcourselisthandleSizeChange" @current-change="viewcourselisthandleCurrentChange"
    :current-page="viewcourselistcurrentPage" :page-sizes="[4,5,8,10]"
    :page-size="viewcourselistpageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="viewcourselist.length"
    >
    </el-pagination>
      <el-row :gutter="100">
        <el-col :span="4" :offset="16">
          <el-button @click="viewclassinnerVisible =false,viewclassdialogvisible = true">返回查看班级信息</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="Viewclass">班级主页面</el-button>
        </el-col>
      </el-row>
  </el-card>
  </el-dialog>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="viewclassdialogvisible = false">取 消</el-button>
    <el-button type="primary" @click="ViewClassCourse">班级查看课程</el-button>
  </span>
</el-dialog>



  </div>
</template>
<script>
  export default{
    data(){
      return{
        // 分页数据
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 8 ,// 每页的数据条数
        classlistcurrentPage:1,
        classlistpageSize:8,
        courselistcurrentPage:1,
        courselistpageSize:5,
        editcourselistcurrentPage:1,
        editcourselistpageSize:4,
        alleditcourselistcurrentPage:1,
        alleditcourselistpageSize:4,
        viewcourselistcurrentPage:1,
        viewcourselistpageSize:5,

// 主页面
        // 搜索框班级编号
        classnos:'',
        // 班级管理主页面的数组
        classlist:[],
        // 班级管理主页面学院下拉值
        collegevalue:'',
        collegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],
        // 主页面年级下拉框
        classgradevalue:'',
        classgradeoptions:["2018","2017","2016"],
// 增加
        // 增加班级科目下拉框下数据table的数组
        courselist:[],
        // 增加里面的为班级选的课的课程编号
        addcoursecnos:[],
        // 增加班级的表单from内容
        addclasslist:{
          'college':'',
          'semester':'',
          'grade':'',
          'classno':'',
          'major':'',
          'maxnum':'',
        },
        // 增加班级学院下拉值
        addclasscollegevalue:'',
        addclasscollegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],
        // 增加班级科目下拉值
        addclasskmcollegevalue:'',
        addclasskmcollegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],
        // 添加班级学期下拉框
        addclasssemestervalue:'',
        addclasssemesteroptions:["2020-2021学年第一学期","2020-2021学年第二学期","2019-2020学年第一学期","2018-2019学年第二学期","2017-2018学年第一学期","2017-2018学年第二学期"],
        // 添加班级年级下拉框
        addclassgradevalue:'',
        addclassgradeoptions:["2018","2017","2016"],
        // 添加班级的显示与隐藏
        addclassdialogvisible:false,
        // 添加班级里面的课程的显示与隐藏
        addclassinnerVisible:false,
// 修改
        // 折叠面板的数组
        activeNames: [],
        // 存要提交删除的课程号们
        editdeletecoursecnos:[],
        // 存要提交增加的课程号们
        editaddcoursecnos:[],
        // 修改班级课程筛选后的数组
        editcourselist:[],
        // 全部的课程
        alleditcourselist:[],
        // 存全部课程的数组
        editallcourse:[],
        // 存去得到的要打钩的课程的数组
        editnorepcourse:[],
        // 修改班级的表单内容
        editclasslist:{
          'college':'',
          'grade':'',
          'classno':'',
          'major':'',
          'maxnum':'',
        },
        // 修改班级学院下拉值
        editcollegevalue:'',
        editcollegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],
        // 修改班级科目下拉值
        editclasskmcollegevalue:'',
        editclasskmcollegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],
        // 修改班级学期下拉框
        editclasssemestervalue:'',
        editclasssemesteroptions:["2020-2021学年第一学期","2020-2021学年第二学期","2019-2020学年第一学期","2018-2019学年第二学期","2017-2018学年第一学期","2017-2018学年第二学期"],
        // 修改年级
        editclassgradevalue:'',
        editclassgradeoptions:["2018","2017","2016"],
        // 修改班级的显示与隐藏
        editclassdialogvisible:false,
        // 修改班级里面的课程的显示与隐藏
        editclassinnerVisible:false,
// 查看   
        // 查看选了的课程的数组
        viewcourselist:[],
        // 班级的表单内容
        viewclasslist:{
          'college':'',
          'grade':'',
          'classno':'',
          'major':'',
          'maxnum':'',
        },
        // 查看年级
        viewclassgradevalue:'',
        viewclassgradeoptions:["2018","2017","2016"],
        // 班级学院下拉值
        viewcollegevalue:'',
        viewcollegeoptions:["计算机科学学院","马克思学院","美术学院","物理学院","商学院","工学院","数学院","舞蹈学院"],
        // 查看班级的学期下拉框
        viewclasssemestervalue:'',
        viewclasssemesteroptions:["2020-2021学年第一学期","2020-2021学年第二学期","2019-2020学年第一学期","2018-2019学年第二学期","2017-2018学年第一学期","2017-2018学年第二学期"],
        // 查看班级信息的显示与隐藏
        viewclassdialogvisible:false,
        // 查看班级里面的课程的显示与隐藏
        viewclassinnerVisible:false,
// 删除     
  // 主页面的班级删除（课程删除数据在修改的里面）
        // 主页面删除的班级编号
        deleteclassnos:[],

      }
    },

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
    created(){
      this.getClassList();
    },
    methods:{
      // 监听添加课程的关闭事件
      // addclasslistClosed(){
      //   this.$refs.addclasslistRef.resetFields()
      // },
      // 监听修改课程的关闭事件
      // exitclasslistClosed(){
      //   this.$refs.editclasslistRef.resetFields()
      // },

// 分页数据相关的函数
      // handleSizeChange(val) {
      //       this.currentPage = 1;
      //       this.pageSize = val;
      //   },
      // handleCurrentChange(val) {
      //       this.currentPage = val;
      // },
      // 班级主页面分页
      classlisthandleSizeChange(val) {
            this.classlistcurrentPage = 1;
            this.classlistpageSize = val;
        },
      classlisthandleCurrentChange(val) {
            this.classlistcurrentPage = val;
      },
      // 添加班级课程分页
      courselisthandleSizeChange(val) {
            this.courselistcurrentPage = 1;
            this.courselistpageSize = val;
        },
      courselisthandleCurrentChange(val) {
            this.courselistcurrentPage = val;
      },
      // 修改班级里面的已经选了的课分页
      editcourselisthandleSizeChange(val) {
            this.editcourselistcurrentPage = 1;
            this.editcourselistpageSize = val;
        },
      editcourselisthandleCurrentChange(val) {
            this.editcourselistcurrentPage = val;
      },
      // 修改班级课程里面全部课的分页
      alleditcourselisthandleSizeChange(val) {
            this.alleditcourselistcurrentPage = 1;
            this.alleditcourselistpageSize = val;
        },
      alleditcourselisthandleCurrentChange(val) {
            this.alleditcourselistcurrentPage = val;
      },
      // 查看班级选课分页
      viewcourselisthandleSizeChange(val) {
            this.viewcourselistcurrentPage = 1;
            this.viewcourselistpageSize = val;
        },
      viewcourselisthandleCurrentChange(val) {
            this.viewcourselistcurrentPage = val;
      },

// 主页面
      // 获取班级主页面数据
      getClassList(){
        this.$http.post('/classes/show',
        {
          'college':this.collegevalue,
          'grade':this.classgradevalue,
          'classno':this.classnos
        })
        .then((res)=>{
          this.classlist = res.data.data
          console.log("班级列表刷新"+this.classlist)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 班级主页面(学院，年级，班级编号)下拉框与输入
      selectClassChange(){
        this.$http.post('/classes/show',
        {
          'college':this.collegevalue,
          'grade':this.classgradevalue,
          'classno':this.classnos
        })
        .then((res)=>{
          console.log("3班级主页面修改变"+res.data.data)
          this.classlist = res.data.data
          console.log("通过班级主页面下拉框获取到了"+this.classlist)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
// 增加相关

      // 点击班级选课程，获取所有课程列表
      AddClassCourse(){
        this.addclassselectCourseChange()
        this.addclassinnerVisible = true;
        this.addclassdialogvisible = false;
      },
      // 点击添加班级里面的课程
      Addclass(){
        if(this.$refs.addcourseRef.selection.length!=0){
          var coursecno =[]
          for (let i = 0; i < this.$refs.addcourseRef.selection.length; i++) {
            coursecno.push(this.$refs.addcourseRef.selection[i].cno)
          }
          this.addcoursecnos=coursecno
          console.log("学院为"+this.addclasscollegevalue)
          this.$http.post('/classes/add',
          {
            'form':{
              'college':this.addclasscollegevalue,
              'semester':this.addclasssemestervalue,
              'grade':this.addclassgradevalue,
              'classno':this.addclasslist.classno,
              'major':this.addclasslist.major,
              'maxnum':this.addclasslist.maxnum,
            },
            'cnos':this.addcoursecnos,
          })
          .then((res)=>{
            console.log(res.data)
            this.$message.success("添加成功！")
            this.addclassinnerVisible = false
            this.addclassdialogvisible = false
            this.getClassList()
          })
          .catch((err)=>{
            console.log(err)
          })
        }else{
          console.log("添加班级失败")
          this.$message.error("请勾选要添加的班级")
        }
      },
      // 班级加课程的下拉框
      addclassselectCourseChange(){
        this.$http.post('/course/showbycollege',{
          'college':this.addclasskmcollegevalue
        })
        .then((res)=>{
          this.xaddcourselist = res.data.data
          console.log("班级加课程下拉框刷新成功"+this.xaddcourselist)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      
// 修改
      // 调出全部课程折叠框
      handleChange(val) {
        console.log(val);
      },
      // 修改班级的课程调出内部视图
      EditClassCourse(){
        this.editclassinnerVisible = true
        this.editclassdialogvisible = false
        // 先得到所属学院的全部课程
        this.editclassselectSemesterChange()
        this.editclassselectCollegeChange()
      },
      // 修改课程的对话框
      showclassEditDialog(row){
        this.$http.post('/classes/show',{
          'classno':row.classno,
        })
        .then((res)=>{
          this.editclassdialogvisible = true
          console.log("展示点击修改后传的值")
          console.log(res.data.data[0])
          this.editclasslist=res.data.data[0]
          this.editcollegevalue=res.data.data[0].college
          this.editclassgradevalue=res.data.data[0].grade
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 为班级添加课程的学院下拉框
      editclassselectCollegeChange(){
        
        var EDITADDCLASSCOURSE=[]
        this.$http.post('/course/showbycollege',{'college':this.editclasskmcollegevalue})
        .then((res)=>{
          EDITADDCLASSCOURSE=res.data.data
          console.log("几00个")
          for(var i=0;i<EDITADDCLASSCOURSE.length;i++){
            for(var j=0;j<this.editcourselist.length;j++){
              console.log("几个1")
              if(EDITADDCLASSCOURSE[i].cno==this.editcourselist[j].cno){
                console.log("几个")
                EDITADDCLASSCOURSE.splice(i,1)
              }
            }
          }
          this.alleditcourselist = EDITADDCLASSCOURSE
          console.log("班级修改课程获取对应下拉框全部除了选了的全部课程")
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 为班级选课程的学期下拉框
      editclassselectSemesterChange(){
        console.log("学期"+this.editclasssemestervalue)
        console.log(this.editclasslist.classno)
        this.$http.post('/classes/show_course_by_classes',
        {
          'classno':this.editclasslist.classno,
          'semester':this.editclasssemestervalue
        }).then((res)=>{
          this.editcourselist=res.data.data

        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 删除班级的课程
      EditDeletecnos(){
        if(this.$refs.existeditcourseRef.selection.length!=0){
          var coursecno =[]
          for (let i = 0; i < this.$refs.existeditcourseRef.selection.length; i++) {
            coursecno.push(this.$refs.existeditcourseRef.selection[i].cno)
          }
          this.editdeletecoursecnos=coursecno
          // 下面是提交删除课程的语句（提交后调用this.EditClassCourse()）
          this.$http.post('/classes/delete_course_by_classes',
          {
            'classno':this.editclasslist.classno,
            'semester':this.editclasssemestervalue,
            'cnos':this.editdeletecoursecnos
          }).then((res)=>{
            this.$message.success("删除成功")
            this.EditClassCourse()
          })
          .catch((err)=>{
            console.log(err)
          })
          }else{
          this.$message.error("请勾选要删除的课程")
        }
      },
      // 增加班级的课程
      EditAddcnos(){
        if(this.$refs.alleditcourseRef.selection.length!=0){
          var coursecno =[]
          for (let i = 0; i < this.$refs.alleditcourseRef.selection.length; i++) {
            coursecno.push(this.$refs.alleditcourseRef.selection[i].cno)
          }
          this.editaddcoursecnos=coursecno
          // 下面是提交增加课程的语句（提交后调用this.EditClassCourse()）
          // 里面要判断如果学期为空就不增加
          if(this.editclasssemestervalue){
            this.$http.post('/classes/add_course_by_classes',
            {
              'classno':this.editclasslist.classno,
              'semester':this.editclasssemestervalue,
              'cnos':this.editaddcoursecnos
            }         
            ).then((res)=>{
              this.$message.success("添加课程成功")
              this.EditClassCourse()
              console.log("修改中的添加课程成功")  
            })
            .catch((err)=>{
              console.log(err)
            })
          }else{
            this.$message.error("请查看该学期的课程,添加课程时学期不能为空");
          }
        }else{
          this.$message.error("请选择你要添加的课程");
        }
      },

      // 提交修改的所有信息
      Editclass(){
        this.$http.post('/classes/modify_classes',
        {
            'form':{
              'college':this.editcollegevalue,
              'grade':this.editclassgradevalue,
              'classno':this.editclasslist.classno,
              'major':this.editclasslist.major,
              'maxnum':this.editclasslist.maxnum,
            }           
          }).then((res)=>{
          this.$message.success("修改该班级成功")
          this.editclassinnerVisible = false
          this.editclassdialogvisible = false

        })
        .catch((err)=>{
          console.log(err)
        })
      },

// 查看
      // 查看班级详细信息弹框
      showclassViewDialog(row){
        this.$http.post('/classes/show',{
          'classno':row.classno
        })
        .then((res)=>{
          this.viewclassdialogvisible = true
          console.log("展示点击查看传的值")
          console.log(res.data.data[0])
          this.viewclasslist=res.data.data[0]
          this.viewcollegevalue=res.data.data[0].college
          this.viewclassgradevalue=res.data.data[0].grade
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 班级查看课程
      ViewClassCourse(){
        this.viewclassinnerVisible = true
        this.viewclassdialogvisible = false
        this.$http.post('/classes/show_course_by_classes',
        {
          'classno':this.viewclasslist.classno,
          'semester':this.viewclasssemestervalue
        }).then((res)=>{
          this.viewcourselist=res.data.data 
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 返回班级主页面
      Viewclass(){
        this.viewclassinnerVisible = false,
        this.viewclassdialogvisible = false
      },
      // 查看课程的学期下拉框
      viewclassselectSemesterChange(){
        this.$http.post('/classes/show_course_by_classes',
        {
          'classno':this.viewclasslist.classno,
          'semester':this.viewclasssemestervalue
        }).then((res)=>{
          this.viewcourselist=res.data.data 
          console.log("看该学期的课程"+this.viewcourselist)
          this.$message({
            showClose: true,
            message: '查看'+this.viewclasssemestervalue+'的课程'
          })
        })
        .catch((err)=>{
          console.log(err)
        })
      },
// 删除 
      // 删除对应的列
      showclassDeleteDialog(row){
        this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/classes/delete',{'classnos':[row.classno]})
          .then((res)=>{
            console.log(row.classno+"删除成功")
            this.$message({
              showClose: true,
              message: "班级编号为"+row.classno+'的班级删除成功',
              type: 'success'
          })
            this.getClassList();
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
      DeleteClassNos(){
        this.$confirm('此操作将永久删除这些课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$refs.classRef.selection.length!=0){
          var classno =[]
          for (let i = 0; i < this.$refs.classRef.selection.length; i++) {
            classno.push(this.$refs.classRef.selection[i].classno)
          }
          this.deleteclassnos=coursecno
          this.$http.post('/classes/delete',{'classnos':this.deleteclassnos})
          .then((res)=>{
            console.log(this.deleteclassnos+"们删除成功")
            this.getclassList();
          })
          .catch((err)=>{
            console.log(err)
          })
        }else{
          this.$message.error("请勾选要删除的班级")
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