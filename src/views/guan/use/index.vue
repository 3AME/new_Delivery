<template>
  <d2-container>
    <!-- <template slot="header">软件使用手册</template> -->
     <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      回到顶部
    </div>
    </el-backtop>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body mt-5">
            <div class="row">
              <div class="col-12">
                <!-- <div class="card m-b-30"> -->
                  <div class="card-body">
                    <!-- <h4 class="mt-0 header-title">使用手册</h4> -->
                    <!-- <p class="sub-title"></p> -->
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="text-center mb-5">
                                <div class="mb-5">
                                    <img src="../../../assets/images/small/1.png" height="128" alt="logo">
                                </div>
                                <h3 class="mt-4 text-uppercase">川流智能物流系统</h3>
                                <p>一个「功能强大」且「安全」的配送规划系统</p>
                            </div>
                        </div>
                    </div>
                    <div class="media m-b-30">
                      <img
                        class="d-flex ml-3"
                        src="../../../assets/images/result.png"
                        alt
                        height="300"
                      />
                      <div class="media-body">
                        <br >川流系统主要用来解决<code>VRP</code>与<code>CVRP</code>问题。
                        <br />
                        <br />产品使用十分具有创新性的智能优化算法提供技术支持，
                        从用户、决策者两大使用角度，配送点、客户点、车辆三大问题维度进行了综合考虑。
                        <br />
                        <br />功能上满足多个配送点、多种车型、多个配送中心、客户自定义时间的多样化需求;
                        <br />使用上提供了地图选择，批量导入的快捷操作方式;
                        <br />结果上使用可视化与交互的方式帮助用户进行决策;
                        <br />同时提供了帮助手册，历史任务帮助用户快速入手。
                        <br />
                        <br />一切旨在打造良好的用户体验。
                        
                      </div>
                    </div>
                    
                    <el-divider></el-divider>

                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="text-center mb-5">
                                <h3 class="mt-4 text-uppercase">功能介绍</h3>
                            </div>
                        </div>
                    </div>
                    <div class="media m-b-30">
                      <div class="media-body">
                        <h5 class="mt-0 font-24">首页</h5>
                        <br>展示系统logo、团队名称、系统名称、开发技术支持等信息
                      </div>
                    </div>

                    <el-divider></el-divider>
                    <div class="media">
                      <!-- <img
                        class="d-flex ml-3 rounded-circle"
                        src="../../../assets/images/small/1.jpg"
                        alt
                        height="64"
                      /> -->
                      <div class="media-body">
                        <h5 class="mt-0 mb-1 font-24">坐标查询</h5>
                        <br>坐标查询：以二维坐标的方式确定配送中心/客户点的位置。
                        <br />采用坐标查询的页面入口，通过导入文件的方式输入数据进行查询。
                      </div>
                    </div>

                    <el-divider></el-divider>
                    <div class="media m-b-30">
                      <div class="media-body">
                        <h5 class="mt-0 font-24">路线查询</h5>
                        <br>路线查询：以邻接表的方式确定配送中心、客户点的距离以及客户点之间的距离，输入需确定配送中心。
                        <br />采用路线查询的页面入口，通过导入文件的方式输入数据进行查询。
                      </div>
                      <!-- <img
                        class="d-flex mr-3 rounded-circle"
                        src="../../../assets/images/small/1.jpg"
                        alt
                        height="64"
                      /> -->
                    </div>

                    <el-divider></el-divider>
                    <div class="media">
                      <!-- <img
                        class="d-flex ml-3 rounded-circle"
                        src="../../../assets/images/small/1.jpg"
                        alt
                        height="64"
                      /> -->
                      <div class="media-body">
                        <h5 class="mt-0 mb-1 font-24">地图选择</h5>
                        <br>地图选择：在地图页面标记地点，第一个点默认为配送中心，其后选择客户位置，若删除中心点，在原本配送中心之后的那个点默认变为配送中心。
                        <br />采用地图选择的页面入口，通过选择地点、页面输入车辆信息的方式进行最优配送方案查询。
                      </div>
                    </div>

                    <el-divider></el-divider>
                    <p class="sub-title"></p>
                    <div class="media m-b-30">
                      <div class="media-body">
                        <h5 class="mt-0 font-24">结果显示</h5>
                        <br>展示查询出的最优配送方案的结果。
                        <br />查询结果主要显示配送距离、配送时间、平均满载率、车辆路线、路线图示（坐标图/力导向图）、路线详情。
                        <br />配送距离：所有车辆从配送中心出发，配送完所有客户点并返回到配送中心的距离。
                        <br />配送时间：所有车辆从配送中心出发，配送完所有客户点并返回到配送中心所需的时间。
                        <br />平均满载率：所有需求点的货物和/参与配送的车辆最大载重和。
                        <br />车辆路线：显示最优配送方案的所有路线。
                        <br />路线图示：以坐标图/力导向图的方式展示最优配送方案路线。
                        <br />路线详情：点击界面的路线详情，在系统右侧弹出抽屉，展示每条路线的距离和行驶时间，再次点击按钮即可关闭该弹窗。
                        <br />隐藏路线：选择隐藏某条路线，该路线在图示上隐藏。
                        <br />隐藏无关路线：该选项只有在查询方式是路线查询和地图查询的时候显示，可隐藏图示中与最优配送方案无关的路线，保留最优配送方案路线。
                        <br />
                      </div>
                      <!-- <img
                        class="d-flex mr-3 rounded-circle"
                        src="../../../assets/images/small/1.jpg"
                        alt
                        height="64"
                      /> -->
                    </div>

                    <el-divider></el-divider>
                    <div class="media">
                      <!-- <img
                        class="d-flex ml-3 rounded-circle"
                        src="../../../assets/images/small/1.jpg"
                        alt
                        height="64"
                      /> -->
                      <div class="media-body">
                        <h5 class="mt-0 mb-1 font-24">任务列表</h5>
                        <br>任务列表页面展示查询任务。
                        <br />点击查看则进入到该条记录的查询结果页面；
                        <br />点击【删除】则删除该条记录；
                        <br />还可以excel的方式下载该记录相关的约束条件，约束条件将在表格中展示。你可以将文件保存到你想保存的地方。
                        <br />当你不需要这些记录时，你可以选择全部删除，将记录页面清空。
                      </div>
                    </div>
                    <p class="sub-title"></p>
                  </div>
                <!-- </div> -->
              </div>
            </div>
            <el-divider></el-divider>
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="text-center mb-5">
                        <h3 class="mt-4 text-uppercase">产品优势</h3>
                    </div>
                </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                  <div class="card m-b-30">
                      <div class="card-body">

                          <h4 class="mt-0 header-title">功能强大</h4>
                          <p class="sub-title">多个配送点、多种车型、多个配送中心、自定义时间的多样化需求</p>
                          <div class="">
                              <div class="progress">
                                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div> <!-- end col -->
              <div class="col-lg-6">
                  <div class="card m-b-30">
                      <div class="card-body">

                          <h4 class="mt-0 header-title">算法高效</h4>
                          <p class="sub-title">多智能算法、多线程、多维度进行配送规划，得到路线只需2秒.</p>
                          <div class="">
                              <div class="progress">
                                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div> <!-- end col -->
            </div>
             <div class="row">
              <div class="col-lg-6">
                  <div class="card m-b-30">
                      <div class="card-body">

                          <h4 class="mt-0 header-title">数据安全</h4>
                          <p class="sub-title">所有操作数据只存储于本地，不给数据泄露可乘之机.</p>
                          <div class="">
                              <div class="progress">
                                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div> <!-- end col -->
              <div class="col-lg-6">
                  <div class="card m-b-30">
                      <div class="card-body">

                          <h4 class="mt-0 header-title">持续迭代</h4>
                          <p class="sub-title">算法产品持续迭代，更加贴近实际，更加高效.</p>
                          <div class="">
                              <div class="progress">
                                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div> <!-- end col -->
            </div>
            <el-divider></el-divider>
            <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="text-center mb-5">
                                <h3 class="mt-4 text-uppercase">快速上手</h3>
                            </div>
                        </div>
                    </div>
            <div class="row">
              <div class="col-12">
                <div class="card-group">
                  <div class="card m-b-30 text-white bg-info">
                    <img
                      class="card-img-top img-fluid"
                      src="../../../assets/images/small/page1.jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-24 mt-0">坐标查询</h4>
                      <p class="card-text">
                        <br>1. 使用该查询之前，你需要看坐标查询的输入要求或者下载表头要求进行查看。你可以将表头下载到你的电脑。
                        <br>2. 按照要求打开文件，点击打开按钮选择后缀名为xlsx或xls文件。当你打开文件时，如果你的文件表头不符合输入要求，你将会看到报错信息，此时你需要根据报错信息重新选择你的文件并打开，确保文件表头符合要求。如果你不管报错信息直接点击查询将会收到“出现错误”的提示。
                        <br>3. 如果你想清空页面的数据，可以选择“清空数据”或者“刷新”，两者的区别在于刷新可清空运行缓存。
                        <br>4. 你可以点击设置算法参数按钮设置查询时算法的距离优先参数、时间有限参数、满载率参数和车辆速度。
                        <br>
                      </p>
                    </div>
                    <!-- <div class="card-body">
                      <h4 class="card-title font-20 mt-0">表头要求</h4>
                      <p class="card-text">
                        <br>type：点的类型，depot——配送中心，customer——客户点，other——其他类型的点
                        <br />name：点的名字或者编号
                        <br />X：点的横坐标（单位默认：km)
                        <br />Y：点的纵坐标（单位默认：km)
                        <br />demand：点的需求量，配送中心也可以写，这不影响路线的计算
                        <br />serviceTime：自定义该点的服务时间（默认：5min)
                        <br />beginTime：客户点接受配送到达的最早时间（单位默认：min)
                        <br />endTime：客户点接受配送到达的最迟时间（单位默认：min)
                        <br />Vehicle_type：车辆类型
                        <br />Vehicle_load：车辆载重
                        <br />Vehicle_number：该车辆类型的数量
                        <br />Vehicle_mileage：车辆里程
                        <br />Center_name：车辆所在配送中心的名字，对应type=depot的name值
                      </p>
                    </div> -->
                  </div>
                  <div class="card m-b-30">
                    <img
                      class="card-img-top img-fluid"
                      src="../../../assets/images/small/page2.jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body bg-peimary">
                      <h4 class="card-title font-24 mt-0">路线查询</h4>
                      <p class="card-text">
                        <br>1. 使用该查询之前，你需要看路线查询的输入要求或者下载表头要求进行查看。你可以将表头下载到你想选择的路径。
                        <br>2. 按照要求打开文件，点击打开按钮选择后缀名为xlsx或xls文件。当你打开文件时，如果你的文件表头不符合输入要求，你将会看到报错信息，此时你需要根据报错信息重新选择你的文件并打开，确保文件表头符合要求。如果你不管报错信息直接点击查询将会收到“出现错误”的提示。
                        <br />3. 如果你想清空页面的数据，可以选择“清空数据”或者“刷新”，两者的区别在于刷新可清空运行缓存。
                        <br />4. 你可以点击设置算法参数按钮设置查询时算法的距离优先参数、时间有限参数、满载率参数和车辆速度。
                        <br />
                      </p>
                    </div>
                    <!-- <div class="card-body">
                      <h4 class="card-title font-20 mt-0">表头要求</h4>
                      <p class="card-text">
                        <br>type：点的类型，depot——配送中心，customer——客户点，other——其他类型的点
                        <br />name_a：点的数字编号
                        <br />demand：客户的需求量，配送中心也可以写，这不影响路线的计算
                        <br />serviceTime：自定义该点的服务时间（默认：5min)
                        <br />beginTime：客户点接受配送到达的最早时间（单位默认：min)
                        <br />endTime：客户点接受配送到达的最迟时间（单位默认：min)
                        <br />Vehicle_load：车辆载重（单位默认：t)
                        <br />Vehicle_number：该车辆类型的数量，可不做配置
                        <br />Vehicle_mileage：车辆里程，（默认：35km)
                        <br />Center_name：Center_name：车辆所在配送中心的名字，对应type="depot"类型点的的编号
                        <br />0、1、2对应的字段为name_a
                      </p>
                    </div> -->
                  </div>
                  <div class="card m-b-30 text-white bg-primary">
                    <img
                      class="card-img-top img-fluid"
                      src="../../../assets/images/small/page3.jpg"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h4 class="card-title font-24 mt-0">地图选择</h4>
                      <p class="card-text">
                        <br>1. 本系统以成都市地图为例。
                        <br />2. 在搜索框里搜索地名进行配送中心/客户点添加，添加的第一个地点默认为配送中心，其他的点为客户点，在节点列表里，可以对客户点的需求量进行修改。在车辆列表里对车辆信息进行添加，可以增加车辆类型，如果你不进行任何车辆信息的操作，系统将默认车辆载重为2吨、5吨两种车型，车辆里程都为35公里。
                        <br />3. 输入的节点个数大于等于3个时可以进行查询，节点数少于三个页面会弹窗提示“节点数过少”。
                        <br />4. 如果输入的节点无法查询到节点之间的距离，将会出现不能查询的提示，这是小概率事件，这可能跟你的网络环境有关。
                        <br />5. 你可以点击设置算法参数按钮设置查询时算法的距离优先参数、时间有限参数、满载率参数和车辆速度。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- end row -->

    <!-- end row -->
   
  </d2-container>
  
</template>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>


