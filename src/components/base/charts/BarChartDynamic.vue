<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { init } from "echarts";
require("echarts/theme/macarons2"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

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

      

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xAxisLabels,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: true
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "40%",
            data: data,
            animationDuration, // 6000
            color: "rgba(7, 57, 237, 0.8)",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(7, 57, 237, 0.2)",
              borderColor: "#000"
            }
          }
        ]
      });
    }
  }
};
</script>
