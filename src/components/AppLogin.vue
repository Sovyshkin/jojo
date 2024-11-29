<script>
import axios from "axios";
export default {
  name: "AppLogin",
  data() {
    return {
      phone: "+7",
      password: "",
      id: "",
      message: "",
    };
  },
  computed: {
    formatPhoneNumber() {
      return this.phone ? this.phone.replace(/[^+\d]/g, "") : "";
    },
  },
  methods: {
    async log() {
      try {
        console.log(this.password.length == 0 && this.phone.length != 12);
        if (this.phone.length == 12 && this.phone) {
          let response = await axios.post(`/login`, {
            params: {
              phone: this.phone,
              password: this.password,
            },
          });
          console.log(response);
          this.message = response.data.message;
          let phone = response.data.phone;
          let agreement = response.data.agreement;
          let id = response.data.id;
          if (this.message == "Успешно") {
            localStorage.setItem("phone", phone);
            localStorage.setItem("id", id);
            // localStorage.setItem("phone", "+79373639712");
            setTimeout(() => {
              this.message = "";
              if (agreement) {
                this.$router.push({ name: "main" });
              } else {
                this.$router.push({ name: "commercialSecret" });
              }
            }, 2500);
          }
          setTimeout(() => {
            this.message = "";
          }, 2500);
        }
      } catch (err) {
        console.log(err);
      }
    },
    updateValue(e) {
      let input = e.target.value.replace(/[^+\d]/g, "");
      if (!input.startsWith("+")) {
        input = "+";
      }
      this.phone = input;
      e.target.value = this.formatPhoneNumber;
    },
  },
  async mounted() {},
};
</script>
<template>
  <div class="wrapper">
    <div class="card">
      <img src="../assets/logo.png" class="logo" alt="" />
      <div class="group">
        <input
          :value="formatPhoneNumber"
          @input="updateValue($event)"
          type="tel"
          size="20"
          required
          name="number"
          placeholder="+7"
          maxlength="12"
        />
        <span class="group-value">Номер телефона</span>
      </div>
      <div class="group">
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Введите пароль"
        />
        <span class="group-value">Пароль</span>
      </div>
      <button
        v-if="!message"
        @click="log"
        class="btn"
        :class="{
          disabled: this.password.length == 0 || this.phone.length != 12,
        }"
      >
        Войти
      </button>
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
  justify-content: center;
  align-items: center;
  height: 85vh;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 32px;
  border-radius: 20px;
  background-color: #fff;
  width: 360px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  line-height: 28.8px;
  color: #000;
  text-align: center;
}

.logo {
  margin: 0 auto;
  width: 84px;
}
.desc {
  opacity: 80%;
  font-weight: 500;
  font-size: 16px;
  line-height: 22.4px;
}

.btn {
  width: 100%;
  background-color: #000;
  border-radius: 10px;
  padding: 17px 24px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}

.disabled {
  background-color: #9a9a9a;
  cursor: not-allowed;
}

.log {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.log span,
a {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.6px;
}

a {
  color: #cf0032;
}

.cancel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cancel img {
  cursor: pointer;
  height: 24px;
  width: 24px;
}

input {
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}

input::placeholder {
  color: #a5a5a5;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.12px;
}

.forget_pass {
  text-align: end;
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

.card:hover {
  cursor: auto;
  transform: none;
}

.msg {
  padding: 10px 13px;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  border-radius: 15px;
  width: fit-content;
  margin: 0 auto;
}

.success {
  background-color: #45ed0b;
}

.error {
  background-color: #cf0032;
}
</style>
