<template>
  <d2-container>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body mt-5">
            <section id="cd-timeline" class="cd-container">
              <div class="row">
                <div class="col-md-12">
                  <div class="main-timeline">
                    <div class="timeline">
                      <span class="timeline-icon"></span>
                      <span class="year">part 1</span>
                      <div class="timeline-content">
                        <h3 class="title">团队名称</h3>
                        <p
                          class="description text-muted"
                        >团队取名“微逻辑”，与产品的定位与愿景息息相关。</p>
                        <p
                          class="description text-muted"
                        >
                        产品致力于物流配送方案的优化，在提供技术支持的同时希望全方位服务用户。</p>
                        <br />
                        <p
                          class="description text-muted">
                        考虑到使用的算法约束十分复杂，隐藏背后的算法逻辑，同时给用户提供简单实用的操作逻辑，是“微逻辑”的不懈追求。</p>
                      </div>
                    </div>

                    <div class="timeline">
                      <span class="timeline-icon"></span>
                      <span class="year">part 2</span>
                      <div class="timeline-content">
                        <h3 class="title">团队成员</h3>
                        <p class="description text-muted">
                          队长：刘安芳
                          <br />副队长：江良伟
                          <br />队员：王凯槟、张彭俊
                        </p>
                      </div>
                    </div>

                    <div class="timeline">
                      <span class="timeline-icon"></span>
                      <span class="year">part 3</span>
                      <div class="timeline-content">
                        <h3 class="title">logo简介</h3>
                        <p class="description text-muted">
                          <!-- <br />微逻辑特为此系统设计了logo。
                          <br />logo上主要由卡车、路线、房屋构成，寓意着系统的关键要素。
                          <br />卡车寓意着通过车辆运输。
                          <br />路线即该系统的核心——找到最优配送方案。
                          <br />房屋指客户点。
                          <br />此外，logo是背景是由英文单词“MicroLogic”拼接而成，表明了开发团队名字“微逻辑”。 -->
                          <br />该系统的logo由蓝底白车构成。
                          <br />系统的主色调为蓝色，logo与系统的主题相辉映。
                          <br />借用蓝色博大的特性，强调川流配送的效率性，同时，蓝色是理性的代表，符合用户使用的决策心理。
                          <br />车辆寓意物流配送中运输工具的形象。
                        </p>
                      </div>
                    </div>
                    <div class="timeline">
                      <span class="timeline-icon"></span>
                      <span class="year">part 4</span>
                      <div class="timeline-content">
                        <h3 class="title">系统背景</h3>
                        <p
                          class="description text-muted"
                        >随着信息技术的发展，现代物流作为“第三个利润源泉”是一种先进的组织方式和管理技术，已被世界各国广泛采用，并形成产业化，在国民经济中发挥越来越重要的作用，这一管理技术，正受到日益广泛的重视，并面临巨大的发展机遇，在现代物流中，配送是一个重要的与消费者直接相连的环节，一方面可以体现企业的核心竞争力，另一方面通过线路优化，可以提高企业的运作效率，降低配送成本，实现物流科学化。目前市场上仓储类管理系统已经比较完善，但对于不同需求的路线规划还存在一定的短板，基于当前站好“最后一岗”的要求，引用路线优化算法，开发出具有实用性，先进性，高可靠性的路线规划系统。</p>
                      </div>
                    </div>
                    <div class="timeline">
                      <span class="timeline-icon"></span>
                      <span class="year">part 5</span>
                      <div class="timeline-content">
                        <h3 class="title">联系我们</h3>
                        <p class="description text-muted">电子邮件：lafhhh@outlook.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <d2-module-index-banner slot="footer" v-bind="banner"/>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      banner: {
        // title: 'CHARTS',
        subTitle: '如果你对此项目感兴趣，请加入我们的爱好者团队群：822843622'
      }
    }
  }
}
</script>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>
