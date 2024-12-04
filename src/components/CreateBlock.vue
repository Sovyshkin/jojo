<script>
import axios from "axios";

export default {
  name: "CreateBlock",
  data() {
    return {
      block: "",
      lastname: "",
      message: "",
    };
  },
  methods: {
    async save() {
      try {
        let response = await axios.post(`/new_block`, {
          params: {
            edit: false,
            block: this.block,
          },
        });
        console.log(response);
        this.message = response.data.message;
        setTimeout(() => {
          this.message = "";
          this.$router.go(-1);
        }, 1500);
      } catch (err) {
        console.log(err);
      }
    },
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
  },
  mounted() {
    this.check_verify();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <h1>Загрузка нового блока</h1>
      <div class="group">
        <input
          v-model="block"
          type="text"
          required
          name="block"
          placeholder="Введите название блока"
        />
        <span class="group-value">Название</span>
      </div>
      <div class="wrap-btns">
        <button class="btn" @click="save()">Добавить</button>
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
textarea {
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
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

label {
  width: 100%;
  text-align: center;
  cursor: pointer;
}
</style>
