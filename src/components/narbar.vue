<template>
  <nav class="navbar navbar-expand-lg bg-light navbar-light">
    <div class="container-fluid">
      <router-link to="#" class="navbar-brand">
        Burger <span>King</span>
      </router-link>

      <!-- Toggle Button for Mobile View -->
      <button
        type="button"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarCollapse"
      >
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Trang chủ</router-link>
            </li>

            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/chef"> Đầu bếp</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/menu"> Menu</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/contact">
                Liên hệ với chúng tôi</router-link
              >
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/managerBlog"
                >Quản lý bài viết</router-link
              >
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/profile"
                >Trang cá nhân</router-link
              >
            </li>
            <!-- Hiển thị "Đăng nhập" nếu chưa đăng nhập -->
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/login">Đăng nhập</router-link>
            </li>
            <!-- Hiển thị "Đăng xuất" nếu đã đăng nhập -->
            <li v-if="isLoggedIn" class="nav-item">
              <a class="nav-link" href="#!" @click.prevent="logout"
                >Đăng xuất</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

// const isLoggedIn = ref(false);
const router = useRouter();
const store = useStore();

const isLoggedIn = computed(() => store.getters.getLoginStatus);
const userInfo = computed(() => store.getters.getUserInfo);

const logout = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("isLoggedIn");
  isLoggedIn.value = false;
  window.location.reload();

  console.log("Đăng xuất người dùng");
  localStorage.removeItem("data");
  this.$router.push("/"); // Điều hướng đến trang login sau khi đăng xuất
};
</script>

<style scoped>
.nav-link {
  color: rgb(233, 19, 19) !important; /* Đặt màu đen cho tất cả các liên kết */
}

.nav-link:hover {
  color: #4322ff; /* Thêm hiệu ứng màu khi hover nếu muốn */
  text-decoration: underline; /* Gạch chân khi di chuột nếu cần */
}
</style>
