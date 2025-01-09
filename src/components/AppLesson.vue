<script>
import axios from "axios";
import AppLoader from "./AppLoader.vue";

export default {
  components: { AppLoader },
  name: "AppLesson",
  data() {
    return {
      id: "",
      isLoading: false,
      name: "",
      description: "",
      file: "",
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        this.id = this.$route.query.id;
        let response = await axios.post(`/trainings/by_id`, {
          params: {
            training_id: this.id,
            user_id: localStorage.getItem("id"),
          },
        });
        console.log(response);
        this.name = response.data.name;
        this.description = response.data.description;
        this.file = response.data.file;
        this.video = response.data.video_url;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    async updateTrain() {
      try {
        const formData = new FormData();
        formData.append("id", this.id);
        formData.append("completed", true);
        let response = await axios.post(`/trainings/set_completed`, {
          params: {
            training_id: this.id,
            user_id: localStorage.getItem("id"),
            completed: true,
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.load_info();
    setTimeout(() => {
      this.updateTrain();
    }, 5000);
  },
};
</script>
<template>
  <AppLoader v-if="isLoading" />
  <div class="wrapper" v-else>
    <h1>Академия jojo</h1>
    <h2>{{ name }}</h2>
    <div class="wrap-video" v-if="video">
      <iframe
        :src="video"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
        frameborder="0"
        allowfullscreen
        class="video"
      ></iframe>
    </div>
    <div class="wrap-img" v-if="file != 'None'">
      <img :src="`http://103.74.94.235:5050/${file}`" alt="" />
    </div>
    <p v-html="description"></p>
    <div class="wrap-btns">
      <button class="btn" @click="$router.go(-1)">Вернуться</button>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  max-width: 1000px;
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

h1,
h2 {
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  text-align: center;
}

h2 {
  font-size: 20px;
  line-height: 25px;
  font-weight: 600;
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
img {
  width: 100%;
  height: 500px;
  object-fit: contain;
}

.wrap-video {
  width: 100%;
  display: flex;
  justify-content: center;
}

.video {
  width: 80%;
  min-height: 250px;
  border-radius: 10px;
}

@media (max-width: 530px) {
  .video {
    width: 95%;
  }
}
</style>
