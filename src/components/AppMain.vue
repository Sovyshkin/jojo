<script>
import axios from "axios";
import ChartBar from "./ChartBar.vue";
import DataToggler from "./DataToggler.vue";
export default {
  name: "AppMain",
  components: { ChartBar, DataToggler },
  data() {
    return {
      cards: [],
      tasks: [
        {
          id: 1,
          desc: "Задача 1",
          done: false,
          userID: 1,
          deadline: "",
        },
        {
          id: 2,
          desc: "Задача 2",
          done: false,
          userID: 1,
          deadline: "",
        },
        {
          id: 3,
          desc: "Задача 3",
          done: true,
          userID: 1,
          deadline: "",
        },
      ],
      phone: "",
      passport: false,
      medcine: false,
      currentMonthType: "now",
      hours_working: 0,
      hours_working_Previous: 0,
      give_me_my_money: 0,
      give_me_my_money_Previous: 0,
      scheduleData: [],
      filteredChartData: [],
      currentWeek: { start: null, end: null },
      earliestDate: null,
    };
  },
  computed: {
    currentHours() {
      return this.currentMonthType === "now"
        ? this.hours_working
        : this.hours_working_Previous;
    },
    currentMoney() {
      return this.currentMonthType === "now"
        ? this.give_me_my_money
        : this.give_me_my_money_Previous;
    },
  },
  methods: {
    async load_kpi() {
      try {
        let response = await axios.post(`/kpi`);
        this.cards = response.data.kpi;
      } catch (err) {
        console.log(err);
      }
    },
    async load_info() {
      try {
        const response = await axios.post(`/tasks/by_user`, {
          params: { phone: localStorage.getItem("phone") },
        });
        this.scheduleData = response.data.schedules?.schedule_only || [];
        this.tasks = response.data.tasks || [];
        this.hours_working = response.data.schedules?.hours_working || 0;
        this.hours_working_Previous =
          response.data.schedules?.hours_working_Previous || 0;
        this.give_me_my_money = response.data.schedules?.give_me_my_money || 0;
        this.give_me_my_money_Previous =
          response.data.schedules?.give_me_my_money_Previous || 0;
        this.setEarliestDate();
        this.initCurrentWeek();
        this.updateFilteredChartData();
      } catch (err) {
        console.error("Error loading info:", err);
      }
    },
    handleWeekChanged(week) {
      this.currentWeek = week;
      this.updateFilteredChartData();
    },
    initCurrentWeek() {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - diff);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      this.currentWeek = {
        start: weekStart.toISOString().split("T")[0],
        end: weekEnd.toISOString().split("T")[0],
      };
    },
    updateFilteredChartData() {
      if (!this.currentWeek.start) {
        this.filteredChartData = [];
        return;
      }
      const weekStart = new Date(this.currentWeek.start);
      const weekEnd = new Date(this.currentWeek.end);
      weekStart.setHours(0, 0, 0, 0);
      weekEnd.setHours(23, 59, 59, 999);
      this.filteredChartData = (this.scheduleData || []).filter((entry) => {
        if (!entry.date_from) return false;
        try {
          const shiftDate = new Date(entry.date_from);
          return shiftDate >= weekStart && shiftDate <= weekEnd;
        } catch (e) {
          console.error("Ошибка обработки даты:", entry.date_from, e);
          return false;
        }
      });
      const now = new Date();
      const selectedMonth = new Date(this.currentWeek.start).getMonth();
      const currentMonth = now.getMonth();
      this.currentMonthType =
        selectedMonth === currentMonth ? "now" : "previous";
    },
    setEarliestDate() {
      if (!this.scheduleData.length) return;
      const validDates = this.scheduleData
        .map((entry) => {
          try {
            return new Date(entry.date_from);
          } catch {
            return null;
          }
        })
        .filter((date) => date && !isNaN(date.getTime()));
      if (validDates.length === 0) return;
      const minDate = new Date(Math.min(...validDates));
      const dayOfWeek = minDate.getDay();
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const weekStart = new Date(minDate);
      weekStart.setDate(minDate.getDate() + diff);
      this.earliestDate = weekStart.toISOString().split("T")[0];
    },
    check_verify() {
      try {
        this.phone = localStorage.getItem("phone");
        if (!this.phone) {
          this.$router.push({ name: "login" });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async changeComp(id, value) {
      try {
        await axios.post(`/tasks/set_completed`, {
          params: { id, completed: value },
        });
      } catch (err) {
        console.log(err);
      }
    },
    lowerText(text) {
      if (typeof text !== "string") return "";
      if (text.length === 0) return "";
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
  },
  mounted() {
    this.check_verify();
    this.load_kpi();
    this.load_info();
  },
};
</script>

<template>
  <div class="main-content">
    <div class="card">
      <div class="wrap-btns" v-if="phone == '+79449445678'">
        <button @click="$router.push({ name: 'personal_data' })" class="btn">
          Добавить сотрудника
        </button>
        <button @click="$router.push({ name: 'create_task' })" class="btn">
          Создать задачу
        </button>
      </div>
      <div class="wrap-btns" v-if="passport || medcine">
        <button
          class="btn"
          v-if="passport"
          @click="$router.push({ name: 'scan_passport' })"
        >
          Прикрепить паспорт
        </button>
        <button
          class="btn"
          v-if="medcine"
          @click="$router.push({ name: 'scan_medcine' })"
        >
          Прикрепить мед. книжку
        </button>
      </div>
      <h1 class="kpi">KPI</h1>
      <div class="wrap-group">
        <div class="group" v-for="card in cards" :key="card.title">
          <span>{{ lowerText(Object.keys(card)[0]) }}</span>
          <div class="wrap-scale">
            <div
              class="scale"
              :style="'width: ' + Object.values(card)[0] + '%'"
            ></div>
          </div>
          <div class="percent">{{ Object.values(card)[0] }}%</div>
        </div>
      </div>
      <h1>Задачи</h1>
      <div class="tasks" v-if="tasks.length > 0">
        <div class="task" v-for="(task, i) in tasks" :key="i">
          <input
            v-model="task.completed"
            type="checkbox"
            :id="task + i"
            @change="changeComp(task.id, task.completed)"
          />
          <label :for="task + i">{{ task.title }}</label>
        </div>
      </div>
      <div class="empty" v-else>
        <span>Сегодня задач нет</span>
      </div>
      <h1>График</h1>
      <div class="fields">
        <div class="field">
          <span class="field-item">Отработано:</span>
          <span class="field-value">{{ currentHours }} ч.</span>
        </div>
        <div class="field">
          <span class="field-item">Заработано:</span>
          <span class="field-value">{{ currentMoney }} руб.</span>
        </div>
      </div>

      <DataToggler
        @week-changed="handleWeekChanged"
        :earliestDate="earliestDate"
      />

      <div class="wrap-bar" v-if="filteredChartData.length > 0">
        <ChartBar
          :scheduleData="filteredChartData"
          :key="JSON.stringify(filteredChartData)"
        />
      </div>
      <div v-else>
        <p>Нет смен на выбранную неделю</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  width: 100%;
  padding-bottom: 80px; /* Отступ для навигации */
}

.card {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.wrap-scale {
  position: relative;
  max-width: 200px;
  border-radius: 10px;
  height: 10px;
  overflow: hidden;
  border: 1px solid black;
  border-radius: 5px;
}

.scale {
  position: absolute;
  left: 0;
  height: 10px;
  background-color: #365811;
}

.wrap-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.group {
  width: 47%;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.percent {
  max-width: 200px;
  text-align: center;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task {
  display: flex;
  align-items: center;
  gap: 8px;
}

input[type="checkbox"] {
  /* Базовый стиль чекбокса */
  appearance: none;
  -webkit-appearance: none; /* Для Safari */
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  /* Стиль для активного чекбокса */
  background-image: url("https://img.icons8.com/ios-filled/32/checked-checkbox.png");
  background-repeat: no-repeat;
  background-position: center;
}

/* Дополнительные стили при наведении и фокусе */
input[type="checkbox"]:hover,
input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.task label {
  cursor: pointer;
  width: 97%;
}
.wrap-btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.btn {
  background-color: #000;
  border-radius: 10px;
  padding: 12px 17px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}

.empty {
  width: 100%;
}

.tasks,
.empty,
.wrap-group,
.fields {
  padding-left: 20px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field {
  display: flex;
  align-items: center;
  gap: 15px;
}

.field-value {
  font-weight: 600;
}

@media (max-width: 600px) {
  .btn {
    font-size: 13px;
    line-height: 13px;
  }
}
</style>
