<template>
  <div class="special-column-bg">
    <div class="title">WE ARE A-SOUL</div>
  </div>
  <div
    v-for="(specialColumn, idx) in lists.specialColumnList"
    :key="idx"
    class="special-column-content"
  >
    <a :href="specialColumn.cvid"
      ><span class="special-column-title">{{ specialColumn.title }} </span>
      <div class="special-column-info">
        <div class="left">
          <img src="../assets/icons/barrageIcon/danmu.svg" />
          <span class="comment-counts">{{ specialColumn.commentCounts }}</span>
          <span class="comment-date">{{ specialColumn.commentDate }}</span>
        </div>
        <div class="right">
          <img
            class="head-portrait"
            :src="specialColumn.senderHeadPortraitUrl"
          />
          <span class="username">{{ specialColumn.senderName }}</span>
        </div>
      </div></a
    >
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import moment from "moment";
import axios from "axios";
export default {
  name: "SharingSpecialColumn",
  setup() {
    let lists = reactive({
      specialColumnList: [],
    });
    let isRefreshBool = true;
    let page = 1; //控制页面
    let sort_id = 0;
    onMounted(() => {
      refreshColumn();
    });
    function refreshColumn() {
      //请求图片
      const res = axios({
        method: "get",
        url: "https://api.asoul.cloud:8000/getArticleList",
        params: {
          page,
          sort_id,
          type: 1,
        },
      }).then((response) => {
        if (response.data.code !== 1) {
          let list = response.data;
          list.forEach((item) => {
            let cvid = "https://www.bilibili.com/read/" + item.cvid;
            let Column = {
              title: item.title,
              commentCounts: item.stats_reply,
              commentDate: moment
                .utc(parseInt(item.publish_time) * 1000)
                .format("YYYY-MM-DD  hh:mm:ss"),
              senderName: item.owner_name,
              senderHeadPortraitUrl: "https://images.weserv.nl/?url="+item.owner_face,
              cvid,
            };
            lists.specialColumnList.push(Column);
          });
          sort_id = sort_id + 1;
          isRefreshBool = true; //让refresh再次变得可以触发
        }
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
        refreshColumn();
      }
    }
    onMounted(() => {
      window.addEventListener("scroll", isRefresh, true);
      refreshColumn();
    });
    return {
      lists,
    };
  },
};
</script>

<style scoped>
.special-column-bg {
  background-image: url("../assets/icons/specialColumnBG.png");
  background-size: cover;
  width: 100%;
  height: 170px;
  border-radius: 10px;
  position: relative;
}
.special-column-bg .title {
  display: inline-block;
  width: 100%;
  height: 40px;
  background-color: rgba(98, 114, 170, 0.41);
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: calc(50% - 20px);
  color: white;
  font-size: 14px;
  letter-spacing: 5px;
}
.left > img {
  width: 20px;
  height: 20px;
}
.right > .head-portrait {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: white solid 1px;
}
.special-column-content a {
  width: 100%;
  height: 100%;
  color: black;
  text-decoration: none;
}
.special-column-content .special-column-title {
  font-size: 16px;
  font-weight: 400;
  display: block;
  margin: 0;
  padding: 30px 0;
  padding-top: 25px;
  /*white-space: nowrap;*/
  display: -webkit-box;
  max-height: 8px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-height: 35px;
  overflow: hidden;
}
.special-column-content .special-column-info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid #a8a8a8;
}
.special-column-content .special-column-info .left {
  display: flex;
  align-items: center;
  color: #9fa19f;
}
.special-column-content .special-column-info .left .comment-counts {
  margin-left: 5px;
  margin-right: 10px;
}
.special-column-content .special-column-info .right {
  display: flex;
  align-items: center;
}
.special-column-content .special-column-info .right .username {
  margin-left: 5px;
  font-weight: 600;
}
</style>
