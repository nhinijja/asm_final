<template>
  <section id="chefs" class="chefs section">
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2></h2>
          </div>
        </div>
      </div>
    </div>

    <header class="py-4 bg-light border-bottom mb-3">
      <div class="container">
        <div class="text-center my-5">
          <h1 class="fw-bolder">Đăng nhập</h1>
        </div>
      </div>
    </header>
    <div class="container py-5">
      <div class="profile-wrapper p-4 border rounded">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="bg-white shadow-lg rounded p-4">
              <div class="row align-items-center">
                <div class="col-12">
                  <!-- Thông báo lỗi -->
                  <div
                    v-if="errorMessage"
                    class="alert alert-danger text-center"
                  >
                    {{ errorMessage }}
                  </div>
                  <!-- Thông báo thành công -->
                  <div
                    v-if="successMessage"
                    class="alert alert-success text-center"
                  >
                    {{ successMessage }}
                  </div>
                  <!-- Form đăng nhập -->
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <label for="email" class="form-label fw-bold">
                        Email <span class="text-danger">*</span>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text bg-primary text-white">
                          <i class=""></i>
                        </span>
                        <input
                          v-model="email"
                          id="email"
                          type="email"
                          class="form-control"
                          placeholder="Nhập email "
                          required
                        />
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="password" class="form-label fw-bold">
                        Mật khẩu <span class="text-danger">*</span>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text bg-primary text-white">
                          <i class=""></i>
                        </span>
                        <input
                          v-model="password"
                          id="password"
                          type="password"
                          class="form-control"
                          placeholder="Nhập mật khẩu "
                          required
                        />
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-between align-items-center mb-4"
                    >
                      <div class="form-check">
                        <input
                          v-model="rememberMe"
                          class="form-check-input"
                          type="checkbox"
                          id="inlineFormCheck"
                        />
                        <label class="form-check-label" for="inlineFormCheck">
                          Ghi nhớ mật khẩu
                        </label>
                      </div>
                      <router-link to="/register" class="text-primary">
                        Đăng kí
                      </router-link>
                    </div>

                    <button type="submit" class="btn btn-dark w-100 py-2">
                      Đăng nhập
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useStore } from "vuex";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    const router = useRouter();
    const store = useStore();

    onMounted(() => {
      const storedEmail = Cookies.get("email");
      if (storedEmail) {
        email.value = storedEmail;
        rememberMe.value = true;
      }
    });

    const login = async () => {
      if (!email.value.match(/^[\w.%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/)) {
        errorMessage.value = "Vui lòng nhập email hợp lệ!";
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          { email: email.value, matKhau: password.value }
        );
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        store.dispatch("login", { isLoggedIn: true, userInfo: response.data });
        if (rememberMe.value) {
          Cookies.set("email", email.value, { expires: 7 });
        } else {
          Cookies.remove("email");
        }
        successMessage.value = "Đăng nhập thành công!";
        errorMessage.value = "";
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        errorMessage.value =
          error.response?.data?.message || "Đăng nhập thất bại";
        successMessage.value = "";
      }
    };

    return { email, password, rememberMe, errorMessage, successMessage, login };
  },
};
</script>

<style scoped>
.profile-wrapper {
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Tăng độ sáng cho nút đăng nhập */
.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

input:focus,
textarea:focus {
  box-shadow: none !important;
  border-color: #0056b3;
}
</style>
