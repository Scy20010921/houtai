<template>
  <div>
    <el-menu default-active="1-4-1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <h3>{{isCollapse?'后台':'通用后台管理系统'}}</h3>
      <el-menu-item @click="clickMenu(item)" :index="item.path" v-for="item in noChildren" :key="item.path">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="subItem in item.children" :key="subItem.path" @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [{
        path: '/main/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      },
      {
        path: '/main/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'MallManage/MallManage'
      },
      {
        path: '/main/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'UserManage/UserManage'
      }, {
        label: '其他',
        icon: 'location',
        children: [
          {
            path: '/main/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'Other/PageOne'
          },
          {
            path: '/main/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'Other/PageTwo'
          }
        ]
      }

      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        path: item.path
      }),
        this.$store.commit('selectMenu', item)
      console.log(item);
    }
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children) //过滤没有子项目
    },
    hasChildren() {
      return this.menu.filter(item => item.children)  //过滤有子项目
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },

}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>