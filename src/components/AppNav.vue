<script>
export default {
  name: "AppHeader",
  components: {},
  data() {
    return {};
  },
  methods: {
    goRoute(name) {
      this.$router.push({ name });
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <nav class="group">
      <div class="item" @click="$router.go(-1)">
        <img
          class="back"
          :class="{ show: $route.path == '/' || $route.path == '/login' }"
          src="../assets/back.png"
          alt=""
        />
      </div>
      <li @click="goRoute('academy')" class="item">
        <img src="../assets/edu.png" alt="" />
      </li>
      <li @click="goRoute('main')" class="item">
        <img src="../assets/main.png" alt="" />
      </li>
      <li @click="goRoute(`news`)" class="item">
        <img src="../assets/new.png" alt="" />
      </li>
    </nav>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  border-top: 2px solid black;
  position: absolute;
  bottom: 0;
  z-index: 4;
  height: 10vh;
}

.group {
  list-style: none;
  display: flex;
  gap: 70px;
  justify-content: center;
  align-items: center;
}

.item {
  cursor: pointer;
  transition: all 500ms ease;
}

.item:hover {
  transform: translateY(-3px);
}

.item img {
  height: 33px;
}

@media (max-width: 540px) {
  .group {
    width: 100%;
    justify-content: space-between;
    gap: 0;
  }
}
</style>
