<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import {init} from "echarts";
require("echarts/theme/macarons2"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = init(this.$el, "macarons2");
      this.setOptions(this.chartData);
    },
    setOptions({ xAxisLabels, data } = {}) {
     
     let plotData = [];
     let legends = [];
      for (let e in data) {
        legends.push(data[e].name);
        plotData.push({
          name: data[e].name,
          lineStyle: {
            color: data[e].color, 
            width: 2,
            type: 'solid' // solid, dashed, dotted
          },
          smooth: true,
          type: "line",
          data: data[e].data,
          animationDuration: 2800,
          animationEasing: "cubicInOut"
        });
      };

      this.chart.setOption({
        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: xAxisLabels || [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
          ], // or default
          type: "category", // 'value', 'category', 'time'
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          // type:'value',// 'value', 'category', 'time'
          axisTick: {
            show: true
          }
        },
        legend: {
          data: legends
        },
        series: plotData
      });
    }
  }
};
</script>
