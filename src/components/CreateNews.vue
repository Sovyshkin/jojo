<script>
import axios from "axios";

export default {
  name: "CreateNews",
  data() {
    return {
      title: "",
      id: "",
      desc: "",
      fileObject: null,
      imageUrl: "",
      isImage: false,
      fileName: "",
      fileSize: "",
      errorMessage: "", // Добавлено для отображения ошибок
      content: "",
      message: "",
      edit: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (this.checkIsImage(file)) {
          this.fileObject = file;
          this.isImage = true;
          this.errorMessage = ""; // Очистка сообщения об ошибке
          this.displayImage(file);
        } else {
          this.isImage = false;
          this.errorMessage = "Вы можете загружать только изображения.";
          this.resetFileInput(); // Очистка инпута, если файл некорректный
        }
      }
    },

    checkIsImage(file) {
      return /image\/.*/.test(file.type);
    },

    displayImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    resetFileInput() {
      this.fileObject = null;
      this.imageUrl = "";
      this.$refs.fileInput.value = ""; // Сброс значения инпута
    },
    saveContent() {
      try {
        const textarea = document.getElementById("desc");
        let content = textarea.value;

        // Заменяем символы переноса строки на HTML-тег br
        content = content.replace(/\n/g, "<br>");

        // Сохраняем отступы с помощью тега pre
        content = content.replace(/^(\s+)/gm, "<pre>$1</pre>");

        this.content = content;

        return content;
      } catch (err) {
        console.log(err);
      }
    },

    async publish() {
      try {
        this.saveContent();
        const formData = new FormData();
        formData.append("file", this.fileObject);
        formData.append("phone", localStorage.getItem("phone"));
        formData.append("role", "admin");
        formData.append("description", this.content);

        console.log(formData);
        let response = await axios.post("/new_news", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        this.message = response.data.message;
        setTimeout(() => {
          this.message = "";
        }, 2500);
      } catch (err) {
        console.log(err);
      }
    },

    async save() {
      try {
        this.saveContent();
        const formData = new FormData();
        formData.append("file", this.fileObject);
        formData.append("phone", localStorage.getItem("phone"));
        formData.append("role", "admin");
        formData.append("description", this.content);
        formData.append("news_id", this.id);

        console.log(formData);
        let response = await axios.post("/update_news", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        this.message = response.data.message;
        setTimeout(() => {
          this.message = "";
        }, 2500);
      } catch (err) {
        console.log(err);
      }
    },

    load_info() {
      try {
        this.desc = this.$route.query.description;
        this.imageUrl = this.$route.query.file;
        this.id = this.$route.query.id;
        if (this.desc || this.imageUrl || this.id) {
          this.edit = true;
        }
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
    this.load_info();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <h1>Новость</h1>
      <div class="group-file">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          id="file"
          @change="handleFileUpload"
        />
        <label class="select-img" for="file">Прикрепить изображение</label>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <!-- Отображение ошибок -->
      <div v-if="isImage" class="image-container">
        <img :src="imageUrl" alt="Uploaded Image" />
      </div>
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
      <div class="wrap-btns" v-if="!message">
        <button v-if="!edit" class="btn" @click="publish()">
          Опубликовать
        </button>
        <button v-else class="btn" @click="save()">Сохранить</button>
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

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
