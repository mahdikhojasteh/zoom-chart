<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { init } from "echarts";
require("echarts/theme/helianthus"); // echarts theme
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
      this.chart = init(this.$el, "helianthus");
      this.setOptions(this.chartData);
    },
    setOptions({ xAxisLabels, data } = {}) {
      let plotData = [];
      let legends = [];
      let formatterNames = "";
      let counter = 0;
      for (let e in data) {
        formatterNames += `{a${counter}} <br/>`;
        counter += 1;
        legends.push(data[e].name);
        plotData.push({
          name: data[e].name,
          lineStyle: {
            // color: data[e].color,
            width: 2,
            type: "solid" // solid, dashed, dotted
          },
          smooth: true,
          type: "line",
          data: data[e].data,
          animationDuration: 2800,
          animationEasing: "cubicInOut"
        });
      }

      // console.log(formatterNames);

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
          right: 15,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis", // item, axis
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10],
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          // formatter: formatterNames+" <br/>{b} : {c}" //{a} for series name, {b} for category name, {c} for data value
          // formatter: function(params) {
          //   var colorSpan = color =>
          //     '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
          //     color +
          //     '"></span>';
          //   let rez = "<p>" + params[0].axisValue + "</p>";
          //   //console.log(params); //quite useful for debug
          //   params.forEach(item => {
          //     //console.log(item); //quite useful for debug
          //     var xx =
          //       "<p>" +
          //       colorSpan(item.color) +
          //       " " +
          //       item.seriesName +
          //       ": " +
          //       item.data +
          //       "%" +
          //       "</p>";
          //     rez += xx;
          //   });

          //   return rez;
          // }
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
