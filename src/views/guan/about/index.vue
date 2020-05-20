<template>
  <d2-container>
    <template slot="header">微逻辑配送</template>
    <div class="row">
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
                        <p class="description text-muted">微逻辑</p>
                      </div>
                    </div>

                    <div class="timeline">
                      <span class="timeline-icon"></span>
                      <span class="year">part 2</span>
                      <div class="timeline-content">
                        <h3 class="title">关于团队</h3>
                        <p
                          class="description text-muted"
                        >团队由5名成员构成，分别是刘安芳、江良伟、王凯槟、张彭俊、舒广辰。江良伟、王凯槟负责后端算法处理，刘安芳、张彭俊、舒广辰负责前端界面设计、前后端交互工作。</p>
                      </div>
                    </div>

                    <div class="timeline">
                      <span class="timeline-icon"></span>
                      <span class="year">part 3</span>
                      <div class="timeline-content">
                        <h3 class="title">LOGO简介</h3>
                        <p
                          class="description text-muted"
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, obcaecati, quisquam id molestias eaque asperiores voluptatibus cupiditate error assumenda delectus odit similique earum voluptatem doloremque dolorem ipsam quae rerum quis. Odit, itaque, deserunt corporis vero ipsum nisi eius odio natus ullam provident pariatur temporibus quia eos repellat..</p>
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
    <template slot="footer">温馨提示：为了更好更快的帮您解决问题，请在邮件中留下联系方式、详细问题描述、相关截图等信息。</template>
  </d2-container>
</template>


<style scoped>
/* @import url("http://cdn.bootstrapmb.com/bootstrap/4.3.1/css/bootstrap.min.css"); */
h1 {
  font-family: fantasy;
}
.cd-container {
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
}
.col-md-12 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.col-lg-12 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
/* ==============
  Card
===================*/

.card {
  border: none;
  /* box-shadow: shadow; */
  box-shadow: 0px 0px 13px 0px rgba(236, 236, 241, 0.44);
  margin-bottom: 30px;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

@media (min-width: 576px) {
  .card-columns {
    -webkit-column-gap: 30px;
    -moz-column-gap: 30px;
    column-gap: 30px;
  }
}

.card-columns .card {
  margin-bottom: 30px;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
}
.mt-5,
.my-5 {
  margin-top: 3rem !important;
}
.text-muted {
  color: #9ca8b3 !important;
}

/* ==============
  Timeline
===================*/

.cd-container {
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
}
.main-timeline {
  overflow: hidden;
  position: relative;
}
.main-timeline:before {
  content: "";
  width: 3px;
  height: 100%;
  background: #adb5bd;
  position: absolute;
  top: 0;
  left: 50%;
}
*, ::after, ::before {
  box-sizing: border-box;
}
.main-timeline .timeline {
  padding-right: 30px;
  position: relative;
}
.main-timeline .timeline-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #adb5bd;
  box-sizing: content-box;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: -4px;
}
.main-timeline .timeline-icon:before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #30419b;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.main-timeline .year {
  display: inline-block;
  padding: 8px 20px;
  margin: 0;
  font-size: 14px;
  color: #ffffff;
  background: #30419b;
  text-align: center;
  position: absolute;
  top: 50%;
  right: 35%;
  transform: translateY(-50%);
}
.main-timeline .year:before {
  content: "";
  border-right: 18px solid #30419b;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  position: absolute;
  top: -2px;
  left: -18px;
}
.timeline-content {
  width: 46.5%;
  padding: 43px 50px;
  margin: 15px 20px 21px 0;
  background: #f0f4f7;
  position: relative;
}
/* .main-timeline .timeline-content {
  width: 46.5%;
  padding: 43px 50px;
  margin: 0 20px 0 0;
  background: #f0f4f7;
  position: relative;
} */
* {
    outline: none !important;
}
.main-timeline .timeline-content:after {
  content: "";
  border-left: 20px solid #f0f4f7;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
}
.main-timeline .title {
  float: left;
  font-size: 18px;
  margin: 0 20px 20px 0;
}
.main-timeline .description {
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  clear: both;
}
.main-timeline .timeline:before,
.main-timeline .timeline:after {
  content: "";
  display: block;
  width: 2%;
  clear: both;
}
.main-timeline .timeline:first-child:before,
.main-timeline .timeline:last-child:before {
  content: "";
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid #adb5bd;
  background: #ffffff;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: -3px;
}
.main-timeline .timeline:last-child:before {
  top: auto;
  bottom: 0;
}
.main-timeline .timeline:nth-child(2n) {
  padding: 0 0 0 30px;
}
.main-timeline .timeline:nth-child(2n).year {
  right: auto;
  left: 35%;
}
.main-timeline .timeline:nth-child(2n).year:before {
  border: 18px solid transparent;
  border-right: none;
  border-left: 18px solid #30419b;
  left: auto;
  right: -18px;
}
.main-timeline .timeline:nth-child(2n) .timeline-content {
  float: right;
  margin: 0 0 0 20px;
}
.main-timeline .timeline:nth-child(2n) .timeline-content:after {
  border-left: none;
  border-right: 20px solid #f0f4f7;
  right: auto;
  left: -20px;
}
@media only screen and (max-width: 1200px) {
  .main-timeline .year {
    right: 30%;
  }
  .main-timeline .timeline:nth-child(2n) .year {
    left: 30%;
  }
}
@media only screen and (max-width: 990px) {
  .main-timeline .year {
    right: 25%;
  }
  .main-timeline .timeline:nth-child(2n) .year {
    left: 25%;
  }
}
@media only screen and (max-width: 767px) {
  .main-timeline:before {
    left: 10px;
  }

  .main-timeline .timeline {
    padding: 0 0 0 30px;
    margin-bottom: 20px;
  }

  .main-timeline .timeline:last-child {
    margin-bottom: 0;
  }
  .main-timeline .timeline:first-child:before,
  .main-timeline .timeline:last-child:before {
    display: none;
  }
  .main-timeline .timeline-icon {
    margin: 0;
    position: absolute;
    top: 7px;
    left: 0;
  }
  .main-timeline .timeline-icon:before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #30419b;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .main-timeline .year,
  .main-timeline .timeline:nth-child(2n) .year {
    display: block;
    font-weight: bold;
    margin: 0 0 32px 30px;
    z-index: 1;
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    transform: none;
  }
  .main-timeline .timeline:nth-child(2n) .year:before {
    border-left: none;
    border-right: 18px solid #30419b;
    right: auto;
    left: -18px;
  }
  .main-timeline .timeline-content {
    padding: 20px;
  }
  .main-timeline .timeline-content,
  .main-timeline .timeline:nth-child(2n).timeline-content {
    width: auto;
    float: none;
    margin: 0 0 0 30px;
  }
  .main-timeline .timeline-content:after,
  .main-timeline .timeline:nth-child(2n) .timeline-content:after {
    border: none;
    border-bottom: 20px solid #f0f4f7;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    top: -20px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}
@media only screen and (max-width: 480px) {
  .main-timeline .title {
    float: none;
  }
  .main-timeline .year,
  .main-timeline .timeline:nth-child(2n) .year {
    margin-left: 20px;
  }
  .main-timeline .timeline-content,
  .main-timeline .timeline:nth-child(2n) .timeline-content {
    margin-left: 10px;
  }
}
</style>
