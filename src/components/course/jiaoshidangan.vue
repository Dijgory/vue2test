<!-- 全部老师主体组件 -->
<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 10px;">
          <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>档案管理</el-breadcrumb-item>
          <el-breadcrumb-item>教师档案管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <!-- 上面一排按钮 -->
          <el-row :gutter="20">
              <!-- 增加老师按钮 -->
              <el-col :span="3">
                  <el-button type="primary" @click="dialogFormVisible1 = true">增加教师</el-button>
              </el-col>
              <!-- 删除老师按钮 -->
              <el-col :span="3">
                  <el-button type="danger" v-if="$store.state.roleid[0]==1" @click="handleClick3()">删除老师</el-button>
              </el-col>
              <!-- 根据教职工搜索下拉框 -->
              <el-col :span="6" :offset="1">
                  <el-input v-model="tno" placeholder="教职工号搜索" type="text"></el-input>
              </el-col>
              <!-- 根据学院搜索下拉框 -->
              <el-col :span="6" style="margin-left: 20px;">
                  <el-select v-model="college" placeholder="根据学院搜索">
                      <el-option label="全部学院" value="全部学院"></el-option>
                      <el-option v-for="item in colleges" :key="item" :label="item" :value="item">
                      </el-option>
                  </el-select>
              </el-col>
          </el-row>
          <div>
              <!-- 老师表格组件 -->
              <el-row>
                  <el-table :data="Teachers4" border stripe ref="teachertable">
                      <el-table-column fixed type="selection" width="55">
                      </el-table-column>
                      <el-table-column type="index" label="序号" width="50">
                      </el-table-column>
                      <el-table-column prop="tno" label="教职工号" width="150">
                      </el-table-column>
                      <el-table-column prop="tname" label="姓名" width="80">
                      </el-table-column>
                      <el-table-column prop="tsex" label="性别" width="80">
                      </el-table-column>
                      <el-table-column prop="political_outlook" label="政治面貌" width="80">
                      </el-table-column>
                      <el-table-column prop="title" label="职称" width="80">
                      </el-table-column>
                      <el-table-column prop="college" label="学院" width="150">
                      </el-table-column>
                      <el-table-column prop="education" label="学历" width="80">
                      </el-table-column>
                      <el-table-column prop="mail" label="电子邮箱" width="230">
                      </el-table-column>
                      <el-table-column prop="pnum" label="电话" width="120">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="100">
                          <template slot-scope="scope">
                              <el-button @click="handleClick(scope.row)" type="warning" icon="el-icon-edit"
                                  size="mini" circle>
                              </el-button>
                              <el-button @click="handleClick2(scope.row.tno)" type="danger" icon="el-icon-delete"
                                  size="mini" circle></el-button>
                          </template>
                      </el-table-column>
                  </el-table>
              </el-row>
          </div>
          <div>
              <!-- 分页组件 -->
              <div>
                  <el-pagination @size-change="f1" @current-change="f2" :current-page.sync="currentPage"
                      :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                      :total="totol">
                  </el-pagination>
              </div>
          </div>
          <!-- 修改对话框 -->
          <div>
              <el-dialog title="修改教师" :visible.sync="dialogFormVisible" width="64%">
                  <el-form :model="teacherupdate">
                      <el-row>
                          <el-col :span="8">
                              <el-form-item label="姓名" :label-width="formLabelWidth">
                                  <el-input v-model="teacherupdate.tname" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="教职工号" :label-width="formLabelWidth">
                                  <el-input v-model="teacherupdate.tno" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="性别" :label-width="formLabelWidth">
                                  <el-radio v-model="teacherupdate.tsex" label="男">男</el-radio>
                                  <el-radio v-model="teacherupdate.tsex" label="女">女</el-radio>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="8">
                              <el-form-item label="职称" :label-width="formLabelWidth">
                                  <el-select v-model="teacherupdate.title" placeholder="请选择职称">
                                      <el-option label="教授" value="教授"></el-option>
                                      <el-option label="副教授" value="副教授"></el-option>
                                      <el-option label="讲师" value="讲师"></el-option>
                                      <el-option label="助教" value="助教"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="学院" :label-width="formLabelWidth">
                                  <el-select v-model="teacherupdate.college" placeholder="请选择学院">
                                      <el-option v-for="item in colleges" :key="item" :label="item" :value="item">
                                      </el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="学历" :label-width="formLabelWidth">
                                  <el-select v-model="teacherupdate.education" placeholder="请选择学历">
                                      <el-option label="学士" value="学士"></el-option>
                                      <el-option label="硕士" value="硕士"></el-option>
                                      <el-option label="博士" value="博士"></el-option>
                                      <el-option label="博士后" value="博士后"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="8">
                              <el-form-item label="政治面貌" :label-width="formLabelWidth">
                                  <el-select v-model="teacherupdate.political_outlook" placeholder="请选择政治面貌">
                                      <el-option label="党员" value="党员"></el-option>
                                      <el-option label="群众" value="群众"></el-option>
                                      <el-option label="共青团员" value="共青团员"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                                  <el-input v-model="teacherupdate.mail" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="电话号码" :label-width="formLabelWidth">
                                  <el-input v-model="teacherupdate.pnum" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>

                      </el-row>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="update()">修 改</el-button>
                  </div>
              </el-dialog>
          </div>
          <!-- 增加对话框 -->
          <div>
              <el-dialog title="增加教师" :visible.sync="dialogFormVisible1" width="64%">
                  <el-form :model="teacher_add">
                      <el-row>
                          <el-col :span="8">
                              <el-form-item label="姓名" :label-width="formLabelWidth">
                                  <el-input v-model="teacher_add.tname" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="教职工号" :label-width="formLabelWidth">
                                  <el-input v-model="teacher_add.tno" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="性别" :label-width="formLabelWidth">
                                  <el-radio v-model="teacher_add.tsex" label="男">男</el-radio>
                                  <el-radio v-model="teacher_add.tsex" label="女">女</el-radio>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="8">
                              <el-form-item label="职称" :label-width="formLabelWidth">
                                  <el-select v-model="teacher_add.title" placeholder="请选择职称">
                                      <el-option label="教授" value="教授"></el-option>
                                      <el-option label="副教授" value="副教授"></el-option>
                                      <el-option label="讲师" value="讲师"></el-option>
                                      <el-option label="助教" value="助教"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="学院" :label-width="formLabelWidth">
                                  <el-select v-model="teacher_add.college" placeholder="请选择学院">
                                      <el-option label="计算机科学学院" value="计算机科学学院"></el-option>
                                      <el-option label="美术学院" value="美术学院"></el-option>
                                      <el-option label="物理与工程学院" value="物理与工程学院"></el-option>
                                      <el-option label="生命与科学学院" value="生命与科学学院"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="学历" :label-width="formLabelWidth">
                                  <el-select v-model="teacher_add.education" placeholder="请选择学历">
                                      <el-option label="学士" value="学士"></el-option>
                                      <el-option label="硕士" value="硕士"></el-option>
                                      <el-option label="博士" value="博士"></el-option>
                                      <el-option label="博士后" value="博士后"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="8">
                              <el-form-item label="政治面貌" :label-width="formLabelWidth">
                                  <el-select v-model="teacher_add.political_outlook" placeholder="请选择政治面貌">
                                      <el-option label="党员" value="党员"></el-option>
                                      <el-option label="群众" value="群众"></el-option>
                                      <el-option label="共青团员" value="共青团员"></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                                  <el-input v-model="teacher_add.mail" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label="电话号码" :label-width="formLabelWidth">
                                  <el-input v-model="teacher_add.pnum" autocomplete="off"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                      <!-- <el-button type="primary" @click="add()"></el-button> -->
                      <el-button type="primary" @click="add()">添 加</el-button>
                  </div>
              </el-dialog>
          </div>
      </el-card>
  </div>

</template>
<script>
  export default {
      
      data() {
          return {
              //用来绑定搜索的教职工号
              tno: "",
              //用来绑定搜索的学院
              college: "全部学院",
              //请求过来的所有学院
              colleges: [],
              //请求过来的所有老师
              Teachers: [],
              //分页时当前页面
              currentPage: 1,
              //分页可选择的数组
              pageSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 50, 100, 200, 300, 400, 500, 1000],
              //分页size
              pageSize: 4,
              //分页后显示的老师
              Teachers4: [],
              //要增加的老师
              teacher_add: {
                  tno: '',
                  tname: '',
                  tsex: '男',
                  political_outlook: '',
                  title: '',
                  college: '',
                  education: '',
                  mail: '',
                  pnum: ''
              },
              //要修改的老师师
              teacherupdate: {},
              //控制修改对话框的显示
              dialogFormVisible: false,
              //控制增加对话框的显示
              dialogFormVisible1: false,
              //修改框的内容宽度
              formLabelWidth: '80px',
          }
      },
      computed: {
          //按条件筛选处来的老师
          Teachers2() {
              let newTeachers = []
              if (this.college == "全部学院") {
                  return this.Teachers
              }
              else {
                  for (let i = 0; i < this.Teachers.length; i++) {
                      if (this.college == this.Teachers[i].college) {
                          newTeachers.push(this.Teachers[i])
                      }

                  }
                  return newTeachers
              }
          },
          Teachers3() {
              let newTeachers = []
              //console.log("被点击了,选择的"+this.college)


              if (this.tno == '') {
                  return this.Teachers2
              } else {
                  for (let i = 0; i < this.Teachers2.length; i++) {
                      if (this.tno == this.Teachers2[i].tno) {
                          newTeachers.push(this.Teachers2[i])
                      }
                  }
                  return newTeachers
              }
          },
          //分页时的总条数
          totol() {
              var totol = this.Teachers3.length
              this.currentPage = 1
              let newTeachers = []
              var a = this.pageSize > totol ? totol : this.pageSize
              for (let i = 0; i < a; i++) {
                  newTeachers.push(this.Teachers3[i])
              }
              this.Teachers4 = newTeachers
              return this.Teachers3.length
          },
      },
      //创建组件的时候执行的函数
      created() {
          //先把所有学院请求过来
          this.getcollage()

          //然后把所有老师请求过来
          this.getallteachers()
      },
      methods: {
          //请求所有学院的方法
          getcollage() {
              this.axios({
                  url: "/AllCollegeController",
                  method: "post",
                  data: {}
              }).then((res) => {
                  console.log("获取所有学院成功")
                  console.log(res.data)
                  this.colleges = res.data.AllCollegeController
              }).catch((res) => {
                  console.log("获取所有学院失败")
              })
          },
          //请求所有老师的方法
          getallteachers() {
              this.axios({
                  url: "/FindByStaff_numberorCollegeController",
                  method: "post",
                  data: {}
              }).then((res) => {
                  console.log("获取所有老师数据成功!")
                  console.log(res.data.FindByStaff_numberorCollegeController)
                  this.Teachers = res.data.FindByStaff_numberorCollegeController
                  for (let i = 0; i < 4; i++) {
                      this.Teachers4.push(this.Teachers[i])
                  }
              }).catch((res) => {
                  console.log("获取所有老师数据失败!")
              })
          },
          //点击增加老师执行的方法
          add() {
              //console.log(this.teacher_add)
              this.axios({
                  url: "/AddTeacherController",
                  method: "post",
                  data: {
                      data: {
                          tno: this.teacher_add.tno,
                          tname: this.teacher_add.tname,
                          tsex: this.teacher_add.tsex,
                          political_outlook: this.teacher_add.political_outlook,
                          title: this.teacher_add.title,
                          college: this.teacher_add.college,
                          education: this.teacher_add.education,
                          mail: this.teacher_add.mail,
                          pnum: this.teacher_add.pnum
                      }
                  }
              }).then((res) => {
                  console.log(res.data)
                  if (res.data == 1) {
                      this.$message({
                          message: '添加成功',
                          type: 'success'
                      })
                      this.getallteachers()
                  } else {
                      this.$message.error('添加失败请稍后再试');
                  }
              }).catch((res) => {
                  this.$message.error('添加失败,网络问题稍后再试');
              })
              this.dialogFormVisible1 = false

          },
          //点击删除按钮时执行的函数
          handleClick2(tno) {
              console.log("删除的教职工号：")
              console.log(tno)
              //把教职工传给后台
              var tnos = []
              tno = tno + ""
              console.log(tno)
              tnos.push(tno)
              console.log(tnos)
              this.axios({
                  url: "/DeleteTeacherController",
                  method: "post",
                  data: {
                      data: tnos
                  }
              }).then((res) => {
                  console.log(res.data)
                  if (res.data == 1) {
                      this.$message({
                          message: '删除成功',
                          type: 'success'
                      })
                      //重新请求所有老师
                      this.getallteachers()
                  } else {
                      this.$message.error('删除失败请稍后再试');
                  }
              }).catch((err) => {
              })
          },
          //多选后点击删除按钮执行的函数
          handleClick3() {
              if (this.$refs.teachertable.selection.length != 0) {
                  console.log("点击了删除按钮")
                  console.log("打印表格已经选择行的数据")
                  var tnos = []
                  console.log("打印this.$refs.teachertable.selection")
                  console.log(this.$refs.teachertable.selection)

                  for (let i = 0; i < this.$refs.teachertable.selection.length; i++) {
                      tnos.push(this.$refs.teachertable.selection[i].tno)
                  }
                  console.log(tnos)
                  //把这个数组穿给后端
                  this.axios({
                      url: "/DeleteTeacherController",
                      method: 'post',
                      data: {
                          data: tnos
                      }
                  }).then((res) => {
                      console.log(res.data)
                      if (res.data == 1) {
                          this.$message({
                              message: '删除成功',
                              type: 'success'
                          })
                          //重新请求所有老师
                          this.getallteachers()
                      } else {
                          this.$message.error('删除失败请稍后再试');
                      }
                  }).catch((res) => {
                  })
              }
          },
          //点击修改时执行的函数
          handleClick(row) {
              //显示修改对话框
              this.dialogFormVisible = true
              this.teacherupdate = row
          },
          //对话框内点击修改执行的函数
          update() {
              //获取修改后的老师
              console.log(this.teacherupdate)
              //返还给后端
              this.axios({
                  url: "/UpdataTeacherController",
                  method: "post",
                  data: {
                      data: this.teacherupdate
                  }
              }).then((res) => {
                  console.log(res.data)
                  if (res.data == 1) {
                      this.$message({
                          message: '修改成功',
                          type: 'success'
                      })
                      //重新请求所有老师
                      this.getallteachers()
                  } else {
                      this.$message.error('修改失败请稍后再试');
                  }
                  this.dialogFormVisible = false
              })
          },
          //分页时执行的函数 size改变时
          f1(val) {
              var totol = this.totol
              this.pageSize = val
              this.currentPage = 1
              let newTeachers = []
              console.log("当前页面：" + this.currentPage)
              console.log("当前size：" + this.pageSize)
              console.log("当前总数：" + totol)
              var a = val > totol ? totol : this.pageSize
              for (let i = 0; i < a; i++) {
                  newTeachers.push(this.Teachers3[i])
              }
              this.Teachers4 = newTeachers
          },
          //当前页改变时
          f2(val) {
              this.currentPage = val
              let newTeachers = []
              var totol = this.totol
              if (val * this.pageSize > totol) {
                  let a = (val - 1) * this.pageSize
                  for (let i = a; i < totol; i++) {
                      newTeachers.push(this.Teachers3[i])
                  }
                  console.log(newTeachers)
                  this.Teachers4 = newTeachers
              } else {
                  let b = (val - 1) * this.pageSize
                  for (let i = b; i < b + this.pageSize; i++) {
                      newTeachers.push(this.Teachers3[i])
                  }
                  console.log(newTeachers)
                  this.Teachers4 = newTeachers
              }
          },
      }
  }
</script>
<style>
</style>