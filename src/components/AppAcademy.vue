<script>
import axios from "axios";

export default {
  name: "AppAcademy",
  data() {
    return {
      blocks: [],
      message: "",
      phone: "",
    };
  },

  methods: {
    async save() {
      try {
        let response = await axios.post(`/`);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async load_info() {
      try {
        let response = await axios.post(`/get_block`, {
          params: {
            user_id: localStorage.getItem("id"),
          },
        });
        console.log(response);
        this.blocks = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    getList(lst) {
      // console.log(Object.values(lst));
      lst.forEach((item) => console.log(item));
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

    async deleteTrain(id) {
      try {
        let response = await axios.post(`/delete_train`, {
          params: {
            id,
          },
        });
        console.log(response);
        this.message = response.data.message;
        setTimeout(() => {
          this.message = "";
        }, 2500);
        this.load_info();
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.check_verify();
    this.load_info();
  },
};
</script>

<template>
  <div class="wrapper">
    <h1>Академия jojo</h1>
    <div class="wrap-btns" v-if="phone == '+79449445678'">
      <button @click="$router.push({ name: 'create_block' })" class="btn add">
        Добавить блок
      </button>
      <button @click="$router.push({ name: 'create_lesson' })" class="btn">
        Загрузить урок
      </button>
    </div>
    <div class="block" v-for="(block, index) in blocks" :key="index">
      <h2>{{ index + 1 }}. {{ block.block }}</h2>
      <div class="lessons">
        <div
          class="group"
          v-for="(lesson, lessonKey) in block.trains"
          :key="lessonKey"
        >
          <div
            class="lesson"
            @click="$router.push({ name: 'lesson', query: { id: lesson.id } })"
            :class="{ completed: lesson.completed }"
          >
            {{ lesson.title }}
            <img
              src="../assets/gal.png"
              class="gal"
              v-if="lesson.completed"
              alt=""
            />
          </div>
          <img
            v-if="phone == '+79449445678'"
            @click="
              $router.push({ name: 'create_lesson', query: { id: lesson.id } })
            "
            class="icon"
            src="../assets/edit.png"
            alt=""
          />
          <img
            v-if="phone == '+79449445678'"
            @click="deleteTrain(lesson.id)"
            class="icon"
            src="../assets/delete.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div
      class="msg"
      :class="{
        success: this.message == 'Успешно',
        error: this.message != 'Успешно',
      }"
      v-if="message"
    >
      {{ message }}
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  height: 90vh;
}

h1 {
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  text-align: center;
}
h2 {
  font-size: 18px;
  line-height: 18px;
  font-weight: 700;
}
.wrap-btns {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
}
.btn {
  background-color: #000;
  border-radius: 10px;
  padding: 12px 17px;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lessons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lesson {
  border: 1px solid #a6a6a6;
  background-color: #f0f0f080;
  border-radius: 5px;
  padding: 5px 10px;
  transition: all 500ms ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.lesson:hover {
  transform: translateY(-3px);
}

.icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.completed {
  background-color: #36581166;
}

.gal {
  width: 15px;
  height: 15px;
}
</style>
