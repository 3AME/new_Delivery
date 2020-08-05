<template>
  <el-container class="content-container">
    <el-main style="width: 100%;">
      <section id="cd-timeline" class="cd-container">
        <div style="height:2em"></div>
        <div style="text-align:center;width:100%">
          <img
            height="10%"
            width="45%"
            style="padding: 10px"
            alt="200x200"
            src="../../../assets/images/small/app_name_with_logo.png"
          />
        </div>
        <div style="height:5em"></div>
        <!-- <el-divider></el-divider> -->
        <div class="row">
          <div class="col-md-12 section-title">
            <h2 style="text-align:center">系统背景</h2>
          </div>
        </div>
        <div style="height:3em"></div>
        <div class="row">
          <el-card shadow="hover" :body-style="{ padding: '3em' }">
            <br />
            <p style="text-indent:2em">
              随着信息技术的发展，现代
              <b>物流</b>作为“第三个利润源泉”是一种先进的组织方式和管理技术，已被世界各国广泛采用，并形成产业化，在国民经济中发挥越来越重要的作用，这一管理技术，正受到日益广泛的重视，并面临巨大的发展机遇，在现代物流中，配送是一个重要的与消费者直接相连的环节，一方面可以体现企业的核心竞争力，另一方面通过线路优化，可以
              <b>提高企业的运作效率</b>，
              <b>降低配送成本</b>，实现
              <b>物流科学化</b>。目前市场上仓储类管理系统已经比较完善，但对于不同需求的
              <b>路线规划</b>还存在一定的短板，基于当前站好“最后一岗”的要求，引用路线优化算法，开发出具有实用性，先进性，高可靠性的
              <b>路线规划系统</b>。
            </p>
          </el-card>
        </div>
        <div style="height:5em"></div>
        <!-- <el-divider style="background-color:blue"></el-divider> -->
        <div class="row">
          <div class="col-md-12 section-title">
            <h2 style="text-align:center">LOGO简介</h2>
          </div>
        </div>
        <div style="height:3em"></div>
        <div class="row">
          <el-card
            shadow="hover"
            :body-style="{ padding: '3em' }"
            style="margin:auto;padding:0.5em;width:100%"
          >
            <img
              src="../../../assets/images/small/1_bak.png"
              height="200"
              style="margin:auto"
            />
            <ul style="margin-left:16em;margin-top:-12em;text-intend:2em">
              <br />
              <p style="text-intent:2em">该系统的logo由蓝底白车构成。</p>
              <p style="text-intent:2em">系统的主色调为蓝色，logo与系统的主题相辉映。</p>
              <p style="text-intent:2em">
                借用蓝色博大的特性，强调川流配送的
                <b>效率性</b>，同时，蓝色是理性的代表，符合用户使用的
                <b>决策心理。</b>
              </p>
              <p style="text-intent:2em">
                车辆寓意物流配送中
                <b>运输工具</b>的形象。
              </p>
            </ul>
          </el-card>
          <!-- <el-card style="margin-left:1em;margin:auto;padding:0.5em;width:30%" shadow="hover">
            <img src="../../../assets/images/small/1_bak.png" height="250" style="margin:auto" />
          </el-card>-->
        </div>
        <div style="height:5em"></div>
        <!-- <el-divider></el-divider> -->
        <div class="row">
          <div class="col-md-12 section-title">
            <h2 style="text-align:center">团队名称</h2>
          </div>
        </div>
        <div style="height:3em"></div>
        <div class="row">
          <el-card shadow="hover" style="margin:auto;padding:4.5em">
            <br />
            <p style="text-indent: 2em">
              团队名称为
              <b>“微逻辑”</b>，其与产品的定位与愿景息息相关。
              产品致力于物流配送方案的优化，在提供技术支持的同时希望全方位服务用户。
            </p>
            <p style="text-indent:2em">
              考虑到使用的算法约束十分复杂，将算法逻辑隐藏，对用户透明，同时给用户提供
              <b>简单实用</b>的操作逻辑，是“微逻辑”的不懈追求。
            </p>
          </el-card>
        </div>
        <div style="height:5em"></div>
        <!-- <el-divider></el-divider> -->
        <div class="row">
          <div class="col-md-12 section-title">
            <h2 style="text-align:center">团队成员</h2>
          </div>
        </div>
        <div style="height:3em"></div>
        <div class="row">
          <div class="col-lg-5">
            <div class="card m-b-30">
              <el-card shadow="hover">
                <h3>队长</h3>
                <h5 style="margin-left:2em">刘安芳</h5>
                <img src="../../../assets/images/people1.png" />
                <ul style="margin-left:6em;margin-top:-6em">
                  <li>项目统筹规划</li>
                  <li>用户界面设计及制作</li>
                  <li>批量导入查询条件</li>
                  <li>项目测试</li>
                </ul>
                <br />
              </el-card>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="card m-b-30"></div>
          </div>
          <div class="col-lg-5">
            <div class="card m-b-30">
              <el-card shadow="hover">
                <h3>副队长</h3>
                <h5 style="margin-left:2em">江良伟</h5>
                <img src="../../../assets/images/people2.png" />
                <ul style="margin-left:6em;margin-top:-6em">
                  <li>协助项目统筹规划</li>
                  <li>HGA择优算法编写</li>
                  <li>算法相关论文研读</li>
                  <li>用户界面编写</li>
                </ul>
                <br />
              </el-card>
            </div>
          </div>
        </div>
        <div style="height:4em"></div>
        <div class="row">
          <div class="col-lg-5">
            <div class="card m-b-30">
              <el-card shadow="hover">
                <h3>队员</h3>
                <h5 style="margin-left:2em">王凯槟</h5>
                <img src="../../../assets/images/people3.png" />
                <ul style="margin-left:6em;margin-top:-6em">
                  <li>HGA择优算法编写</li>
                  <li>算法相关论文研读</li>
                  <li>算法测试</li>
                  <li>算法对比</li>
                </ul>
                <br />
              </el-card>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="card m-b-30"></div>
          </div>
          <div class="col-lg-5">
            <div class="card m-b-30">
              <el-card shadow="hover">
                <h3>队员</h3>
                <h5 style="margin-left:2em">张彭俊</h5>
                <img src="../../../assets/images/people3.png" />
                <ul style="margin-left:6em;margin-top:-6em">
                  <li>地图选择功能制作</li>
                  <li>配送路线可视化与交互</li>
                  <li>前后端交互</li>
                  <li>前端界面编写</li>
                </ul>
                <br />
              </el-card>
            </div>
          </div>
        </div>

        <div style="height:5em"></div>
        <!-- <el-divider style="color:blue"></el-divider> -->
        <div class="row">
          <div class="col-md-12 section-title">
            <h2 style="text-align:center">联系我们</h2>
          </div>
        </div>
        <div style="height:3em"></div>
        <div class="row">
          <div class="col-lg-4">
            <div class="card m-b-30">
              <el-card shadow="hover">
                <img src="../../../assets/images/icons/phone.png" height="30" />
                <h6 style="margin-top:-1.6em;margin-left:2.5em">电话</h6>
                <p style="text-align:center">099 775 449 05 03</p>
              </el-card>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card m-b-30">
              <el-card shadow="hover">
                <img src="../../../assets/images/icons/qq.png" height="30" />
                <h6 style="margin-top:-1.6em;margin-left:2.5em">爱好者QQ群</h6>
                <p style="text-align:center">822843622</p>
              </el-card>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card m-b-30">
              <el-card shadow="hover">
                <img src="../../../assets/images/icons/email.png" height="30" />
                <h6 style="margin-top:-1.6em;margin-left:2.5em">邮箱</h6>
                <p style="text-align:center">lafhhh@outlook.com</p>
              </el-card>
            </div>
          </div>
        </div>
        <div style="height:2em"></div>
      </section>
    </el-main>
  </el-container>
</template>
<style>
.el-card {
  background-color: #f0f4f7;
}
p {
  color: #555b60f2;
}
ul {
  color: #555b60f2;
}
</style>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>
