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
          <h1 class="fw-bolder">Đăng Ký</h1>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="profile-wrapper p-4 border rounded">
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <div class="bg-white shadow rounded mb-3">
              <div class="row">
                <div class="col-md-7 pe-0">
                  <div class="form-left h-100 py-5 px-5">
                    <form @submit.prevent="register" class="row g-4">
                      <div class="col-12">
                        <label>Họ tên<span class="text-danger">*</span></label>
                        <div class="input-group">
                          <div class="input-group-text">
                            <i class=""></i>
                          </div>
                          <input
                            v-model="hoTen"
                            type="text"
                            class="form-control"
                            placeholder="Họ tên"
                            :disabled="loading"
                          />
                        </div>
                      </div>

                      <div class="col-12">
                        <label>Email<span class="text-danger">*</span></label>
                        <div class="input-group">
                          <div class="input-group-text">
                            <i class=""></i>
                          </div>
                          <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            :disabled="loading"
                          />
                        </div>
                      </div>

                      <div class="col-12">
                        <label
                          >Password<span class="text-danger">*</span></label
                        >
                        <div class="input-group">
                          <div class="input-group-text">
                            <i class=""></i>
                          </div>
                          <input
                            v-model="matKhau"
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            :disabled="loading"
                          />
                        </div>
                      </div>

                      <div v-if="errorMessage" class="col-12 text-danger mt-2">
                        <small>{{ errorMessage }}</small>
                      </div>

                      <div class="col-12">
                        <router-link to="/login" class="float-end text-primary"
                          >Tài khoản đã có</router-link
                        >
                      </div>

                      <div class="col-12">
                        <button
                          type="submit"
                          class="btn btn-dark px-4 float-end mt-4"
                          :disabled="loading"
                        >
                          {{ loading ? "Đang đăng ký..." : "Đăng ký" }}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const hoTen = ref("");
const email = ref("");
const matKhau = ref("");
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();

const register = async () => {
  if (!hoTen.value || !email.value || !matKhau.value) {
    errorMessage.value = "Vui lòng điền đầy đủ thông tin.";
    return;
  }
  loading.value = true;
  try {
    let data = {
      hoTen: hoTen.value,
      email: email.value,
      matKhau: matKhau.value,
    };
    console.log(data);
    const response = await axios.post(
      "http://localhost:8080/api/user/register",
      data
    );
    router.push("/login");
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Đăng ký thất bại";
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped>
.profile-wrapper {
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
