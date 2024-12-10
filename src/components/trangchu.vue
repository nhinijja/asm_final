<template>
  <section id="blogs" class="blogs section">
    <div class="container-fluid p-0">
      <div class="row">
        <div class="col-12">
          <div
            id="chefsCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <!-- Indicators -->
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#chefsCarousel"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#chefsCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#chefsCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <!-- Slideshow -->
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="../../public/img/carousel-3.jpg"
                  class="d-block w-100"
                  alt="Carousel Image 1"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../public/img/carousel-2.jpg"
                  class="d-block w-100"
                  alt="Carousel Image 2"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../public/img/carousel-1.jpg"
                  class="d-block w-100"
                  alt="Carousel Image 3"
                />
              </div>
            </div>

            <!-- Controls -->
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#chefsCarousel"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#chefsCarousel"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <h1 class="text-center mb-5 text-primary">Danh Sách Bài Viết</h1>

      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Đang tải...</span>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="text-center text-danger mb-3">
        <strong>{{ errorMessage }}</strong>
      </div>

      <!-- Blog List -->
      <div v-if="blogs.length > 0" class="row">
        <div
          v-for="blog in blogs"
          :key="blog.ma"
          class="col-md-6 col-lg-4 mb-3"
        >
          <div class="card shadow-sm rounded border-0 overflow-hidden">
            <router-link :to="`/blogDetail/${blog.ma}`">
              <img
                :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
                alt="Blog Image"
                class="card-img-top"
              />
            </router-link>
            <div class="card-body p-3">
              <div class="small text-muted mb-3">
                Thời gian: {{ blog.thoiGian }}
              </div>
              <div class="small text-muted mb-3">
                Tác giả: {{ blog.nguoiDangBai }}
              </div>
              <h5 class="card-title">{{ blog.tieuDe.substring(0, 30) }}...</h5>
              <p class="card-text mb-3">
                {{ blog.noiDung.substring(0, 50) }}...
              </p>
              <router-link :to="`/blogDetail/${blog.ma}`" class="btn btn-dark"
                >Đọc tiếp</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="text-center mt-4">
        <button
          @click="prevPage"
          class="btn btn-secondary"
          :disabled="currentPage === 0"
        >
          Trang trước
        </button>
        <span class="mx-3">{{ currentPage + 1 }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          class="btn btn-secondary"
          :disabled="currentPage === totalPages - 1"
        >
          Trang sau
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const blogs = ref([]); // Danh sách bài viết
const loading = ref(true); // Trạng thái tải dữ liệu
const errorMessage = ref(""); // Thông báo lỗi
const currentPage = ref(0); // Trang hiện tại
const totalPages = ref(0); // Tổng số trang
const pageSize = ref(6); // Số bài viết trên mỗi trang

// Hàm tải dữ liệu bài viết từ API
const loadBlogs = async (page) => {
  loading.value = true; // Hiển thị trạng thái loading
  try {
    // Gọi API để lấy danh sách bài viết
    const response = await axios.get(
      `http://localhost:8080/api/blogs?page=${page}&size=${pageSize.value}`
    );
    // Cập nhật danh sách bài viết
    blogs.value = response.data;

    // Gọi API để lấy tổng số trang
    const totalResponse = await axios.get(
      `http://localhost:8080/api/blogs/size-page?size=${pageSize.value}`
    );
    totalPages.value = totalResponse.data; // Tổng số trang
  } catch (error) {
    // Xử lý lỗi nếu API không hoạt động
    errorMessage.value = "Không thể tải dữ liệu bài viết!";
    console.error("Error loading blogs:", error);
  } finally {
    // Tắt trạng thái loading
    loading.value = false;
  }
};

// Hàm chuyển sang trang tiếp theo
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    loadBlogs(currentPage.value);
  }
};

// Hàm chuyển sang trang trước
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    loadBlogs(currentPage.value);
  }
};

// Gọi hàm loadBlogs khi component được mount
onMounted(() => {
  loadBlogs(currentPage.value);
});
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 50px;
}

.card {
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 230px;
  object-fit: cover;
}

.text-danger {
  font-size: 1.2rem;
  font-weight: 500;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.text-center {
  text-align: center;
}
#blogs .carousel-item img {
  width: 100vw; /* Chiều ngang bằng 100% màn hình */
  height: 100%; /* Tự điều chỉnh chiều cao theo tỷ lệ */
  object-fit: cover; /* Đảm bảo hình ảnh bao phủ */
}

#blogs .carousel-inner {
  max-height: 100vh; /* Tùy chọn để giới hạn chiều cao màn hình */
  overflow: hidden;
}
</style>
