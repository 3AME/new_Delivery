<template>
  <!-- <d2-container >
    <template slot="header">常见的一些问题</template>
    <h3 style="color:blue">点击查询结果不显示</h3>
            <p>
               解决方案：检查导入文档表头是否与导入文档提示一致，不一致会导致无法获取查询结果.
            </p>
            <h3 style="color:blue">如何清除上一次导入的excel文件？</h3>
            <p>
                解决方案：点击导入.xlsx/.xls按钮，自动覆盖内容，不会影响下一次查询.
            </p>
            <h3 style="color:blue">点击查询以后没有页面跳转？</h3>
            <p>
                解决方案：可能是因为运行环境的问题导致响应时间的差异，请耐心等待.也可能是因为数据量大，查询需要一定时间.
            </p>
    <template slot="footer">如果你遇到了上述没有提到的问题，并且暂无法解决的话，请将遇到的问题发送到邮箱lafhhh@outlook.com，我们将及时为你解决.</template>
  </d2-container> -->

  <d2-container >
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
                        <h5 class="font-16 mb-3 mt-4">
                          查询结果无响应或提示错误
                        </h5>
                        <p class="text-muted mb-0">
                          检查导入文档表头是否与导入文档提示一致.同时检查输入问题的可能性
                          ，对于无法实现的约束条件程序可能发生错误.
                          </p>
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
                        <h5 class="font-16 mb-3 mt-4">如何清除上一次导入的excel文件</h5>
                        <p class="text-muted mb-0">
                            点击导入.xlsx/.xls按钮，将自动覆盖内容，不会影响下一次查询，或者点击清除按钮重新导入.
                        </p>
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
                        <h5 class="font-16 mb-3 mt-4">点击查询以后没有页面跳转</h5>
                        <p class="text-muted mb-0">
                          可能是因为运行环境的问题导致响应时间的差异，请耐心等待.也可能因为数据量过大，查询需要一定时间.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <div class="card faq-box border-danger">
                    <div class="card-body">
                        <div class="faq-icon float-right">
                            <i class="fas fa-question-circle font-24 mt-2 text-danger"></i>
                        </div>
                        <h5 class="text-danger">04.</h5>
                        <h5 class="font-16 mb-3 mt-4">
                          地图无法显示
                        </h5>
                        <p class="text-muted mb-0">
                          地图显示采用百度提供的公开接口，在代理情况下可能发生错误，检查本机的代理网络环境后重试.
                          </p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card faq-box border-info">
                    <div class="card-body">
                        <div class="faq-icon float-right">
                            <i class="fas fa-question-circle font-24 mt-2 text-info"></i>
                        </div>
                        <h5 class="text-info">05.</h5>
                        <h5 class="font-16 mb-3 mt-4">使用地图进行查询结果显示错误</h5>
                        <p class="text-muted mb-0">车辆预置有最大里程，地图选择跨省或者大范围的配送点不符合真实情况，程序无法得到解决方案，考虑检查输入.</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card faq-box border-dark">
                    <div class="card-body">
                        <div class="faq-icon float-right">
                            <i class="fas fa-question-circle font-24 mt-2 text-dark"></i>
                        </div>
                        <h5 class="text-dark">06.</h5>
                        <h5 class="font-16 mb-3 mt-4">界面长时间无响应</h5>
                        <p class="text-muted mb-0">可能由于格式等问题程序发生错误，顶部导航条提供了界面刷新，可根据自己的需求进行选择</p>
                    </div>
                </div>
            </div>
        </div>
                <!-- container-fluid -->
        </div>
      </div>
    </div>
    <!-- <template slot="footer"> -->
        <!-- <div class="alert alert-secondary" role="alert" style="background-color: rgb(204,229,255);color:rgb(0,64,133)">
            如果你遇到了上述没有提到的问题，并且暂无法解决的话，
            请将遇到的问题发送到邮箱
            <strong>lafhhh@outlook.com</strong>
            ，我们将及时为你解决.
        </div> -->
    <d2-module-index-banner slot="footer" v-bind="banner"/>
    <!-- </template> -->
  </d2-container>
</template>
<style scoped>
.bk{
    background-color: rgb(204,229,255);
    font-style: initial;
}
</style>>
<script>
export default {
  data () {
    return {
      banner: {
        // title: 'CHARTS',
        subTitle: ' 如果你遇到了上述没有提到的问题，并且暂无法解决的话，请将遇到的问题发送到邮箱lafhhh@outlook.com，我们将及时为你解决.'
      }
    }
  }
}
</script>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>