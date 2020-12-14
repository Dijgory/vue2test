<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/img/jwc.png" alt="">
        <span>教学管理系统</span>
      </div>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" 
        active-text-color="#409BFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router>
          <!-- 一级菜单 -->
          <el-submenu index="1">
          <!-- 一级菜单模板区 -->


            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>基础信息管理</span>
            </template>


            <!-- 二级菜单 -->
            <el-menu-item index="indexcourse">
              <template slot="title">
                <i class="el-icon-date"></i>
                <span>课程管理</span>
              </template>
            </el-menu-item>

            <el-menu-item index="indexclass">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>班级管理</span>
              </template>
            </el-menu-item>
            
          </el-submenu>
        </el-menu>
      </el-aside>         
      <el-main>
<!--         
        <div class="el-main-header">
          <p>用户：admin</p>
          <p>角色：管理员</p>
        </div> -->
        <router-view></router-view>
      </el-main>           
    </el-container>
  </el-container>
</template>
<!-- <script type="text/javascript" src="../../mock/index3.js">  </script> -->
<script>
    export default{
        // name:"Home",
        methods:{
          // 点击按钮控制菜单栏的折叠与展开
          toggleCollapse(){
            this.isCollapse = !this.isCollapse
          }
        },
        data(){
          return{
            isCollapse: false
          }
        },
    }
    
</script>
<style>
    .home-container{
        height: 100%;
    }
    .el-header {
    background-color: #4A5064;
    color: #333;
    text-align: center;
    line-height: 60px;
    display:flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
  .el-header > div {
      display: flex;
      align-items: center;
    }
  .el-header > div >span{
    margin-left: 15px;
  }
  
  /* .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  } */

  .el-aside {
    background-color: #333744;
    color: #333;
    text-align: center;
    /* width: 55%; */
    line-height: 200px;
  }
  .el-aside .el-menu{
    border-right: none;
  }
  
  .toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  .el-main-header{
    display: flex;
    position: absolute;
    padding-top: 0%;
    /* height: 30px; */
  }
  .el-main-header >p{
    display: flex;
    padding-top: none;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>