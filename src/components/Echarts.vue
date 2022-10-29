<template>
  <div ref="echart"></div>
</template>

<script>
// import *as echarts from 'echarts'
export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default() {
        return {
          xDate: [],
          series
        }
      }
    }
  }
}
</script>

<style>
</style>