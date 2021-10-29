<template>
<div>

    <div class="zhijianglibrary-container">
     <a v-if="detail.isShow" @click="closeDetail"
      >返回<span class="ico-return"></span
    ></a>
  </div>
  <div class="page-container" v-if="!loading">
    <div class="search-page" v-if="!detail.isShow">
      <h2 class="title">枝江文库</h2>
      <div class="subtitle">
        <h3>你想看的文章都在这里</h3>
      </div>
      //selector未实现
     
      //搜索框
      <div class="search-box">
        <input type="text" v-model="search.keyword" placeholder="搜索关键字" />
        <input
          type="submit"
          value="搜索"
          :class="search.isBtnDisabled ? 'submit-disable' : 'submit-enable'"
          :disabled="search.isBtnDisabled"
        />
      </div>
    </div>
  </div> 
</div>
 
</template>
<script>
export default {
  name: "Library",
  data() {
    return {
      detail:{
        isShow:true
      },
      loading:true,
      
    };
  },
  methods:{
    closeDetail(){
      this.$data.detail.isShow =false;
      this.loading = false;
    },
  },
  components: {},
  
};


</script>
<style lang="less" scoped>
.zhijianglibrary-container {
  height:100rem;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
  }

  * {
    box-sizing: border-box;
  }

  a {
    cursor: pointer;
  }

  .title {
    margin-bottom: 7.5px;
    font-size: 34px;
    font-weight: 400;
    color: #1f2937;
  }

  .subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 17px;
      font-weight: 400;
      color: #374151;
    }

    a {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #4b5563;
    }

    .ico-return {
      margin-left: 3px;
      width: 15px;
      height: 15px;
      background: url("../../assets/icons/return.svg") no-repeat center;
      background-size: contain;
    }

    .ico-vector {
      margin-left: 3px;
      width: 15px;
      height: 15px;
      background: url("../../assets/icons/arrow.svg") no-repeat center;
      background-size: contain;
    }
  }

  .page-container {
    padding-bottom: 20px;

    .search-page {
      margin-top: 20px;

      //选择器样式
      .select-box {
        height: 36px;
        display: flex;
        justify-content: space-around;
        overflow: hidden;

        input[type="text"] {
          appearance: none;
          height: 100%;
          flex: 1;
          overflow: hidden;
          font-size: 14px;
          padding: 8px 14px;
          border: none;
          border-radius: 0;
          outline: none;
          color: #1f2937;
          font-family: inherit;
          border-top: 1px solid #d1d5db;
          border-bottom: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
        }

        input[type="button"] {
          appearance: none;
          height: 100%;
          border: none;
          border-radius: 0;
          font-size: 14px;
          padding: 10px 14px;
          line-height: 100%;
          font-family: inherit;
          color: #fff;
        }

        .button-enable {
          background-color: #4b5563;
        }

        .button-disable {
          background-color: #9ca3af;
        }
      }

      //查找框样式
      .search-box {
        height: 36px;
        display: flex;
        justify-content: space-around;
        overflow: hidden;

        input[type="text"] {
          appearance: none;
          height: 100%;
          flex: 1;
          overflow: hidden;
          font-size: 14px;
          padding: 8px 14px;
          border: none;
          border-radius: 0;
          outline: none;
          color: #1f2937;
          font-family: inherit;
          border-top: 1px solid #d1d5db;
          border-bottom: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
        }

        input[type="submit"] {
          appearance: none;
          height: 100%;
          border: none;
          border-radius: 0;
          font-size: 14px;
          padding: 10px 14px;
          line-height: 100%;
          font-family: inherit;
          color: #fff;
        }

        .submit-enable {
          background-color: #4b5563;
        }

        .submit-disable {
          background-color: #9ca3af;
        }
      }

      .entries-box {
        .tab {
          margin-top: 18px;

          li {
            white-space: nowrap;
          }

          .tab-list-wrapper {
            overflow: scroll;
            user-select: none;

            &::-webkit-scrollbar {
              width: 0;
              height: 0;
            }

            .main-tab-list {
              display: flex;
              justify-content: space-between;

              li {
                font-size: 17px;
                line-height: 30px;
                padding: 5px 0;
                margin-right: 9px;
              }

              .active {
                border-bottom: 2px solid #374151;
              }
            }

            .sub-tab-list {
              display: flex;

              li {
                font-size: 12.5px;
                line-height: 24.5px;
                padding: 4px 21px;
                margin-right: 9.5px;
                margin-top: 9.5px;
                background-color: #9ca3af;
                color: #fff;
              }

              .active {
                background-color: #4b5563;
              }
            }
          }
        }

        .list-container {
          ul {
            li {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 197.5px;
              margin-top: 22px;
              padding: 15.5px 17.5px 12px;
              background-color: #f8f8f8;

              .dict-title {
                display: flex;
                justify-content: space-between;
                align-items: center;

                h4 {
                  &::before {
                    content: "";
                    display: inline-block;
                    width: 3px;
                    height: 12px;
                    margin-right: 7px;
                    background-color: #1f2937;
                  }

                  font-size: 17px;
                }

                a {
                  display: flex;
                  align-items: center;
                  font-size: 12.5px;
                  color: #6b7280;

                  .ico-link {
                    margin-right: 5px;
                    width: 14px;
                    height: 14px;
                   background: url("../../assets/icons/link.png") no-repeat center;
                    background-size: contain;
                  }
                }
              }

              .dict-detail {
                font-size: 14.5px;
                line-height: 24.5px;
                color: #6b7280;

                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                line-clamp: 4;
                overflow: hidden;
              }

              .dict-updatetime {
                display: flex;
                align-items: center;
                font-size: 12.5px;
                color: #6b7280;

                .ico-clock {
                  margin-right: 4px;
                  width: 14px;
                  height: 14px;
                 background: url("../../assets/icons/clock.svg") no-repeat center;
                  background-size: contain;
                }
              }
            }
          }
        }
      }
    }

    .detail-page {
      background-color: #f8f8f8;
      padding: 13px 15px;
      margin-top: 28px;

      .info {
        display: flex;
        justify-content: space-between;
        font-size: 12.5px;
        color: #6b7280;

        .update-time {
          display: flex;
          align-items: center;
          white-space: nowrap;

          .ico-clock {
            margin-right: 3px;
            width: 14px;
            height: 14px;
          //  background: url(".../../assets/icons/clock.svg") no-repeat center;
            background-size: contain;
          }
        }
      }

      .title {
        margin-top: 23px;
        color: #1f2937;
        font-size: 25px;
      }

      .detail {
        margin-top: 12px;
        font-size: 14.5px;
        line-height: 24.5px;
        font-family: inherit;
        color: #6b7280;
      }
    }
  }
}
</style>
