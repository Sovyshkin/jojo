<script>
import axios from "axios";

export default {
  name: "PersonalData",
  data() {
    return {
      name: "",
      surname: "",
      phone: "",
      age: "",
      subsection: "",
      password: "",
      message: "",
    };
  },
  computed: {
    formatPhoneNumber() {
      return this.phone ? this.phone.replace(/[^+\d]/g, "") : "";
    },
  },
  methods: {
    updateValue(e) {
      let input = e.target.value.replace(/[^+\d]/g, "");
      if (!input.startsWith("+")) {
        input = "+";
      }
      this.phone = input;
      e.target.value = this.formatPhoneNumber;
    },
    async save() {
      try {
        let response = await axios.post(`/create_user`, {
          params: {
            role: "admin",
            id_user: "None",
            first_name: this.name,
            second_name: this.surname,
            phone: this.phone,
            age: this.age,
            subsection: this.subsection,
            password: this.password,
          },
        });
        console.log(response);
        this.message = response.data.message;
        if (this.message == "Успешно") {
          setTimeout(() => {
            this.message = "";
            this.name = "";
            this.surname = "";
            this.phone = "";
            (this.age = ""), (this.subsection = "");
            this.password = "";
          }, 2500);
        }
        setTimeout(() => {
          this.message = "";
        }, 2500);
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
      <h1>Личные данные</h1>
      <div class="group">
        <input
          v-model="name"
          type="text"
          required
          name="name"
          placeholder="Введите имя"
        />
        <span class="group-value">Имя</span>
      </div>
      <div class="group">
        <input
          v-model="surname"
          type="text"
          required
          name="surname"
          placeholder="Введите фамилию"
        />
        <span class="group-value">Фамилия</span>
      </div>
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
        <span class="group-value">Телефон</span>
      </div>
      <div class="group">
        <input
          v-model="age"
          type="text"
          required
          name="age"
          placeholder="Введите возраст"
        />
        <span class="group-value">Возраст</span>
      </div>
      <div class="group">
        <input
          v-model="subsection"
          type="text"
          required
          name="subsection"
          placeholder="Введите подраздел"
        />
        <span class="group-value">Подраздел</span>
      </div>
      <div class="group">
        <input
          type="pass"
          name="password"
          id="password"
          v-model="password"
          placeholder="Придумайте пароль"
        />
        <span class="group-value">Пароль</span>
      </div>
      <div class="wrap-btns" v-if="!message">
        <button class="btn" @click="save()">Добавить</button>
      </div>
      <div
        class="msg"
        :class="{
          success: this.message == 'Пользователь сохранен',
          error: this.message != 'Пользователь сохранен',
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
  gap: 20px;
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
input,
textarea {
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
  width: 100%;
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
.btn {
  background-color: #000;
  border-radius: 10px;
  padding: 12px 17px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}
</style>
