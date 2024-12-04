<script>
import axios from "axios";
export default {
  name: "ScanPassport",
  data() {
    return {
      title: "",
      comment: "",
      fileObject: null,
      imageUrl: "",
      isImage: false,
      fileName: "",
      fileSize: "",
      fileObject2: null,
      imageUrl2: "",
      isImage2: false,
      fileName2: "",
      fileSize2: "",
    };
  },
  methods: {
    handleFileUpload(event, n) {
      if (!event.target.files[0]) return;
      const file = event.target.files[0];
      try {
        if (n == 1) {
          this.fileObject = file;
          this.isImage = this.checkIsImage(file, 1);
          this.displayContent(1);
        } else if (n == 2) {
          this.fileObject2 = file;
          this.isImage2 = this.checkIsImage(file, 2);
          this.displayContent(2);
        }
      } catch (error) {
        console.error("Ошибка при загрузке файла:", error);
      }
    },

    displayContent(n) {
      if (!this.fileObject && n == 1) return;
      if (!this.fileObject2 && n == 2) return;

      if (n == 1) {
        if (this.isImage) {
          this.displayImage(this.fileObject, 1);
        } else {
          this.displayFile(this.fileObject, 1);
        }
      } else if (n == 2) {
        if (this.isImage2) {
          this.displayImage(this.fileObject2, 2);
        } else {
          this.displayFile(this.fileObject2, 2);
        }
      }
    },

    checkIsImage(file) {
      return /image\/.*/.test(file.type);
    },

    displayImage(file, n) {
      try {
        if (!file) throw new Error("Файл не загружен");

        const reader = new FileReader();
        reader.onload = (e) => {
          if (n == 1) {
            this.imageUrl = e.target.result;
          } else if (n == 2) {
            this.imageUrl2 = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Ошибка при отображении изображения:", error);
      }
    },

    displayFile(file, n) {
      try {
        if (!file) throw new Error("Файл не загружен");

        if (n == 1) {
          this.fileName = file.name;
          this.fileSize = this.formatFileSize(file.size);
        } else if (n == 2) {
          this.fileName2 = file.name;
          this.fileSize2 = this.formatFileSize(file.size);
        }
      } catch (error) {
        console.error("Ошибка при отображении файла:", error);
      }
    },

    formatFileSize(size) {
      const units = ["Б", "КБ", "МБ"];
      let i = 0;
      while (size > 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
      }
      return `${(size | 0).toString()} ${units[i]}`;
    },

    async save() {
      try {
        const formData = new FormData();
        formData.append("files", this.fileObject);
        formData.append("phone", localStorage.getItem("phone"));
        formData.append("name_doc", "passport_first");

        console.log(formData);
        let response = await axios.post("/upload_document", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        const formData2 = new FormData();
        formData2.append("files", this.fileObject2);
        formData2.append("phone", localStorage.getItem("phone"));
        formData2.append("name_doc", "passport_second");

        console.log(formData2);
        let response2 = await axios.post("/upload_document", formData2, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response2);
        let status2 = response2.data.status;
        if (status2 == "200") {
          this.$router.push({ name: "scan_medcine" });
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
      <h1>Отсканируйте свой паспорт</h1>
      <div class="group-file">
        <input type="file" id="file" @change="handleFileUpload($event, 1)" />
        <label class="select-img" for="file">
          <img class="photo" src="../assets/photo.png" alt="" />
          <span>Добавить</span>
        </label>
      </div>
      <div v-if="isImage" class="image-container">
        <img :src="imageUrl" alt="Uploaded Image" />
      </div>

      <div v-if="!isImage && fileName" class="file-container">
        <img src="../assets/file.png" alt="" />
        <span>{{ fileName }}</span>
        <br />
        <small>{{ fileSize }}</small>
      </div>
      <p>1. Разворот страниц с личными данными: стр. 2-3</p>
      <div class="group-file">
        <input type="file" id="file2" @change="handleFileUpload($event, 2)" />
        <label class="select-img" for="file2">
          <img class="photo" src="../assets/photo.png" alt="" />
          <span>Добавить</span>
        </label>
      </div>
      <p>2. Регистрация: стр. 4-5, 6-12, если заполнены</p>
      <div v-if="isImage2" class="image-container">
        <img :src="imageUrl2" alt="Uploaded Image" />
      </div>

      <div v-if="!isImage2 && fileName2" class="file-container">
        <img src="../assets/file.png" alt="" />
        <span>{{ fileName2 }}</span>
        <br />
        <small>{{ fileSize2 }}</small>
      </div>
      <div class="wrap-btns">
        <button class="btn" @click="save()">Продолжить</button>
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
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

.photo {
  width: 57px;
}
</style>
