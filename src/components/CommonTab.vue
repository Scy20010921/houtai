<template>
  <div class="tabs">
    <el-tag size="small" v-for="(tag,index) in tags" :closable="tag.name!=='home'" :key="tag.path" :effect="$route.name==tag.name?'dark'
    :'plain'" @click="changeMenu(tag)" @close="handleClose(tag,index)">
      {{tag.label}}
    </el-tag>
    <!-- 唯一标识 -->
    <!-- effect主题 上面如果相同就是有色彩的主题 不相同即为白色  -->
    <!-- closable是否关闭 如果为false为不关闭 如果为true则关闭 -->
  </div>
</template>
F
<script>


export default {
  name: 'CommonTag',
  data() {
    return {

    }
  },
  methods: {

    changeMenu(item) {

      this.$router.push({ path: item.path })

    },
    handleClose(tag, index) {
      const length = this.tags.length - 1
      this.$store.commit('closeTag', tag)
      if (index === length) {
        this.$router.push(
          {
            name: this.tags[index - 1].name
          }
        )
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }

    },

  },
  computed: {
    tags() {
      return this.$store.state.tab.tabsList
    }
    // ...mapState({
    //   tags: state => state.tab.tabsList
    // })

  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>