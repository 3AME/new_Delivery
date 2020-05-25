<template>
  <!-- <d2-container >
    <template slot="header">常见的一些问题</template>
    <h3 style="color:blue">点击查询结果不显示？</h3>
            <p>
               解决方案：检查导入文档表头是否与导入文档提示一致，不一致会导致无法获取查询结果。
            </p>
            <h3 style="color:blue">如何清除上一次导入的excel文件？</h3>
            <p>
                解决方案：点击导入.xlsx/.xls按钮，自动覆盖内容，不会影响下一次查询。
            </p>
            <h3 style="color:blue">点击查询以后没有页面跳转？</h3>
            <p>
                解决方案：可能是因为运行环境的问题导致响应时间的差异，请耐心等待。也可能是因为数据量大，查询需要一定时间。
            </p>
    <template slot="footer">如果你遇到了上述没有提到的问题，并且暂无法解决的话，请将遇到的问题发送到邮箱lafhhh@outlook.com，我们将及时为你解决。</template>
  </d2-container>-->

  <d2-container>
    <!-- <template slot="header">常见的一些问题</template> -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="text-center">
                <h5>常见的一些问题</h5>
                <p class="text-muted">这部分总结用户遇到的问题，集中展示，方便后续用户自助解决问题</p>
              </div>
            </div>
          </div>
          <div class="row m-t-30">
            <div class="col-lg-4">
              <div class="card faq-box border-success">
                <div class="card-body">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-success"></i>
                  </div>
                  <h5 class="text-success">01.</h5>
                  <h5 class="font-16 mb-3 mt-4">地图选择页面地图显示不出来怎么办？</h5>
                  <p class="text-muted mb-0">地图显示不出来可能跟你的网络原因有关，本系统通过调用百度地图API来实现地图显示，请确保你的网络环境良好。</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card faq-box border-primary">
                <div class="card-body">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-primary"></i>
                  </div>
                  <h5 class="text-primary">02.</h5>
                  <h5 class="font-16 mb-3 mt-4">如何清除上一次导入的excel文件？</h5>
                  <p class="text-muted mb-0">点击导入.xlsx/.xls按钮，自动覆盖内容，不会影响下一次查询，也可以点击清除按钮或者刷新按钮，再重新导入</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card faq-box border-warning">
                <div class="card-body">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-warning"></i>
                  </div>
                  <h5 class="text-warning">03.</h5>
                  <h5 class="font-16 mb-3 mt-4">点击查询以后没有页面跳转？</h5>
                  <p class="text-muted mb-0">可能是因为运行环境的问题导致响应时间的差异，请耐心等待。也可能是因为数据量大，查询需要一定时间。</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row"> -->
            <!-- <div class="col-lg-4">
              <div class="card faq-box border-danger">
                <div class="card-body">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-danger"></i>
                  </div>
                  <h5 class="text-danger">04.</h5>
                  <h5 class="font-16 mb-3 mt-4">地图选择页面地图显示不出来怎么办？</h5>
                  <p class="text-muted mb-0">地图显示不出来可能跟你的网络原因有关，本系统通过调用百度地图API来实现地图显示，请确保你的网络环境良好。</p>
                </div>
              </div>
            </div> -->

            <!-- <div class="col-lg-4">
              <div class="card faq-box border-info">
                <div class="card-body">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-info"></i>
                  </div>
                  <h5 class="text-info">05.</h5>
                  <h5 class="font-16 mb-3 mt-4">Why do we use it?</h5>
                  <p class="text-muted mb-0">
                    Fermentum molestie leo at dignissim mi Donec at ex placerat pretium ex vitae porta orci Pellentesque augue lacus
                    dignissim tristique aliquam in
                    placerat feugiat sapien Fusce a enim faucibus lacinia felis a vulputate eros Aenean malesuada et ex et laoreet.
                  </p>
                </div>
              </div>
            </div> -->
<!-- 
            <div class="col-lg-4">
              <div class="card faq-box border-dark">
                <div class="card-body">
                  <div class="faq-icon float-right">
                    <i class="fas fa-question-circle font-24 mt-2 text-dark"></i>
                  </div>
                  <h5 class="text-dark">06.</h5>
                  <h5 class="font-16 mb-3 mt-4">Where does it come from?</h5>
                  <p class="text-muted mb-0">
                    Suspendisse sapien urna ullamcorper vel erat at suscipit dapibus dolor Proin sodales dictum ante Vivamus non dictum metus
                    Sed quis leo non massa viverra rutrum in a elit Praesent sit amet rhoncus justo Mauris pharetra mollis
                    enim non efficitur ipsum porttitor vitae.
                  </p>
                </div>
              </div>
            </div> -->
          <!-- </div> -->
          <!-- container-fluid -->
        </div>
      </div>
    </div>
    <template slot="footer">
      <div
        class="alert alert-secondary"
        role="alert"
        style="background-color: rgb(204,229,255);color:rgb(0,64,133)"
      >
        如果你遇到了上述没有提到的问题，并且暂无法解决的话，
        请将遇到的问题发送到邮箱
        <strong>lafhhh@outlook.com</strong>
        ，我们将及时为你解决。
      </div>
    </template>
  </d2-container>
</template>
<style scoped>
.bk {
  background-color: rgb(204, 229, 255);
  font-style: initial;
}
</style>>

<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>