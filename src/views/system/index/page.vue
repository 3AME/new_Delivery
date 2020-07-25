<template>
  <d2-container>
    <div class="card m-b-30" style="height: 100%; width: 100%">
      <!-- display: table; -->
      <div class="card-body" style="height: 100%; width: 100%; text-align: center; display: table;">
        <!-- class="vertical-center" -->
        <div class="vertical-center">
          <el-row style="text-align: center">
            <el-col :span="9" style="text-align: right">
              <img
                class="rounded-circle"
                style="height: 100px; padding: 10px"
                alt="200x200"
                src="./image/all_bak.png"
              />
            </el-col>
            <el-col :span="15" style="text-align: left;">
              <!-- <h3 class="mt-0 font-600 vertical-center" style="height: 100px;padding: 10px">川流配送</h3> -->
              <img
            class="rounded-circle"
            style="height: 100px; padding: 10px"
            alt="200x200"
            src="../../../assets/images/small/app_name.png"
          />
            </el-col>
          </el-row>
          <!-- <img
            class="rounded-circle"
            style="height: 100px; padding: 10px"
            alt="200x200"
            src="../../../assets/images/small/app_name.png"
          />-->
          <el-card
            style="margin-left: 20%; margin-top: 10px; margin-right: 20%; margin-bottom: 10px;"
          >
            <el-row>
              <el-col :span="6" class="vertical-center" style="height: 100%;margin-bottom: 5%">
                <img class="rounded-circle" src="../../../assets/images/small/配送.png" />
              </el-col>
              <el-col
                :span="18"
                class="vertical-center"
                style="height: 100%; text-align: left; margin-bottom: 5%"
              >
                <h3 class="mt-0 font-500">您好！感谢您使用本软件</h3>
                <h3 class="mt-0 font-600" style="font-size: 18px">微逻辑智能物流系统</h3>
                <p
                  style="margin: 5px 0; font-size: 14px"
                >基于Node.js + Vue.js + Electron开发, GA智能优化算法提供支持</p>
              </el-col>
            </el-row>
          </el-card>
          <el-row style="margin-left: 20%; margin-right: 20%;">
            <el-col :span="12" style="height:100%; padding-right: 10px">
              <el-card
                style="height:100%; width: 100%;"
                @click.native.prevent="goToPage('page_coordinate')"
              >
                <el-row>
                  <el-col :span="6">
                    <img class="rounded-circle" src="../../../assets/images/small/坐标.png" />
                  </el-col>
                  <el-col :span="18" style="text-align: left">
                    <h3 class="mt-0 font-600" style="font-size: 18px">坐标查询</h3>
                    <p style="margin: 5px 0; font-size: 12px">点击这里或侧边栏中的【坐标查询】，开启路线查询之旅</p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12" style="height:100%; padding-left: 10px">
              <el-card
                style="height:100%; width: 100%;"
                @click.native.prevent="goToPage('page_route')"
              >
                <el-row>
                  <el-col :span="6">
                    <img class="rounded-circle" src="../../../assets/images/small/路线.png" />
                  </el-col>
                  <el-col :span="18" style="text-align: left">
                    <h3 class="mt-0 font-600" style="font-size: 18px">路线查询</h3>
                    <p style="margin: 5px 0; font-size: 12px">点击这里或侧边栏中的【路线查询】，开启路线查询之旅</p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-card
            style="margin-left: 20%; margin-top: 10px; margin-right: 20%; margin-bottom: 10px; padding-top: 20px; padding-bottom: 20px;"
            @click.native.prevent="goToPage('page_map')"
          >
            <el-row>
              <el-col :span="6">
                <img class="rounded-circle" src="../../../assets/images/small/地图.png" />
              </el-col>
              <el-col :span="18" class="vertical-center" style="text-align: left">
                <h3 class="mt-0 font-600" style="font-size: 18px">地图查询</h3>
                <p style="margin: 5px 0; font-size: 14px">点击这里或侧边栏中的【地图查询】，开启路线查询之旅</p>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <!-- <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple" style="height:100%; width: 100%;">1</div>
          </el-col>
          <el-col :span="16">
            <el-card style="height:100%; width: 100%;">
              <h3 class="mt-0 header-title el-icon-edit">微逻辑智能物流系统</h3>
              <p style="margin: 30px 0">基于Node.js + Vue.js + Electron开发, GA智能优化算法提供支持</p>
            </el-card>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple" style="height:100%; width: 100%;">222222222222</div>
          </el-col>
        </el-row>-->
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
      filename: __filename,
    };
  },
  methods: {
    goToPage(page) {
      this.$router.push({ name: page });
    },
  },
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
