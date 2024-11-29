<template>
  <div class="wrapper">
    <orbit-spinner :animation-duration="1200" :size="55" color="#000" />
  </div>
</template>

<script>
import { OrbitSpinner } from "epic-spinners";
export default {
  name: "LoadingSpinner",
  components: {
    OrbitSpinner,
  },
};
</script>

<style scoped>
.wrapper {
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
