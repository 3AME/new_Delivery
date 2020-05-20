<template>
  <d2-container>
    <template slot="header">软件使用手册</template>
    <div class="row">
      <div class="col-12">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title">使用手册</h4>
            <p class="sub-title"></p>
            <div class="media m-b-30">
              <img
                class="d-flex mr-3 rounded-circle"
                src="../../../assets/images/small/1.jpg"
                alt
                height="64"
              />
              <div class="media-body">
                <h5 class="mt-0 font-14">系统功能简介</h5>该系统主要用来解决VRP问题，通过文本导入或者地图选择的方式，设置客户点需求量、车辆载重量、车辆里程等条件约束，对配送最优路线进行查询。其中地图选择以成都市地图为例。<br>有如下页面：首页、坐标查询、路线查询、地图选择、结果显示、历史记录、常见问题、关于我们、使用手册
              </div>
            </div>

            <div class="media m-b-30">
              <div class="media-body">
                <h5 class="mt-0 font-14">查询方式</h5>坐标查询、路线查询、地图选择
              </div>
              <img
                class="d-flex mr-3 rounded-circle"
                src="../../../assets/images/small/1.jpg"
                alt
                height="64"
              />
            </div>

            <div class="media">
              <img
                class="d-flex ml-3 rounded-circle"
                src="../../../assets/images/small/7.jpg"
                alt
                height="64"
              />
              <div class="media-body">
                <h5 class="mt-0 mb-1 font-14">关于我们&&首页</h5>
                描述关于团队的相关信息。<br>
                首页用来展示该系统的logo。
              </div>
            </div>
            <p class="sub-title"></p>

            <div class="media m-b-30">
              <div class="media-body">
                <h5 class="mt-0 font-14">常见问题</h5>描述一些使用过程中可能会出现的问题，并提供解决方案。
              </div>
              <img
                class="d-flex mr-3 rounded-circle"
                src="../../../assets/images/small/5.jpg"
                alt
                height="64"
              />
            </div>

            <div class="media">
              <img
                class="d-flex ml-3 rounded-circle"
                src="../../../assets/images/small/1.jpg"
                alt
                height="64"
              />
              <div class="media-body">
                <h5 class="mt-0 mb-1 font-14">历史记录</h5>点击进入历史记录页面，可以看到历史查询记录，记录主要显示查询的时间，可以对记录进行查看、删除、下载操作。查看可看到此次查询的查询结果，删除即删除该记录，下载以.xlsx的格式，内容为该查询结果对应的参数信息（配送中心、客户点、需求量、车辆信息等）。
              </div>
            </div>
            <p class="sub-title"></p>
            <div class="media m-b-30">
              <div class="media-body">
                <h5 class="mt-0 font-14">结果显示</h5>结果显示用来展示查询出的最优路线的结果。查询结果主要显示配送距离、配送时间、满载率、车辆路线、路线图示。选择隐藏某条路线，该路线在图上隐藏。
              </div>
              <img
                class="d-flex mr-3 rounded-circle"
                src="../../../assets/images/small/8.jpg"
                alt
                height="64"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card-group">
          <div class="card m-b-30">
            <img
              class="card-img-top img-fluid"
              src="../../../assets/images/small/2.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title font-16 mt-0">坐标查询</h4>
              <p
                class="card-text"
              >进入坐标查询页面，查看坐标形式查询文件表头要求，按照要求整理文件格式进行上传。可下载.xlsx格式的表头示例进行格式整理。点击导入按钮导入需要查询的.xlsx/.xls格式文件，确保文件表头符合表头要求，不符合要求会导致查询失败。</p>
            </div>
            <div class="card-body">
              <h4 class="card-title font-16 mt-0">表头要求</h4>
              <p class="card-text">
                type：点的类型，depot——配送中心，customer——配送点，other——其他类型的点
                <br />name：点的名字或者编号
                <br />x：点的横坐标（单位默认：km)
                <br />y: 点的纵坐标（单位默认：km)
                <br />demand：点的需求量，配送中心也可以写，这不影响路线的计算
                <br />Vehicle_load：车辆载重量（单位默认：t)
                <br />Vehicle_number：该车辆的数量
                <br />Vehicle_mileage：车辆里程（单位默认：km)
                <br />Vehicle_id：车辆所在配送中心的名字或者编号，对应type=depot的name值
                <br />
              </p>
            </div>
          </div>
          <div class="card m-b-30">
            <img
              class="card-img-top img-fluid"
              src="../../../assets/images/small/3.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title font-16 mt-0">路线查询</h4>
              <p
                class="card-text"
              >进入路线查询页面，查看路线形式查询文件表头要求，按照要求整理文件格式进行上传。可下载.xlsx格式的表头示例进行格式整理。点击导入按钮导入需要查询的.xlsx/.xls格式文件，确保文件表头符合表头要求，不符合要求会导致查询失败。</p>
            </div>
            <div class="card-body">
              <h4 class="card-title font-16 mt-0">表头要求</h4>
              <p class="card-text">
                type：点的类型，depot——配送中心，customer——配送点，other——其他类型的点
                <br />demand：点的需求量，配送中心也可以写，这不影响路线的计算
                <br />Vehicle_load：车辆载重量
                <br />Vehicle_number：该车辆的数量
                <br />Vehicle_mileage：车辆里程
                <br />Vehicle_type：（待补充
                <br />Vehicle_id:（待补充
                <br />name_a：点的编号，编号必须从0开始编号
                <br />0、1、2对应的字段为name_a
                <br />
              </p>
            </div>
          </div>
          <div class="card m-b-30">
            <img
              class="card-img-top img-fluid"
              src="../../../assets/images/small/4.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h4 class="card-title font-16 mt-0">地图选择</h4>
              <p
                class="card-text"
              >该系统以成都市地图为例，通过输入关键字对配送点进行添加，第一个添加的地点默认为配送中心，之后添加的地点是配送点（客户点），每添加一个配送点会随机出现需求量，需求量可进行手动修改。车辆类型、车辆里程暂不可手动设置。添加好需要查询的条件以后，点击地图查询即可获得查询结果。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <!-- end row -->
    <template slot="footer">温馨提示：如果使用过程中出现任何问题，您可以联系我们帮你解决！</template>
  </d2-container>
</template>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>

