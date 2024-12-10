<template>
  <div class="page-header mb-0">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2></h2>
        </div>
      </div>
    </div>
  </div>

  <section id="profile" class="profile section">
    <div class="container">
      <div class="text-center my-5">
        <h1 class="fw-bolder">Quản lý bài viết</h1>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <form
          @submit.prevent="isEditing ? editBlog() : addBlog()"
          class="col-12"
        >
          <div class="mb-3">
            <label for="tieuDe" class="form-label">Tiêu đề</label>
            <input
              v-model="tieuDe"
              type="text"
              class="form-control form-control-lg"
              id="tieuDe"
              required
            />
          </div>
          <div class="mb-3">
            <label for="noiDung" class="form-label">Nội dung</label>
            <textarea
              v-model="noiDung"
              class="form-control form-control-lg"
              id="noiDung"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="hinh" class="form-label">Hình ảnh</label>
            <input
              @change="handleFileChange"
              type="file"
              class="form-control form-control-lg"
              id="hinh"
              accept="image/*"
            />
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success">
              {{ isEditing ? "Cập nhật" : "Thêm" }}
            </button>
            <br />
            <button
              type="reset"
              @click="cancelEdit"
              class="btn btn-dark"
              v-if="isEditing"
            >
              Hủy
            </button>
          </div>
        </form>

        <table class="table col-12">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Hình</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(blog, index) in paginatedBlogs" :key="blog.ma">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <!-- Display the serial number -->
              <td>{{ blog.tieuDe }}</td>
              <td>{{ blog.noiDung.substring(0, 60) }}...</td>
              <td>
                <img
                  :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
                  style="width: 150px; height: 100px"
                  alt="Blog Image"
                />
              </td>
              <td class="d-flex gap-2">
                <button @click="editBlogForm(blog.ma)" class="btn btn-warning">
                  Edit
                </button>
              </td>
              <td>
                <button @click="deleteBlog(blog.ma)" class="btn btn-danger">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-secondary"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Previous
          </button>
          <span class="mx-3"> Trang {{ currentPage }} / {{ totalPages }} </span>
          <button
            class="btn btn-secondary"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const blogs = ref([]);
const tieuDe = ref("");
const noiDung = ref("");
const hinh = ref(null);
const isEditing = ref(false);
const editingBlogId = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(7);

const data = localStorage.getItem("userInfo");
const parsedData = JSON.parse(data);
const savedEmail = parsedData?.email;

onMounted(async () => {
  if (savedEmail) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/blogs/user/${savedEmail}`
      );
      blogs.value = response.data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    }
  } else {
    console.log("Email không tồn tại trong localStorage");
  }
});

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return blogs.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(blogs.value.length / itemsPerPage.value);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Add Blog
const addBlog = async () => {
  try {
    const formData = new FormData();
    formData.append("email", savedEmail);
    formData.append("tieuDe", tieuDe.value);
    formData.append("noiDung", noiDung.value);
    if (hinh.value) {
      formData.append("file", hinh.value);
    }

    const response = await axios.post(
      "http://localhost:8080/api/blogs/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      alert("Thêm bài viết thành công!");
      blogs.value.push(response.data);
      tieuDe.value = "";
      noiDung.value = "";
      hinh.value = null;
    }
  } catch (error) {
    console.error("Lỗi khi thêm bài viết:", error);
    alert("Có lỗi xảy ra khi thêm bài viết.");
  }
};

// Edit Blog
const editBlogForm = (blogId) => {
  const blogToEdit = blogs.value.find((blog) => blog.ma === blogId);
  if (blogToEdit) {
    tieuDe.value = blogToEdit.tieuDe;
    noiDung.value = blogToEdit.noiDung;
    hinh.value = null;
    isEditing.value = true;
    editingBlogId.value = blogId;
  }
};

const editBlog = async () => {
  try {
    const formData = new FormData();
    formData.append("email", savedEmail);
    formData.append("tieuDe", tieuDe.value);
    formData.append("noiDung", noiDung.value);
    if (hinh.value) {
      formData.append("file", hinh.value);
    }

    const response = await axios.put(
      `http://localhost:8080/api/blogs/update/${editingBlogId.value}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      alert("Sửa bài viết thành công!");
      const index = blogs.value.findIndex(
        (blog) => blog.ma === editingBlogId.value
      );
      if (index !== -1) {
        blogs.value[index] = response.data;
      }
      isEditing.value = false;
      tieuDe.value = "";
      noiDung.value = "";
      hinh.value = null;
    }
  } catch (error) {
    console.error("Lỗi khi sửa bài viết:", error);
    alert("Có lỗi xảy ra khi sửa bài viết.");
  }
};

// Cancel Edit
const cancelEdit = () => {
  isEditing.value = false;
  tieuDe.value = "";
  noiDung.value = "";
  hinh.value = null;
};

// Delete Blog
const deleteBlog = async (blogId) => {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa bài viết này?");
  if (confirmDelete) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/blogs/${blogId}`
      );
      if (response.status === 200) {
        alert("Xóa bài viết thành công!");
        blogs.value = blogs.value.filter((blog) => blog.ma !== blogId);
      }
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert("Có lỗi xảy ra khi xóa bài viết.");
    }
  }
};

// Handle File Change
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    hinh.value = file;
  }
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
