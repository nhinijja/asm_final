<template>
  <div class="carousel">
    <div class="container-fluid">
      <!-- Owl Carousel -->
      <div class="owl-carousel owl-theme">
        <div
          class="carousel-item"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <img :src="slide.image" alt="Slide image" class="carousel-img" />
          <div class="carousel-text">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.description }}</p>
            <div class="carousel-btn">
              <a class="btn custom-btn" href="#">View Menu</a>
              <a class="btn custom-btn" href="#">Book Table</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "slideShow",
  data() {
    return {
      slides: [
        {
          image: "/img/carousel-1.jpg",
          title: "Best <span>Quality</span> Ingredients",
          description:
            "Lorem ipsum dolor sit amet elit. Phasellus ut mollis mauris.",
        },
        {
          image: "/img/carousel-1.jpg",
          title: "World’s <span>Best</span> Chef",
          description:
            "Morbi sagittis turpis id suscipit feugiat. Suspendisse eu augue urna.",
        },
        {
          image: "/img/carousel-3.jpg",
          title: "Fastest Order <span>Delivery</span>",
          description:
            "Sed ultrices, est eget feugiat accumsan, dui nibh egestas tortor.",
        },
      ],
    };
  },
  mounted() {
    // Kiểm tra xem jQuery và Owl Carousel đã được tải chưa
    if (window.$ && window.$.fn.owlCarousel) {
      // Khởi tạo Owl Carousel
      window.$(".owl-carousel").owlCarousel({
        loop: true, // Cho phép quay lại đầu sau khi hết slide
        margin: 10, // Khoảng cách giữa các slide
        nav: true, // Hiển thị nút điều hướng (Next/Prev)
        items: 1, // Mỗi lần hiển thị 1 slide
        autoplay: true, // Tự động chuyển slide
        autoplayTimeout: 5000, // Thời gian giữa các slide (5 giây)
        autoplayHoverPause: true, // Dừng khi hover vào carousel
        navText: [
          '<i class="fa fa-angle-left" aria-hidden="true"></i>',
          '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        ],
      });
    } else {
      console.error("jQuery hoặc Owl Carousel chưa được tải.");
    }
  },
};
</script>

<style scoped>
/* CSS cho Owl Carousel */
.owl-carousel .carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; /* Background đen để làm nổi bật hình ảnh */
}

.owl-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Đảm bảo ảnh không bị kéo giãn */
}

.carousel-text {
  position: absolute;
  bottom: 20%;
  left: 10%;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
}

.carousel-text h1 {
  font-size: 36px;
  font-weight: bold;
}

.carousel-text p {
  font-size: 16px;
}

.carousel-btn {
  margin-top: 20px;
}

.custom-btn {
  color: white;
  background-color: #f67c16;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 10px;
}

.owl-nav {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}

.owl-nav .owl-prev,
.owl-nav .owl-next {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 50%;
  font-size: 24px;
}
</style>
