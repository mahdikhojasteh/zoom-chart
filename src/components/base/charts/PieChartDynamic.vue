<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import {init} from "echarts";
require("echarts/theme/azul"); // echarts theme
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
      this.chart = init(this.$el, "azul");
      this.setOptions(this.chartData);
    },
    setOptions({ data, pieCN } = {}) {

      let plotData = [];
      let legends = [];
      for (let e in data) {
        legends.push(data[e].name);
        plotData.push({ value: data[e].value, name: data[e].name });
      }

      this.chart.setOption({
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: legends//["Industries", "Technology", "Forex", "Gold", "Forecasts"]
        },
        series: [
          {
            name: pieCN,
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: plotData,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
