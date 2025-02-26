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
    scheduleData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "rangeBar",
          height: 700,
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
          min: 8, // Начало с 0:00
          max: 24, // Конец в 24:00
          tickAmount: 16, // Количество делений
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
      try {
        console.log("scheduleData:", this.scheduleData); // Для отладки

        if (this.scheduleData && this.scheduleData.length > 0) {
          const dayMapping = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
          const seriesData = this.scheduleData.map((entry) => {
            const startTime = new Date(entry.dateFrom).getHours(); // Локальное время
            let endTime = new Date(entry.dateTo).getHours(); // Локальное время

            // Если endTime равно 0 (00:00), заменяем на 24
            if (endTime === 0) {
              endTime = 24;
            }

            const dayOfWeek = dayMapping[new Date(entry.dateFrom).getDay()]; // День недели

            console.log("entry:", entry);
            console.log("startTime:", startTime);
            console.log("endTime:", endTime);
            console.log("dayOfWeek:", dayOfWeek);

            return {
              x: dayOfWeek,
              y: [startTime, endTime],
            };
          });

          console.log("seriesData:", seriesData); // Отладка

          return [
            {
              name: "Рабочие часы",
              data: seriesData,
            },
          ];
        } else {
          console.error("scheduleData is empty or not provided");
          return [];
        }
      } catch (err) {
        console.error("Error in chartSeries computation:", err);
        return [];
      }
    },
  },
  mounted() {
    console.log("Props scheduleData:", this.scheduleData); // Проверка передачи данных
  },
};
</script>

<style scoped>
div {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
