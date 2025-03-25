<script>
import axios from "axios";
import ChartBar from "./ChartBar.vue";
export default {
  name: "AppMain",
  components: { ChartBar },
  data() {
    return {
      cards: [],
      chartData: {},
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
    };
  },
  methods: {
    async load_kpi() {
      try {
        let response = await axios.post(`/kpi`);
        console.log(response);
        this.cards = response.data.kpi;
      } catch (err) {
        console.log(err);
      }
    },
    async load_info() {
      try {
        let response = await axios.post(`/tasks/by_user`, {
          params: {
            phone: localStorage.getItem("phone"),
          },
        });
        console.log(response);
        this.tasks = response.data.tasks;
        this.tasks.forEach((item) => {
          if (
            item.title ==
              "Прикрепите регистрацию: стр. 4-5, 6-12, если заполнены" &&
            !item.completed
          ) {
            this.passport = true;
          } else if (
            item.title ==
              "Прикрепите разворот страниц паспорта с личными данными: стр. 2-3" &&
            !item.completed
          ) {
            this.passport = true;
          } else if (
            item.title == "Отсканируйте медицинскую книжку" &&
            !item.completed
          ) {
            this.medcine = true;
          }
        });
        let data = response.data.schedules;
        if (data) {
          this.chartData = Array.from(data.entries);
          console.log("data", this.chartData);
        }
      } catch (err) {
        console.log(err);
      }
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
        let response = await axios.post(`/tasks/set_completed`, {
          params: {
            id,
            completed: value,
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    lowerText(text) {
      if (typeof text !== "string") {
        console.warn("Пожалуйста, передайте строку в качестве аргумента.");
        return "";
      }

      // Проверяем, не пустая ли строка
      if (text.length === 0) {
        return "";
      }

      // Преобразуем всю строку в нижний регистр и заглавим первый символ
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
  <div class="wrapper">
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
      <div class="wrap-bar" v-if="chartData && chartData.length">
        <ChartBar :scheduleData="chartData" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
h1 {
  font-weight: 500;
  font-size: 25px;
  padding-top: 5px;
  border-top: 1px solid black;
}

.kpi {
  padding-top: 0;
  border-top: none;
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
.wrap-group {
  padding-left: 20px;
}

@media (max-width: 600px) {
  .btn {
    font-size: 13px;
    line-height: 13px;
  }
}
</style>
