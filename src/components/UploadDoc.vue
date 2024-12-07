<script>
import axios from "axios";
export default {
  name: "UploadDoc",
  data() {
    return {
      title: "",
      fileObject: null,
      imageUrl: "",
      isImage: false,
      fileName: "",
      fileSize: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileObject = file;
        this.isImage = this.checkIsImage(file);
        this.displayContent();
      }
    },

    displayContent() {
      if (this.isImage) {
        this.displayImage(this.fileObject);
      } else {
        this.displayFile(this.fileObject);
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

    displayFile(file) {
      this.fileName = file.name;
      this.fileSize = this.formatFileSize(file.size);
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
        formData.append("name", this.title);
        formData.append("name_doc", "work_doc");

        console.log(formData);
        let response = await axios.post("/upload_document", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        let status = response.data.status;
        if (status == "200") {
          this.$router.push({ name: "scan_passport" });
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
    <h1>Загрузка документа</h1>
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
    <div class="group-file">
      <input type="file" id="file" @change="handleFileUpload" />
      <label class="select-img" for="file">Прикрепить файл</label>
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
    <div class="wrap-btns">
      <button class="btn" @click="save()">Сохранить</button>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 30px;
}

.wrap-btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
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
  margin: 0 auto;
  width: 80%;
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
  margin: 0 auto;
  width: 80%;
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
</style>
