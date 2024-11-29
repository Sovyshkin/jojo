<script>
import axios from "axios";

export default {
  name: "AppLogin",
  data() {
    return {
      agree: false,
      permission: false,
    };
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
    async goNext() {
      try {
        if (this.agree && this.permission) {
          let response = await axios.post(`/agreement`, {
            params: {
              phone: localStorage.getItem("phone"),
              agreement: true,
            },
          });
          console.log(response);
          let status = response.data.status;
          if (status == "200") {
            setTimeout(() => {
              this.$router.push({ name: "upload_doc" });
            }, 1000);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="wrapper">
    <div class="card">
      <h1>Трудовой договор стажировки</h1>
      <div class="text">
        <p>Права и обязанности сторон.</p>
        <br />
        <p>Работник обязан:</p>
        <p>1. Прибывать на рабочее место в установленное время.</p>
        <p>
          2. Соблюдать трудовую дисциплину и выполнять задания, полученные от
          руководителя стажировки.
        </p>
        <p>3. Подчиняться внутренним правилам Компании.</p>
        <p>
          4. Участвовать в тренингах и семинарах, проводимых в рамках
          стажировки.
        </p>
        <br />
        <p>Компания обязана:</p>
        <p>
          1. Предоставить Работнику необходимые материалы и оборудование для
          выполнения заданий.
        </p>
        <p>
          2. Ознакомить Работника с правилами внутреннего распорядка и другими
          нормативными документами.
        </p>
        <p>
          3. Обеспечить безопасность условий труда и защиту персональных данных
          Работника.
        </p>
        <p>
          4. Проводить регулярный контроль за выполнением работником своих
          обязанностей.
        </p>
        <br />
        <p>Ответственность сторон</p>
        <p>
          1. За нарушение условий настоящего договора стороны несут
          ответственность в соответствии с законодательством Российской
          Федерации.
        </p>
        <p>
          2. Стороны обязуются незамедлительно информировать друг друга о любых
          изменениях, влияющих на выполнение условий настоящего Договора.
        </p>
      </div>
      <div class="wrapper_group">
        <div class="group">
          <input type="checkbox" id="agree" v-model="agree" />
          <label class="item-group" for="agree"
            >Я согласен на обработку персональных данных</label
          >
        </div>
        <div class="group">
          <input type="checkbox" id="permission" v-model="permission" />
          <label class="item-group" for="permission"
            >Разрешение на доступ к данным</label
          >
        </div>
      </div>
      <div class="wrap-btns">
        <button
          class="btn"
          :class="{ disabled: !this.agree || !this.permission }"
          @click="goNext()"
        >
          Продолжить
        </button>
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

.text {
  height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
}

/* Ширина всей полосы прокрутки */
.text::-webkit-scrollbar {
  width: 7px;
}

/* Цвет и размер зоны отслеживания */
.text::-webkit-scrollbar-track {
  background: transparent;
}

/* Цвет и размер бегунка */
.text::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Цвет разделителя между частями бегунка */
.text::-webkit-scrollbar-thumb:hover {
  background: #555;
}

p {
  text-indent: 20px;
}

h1 {
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  text-align: center;
}

.wrapper_group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  cursor: pointer;
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
.disabled {
  background-color: #9a9a9a;
  cursor: not-allowed;
}
</style>
