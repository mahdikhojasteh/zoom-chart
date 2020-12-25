<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { init, format } from "echarts";
require("echarts/theme/macarons2"); // echarts theme
require("echarts");
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
      required: false,
      default: null
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
        this.chart.hideLoading();
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
      if (this.chartData === null) {
        this.chart.showLoading();
      } else {
        this.setOptions(this.chartData);
      }
    },
    setOptions(data) {
      this.chart.setOption({
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        legend: {
          data: ["Budget 2011", "Budget 2012"],
          itemGap: 5
        },
        grid: {
          top: "12%",
          left: "1%",
          right: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: data.names
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "Budget (million USD)",
            axisLabel: {
              formatter: function(a) {
                a = +a;
                return isFinite(a) ? format.addCommas(+a / 1000) : "";
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 94,
            end: 100
          },
          {
            type: "inside",
            start: 94,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: "empty",
            width: 30,
            height: "80%",
            showDataShadow: false,
            left: "93%"
          }
        ],
        series: [
          {
            name: "Budget 2011",
            type: "bar",
            data: data.budget2011List
          },
          {
            name: "Budget 2012",
            type: "bar",
            data: data.budget2012List
          }
        ]
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow" // 'line' | 'shadow'
        //   },
        //   backgroundColor: "rgba(255, 255, 255, 0.85)"
        // },
        // grid: {
        //   top: 10,
        //   left: "2%",
        //   right: "2%",
        //   bottom: "3%",
        //   containLabel: true
        // },
        // xAxis: [
        //   {
        //     type: "category",
        //     data: xAxisLabels,
        //     axisTick: {
        //       alignWithLabel: true
        //     }
        //   }
        // ],
        // yAxis: [
        //   {
        //     type: "value",
        //     axisTick: {
        //       show: true
        //     }
        //   }
        // ],
        // series: [
        //   {
        //     type: "bar",
        //     barWidth: "40%",
        //     data: data,
        //     animationDuration, // 6000
        //     color: "rgba(7, 57, 237, 0.8)",
        //     showBackground: true,
        //     backgroundStyle: {
        //       color: "rgba(7, 57, 237, 0.2)",
        //       borderColor: "#040d70",
        //       borderWidth: 3
        //     }
        //   }
        // ]
      });
    }
  }
};
</script>
