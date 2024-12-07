<script>
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
    goNext() {
      try {
        if (this.agree && this.permission) {
          this.$router.push({ name: "employmentContract" });
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
    <h1>Договор неразглашения коммерческой тайны</h1>
    <div class="text">
      <p>
        Я предупрежден, что на период исполнения должностных обязанностей в
        соответствии с регламентом, мне будет предоставлен допуск к
        конфиденциальной информации (персональным данным), не содержащим
        сведений, составляющих государственную тайну.
      </p>
      <br />
      <p>Настоящим добровольно принимаю на себя обязательства:</p>
      <p>
        1. Не разглашать третьим лицам конфиденциальные сведения, которые мне
        доверены (будут доверены) или станут известными в связи с выполнением
        должностных обязанностей.
      </p>
      <p>
        2. Не передавать и не раскрывать третьим лицам конфиденциальные
        сведения, которые мне доверены (будут доверены) или станут известными в
        связи с выполнением должностных обязанностей.
      </p>
      <p>
        3. В случае попытки третьих лиц получить от меня конфиденциальные
        сведения, сообщать непосредственному руководителю.
      </p>
      <p>
        4. Не использовать конфиденциальные сведения с целью получения выгоды.
      </p>
      <p>
        5. Выполнять требования нормативных правовых актов, регламентирующих
        вопросы защиты конфиденциальных сведений.
      </p>
      <p>
        6. В течение года после прекращения права на допуск к конфиденциальным
        сведениям не разглашать и не передавать третьим лицам известные мне
        конфиденциальные сведения.
      </p>
      <br />
      <p>
        Я предупрежден(а), что в случае нарушения данного обязательства буду
        привлечен(а) к дисциплинарной ответственности и/или иной ответственности
        в соответствии с законодательством Российской Федерации.
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
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.text {
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
