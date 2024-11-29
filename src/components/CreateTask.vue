<script>
import axios from "axios";

export default {
  name: "CreateTask",
  data() {
    return {
      desc: "",
      user_id: "",
      date: "",
      users: [],
      message: "",
    };
  },
  methods: {
    check_verify() {
      try {
        let phone = localStorage.getItem("phone");
        if (!phone) {
          this.$router.push({ name: "login" });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async create() {
      try {
        let response = await axios.post(`/new_task`, {
          params: {
            title: this.desc,
            date: this.date,
            user_id: this.user_id,
          },
        });
        console.log(response);
        this.message = response.data.message;
        if (this.message == "Успешно") {
          this.$router.go(-1);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async load_info() {
      try {
        let response = await axios.post(`/users`);
        console.log(response);
        this.users = response.data;
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
    <div class="card">
      <h1>Задача</h1>
      <div class="group">
        <textarea
          name="desc"
          v-model="desc"
          cols="30"
          rows="10"
          placeholder="Введите описание"
          id="desc"
        ></textarea>
        <span class="group-value">Описание</span>
      </div>
      <div class="group">
        <select name="" id="" v-model="user_id">
          <option :value="user.id" v-for="user in users" :key="user.id">
            {{ user.first_name }} {{ user.second_name }}
          </option>
        </select>
        <span class="group-value">Кому</span>
      </div>
      <div class="group">
        <input type="date" v-model="date" />
        <span class="group-value">Cрок</span>
      </div>
      <div class="wrap-btns">
        <button class="btn" @click="create()">Готово</button>
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
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

h1 {
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  text-align: center;
}

.wrap-btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  padding: 15px 40px;
  background-color: black;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  line-height: 18px;
  font-weight: 500;
}
input,
textarea,
select {
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}

textarea {
  max-width: 450px;
  max-height: 300px;
  min-height: 70px;
}

input::placeholder,
textarea::placeholder {
  color: #a5a5a5;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.12px;
}
.group {
  position: relative;
}

.group-value {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  left: 12px;
  background-color: #fff;
  padding: 0 4px;
  color: black;
  font-weight: 500;
  font-size: 12px;
  line-height: 13.66px;
}

input[type="file"] {
  border: none;
  display: none;
}

.group-file {
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.9px dashed black;
  border-radius: 8px;
}

label {
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.image-container {
  margin: 0 auto;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-container {
  display: flex;
  align-items: center;
  gap: 7px;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
