<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button">home</router-link>
    <router-link to="/jome" tag="button">jome</router-link>
    <router-link to="/kome" tag="button">kome</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // methods:{
  //   totest(){
  //     this.$router.push('/TestBuju')
  //   }
  // }
  
}

</script>

<style scoped>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.active{
  background-color: brown;
  /* position: absolute; */
  /* left: 50%;
  top: 50%;
  transform: translate(-50%,-50%); */
}
</style>
