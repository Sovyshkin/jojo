<script>
import axios from "axios";
export default {
  name: "CreateLesson",
  data() {
    return {
      img: "",
      title: "",
      video: "",
      desc: "",
      block: "",
      fileObject: null,
      imageUrl: "",
      isImage: false,
      fileName: "",
      fileSize: "",
      errorMessage: "", // Добавлено для отображения ошибок
      blocks: [],
      message: "",
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
    async create() {
      try {
        this.saveContent();
        const formData = new FormData();
        formData.append("files", this.fileObject);
        formData.append("name", this.title);
        formData.append("video", this.video);
        formData.append("description", this.desc);
        formData.append("block", this.block);

        console.log(formData);
        let response = await axios.post("/new_train", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        this.message = response.data.message;
        if (this.message == "Успешно") {
          setTimeout(() => {
            this.message = "";
            this.$router.go(-1);
          }, 2500);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async edit() {
      try {
        this.saveContent();
        const formData = new FormData();
        formData.append("files", this.fileObject);
        formData.append("name", this.title);
        formData.append("video", this.video);
        formData.append("description", this.desc);
        formData.append("block", this.block);
        formData.append("id", this.id);

        console.log(formData);
        let response = await axios.post(`/update_train`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        this.message = response.data.message;
        if (this.message == "Успешно") {
          setTimeout(() => {
            this.message = "";
            this.$router.go(-1);
          }, 2500);
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

    async load_blocks() {
      try {
        let response = await axios.post(`/get_blocks`);
        console.log(response);
        this.blocks = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async load_info() {
      try {
        this.id = this.$route.query.id;
        if (this.id) {
          let response = await axios.post(`/trainings/by_id`, {
            params: {
              training_id: this.id,
              user_id: localStorage.getItem("id"),
            },
          });
          console.log(response);
          this.img = response.data.file;
          this.block = response.data.block;
          this.title = response.data.name;
          this.desc = response.data.description;
          this.video = response.data.video_url;
        }
      } catch (err) {
        console.log(err);
      }
    },

    saveContent() {
      try {
        const textarea = document.getElementById("desc");
        let content = textarea.value;

        // Заменяем символы переноса строки на HTML-тег br
        content = content.replace(/\n/g, "<br>");

        // Сохраняем отступы с помощью тега pre
        content = content.replace(/^(\s+)/gm, "<pre>$1</pre>");

        this.desc = content;

        return content;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.check_verify();
    this.load_blocks();
    this.load_info();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <h1 v-if="!id">Загрузка нового урока</h1>
      <h1 v-else>Редактирование урока</h1>
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
      <div v-if="isImage || id" class="image-container">
        <img v-if="id" :src="`http://103.74.94.235:5050/${img}`" alt="" />
        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
      </div>
      <div class="group">
        <select name="" id="" v-model="block">
          <option :value="item" v-for="(item, i) in blocks" :key="i">
            {{ item }}
          </option>
        </select>
        <span class="group-value">Блок</span>
      </div>
      <div class="group">
        <input
          v-model="title"
          type="text"
          required
          name="title"
          placeholder="Введите название"
        />
        <span class="group-value">Название</span>
      </div>
      <div class="group">
        <input
          v-model="video"
          type="text"
          required
          name="title"
          placeholder="Вставьте ссылку на видео"
        />
        <span class="group-value">Ссылка</span>
      </div>
      <div class="video" v-if="video">
        <iframe
          :src="video"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
          frameborder="0"
          allowfullscreen
          class="video"
        ></iframe>
      </div>
      <div class="group">
        <textarea
          name="desc"
          v-model="desc"
          id="desc"
          cols="30"
          placeholder="Введите описание"
        ></textarea>
        <span class="group-value">Описание</span>
      </div>
      <div class="wrap-btns">
        <button class="btn" @click="create()" v-if="!id">Опубликовать</button>
        <button class="btn" @click="edit()" v-else>Сохранить</button>
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
.video {
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  min-height: 200px;
}
.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.card {
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: 20px;
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
  flex-direction: column;
  gap: 7px;
}

img {
  border-radius: 8px;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}

@media (max-height: 900px) {
  .wrapper {
    align-items: flex-start;
  }
}
</style>
