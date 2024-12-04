<script>
import axios from "axios";
import AppLoader from "./AppLoader.vue";
export default {
  name: "AppNews",
  components: { AppLoader },
  data() {
    return {
      news: [
        {
          id: 1,
          title: "Название",
          desc: "Описание",
          img: "card1.png",
        },
        {
          id: 2,
          title: "Название",
          desc: "Описание",
          img: "card2.png",
        },
        {
          id: 3,
          title: "Название",
          desc: "Описание",
          img: "card3.png",
        },
      ],
      isLoading: false,
      phone: "",
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.post(`/get_news`, {});
        console.log(response);
        this.news = response.data.news;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    check_verify() {
      try {
        this.phone = localStorage.getItem("phone");
        if (!this.phone) {
          this.$router.push({ name: "login" });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getImage(file) {
      try {
        let response = await axios.post(`/get_file`, {
          params: {
            file: file,
          },
        });
        console.log(response);
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
  <AppLoader v-if="isLoading" />
  <div class="wrapper" v-else>
    <div class="wrap-btns" v-if="phone == '+79449445678'">
      <button @click="$router.push({ name: 'create_news' })" class="btn">
        Опубликовать
      </button>
    </div>
    <div class="cards">
      <div class="new" v-for="card in news" :key="card.id">
        <img
          class="newImage"
          :src="`http://103.74.94.235:5050/${card.file}`"
          v-if="card.file"
          alt=""
        />
        <img class="no_photo" src="../assets/no_photo.png" v-else alt="" />
        <p v-html="card.description"></p>
        <button
          @click="
            $router.push({
              name: 'create_news',
              query: {
                id: card.id,
                description: card.description,
                file: card.file,
              },
            })
          "
          v-if="phone == '+79449445678'"
          class="btn"
        >
          Редактировать
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  height: 90vh;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px;
}

.new {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 7px;
  cursor: pointer;
  padding: 15px;
  transition: all 500ms;
}

.new:hover {
  transform: translateY(-3px);
}

.wrap-btns {
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

.newImage {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 15px;
}

.no_photo {
  width: 50px;
  margin: 0 auto;
}

@media (max-width: 940px) {
  .cards {
    justify-content: center;
  }
}
</style>
