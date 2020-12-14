<template>
    <div>
      <!--flex弹性盒子模型，justify-content：主抽 -->
      <div style="display: flex;justify-content: center;margin-top: 150px">
        <el-card style="width: 400px">
          <div slot="header" class="clearfix">
            <span>登录</span>
          </div>
          <el-form  ref="loginref" :model="user">
          
          <table>
            <el-form-item>
            <tr>
              <td>账号:</td>
              <td>
                <el-input v-model="user.account" placeholder="请输入用户名"></el-input>
              </td>
            </tr>
            </el-form-item>
            <el-form-item>
            <tr>
              <td>密码:</td>
              <td>
                <el-input type="password" v-model="user.pswd" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
                <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
              </td>
            </tr>
          </el-form-item>
            <tr>
              <!-- 占两行-->
              <td colspan="2">
                <!-- 点击事件的两种不同的写法v-on:click和 @click-->
                <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
                <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
              </td>
            </tr>
          </table>
        </el-form>
        </el-card>
      </div>
    </div>
  </template>
  <script>
    export default {
      //单页面中不支持前面的data:{}方式
      data() {
        //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
        return{
          //之前是在里面直接写username，password等等，但是这里要写return
          //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
          //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
          //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
          //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
          //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
          user:{
            account:'',
            pswd:'',
          }
        }
      },
      methods:{
        
        // doLogin(){//一点击登录按钮，这个方法就会执行

        //   // // 下面是判断表单的输入合法性，与后面没什么多大的联系
        //   // this.$refs.loginref.validate(async valid =>{
        //   //   if (!valid) return;

        //   //   // 主要的一步post方法
        //   //   const res=await this.$http.post("http://localhost:8080/login",this.user)
        //   //   // 上面的res是得到的post响应对象数据
        //   //   // 注意res.data才是对象内容，res.data.data才是里面的data
            
        //   //   console.log(res.data.data.token)
        //   //   window.sessionStorage.setItem("token",res.data.data.token)
        //   //   this.$router.push('/home')
        //   // })
        //   this.$router.push('/home')
        //   // alert(JSON.stringify(this.user))//可以直接把this.user对象传给后端进行校验用户名和密码
        // },

        // // 删除数组函数
        // Arraydelete(a,b){
        //   for(var i=0;i<a.length;i++){
        //     for(var j=0;j<b.length;j++){
        //       if(a[i]==b[j]){
        //         a.splice(i,1)
        //         return a
        //       }
        //     }
        //   }
        // },


        // // 增删函数
        // Arrayzengshan(a,b,q){
        //   var c = []
        //   var c = a.concat(b)
        //   var d=[]
        //   var d = Array.from(new Set(c))
        //   var i =d.length
        //   if(a.length >= i){
        //     var e = this.Arraydelete(a,b)
        //     var f = this.Arraydelete(q.e)
        //     return f
        //   }
        //   else{
        //     var g = this.Arraydelete(d,a)
        //     var h = q.concat(g)
        //     return h
        //   }
        // },



        doLogin(){
          // 数组去重办法
          // var oo =Array.from(new Set(["11","0","11","88","22","33","44"]))
          // var bb =["88","55"]
          // var cc=oo.concat(bb)
          // console.log(cc)

          // var a=this.Arraydelete(oo,bb)
          // console.log(a)
          // 删除元素
          // for(var i=0;i<oo.length;i++){
          //   for(var j=0;j<bb.length;j++){
          //     if(oo[i]==bb[j]){
          //       oo.splice(i,1)
          //       console.log(bb)
          //       console.log(oo)
          //     }
          //   }
          // }
          // var a =["11","13","15","18"]
          // var b = ["11","15"]
          // var q = ["11","13","15","18","9","8","5","1"]
          // var g = this.Arrayzengshan(a,b,q)
          // console.log(g)
            
          // this.$http.post("/login",this.user)
          // .then((res)=>{
          //   console.log(this.user)
          //   console.log(res)

          //   this.$router.push('/home')
          // })
          // .catch((err)=>{
          //   console.log(err)
          // })


          var xml = new XMLHttpRequest()
          xml.open("POST",'/login',true)
          xml.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
            xml.send(this.user);
            xml.onreadystatechange = function(){
                if(xml.readyState==4&&xml.status==200){
                    var data = JSON.parse(xml.responseText)
                }
            }
            this.$router.push('/home')
        },

        
        
      },
     
    }
  </script>