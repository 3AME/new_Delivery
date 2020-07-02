<template>
  <d2-container>
    <div class="card m-b-30" style="height: 100%; width: 100%">
        <div class="card-body" style="height: 100%; width: 100%">
            <div class="myimg">
            <img class="rounded-circle" style="width: 300px;height: 300px;margin-top: 5%;" alt="200x200" src="./image/all.png" >
            </div>
            <div class="mytext">
              <h3 class="mt-0" >MicroLogic</h3>
            <h3 class="mt-0 header-title">微逻辑智能物流系统</h3>
            <p class="sub-title">基于Node + VueJs + Electron开发, GA智能优化算法提供支持</p>
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
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style lang="scss" scoped>
  .myimg {
    text-align: center;
  }
  .mytext {
    text-align: center;
    // margin-left: -10%;
    margin-top: 5%;
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
