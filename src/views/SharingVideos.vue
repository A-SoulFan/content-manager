<template>
  <div class="slide-show">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item, idx) in slideList" :key="idx" class="swiper-slide">
          <img :src="item.imgUrl" />
        </div>
        <!--<div class="swiper-slide">Slide 2</div>-->
        <!--<div class="swiper-slide">Slide 3</div>-->
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- 如果需要滚动条 -->
      <!--<div class="swiper-scrollbar"></div>-->
    </div>
  </div>
  <div class="videos-container">
    <a
      :href="video.bvid"
      v-for="(video, idx) in lists.videoList"
      :key="idx"
      class="video-container"
    >
      <div class="video" :style="`background-image: url(${video.pictureUrl})`">
        <div class="video-info">
          <div class="play">
            <img src="../assets/icons/videoIcon/24gl-playSquare.svg" />
            <span
              class="play-counts"
              >{{ video.playCounts }}</span
            >
          </div>
          <div class="danmu">
            <img src="../assets/icons/barrageIcon/danmu.svg" />
            <span class="danmu-counts">{{
              video.danmuCounts
            }}</span>
          </div>
        </div>
      </div>
      <span class="video-title">{{ video.title }}</span>
    </a>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import Swiper from "swiper";
import axios from "axios";
import "/node_modules/swiper/css/swiper.css";
export default {
  name: "SharingVideos",
  setup() {
    let initialData = reactive({
      imgCount: 0,
      interId: null,
    });
    let lists = reactive({
      videoList: [],
      slideList: [],
    });
    let slideList = [
      {
        id: 1,
        imgUrl: require("../assets/icons/slides/img1.jpg"),
      },
      {
        id: 2,
        imgUrl: require("../assets/icons/slides/img2.jpg"),
      },
      {
        id: 3,
        imgUrl: require("../assets/icons/slides/img3.jpg"),
      },
      {
        id: 4,
        imgUrl: require("../assets/icons/slides/img4.jpg"),
      },
      {
        id: 5,
        imgUrl: require("../assets/icons/slides/img5.jpg"),
      },
      {
        id: 6,
        imgUrl: require("../assets/icons/slides/img6.jpg"),
      },
    ];
    let isRefreshBool = true;
    let page = 1; //控制页面
    function refreshVideo() {
      //请求图片
      const res = axios({
        method: "get",
        url: "https://api.asoul.cloud:8000/getBV",
        params: {
          page,
          type: 1,
        },
      }).then((response) => {
        //申明一个list接受data
        let list = response.data;
        list.forEach((item) => {
          let bvid = "https://www.bilibili.com/video/" + item.bvid;
          let video = {
            title: item.title,
            playCounts: digitalProcessing(item.stat_view),
            danmuCounts: digitalProcessing(item.stat_danmaku),
            pictureUrl: "https://images.weserv.nl/?url="+item.pic,
            bvid,
          };
          lists.videoList.push(video);
        });
        page = page + 1;
        isRefreshBool = true; //让refresh再次变得可以触发
      });
      console.log(res);//无用
    }
    function isRefresh() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight - 200 && isRefreshBool) {
        // false防止refresh()加载数据函数多次触发
        isRefreshBool = false;
        refreshVideo();
      }
    }
    function digitalProcessing(number) {
      if (number >= 10000) {
        number = number / 10000;
        number = number.toFixed(0) + "w";
      }
      return number;
    }
    onMounted(() => {
      myload();
      window.addEventListener("scroll", isRefresh, true);
      refreshVideo();
    });
    function myload() {
      var mySwiper = new Swiper(".swiper-container", {
        // direction: 'vertical', // 垂直切换选项
        direction: "horizontal", // 水平切换选项
        loop: true, // 循环模式选项
        autoplay: {
          disableOnInteraction: false,
          delay: 2000,
        }, //可选选项，自动滑动,
        // 如果需要分页器
        // pagination: {
        //     // el: '.swiper-pagination',
        // },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
      });
      console.log(mySwiper);//无用
    }
    return {
      slideList,
      initialData,
      lists,
    };
  },
};
</script>

<style scoped>
/*轮播图*/
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-button-prev {
  background-color: rgba(184, 184, 184, 0.67);
  left: 82%; /*260px*/
  top: 95%;
  width: 20px;
  height: 20px;
}
.swiper-button-next {
  background-color: rgba(184, 184, 184, 0.67);
  left: 90%; /*290px*/
  top: 95%;
  width: 20px;
  height: 20px;
}
/*箭头大小*/
.swiper-button-prev:after {
  content: "prev";
  font-size: 10px;
  color: white;
}
.swiper-button-next:after {
  content: "next";
  font-size: 10px;
  color: white;
}

.slide-show {
  border: 1px solid black;
  height: 170px;
  border-radius: 5px;
  position: relative;
}
.slide-show a {
  display: flex;
  height: 100%;
}
.slide-show img {
  object-fit: cover;
}

/*视频*/
.videos-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.videos-container .video {
  background-size: cover;
  width: 100%;
  height: 100px;
  color: #9fa19f;
  position: relative;
  border-radius: 5px;
}
.video-container {
  margin-top: 15px;
  width: 48%;
  height: 130px;
  display: inline-block;
  color: black;
  text-decoration: none;
}
.videos-container .video img {
  width: 20px;
  height: 20px;
  margin-right: 2px;
}
.videos-container .video .video-info {
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 0;
}
.videos-container .video .video-info > div {
  display: flex;
  margin-right: 10px;
  align-items: center;
}
.video-title {
  display: -webkit-box;
  max-height: 42px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 14px;
}
</style>
