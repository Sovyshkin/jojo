<script>
export default {
  name: "AppNav",
  data() {
    return {
      active: "",
    };
  },
  methods: {
    goRoute(name) {
      this.check_active(name);
      this.$router.push({ name });
    },
    check_active(name) {
      if (name == "academy") this.active = "1";
      else if (name == "main") this.active = "2";
      else if (name == "news") this.active = "3";
    },
  },
  mounted() {
    this.check_active(this.$route.name);
  },
};
</script>

<template>
  <div class="nav-wrapper">
    <nav class="group">
      <div class="item" @click="$router.go(-1)">
        <img
          class="back"
          :class="{ show: $route.path == '/' || $route.path == '/login' }"
          src="../assets/back.png"
          alt=""
        />
      </div>
      <li
        @click="goRoute('academy')"
        class="item"
        :class="{ active: active == '1' }"
      >
        <img src="../assets/edu.png" alt="" />
      </li>
      <li
        @click="goRoute('main')"
        class="item"
        :class="{ active: active == '2' }"
      >
        <img src="../assets/main.png" alt="" />
      </li>
      <li
        @click="goRoute(`news`)"
        class="item new"
        :class="{ active: active == '3' }"
      >
        <img src="../assets/new.png" alt="" />
      </li>
    </nav>
  </div>
</template>

<style scoped>
.nav-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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

.item img {
  height: 33px;
  min-width: 33px;
}

.active {
  scale: 1.4;
}

@media (max-width: 540px) {
  .group {
    width: 100%;
    justify-content: space-between;
    gap: 0;
  }

}
</style>