<!-- 保存删除了的代码 -->

<!-- --indexclass判断行是否相等 -->
for(let i = 0;i<this.editcourselist.length;i++){
  // console.log(this.editcourselist[i])
  // this.$refs.editcourseRef.toggleRowSelection(this.editcourselist[i],true)
  for(let j = 0;j<this.editnorepcourse.length;j++){
    // console.log(JSON.stringify(this.editcourselist[i])===JSON.stringify(this.editnorepcourse[j]))
    if(JSON.stringify(this.editcourselist[i])===JSON.stringify(this.editnorepcourse[j])){
      // console.log(this.editcourselist[i]==this.editnorepcourse[j])
      this.$refs.editcourseRef.toggleRowSelection(this.editcourselist[i],true)
    }
  }
}