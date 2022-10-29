export default {
  state: {
    isCollapse: false,
    tabsList: [{ path: '/main/home', name: 'home', label: '首页', icon: 'home' }], //传入一个默认值 公共值
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      //传入参数 state是上面的数据 val为被点击的那个地方的数据 新建方法 如果拿到点击事件的那个数据
      if (val.name !== 'home') {
        //如果拿到的数据里面的名字不是为home
        const result = state.tabsList.findIndex((item) => item.name === val.name)
        //findIndex返回该元素的第一个下标 没有则为-1  返回该数据的下标位置 没有该数据的返回-1
        if (result === -1) {
          state.tabsList.push(val) //如果没有这个 则向数组末尾添加该元素
        }
      }
    },
    closeTag(state, val) {
      //state 为上面state的值
      const result = state.tabsList.findIndex((item) => item.name === val.name)
      // 查找state的值 如果state中有传过来的值 则返回他所在的下标
      state.tabsList.splice(result, 1)
      //拿到下标后使用数组中splice的方法删除该元素
    },
  },
}
