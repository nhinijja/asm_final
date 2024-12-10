<template>
  <br />
  <br />
  <br />
  <div v-if="loading" class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Đang tải...</span>
    </div>
  </div>

  <div v-else-if="errorMessage" class="text-center text-danger mb-3">
    <strong>{{ errorMessage }}</strong>
  </div>

  <div v-else-if="blog" class="container my-5">
    <div class="row">
      <div class="col-lg-9 offset-lg-2">
        <h1 class="display-4 mb-7">{{ blog.tieuDe }}</h1>
        <img
          :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
          alt="Blog Image"
          class="img-fluid"
        />
        <div class="mb-6">
          <p>{{ blog.noiDung }}</p>
        </div>

        <div class="mb-6">
          <h4>Bình luận</h4>
          <p v-if="comments.length > 0" class="text-muted">
            Tổng số bình luận: {{ comments.length }}
          </p>
          <div v-if="comments.length === 0" class="text-muted">
            <button class="btn btn-warning" @click="showComments">
              Hiển thị bình luận
            </button>
          </div>
          <div v-if="loadingComments" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Đang tải bình luận...</span>
            </div>
          </div>
          <!-- Phần bình luận với thanh cuộn -->
          <div v-if="comments.length > 0" class="comment-container">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="card mb-2"
            >
              <div class="card-body">
                <p>
                  <strong>{{ comment.hoTenNguoiComment }}:</strong>
                  {{ comment.noiDung }}
                </p>
                <!-- Hiển thị thời gian -->
                <p class="text-muted">
                  <small>{{ formatDate(comment.thoiGian) }}</small>
                </p>
              </div>
            </div>
          </div>

          <div v-if="isLoggedIn">
            <h5>Thêm bình luận</h5>
            <form @submit.prevent="submitComment">
              <div class="form-group">
                <textarea
                  id="commentText"
                  class="form-control"
                  v-model="newComment"
                  placeholder="Viết bình luận của bạn"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-warning">
                Gửi bình luận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const isLoggedIn = computed(() => store.getters.getLoginStatus);
const userInfo = computed(() => store.getters.getUserInfo);

const route = useRoute();
const blog = ref(null);
const comments = ref([]);
const newComment = ref("");
const loading = ref(true);
const loadingComments = ref(false);
const errorMessage = ref("");

const getBlog = async (blogId) => {
  try {
    const blogResponse = await axios.get(
      `http://localhost:8080/api/blogs/${blogId}`
    );
    blog.value = blogResponse.data;
    console.log(blogResponse);
  } catch (error) {
    console.error("Lỗi khi tải bài viết:", error);
    errorMessage.value = "Không thể tải bài viết!";
  }
};

const getComments = async (blogId) => {
  try {
    const commentsResponse = await axios.get(
      `http://localhost:8080/api/comments/blog/${blogId}`
    );
    comments.value = commentsResponse.data;
  } catch (error) {
    console.error("Lỗi khi tải bình luận:", error);
    errorMessage.value = "Không thể tải bình luận!";
  } finally {
    loadingComments.value = false;
  }
};

const submitComment = async () => {
  try {
    const blogId = route.params.id;
    const data = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(data);
    const email = parsedData?.email || "Người dùng chưa đăng nhập";

    const newCommentData = {
      email: email,
      blogId: blogId,
      noiDung: newComment.value,
    };

    await axios.post(`http://localhost:8080/api/comments/add`, newCommentData);

    await getComments(blogId);

    newComment.value = "";
  } catch (error) {
    console.error("Lỗi khi gửi bình luận:", error);
  }
};

onMounted(async () => {
  const blogId = route.params.id;
  console.log(blogId);

  await getBlog(blogId);
  loading.value = false;
});

const showComments = () => {
  const blogId = route.params.id;
  getComments(blogId);
};

// Thêm phương thức formatDate để định dạng ngày giờ
const formatDate = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(date).toLocaleString("vi-VN", options);
};
</script>

<style scoped>
.text-center {
  top: 100px;
}
/* Để container rộng hơn */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
}

/* Tiêu đề lớn hơn và không gian dưới tiêu đề */
.display-4 {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  margin-bottom: 40px;
}

/* Hình ảnh rộng hơn với margin dưới nhiều hơn */
.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 40px;
}

/* Căn giữa */
.text-center {
  text-align: center;
}

/* Tạo thêm không gian cho các comment */
.card-body {
  font-size: 1.2rem;
  line-height: 1.8;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Cải thiện phần textarea */
textarea {
  resize: vertical;
  width: 100%;
  height: 140px;
  padding: 15px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 25px;
}

/* Thêm quy tắc cho phần bình luận */
.comment-container {
  max-height: 300px; /* Giới hạn chiều cao của phần bình luận */
  overflow-y: auto; /* Hiển thị thanh cuộn dọc khi nội dung vượt quá chiều cao */
}

/* Tăng kích thước nút gửi bình luận */
button[type="submit"] {
  background-color: #007bff;
  border: none;
  padding: 14px 30px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Thêm khoảng cách cho phần Bình luận */
.mb-6 {
  margin-bottom: 40px;
}

/* Thêm khoảng cách cho phần tác giả và thời gian */
.text-muted {
  font-size: 1rem;
}

.text-muted small {
  font-size: 0.9rem;
}

/* Thêm cho nút "Hiển thị bình luận" */
button.btn-warning {
  background-color: #ffc107;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
}

button.btn-warning:hover {
  background-color: #e0a800;
}
</style>
