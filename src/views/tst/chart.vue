<template>
  <div class="dashboard-editor-container">
    <div :gutter="32">
      <span :xs="24" :sm="24" :lg="8">
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
      </span>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/base/charts/LineChartDynamic";
import PieChart from "@/components/base/charts/PieChartDynamic";
import BarChart from "@/components/base/charts/BarChartDynamic";

const chartDatas = {
  lineChartData: {
    data: [
      {
        name: "type1",
        color: "#db1f1f",
        data: [120, 82, 91, 154, 162, 140, 130]
      },
      {
        name: "type2",
        color: "#2011f2",
        data: [180, 160, 151, 106, 145, 150, 130]
      },
      {
        name: "type3",
        color: "#0af26e",
        data: [80, 100, 121, 104, 105, 90, 100]
      },
      {
        name: "type4",
        color: "#590be0",
        data: [100, 120, 161, 134, 105, 160, 165]
      }
    ],
    xAxisLabels: ["one", "two", "three", "four", "five", "six", "seven"]
  },
  pieChartData: {
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
    BarChart
  },
  data() {
    return {
      lineChartData: chartDatas.lineChartData,
      pieChartData: chartDatas.pieChartData,
      barChartData: chartDatas.barChartData
    };
  },
  methods: {
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
