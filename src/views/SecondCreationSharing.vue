<template>
  <div class="mobile-container">
    <div class="mobile-container-header">
      <img class="asf-img" src="../assets/icons/ASF_black.png" />
      <img class="more-options-img" src="../assets/icons/moreOptions.png" />
    </div>
    <div class="search-option">
      <span class="search-option-title">二创分享</span>
      <input class="search-input" type="text" placeholder="搜索作品" />
      <div class="search-img">
        <svg
          t="1633450525656"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2419"
          width="25"
          height="25"
        >
          <path
            d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z"
            p-id="2420"
            fill="#BEBEBE"
          ></path>
        </svg>
      </div>
    </div>
    <!--导航栏-->
    <div class="sharing-nav">
      <ul>
        <li class="sharing-nav-opt">
          <router-link active-class="active" :to="{ name: 'sharingVideos' }"
            >视频</router-link
          >
        </li>
        <li class="sharing-nav-opt">
          <router-link active-class="active" :to="{ name: 'sharingPictures' }"
            >图片</router-link
          >
        </li>
        <li class="sharing-nav-opt">
          <router-link
            active-class="active"
            :to="{ name: 'sharingSpecialColumn' }"
            >专栏</router-link
          >
        </li>
      </ul>
    </div>
    <!--<keep-alive>-->
    <!--<SharingPictureHeader></SharingPictureHeader>-->
    <!--</keep-alive>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "SecondCreationSharing",
  // components: { SharingPictureHeader },
  // components: { headerTitle },
};
</script>

<style scoped>
.mobile-container {
  width: 100%;
}
.mobile-container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mobile-container-header .asf-img {
  width: 75px;
  height: 75px;
}
.mobile-container-header .more-options-img {
  width: 25px;
  height: 25px;
}
.search-option {
  display: flex;
  text-align: center;
  position: relative;
}
.search-option > .search-option-title {
  font-size: 16px;
  margin-right: 5px;
  line-height: 37px;
  width: 28%;
}
.search-option > .search-input {
  outline: none;
  background-color: #e3e3e3;
  border-radius: 2px;
  border: solid #e3e3e3 1px;
  width: 63%;
  height: 35px;
  text-indent: 3em;
  position: relative;
}
.search-option > .search-input::placeholder {
  color: #bebebe;
  font-size: 14px;
}
.search-option > .search-img {
  position: absolute;
  left: 30%;
  top: calc(50% - 15px);
}
.sharing-nav > ul {
  display: flex;
  padding-top: 10px;
  list-style: none;
}
.sharing-nav > ul > .sharing-nav-opt {
  width: 33%;
  height: 40px;
  text-align: center;
}
.sharing-nav > ul > .sharing-nav-opt a {
  color: #6a6e74;
  font-size: 14px;
  width: 100%;
  display: inline-block;
  border-top: rgba(0, 0, 0, 0) 2px solid;
  text-decoration: none;
}
.sharing-nav > ul > .sharing-nav-opt a.active {
  border-top: rgb(134, 233, 255) 2px solid;
  border-left: white solid 2px;
  border-bottom: white solid 2px;
  border-right: white solid 2px;
}
</style>
