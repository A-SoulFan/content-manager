<template>
  <div class="tag-nav-container">
    <ul class="tag-nav">
      <li class="ava" @click="choosePart(1)"><a>向晚Ava</a></li>
      <li class="bella" @click="choosePart(2)"><a>贝拉Bella</a></li>
      <li class="carol" @click="choosePart(3)"><a>珈乐Carol</a></li>
      <li class="diana" @click="choosePart(4)"><a>嘉然Diana</a></li>
      <li class="eileen" @click="choosePart(5)"><a>乃琳Eileen</a></li>
    </ul>
  </div>
  <div class="imgs-container">
    <div class="left-col" id="left-col">
      <div
        v-for="(item, idx) in imgList.leftCol"
        :key="idx"
        class="img-container"
      >
        <a :href="item.imgUrl">
          <img class="img" :src="item.imgUrl" />
          <div class="uploader">
            <img
              class="uploader-head-portrait"
              :src="item.senderHeadPortraitUrl"
            />
            <span class="uploader-name">{{ item.senderName }}</span>
          </div>
        </a>
      </div>
    </div>
    <div class="right-col" id="right-col">
      <div
        v-for="(item, idx) in imgList.rightCol"
        :key="idx"
        class="img-container"
      >
        <a :href="item.imgUrl">
          <img class="img" :src="item.imgUrl" />
          <div class="uploader">
            <img
              class="uploader-head-portrait"
              :src="item.senderHeadPortraitUrl"
            />
            <span class="uploader-name">{{ item.senderName }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onBeforeMount } from "vue";
import axios from "axios";
//import Vuex from "vuex";
export default {
  name: "SharingPictures",
  setup() {
    let imgList = reactive({
      listData: [],
      leftCol: [],
      rightCol: [],
    }); //根据bar移动的长度来请求新的数据 // 模拟从后端拿到的数据
    let isRefreshBool = true;
    let page = 1; //控制页面
    let part = null;
    function refreshImg() {
      //请求图片
      const res = axios({
        method: "get",
        url: "https://api.asoul.cloud:8000/getPic",
        params: {
          page,
          part,
          type: 1,
        },
      }).then((response) => {
        imgList.listData = response.data;
        imgList.listData.forEach((item, index) => {
          let senderName = item.owner_name;
          let senderHeadPortraitUrl = null;
          //let senderHeadPortraitUrl = item.owner_pic;
          if (typeof item.owner_pic == "undefined") {
            senderHeadPortraitUrl = "https://images.weserv.nl/?url="+item.pic_url[0].img_src;
          } else {
            senderHeadPortraitUrl = "https://images.weserv.nl/?url="+item.owner_pic;
          }
          // console.log(item);
          if (item.pic_url) {
            let imgUrl = "https://images.weserv.nl/?url="+item.pic_url[0].img_src;
            let pic = {
              senderName,
              senderHeadPortraitUrl,
              imgUrl,
            };
            if (index % 2 === 0) {
              imgList.leftCol.push(pic);
            } else {
              imgList.rightCol.push(pic);
            }
            page = page + 1;
            isRefreshBool = true; //让refresh再次变得可以触发
          }
        });
      });
      console.log(res);//无用
    }
    function choosePart(name) {
      imgList.leftCol = [];
      imgList.rightCol = [];
      //先清空所有数据
      if (name === 1) {
        page = 1;
        part = 9221368;
        //console.log("向晚");
        refreshImg();
      } else if (name === 2) {
        page = 1;
        part = 195579;
        // console.log("贝拉");
        refreshImg();
      } else if (name === 3) {
        page = 1;
        part = 17872743;
        // console.log("珈乐");
        refreshImg();
      } else if (name === 4) {
        page = 1;
        part = 17520266;
        // console.log("嘉然");
        refreshImg();
      } else if (name === 5) {
        page = 1;
        part = 17839311;
        //console.log("耐力");
        refreshImg();
      }
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
        refreshImg();
      }
    }
    onMounted(() => {
      // 监视scroll滚动条
      window.addEventListener("scroll", isRefresh, true);
    }); //挂载时先加载一批图片
    onBeforeMount(() => {
      refreshImg();
    });
    return {
      imgList,
      choosePart,
    };
  },
};
</script>

<style scoped>
.tag-nav-container {
  width: 100%;
  height: 25px;
}
.tag-nav {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  list-style: none;
}
.tag-nav::-webkit-scrollbar {
  display: none;
}
.tag-nav li {
  width: 30%;
  text-align: center;
  margin-right: 5px;
  white-space: nowrap;
  font-size: 12px;
  padding: 5px;
}
.imgs-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.left-col,
.right-col {
  width: 48%;
  display: flex;
  flex-direction: column;
}
.img-container {
  margin-bottom: 50px;
  /*height: 200px;*/
}
.img-container a {
  color: black;
  text-decoration: none;
}
.img-container .img {
  border-radius: 10px;
  object-fit: cover;
}
.img-container .uploader-head-portrait {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}
.img-container .uploader {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.ava {
  background: #9ac8e2;
}
.bella {
  background: #bd7d74;
}
.carol {
  background: #b8a6d4;
}
.diana {
  background: #e799b0;
}
.eileen {
  background: #e799b0;
}
</style>
