<template>
  <d2-container class="page">
     <img src='./image/all.png' />
  </d2-container>
</template>

<script>
import D2PageCover from './components/d2-page-cover'
export default {
  components: {
    D2PageCover
  },
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 400px;
    height: 400px;
    margin-top: 15%;
    margin-left: 30%;
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
