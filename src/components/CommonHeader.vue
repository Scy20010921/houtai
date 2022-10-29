<template>
  <header>
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini">
      </el-button>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data() {
    return {
      userImg: require('../assets/logo.png')
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    }),
    // tags() {
    //   return this.$store.state.tab.tabsList
    // }
    // 也可以通过这种直接过去


  }
}
</script>

<style lang="less" scoped>
/deep/.el-breadcrumb__inner.is-link {
  color: #606266;
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-content {
    span {
      img {
        width: 35px;
        border-radius: 50%;
      }
    }
  }
}
</style>