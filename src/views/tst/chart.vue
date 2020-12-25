<template>
  <v-app>
    <div class="dashboard-editor-container">
      <div :gutter="32">
        <!-- <span :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </span>
      <span :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </span>
      <span :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart :chart-data="barChartData" />
        </div>
        </span>-->
        justify: ['start','center','end','space-around','space-between',]
        <v-container>
          <v-row :justify="'center'">
            <v-col md="4">
              <v-label>start date</v-label>
              <date-picker v-model="datetime" type="datetime" class="pa-2" />
            </v-col>
            <v-col md="4">
              <v-label>end date</v-label>
              <date-picker v-model="datetime" type="datetime" class="pa-2" />
            </v-col>
          </v-row>
        </v-container>
        <span :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <zoom-chart :chart-data="zoomChartData" />
          </div>
        </span>
      </div>
    </div>
  </v-app>
</template>

<script>
// Equivalent to `axios.get('https://httpbin.org/get?answer=42')`
// const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });

import LineChart from "@/components/base/charts/LineChartDynamic";
import PieChart from "@/components/base/charts/PieChartDynamic";
import BarChart from "@/components/base/charts/BarChartDynamic";
import ZoomChart from "@/components/base/charts/ZoomChartDynamic";
import { mapActions, mapGetters } from "vuex";

const chartDatas = {
  lineChartData: {
    data: [
      {
        name: "line1 name",
        data: [120, 82, 91, 154, 162, 140, 130]
      },
      {
        name: "line2 name",
        data: [180, 160, 151, 106, 145, 150, 130]
      },
      {
        name: "line3 name",
        data: [80, 100, 121, 104, 105, 90, 100]
      },
      {
        name: "line4 name",
        data: [100, 120, 161, 134, 105, 160, 165]
      }
    ],
    xAxisLabels: ["one", "two", "three", "four", "five", "six", "seven"]
  },
  pieChartData: {
    pieCN: "Pie Chart Name",
    data: [
      { name: "type1", value: 800 },
      { name: "type2", value: 500 },
      { name: "type3", value: 300 },
      { name: "type4", value: 200 },
      { name: "type5", value: 100 }
    ]
  },
  barChartData: {
    data: [120, 82, 91, 154, 162, 140, 130],
    xAxisLabels: ["one", "two", "three", "four", "five", "six", "seven"]
  }
};

export default {
  name: "DashboardAdmin",
  components: {
    LineChart,
    PieChart,
    BarChart,
    ZoomChart
  },
  data() {
    return {
      lineChartData: chartDatas.lineChartData,
      pieChartData: chartDatas.pieChartData,
      barChartData: chartDatas.barChartData,
      zoomChartData: null,
      datetime: ""
    };
  },
  created() {
    this.actGetObamaBudget()
      .then(() => {
        // let obamaBudget = getStateObamaBudget;
        // console.log("from chart.vue");
        this.getZoomChartData();
      })
      .catch(err => {
        // console.log("error getting obamaBudget chart.vue");
        console.log(err);
      });
  },
  computed: {
    ...mapGetters("storeChartData", ["getStateObamaBudget"])
  },

  methods: {
    getZoomChartData() {
      console.log("getZoomChartData() is called");
      console.log(this.getStateObamaBudget);
      this.zoomChartData = this.getStateObamaBudget;
    },
    ...mapActions("storeChartData", ["actGetObamaBudget"]),
    handleSetchartDatas(type) {
      this.chartDatas = chartDatas[type];
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
