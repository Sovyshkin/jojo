<template>
  <div class="chart-container">
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
          height: 500, // Уменьшаем высоту для мобильных устройств
          width: "100%",
          toolbar: {
            show: false, // Скрываем тулбар на мобильных устройствах
          },
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
              fontSize: "12px", // Уменьшаем размер шрифта
            },
          },
          labels: {
            style: {
              fontSize: "10px", // Уменьшаем размер шрифта
            },
          },
        },
        yaxis: {
          min: 8, // Начало с 8:00
          max: 24, // Конец в 24:00
          tickAmount: 16, // Уменьшаем количество делений для мобильных устройств
          title: {
            text: "",
            style: {
              fontSize: "12px", // Уменьшаем размер шрифта
            },
          },
          labels: {
            formatter: (value) => `${value}:00`,
            style: {
              fontSize: "10px", // Уменьшаем размер шрифта
            },
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
        responsive: [
          {
            breakpoint: 480, // Настройки для экранов меньше 480px
            options: {
              chart: {
                height: 350, // Уменьшаем высоту для мобильных устройств
              },
              xaxis: {
                labels: {
                  style: {
                    fontSize: "10px", // Уменьшаем размер шрифта
                  },
                },
              },
              yaxis: {
                min: 8, // Начало с 8:00
                max: 24, // Конец в 24:00
                tickAmount: 16, // Уменьшаем количество делений для мобильных устройств
                labels: {
                  style: {
                    fontSize: "10px", // Уменьшаем размер шрифта
                  },
                },
              },
            },
          },
        ],
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
.apexcharts-canvas {
  min-height: 300px !important;
  width: 100% !important;
}

.chart-container {
  width: 100%;
  overflow-x: auto;
}
</style>
