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
      validator: (value) => {
        return Array.isArray(value) && 
          value.every(item => item && item.date_from && item.date_to);
      }
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "rangeBar",
          height: 500,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            colors: { ranges: [{ from: 0, to: 100, color: "#365811" }] },
          },
        },
        xaxis: {
          categories: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
        },
        yaxis: {
          min: 0,
          max: 24,
          tickAmount: 8,
          labels: {
            formatter: (val) => val === 24 ? '00:00' : `${Math.floor(val)}:00`
          },
        },
        tooltip: {
          enabled: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            console.log(series);
            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            if (!data || !data.y) {
              return '<div class="tooltip-box">Нет данных</div>';
            }

            const [start, end] = data.y;
            const day = w.globals.labels[dataPointIndex];

            const formatTime = (val) => {
              if (val >= 24) val -= 24;
              const hours = Math.floor(val);
              const minutes = Math.round((val - hours) * 60);
              return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            };

            return `
              <div class="tooltip-box">
                <strong>${day}</strong>
                <div>${formatTime(start)} - ${formatTime(end)}</div>
              </div>
            `;
          }
        },
      },
    };
  },
  computed: {
    chartSeries() {
      if (!this.scheduleData || this.scheduleData.length === 0) return [];

      const dayMap = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
      
      return [{
        name: "Часы работы",
        data: this.scheduleData.map(item => {
          try {
            const startDate = new Date(item.date_from);
            const endDate = new Date(item.date_to);
            
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              console.error('Invalid date format:', item);
              return null;
            }

            const startHours = startDate.getHours();
            const startMinutes = startDate.getMinutes();
            const endHours = endDate.getHours();
            const endMinutes = endDate.getMinutes();
            
            const startDecimal = startHours + (startMinutes / 60);
            let endDecimal = endHours + (endMinutes / 60);
            
            if (endDecimal < startDecimal) {
              endDecimal += 24;
            }
            
            if (endHours === 0 && endMinutes === 0) {
              endDecimal = 24;
            }

            return {
              x: dayMap[startDate.getDay()],
              y: [startDecimal, endDecimal],
            };
          } catch (e) {
            console.error('Error processing shift:', item, e);
            return null;
          }
        }).filter(Boolean)
      }];
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  min-height: 400px;
}

:deep(.tooltip-box) {
  padding: 8px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border: 1px solid #eee;
}
:deep(.tooltip-box strong) {
  display: block;
  margin-bottom: 4px;
  color: #333;
}
:deep(.tooltip-box div) {
  color: #666;
}
</style>