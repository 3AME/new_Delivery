<template>
  <el-container class="content-container" style="overflow:auto;overflow-x: hidden !important;">
    <!-- <template slot="header">常见的一些问题</template> -->
    <el-header height="auto" style="padding: 20px">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <strong style="color: #5673ff; font-size: 24px">常见问题</strong>
            <p class="text-muted">热点问题快速解答</p>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
    <div class="row" style="margin-right: 2em; margin-left: 2em;">
      <div class="col-lg-12">
        <div>
          <!-- class="card" -->
          <!-- <div style="height:2em"></div>
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="text-center">
                <h4>常见问题FAQ</h4>
                <p class="text-muted">热点问题快速解答</p>
              </div>
            </div>
          </div> -->
          <div class="row m-t-30">
            <div class="col-lg-4">
              <div class="shadow-card faq-box border-success">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-success"></i>
                  </div>
                  <h5 class="text-success">01.</h5>
                  <h5 class="font-20 mb-3 mt-4">配送问题按何种格式输入？</h5>
                  <p class="text-muted mb-0">
                    对于路线、坐标方式查询，相应界面选择【模板】下载，Excel中预置了相应的格式及说明；地图查询中可通过搜索框输入或者直接标记。
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="shadow-card faq-box border-primary">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-primary"></i>
                  </div>
                  <h5 class="text-primary">02.</h5>
                  <h5 class="font-20 mb-3 mt-4">表格模式与图形模式有什么区别？</h5>
                  <p class="text-muted mb-0">表格模式与图形模式都可以实时编辑配送问题，表格模式精简、消耗资源少，图形模式直观、加载时间长，用户可根据需求选择模式。</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="shadow-card faq-box border-warning">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-warning"></i>
                  </div>
                  <h5 class="text-warning">03.</h5>
                  <h5 class="font-20 mb-3 mt-4">地图无法显示?</h5>
                  <p class="text-muted mb-0">地图显示不出来可能跟你的网络原因有关，本系统通过调用百度地图API来实现地图显示，请确保你的网络环境良好。</p>
                </div>
              </div>
            </div>
          </div>
          <div style="height:1em"></div>
          <div class="row">
            <div class="col-lg-4">
              <div class="shadow-card faq-box border-danger">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-danger"></i>
                  </div>
                  <h5 class="text-danger">04.</h5>
                  <h5 class="font-20 mb-3 mt-4">查询提示违反里程约束?</h5>
                  <p class="text-muted mb-0">车辆最大行驶里程过小，目标配送点距离过远导致车辆无法往返，问题无法解决，建议增大车辆里程。</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="shadow-card faq-box border-info">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-info"></i>
                  </div>
                  <h5 class="text-info">05.</h5>
                  <h5 class="font-20 mb-3 mt-4">查询提示违反时间约束?</h5>
                  <p class="text-muted mb-0">工作人员时间过短或车辆速度过低，配送中工作人员时间耗尽，问题无法解决，建议延长工作时间或提高车辆速度。</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="shadow-card faq-box border-dark">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-dark"></i>
                  </div>
                  <h5 class="text-dark">06.</h5>
                  <h5 class="font-20 mb-3 mt-4">查询提示违反载重约束?</h5>
                  <p class="text-muted mb-0">车辆载重过小，甚至无法满足一个配送点的需求，问题无法解决，建议增大车辆载重。.</p>
                </div>
              </div>
            </div>
          </div>
          <div style="height:1em"></div>
          <div class="row">
            <div class="col-lg-4">
              <div class="shadow-card faq-box border-warning">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-warning"></i>
                  </div>
                  <h5 class="text-warning">07.</h5>
                  <h5 class="font-20 mb-3 mt-4">查询加载等待时间过长</h5>
                  <p class="text-muted mb-0">运行环境、配送问题规模与复杂度与算法迭代次数会导致响应时间的差异，尝试改善配置或调节算法迭代次数。</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="shadow-card faq-box border-success">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-success"></i>
                  </div>
                  <h5 class="text-success">08.</h5>
                  <h5 class="font-20 mb-3 mt-4">怎么进行更细致的需求定制?</h5>
                  <p class="text-muted mb-0">
                    补充车辆成本等描述与修改算法参数可更贴近实际问题，更详细的实例可以参考用户文档。
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="shadow-card faq-box border-primary">
                <div class="card-body" style="height:15em">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-primary"></i>
                  </div>
                  <h5 class="text-primary">09.</h5>
                  <h5 class="font-20 mb-3 mt-4">怎么使用产品算法API?</h5>
                  <p class="text-muted mb-0">产品的算法进行了exe封装与调用及js调用，用户可根据API文档中的示例进行自定义。</p>
                </div>
              </div>
            </div>


          </div>
          <!-- container-fluid -->
        </div>
      </div>
    </div>
    </el-main>
    <!-- </template> -->
  </el-container>
</template>

<style scoped>
.bk {
  background-color: rgb(204, 229, 255);
  font-style: initial;
}
</style>>
<script>
export default {
  data() {
    return {
      banner: {
        // title: 'CHARTS',
        subTitle:
          " 如果你遇到了上述没有提到的问题，并且暂无法解决的话，请将遇到的问题发送到邮箱lafhhh@outlook.com，我们将及时为你解决.",
      },
    };
  },
};
</script>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>
<style>
.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-body
  .container-component
  .d2-container-full {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
}
</style>
