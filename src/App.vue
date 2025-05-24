<script>
import AppNav from "./components/AppNav.vue";
export default {
  name: "App",
  components: { AppNav },
  data() {
    return {
      isLoading: false,
      phone: localStorage.getItem("phone"),
      showNav: true,
      lastScrollPosition: 0,
    };
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      this.showNav = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
}
};
</script>

<template>
  <main>
    <router-view
      class="wrapView"
      :class="{
        fullScreen:
          $route.path == '/' ||
          $route.name == 'commercialSecret' ||
          $route.name == 'employmentContract',
      }"
    ></router-view>
  </main>
  <AppNav
    v-if="
      showNav &&
      $route.path != '/' &&
      $route.name != 'commercialSecret' &&
      $route.name != 'employmentContract' &&
      $route.name != 'upload_doc'
    "
  />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-style: normal;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.wrap {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.bx {
  transition: 500ms ease;
}

.bx:hover {
  box-shadow: 0 0 10px 7px #53515137;
  transform: translateY(-3px);
}

.msg {
  padding: 15px 40px;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  border-radius: 10px;
  width: fit-content;
  margin: 0 auto;
  text-align: center;
}

.success {
  background-color: #36b20c;
}

.error {
  background-color: #cf0032;
}

.back {
  height: 30px;
  width: 30px;
  cursor: pointer;
}

.wrapView {
  width: 100%;
  padding-top: 20px;
  height: 90vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.fullScreen {
  height: 100vh;
}

.card::-webkit-scrollbar,
.wrapper::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
}

textarea {
  max-width: 450px;
  min-height: 100px;
}
@media (max-width: 540px) {
  .wrapper {
    padding: 20px 20px 10px 20px !important;
  }
}
</style>
