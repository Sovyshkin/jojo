<template>
  <div>
    <apexchart
      type="rangeBar"
      :options="chartOptions"
      :series="chartSeries"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "ChartBar",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    scheduleData: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "rangeBar",
          height: 500,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            barHeight: "80%",
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 100,
                  color: "#365811", // Цвет столбцов
                },
              ],
            },
          },
        },
        xaxis: {
          categories: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
          title: {
            text: "",
            style: {
              fontSize: "14px",
            },
          },
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          min: 9,
          max: 19,
          tickAmount: 10,
          title: {
            text: "",
            style: {
              fontSize: "14px",
            },
          },
          labels: {
            formatter: (value) => `${value}:00`,
          },
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: (value) => `${value}:00`,
          },
        },
        dataLabels: {
          enabled: false,
        },
      },
    };
  },
  computed: {
    chartSeries() {
      console.log("scheduleData:", this.scheduleData); // Для отладки
      if (Array.isArray(this.scheduleData)) {
        // Проверяем, массив ли это
        const dayMapping = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        const seriesData = this.scheduleData.map((entry) => {
          const startTime = new Date(entry.dateFrom).getHours();
          const endTime = new Date(entry.dateTo).getHours();
          const dayOfWeek = dayMapping[new Date(entry.dateFrom).getDay()];
          return { x: dayOfWeek, y: [startTime, endTime] };
        });

        return [
          {
            name: "Рабочие часы",
            data: seriesData,
          },
        ];
      } else {
        console.error("scheduleData is not an array:", this.scheduleData);
        return [];
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
div {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
