<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style=" padding:0;margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="">
          <div class="user-info">
            <p class="name">
              Admin
            </p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2021-7-19</span></p>
          <p>上次登录地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px;height:460px" shadow="hover">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">

          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding:0;margin-top:20px">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{display: 'flex',padding:0}">
          <i class="icon" :class="'el-icon-'+item.icon" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="sum">
              ￥{{item.value}}
            </p>
            <div class="txt">￥{{item.name}}</div>
          </div>
        </el-card>

      </div>
      <el-card style="height:280px;margin:20px 0;width:98%">
        <div style="height:280px" ref="echarts"></div> <!-- ref 用于获取当前dome节点 -->
      </el-card>

      <div class="graph" style="display:flex">
        <el-card style="height:260px;width:47%;margin-right:4%">
          <div style="height:240px" ref="userEcharts"></div>
        </el-card>
        <el-card style="height:260px;width:47%">
          <div style="height:240px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../../api/data.js'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      userImg: require('../../assets/logo.png'),
      tableData: [
      ],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: []
    }
  },
  mounted() {
    getData().then(res => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        this.countData = data.countData
        const order = data.orderData
        // 定义 order常量 获得 接口中的data的orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        // 定义 keyArray常量 获得 接口中的data的orderData的data中的每一条数据下标为0的数据 相当于每天数据的第一个数据 竖列获取
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        console.log(series, 'series');
        // 循环遍历keyArray 将数据赋值到series新数组 name为keyArray的值 一个一个赋值 
        //  data为order中的每一条与name相同的数据 type为echarts图表格式
        const option = {
          title: {
            text: '折线表'
          },
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray        //当数据中没有需要定义分类的图时候可以写texyStyle:{color:"#333"}
          },
          series
        }
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)

        const userOption = {
          legend: {                           //当数据中没有需要定义分类的图时候可以写texyStyle:{color:"#333"}
            textStyle: {
              color: "#333"   // 文字颜色     
            }
          },
          // grid: {                    //右边移动20% 
          //   left: "20%"
          // },
          tooltip: {
            trigger: "axis"     //添加后当鼠标触碰时会出现数据分析
          },
          xAxis: {
            // type: "category", //类目轴
            data: data.userData.map(item => item.date),
            // axisLine: {
            //   lineStyle: {
            //     color: "#17b3a3"
            //   },
            // },
            // axisLael: {
            //   interval: 0,
            //   color: "#333"
            // }
          },
          yAxis: [      //此处的yAxis可以更改为 yAxis{} 效果一样
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "17b3a3"
                }
              }
            }
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [{
            name: '新增用户',
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
          }
          ]
        }
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)
        const videoOption = {
          // title: {
          //   // left: 'center'
          // },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'data.videoData.map(item => item.name)',
              type: 'pie',
              radius: '80%',
              data: data.videoData,

            }
          ]
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }

      console.log(res)
      // 用户图

    })
  }
}
</script>

<style lang="less" scoped>
.el-col {
  margin: 0;
  padding: 0;
}
.home {
  .login-info {
    margin-top: 30px;
    p {
      color: rgb(158, 148, 148);
      font-size: 12px;
    }
    span {
      margin-left: 80px;
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    .detail {
      p {
        margin: 0;
        padding: 0;
      }
      .sum {
        font-size: 30px;
        margin: 10px;
      }
      .txt {
        margin-left: 20px;
        color: rgb(221, 221, 221);
      }
    }

    .el-card {
      width: 32%;
      margin-right: 1%;
    }
    .icon {
      width: 100px;
      height: 100px;
      font-size: 35px;
      text-align: center;
      line-height: 100px;
      color: #fff;
    }
  }
  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(156, 147, 147);
    img {
      margin-right: 40px;
      margin-bottom: 20px;
      width: 150px;
      border-radius: 50%;
    }
  }
}
</style>