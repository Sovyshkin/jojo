<script>
import AppLoader from "./AppLoader.vue";
import axios from "axios";
export default {
  name: "AppUsers",
  components: { AppLoader },
  data() {
    return {
      deleteID: "",
      isLoading: false,
      modal: false,
      role: "",
      message: "",
      admin: "",
      accrued: 0,
      paid: 0,
      total: 0,
      users: [],
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.post(`/users/get/all`, {
          role: "Сотрудник",
        });
        console.log(response);
        this.users = response.data.users;
        this.accrued = response.data.accrued;
        this.paid = response.data.paid;
        this.total = response.data.total;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    async checkVerify() {
      try {
        let id = localStorage.getItem("id");
        if (id) {
          let response = await axios.post(`/users/check_verify`, {
            id: id,
          });
          console.log(response);
          if (response.data.message != "ok") {
            this.$router.push({ name: "login" });
          } else {
            this.admin = response.data.role;
            if (this.admin != "Администратор" && this.admin != "Проверяющий") {
              this.$router.push({ name: "objects" });
            }
          }
        } else {
          this.$router.push({ name: "login" });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUser() {
      try {
        let response = await axios.post(`/users/delete`, {
          id: this.deleteID,
        });
        console.log(response);
        this.message = response.data.message;
        setTimeout(() => {
          this.message = "";
          this.modal = false;
          this.load_info();
        }, 2500);
      } catch (err) {
        console.log(err);
      }
    },

    goDelete(id) {
      this.modal = true;
      this.deleteID = id;
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
  <AppLoader v-if="isLoading" />
  <div class="wrapper" v-else></div>
</template>

<style scoped>
.wrapper {
}
</style>
