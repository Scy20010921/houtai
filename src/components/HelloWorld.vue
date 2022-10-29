<template>
  <div class="hello">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button @click="open" type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <p>您好</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
