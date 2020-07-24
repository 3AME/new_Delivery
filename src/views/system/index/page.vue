<template>
  <d2-container>
    <div class="card m-b-30" style="height: 100%; width: 100%">
      <div class="card-body" style="height: 100%; width: 100%; display: table;">
        <div class="vertical-center">
          <img
            class="rounded-circle"
            style="width: 300px;height: 300px;margin: 20px;"
            alt="200x200"
            src="./image/all.png"
          />
          <h3 class="mt-0 font-600">川流配送</h3>
          <h3 class="mt-0 header-title">微逻辑智能物流系统</h3>
          <p >基于Node.js + Vue.js + Electron开发, HGA智能优化算法提供支持</p>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
// import D2PageCover from './components/d2-page-cover'
export default {
  // components: {
  //   D2PageCover
  // },
  data() {
    return {
      filename: __filename
    };
  }
};
</script>

<style lang="scss" scoped>
.vertical-center {
  text-align: center;
  // margin-left: -10%;
  margin-top: 5%;
  display: table-cell;
  vertical-align: middle;
}
// .btn-group {
//   color: $color-text-placehoder;
//   font-size: 12px;
//   line-height: 12px;
//   margin-top: 0px;
//   margin-bottom: 20px;
//   .btn-group__btn {
//     color: $color-text-sub;
//     &:hover {
//       color: $color-text-main;
//     }
//     &.btn-group__btn--link {
//       color: $color-primary;
//     }
//   }
// }
</style>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>
