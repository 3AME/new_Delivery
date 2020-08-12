<template>
  <el-container class="content-container" style="overflow:auto;overflow-x: hidden !important;">
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
      >回到顶部</div>
    </el-backtop>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
      <div class="col-lg-12">
        <div>
          <!-- class="card" -->
          <div class="card-body mt-5">
            <div class="row">
              <div class="col-12">
                <!-- <div class="card m-b-30"> -->
                <div class="card-body">
                  <!-- <h4 class="mt-0 header-title">使用手册</h4> -->
                  <!-- <p ></p> -->
                  <div class="row justify-content-center">
                    <div class="col-lg-6">
                      <div class="text-center mb-5">
                        <div class="mb-5">
                          <img src="../../../assets/images/small/1.png" height="128" alt="logo" />
                        </div>
                        <h3 class="mt-4 text-uppercase">川流智能物流系统</h3>
                        <p>一个「功能强大」且「安全」的配送规划系统</p>
                      </div>
                    </div>
                  </div>
                  <div class="media m-b-15">
                   <!-- <div class="media-body">  -->
                     <img
                      class="d-flex ml-3"
                      src="../../../assets/images/about.png"
                      alt
                      height="300"
                    />
                    <!-- </div> -->

                    <div class="media-body" style="vertical-align:center">
                         <ul>
                        川流系统主要用来解决
                        <code>VRP</code>与
                        <code>CVRP</code>问题。
                        <br />
                        <br />产品使用十分具有创新性的智能优化算法提供技术支持，
                        从用户、决策者两大使用角度，配送点、客户点、车辆三大问题维度进行了综合考虑。
                        <br />
                        <br />
                        <li>功能上满足多个配送点、多种车型、多个配送中心、客户自定义时间的多样化需求;</li>
                        <li>使用上提供了地图选择，批量导入的快捷操作方式;</li>
                        <li>结果上使用可视化与交互的方式帮助用户进行决策;</li>
                        <li>同时提供了帮助手册，历史任务帮助用户快速入手。</li>
                        <br />一切旨在打造良好的用户体验。
                      </ul>
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
                      <h5 class="mt-0 font-24">主页</h5>
                      <p>
                      <br />展示
                      <b>系统logo、团队名称、系统名称、开发技术支持</b>等信息，并提供坐标查询、路线查询和地图选择的快捷入口。
                      </p>
                    </div>
                  </div>

                  <el-divider></el-divider>
                  <div class="media">
                    <div class="media-body">
                      <h5 class="mt-0 mb-1 font-24">坐标查询</h5>
                      <p>
                      <br />
                      <b>坐标查询</b>：以二维坐标的方式确定配送中心、客户点的位置。
                      <br />采用坐标查询的页面入口，通过导入文件的方式输入数据进行查询。
                      <br />可选择导入形式，<b>表格模式、图形模式</b>。两种方式均可增加、删除配送中心及配送点，图形模式为可视化，实时更新点信息变化。
                      <br />表格模式和图形模式可相互<b>切换</b>。
                      </p>
                    </div>
                  </div>

                  <el-divider></el-divider>
                  <div class="media m-b-30">
                    <div class="media-body">
                      <h5 class="mt-0 font-24">路线查询</h5>
                      <p>
                      <br />
                      <b>路线查询</b>：以邻接表的方式确定配送中心、客户点的距离以及客户点之间的距离，输入需确定配送中心。
                      <br />采用路线查询的页面入口，通过导入文件的方式输入数据进行查询。
                      <br />可选择导入形式，<b>表格模式、图形模式</b>。两种方式均可增加、删除配送中心及配送点，图形模式为可视化，实时更新点信息变化。
                      <br />表格模式和图形模式可相互<b>切换</b>。
                      </p>
                    </div>
                  </div>

                  <el-divider></el-divider>
                  <div class="media">
                    <div class="media-body">
                      <h5 class="mt-0 mb-1 font-24">地图选择</h5>
                      <p>
                      <br />
                      <b>地图选择</b>：在地图页面标记地点，第一个点默认为配送中心，其后选择客户位置，若删除中心点，在原本配送中心之后的那个点默认变为配送中心。
                      <br />采用地图选择的页面入口，通过地图选择地点、搜索地点、页面输入车辆信息的方式进行最优配送方案查询。</p>
                    </div>
                  </div>

                  <el-divider></el-divider>
                  <p ></p>
                  <div class="media m-b-30">
                    <div class="media-body">
                      <h5 class="mt-0 font-24">结果显示</h5>
                      <p>
                        <br />展示查询出的
                        <strong>最优配送方案</strong>的结果。
                        <br>
                        <b>两种方式保存查询结果：HTML、excel。</b>
                        <br />查询结果主要显示
                        <b>配送距离、配送时间、平均满载率、配送成本、车辆路线、路线图示（坐标图/力导向图）、路线详情、隐藏路线、隐藏坐标文字、隐藏无关路线、算法收敛曲线、车辆载重柱状图、车辆里程柱状图、预估成本变化、方案成本预估</b>
                        。
                        <br />
                      </p>
                      <ul>
                        <li>
                          <b>配送距离</b>：所有车辆从配送中心出发，配送完所有客户点并返回到配送中心的距离。
                        </li>
                        <li>
                          <b>配送时间</b>：所有车辆从配送中心出发，配送完所有客户点并返回到配送中心所需的时间。
                        </li>
                        <li>
                          <b>平均满载率</b>：所有需求点的货物和/参与配送的车辆最大载重和。
                        </li>
                        <li>
                          <b>配送成本</b>：计算出的最优配送路线所需成本。
                        </li>
                        <li>
                          <b>车辆路线</b>：显示最优配送方案的所有路线。
                        </li>
                        <li>
                          <b>路线图示</b>：以坐标图/力导向图的方式展示最优配送方案路线。
                        </li>
                        <li>
                          <b>路线详情</b>：点击界面的路线详情，在系统右侧弹出抽屉，展示每条路线的距离和行驶时间，再次点击按钮即可关闭该弹窗。
                        </li>
                        <li>
                          <b>隐藏路线</b>：选择隐藏某条路线，该路线在图示上隐藏。
                        </li>
                        <li>
                          <b>隐藏无关路线</b>：该选项只有在查询方式是路线查询和地图查询的时候显示，可隐藏图示中与最优配送方案无关的路线，保留最优配送方案路线。
                        </li>
                        <li>
                          <b>隐藏坐标文字</b>：在坐标图示中，由于配送点数量过多，影响美观，用户可自行隐藏坐标文字。
                        </li>
                        <!-- 算法收敛曲线、车辆载重柱状图、车辆里程柱状图、预估成本变化、方案成本预估 -->
                        <li>
                          <b>算法收敛曲线</b>：展示距离、时间、满载率的加权值通过算法的优化过程。
                        </li>
                        <li>
                          <b>车辆载重柱状图</b>：最优配送路线中每一辆车的载重情况。
                        </li>
                        <li>
                          <b>车辆里程柱状图</b>：最优配送路线中每一辆车的行驶里程情况。
                        </li>
                        <li>
                          <b>预估成本变化</b>：不同迭代次数的查询，对成本的影响曲线。
                        </li>
                        <li>
                          <b>方案成本预估</b>：该配送方案的成本构成柱状图。
                        </li>
                      </ul>
                    </div>
                  </div>

                  <el-divider></el-divider>
                  <div class="media">
                    <div class="media-body">
                      <h5 class="mt-0 mb-1 font-24">任务列表</h5>
                      <ul style="color:#555b60f2">
                        <br />任务列表页面展示
                        <b>查询任务</b>。
                        <br />
                        <li>
                          点击
                          <b>【查询】</b>则进入到该条记录的查询结果页面；
                        </li>
                        <li>
                          点击
                          <b>【删除】</b>则删除该条记录；
                        </li>
                        <li>
                          以excel的方式
                          <b>【下载】</b>该记录相关的约束条件，约束条件将在表格中展示。你可以将文件保存到你想保存的地方。
                        </li>
                        <li>
                          当你不需要这些记录时，你可以选择
                          <b>【全部删除】</b>，将记录页面清空。
                        </li>
                        <li>单页浏览模式、多选项操作执行。</li>
                      </ul>
                    </div>
                  </div>
                  <p ></p>
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
               <div class="col-lg-4">
                <div class="card m-b-30">
                  <div class="card-body">
                    <!-- <li style="float:right;margin-right:2em"></li> -->
                    <br>
                    <h4 class="mt-0 header-title" style="float:right;margin-right:2em">功能强大</h4>
                    <br><br>
                    <p  style="float:left">多个配送点、多种车型、多个配送中心、自定义时间的多样化需求。</p>
                  </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card m-b-30">
                 <div class="card-body">
                    <br>
                    <h4 class="mt-0 header-title" style="text-align:center">文本导入</h4>
                    <br>
                    <p  style="float:left">所有的数据通过文本导入的方式快捷输入。</p>
                  </div>
              </div>
            </div>
              <div class="col-lg-4" style="float:left;">
                <div class="card m-b-30">
                  <div class="card-body">
                    <!-- <li style="float:left;margin-left:2em"></li> -->
                    <br>
                    <h4 class="mt-0 header-title" style="float:left;margin-right:2em">算法高效</h4>
                    <br><br>
                    <p  style="float:left">多智能算法、多线程、多维度进行配送规划，获得最优配送路线只需要2秒钟。</p>
                  </div>
                </div>
            </div>
            </div>
            <div style="height:2.7em"></div>
            <div class="row">
               <div class="col-lg-4">
              <div class="card m-b-30">
                  <div class="card-body">
                    <!-- <li style="float:right;margin-right:2em"></li> -->
                    <br>
                    <h4 class="mt-0 header-title" style="float:right;margin-right:2em">结果可视</h4>
                    <br><br>
                    <p  style="float:left">可视化展示查询结果，包括路线成本、详情，以及车辆的路线等。</p>
                  </div>
              </div>
            </div>
             <div class="col-lg-4">
              <!-- <div class="card m-b-30"> -->
                 <!-- 用于占位 -->
                 <div style="text-align:center;"><img src="../../../assets/images/feature.png" height="246"></div>
              <!-- </div> -->
            </div>

               <div class="col-lg-4">
              <div class="card m-b-30">
                  <div class="card-body">
                    <!-- <li style="float:left;margin-left:2em"></li> -->
                    <br>
                    <h4 class="mt-0 header-title" style="float:left;margin-right:2em">地图选择</h4>
                    <br><br>
                    <p  style="float:left">通过搜索地址/地图选点的方式确定位置信息，配置相关参数。</p>
                  </div>
              </div>
            </div>
            </div>

            <div class="row">
            <div style="height:1em"></div>
             <div class="col-lg-4">
                <div class="card m-b-30">
                  <div class="card-body">
                    <!-- <li style="float:right;margin-right:2em"></li> -->
                    <br>
                    <h4 class="mt-0 header-title" style="float:right;margin-right:2em">数据安全</h4>
                    <br><br>
                    <p  style="float:left">所有操作数据只存储于本地，不给数据泄露可乘之机。</p>
                  </div>
                </div>
            </div>
             <div class="col-lg-4" style="float:right;">
                <div class="card m-b-30">
                  <div class="card-body">
                    <!-- <li style="float:left;margin-left:2em"></li> -->
                    <br>
                    <h4 class="mt-0 header-title" style="text-align:center;">持续迭代</h4>
                    <br>
                    <p  style="float:left">算法产品持续迭代，更加贴近实际，更加高效。</p>
                  </div>
                </div>
            </div>
            <div class="col-lg-4">
              <div class="card m-b-30">
                 <!-- 用于占位 -->
                 <div class="card-body">
                    <!-- <li style="text-align:center;"></li> -->
                    <br>
                    <h4 class="mt-0 header-title" style="float:left;margin-right:2em">任务管理</h4>
                    <br><br>
                    <p  style="float:left;">对查询记录进行管理，查看查询结果、导出查询约束、查询结果等。</p>
                  </div>
              </div>
            </div>


            </div>

              <!-- end col -->
            </div>
            <el-divider></el-divider>
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="text-center mb-5">
                  <h3 class="mt-4 text-uppercase">快速上手</h3>
                </div>
              </div>
            </div>

            <div style="height:1em"></div>
            <el-tabs type="border-card" style="background-color: #f0f4f7;width:96%;margin:auto">
              <el-tab-pane label="坐标查询" >
                <img
                  class="card-img-top img-fluid"
                  src="../../../assets/images/small/坐标查询.png"
                  alt="Card image cap"
                />
                <br />
                <br />
                <h4 class="card-title font-24 mt-0" style="text-align:center">坐标查询</h4>
                <p class="card-text">
                  <ol style="list-style-type:decimal;">
                  <br /><li>使用该查询之前，你可以将<b>格式模板</b>下载到本地，并查看各个表头的含义，根据要求进行数据处理。</li>
                  <br /><li>按照要求打开文件，点击打开按钮选择后缀名为<b>xlsx</b>或<b>xls</b>文件。当你打开文件时，如果你的文件表头不符合输入要求，你将会看到报错信息，此时你需要根据报错信息重新选择你的文件并打开，确保文件表头<b>符合要求</b>。</li>
                  <br /><li>导入文件可选择<b>表格模式/图形模式</b>，表格模式以<b>表格</b>的形式展示数据，图形模式以<b>可视化</b>的形式展示数据，两种模式均可对数据进行删除、修改、添加的操作,提供修改点的类型（配送中心、配送点、其它点）、坐标、需求量、车辆信息等功能。</li>
                  <br /><li> 如果你想清空页面的数据，可以选择<b>“清空数据”</b>或者<b>“刷新”</b>，两者的区别在于刷新可清空运行缓存。</li>
                  <br /><li>你可以点击设置算法参数按钮设置查询时算法的<b>距离优先参数、时间有限参数、满载率参数和车辆速度</b>。</li>
                  </ol>
                </p>
              </el-tab-pane>
              <el-tab-pane label="路线查询">
                <img
                  class="card-img-top img-fluid"
                  src="../../../assets/images/small/路线查询.png"
                  alt="Card image cap"
                />
                <br />
                <br />
                <h4 class="card-title font-24 mt-0"  style="text-align:center">路线查询</h4>
                <p class="card-text">
                  <ol style="list-style-type:decimal;">
                   <br /><li>使用该查询之前，你可以将<b>格式模板</b>下载到本地，并查看各个表头的含义，根据要求进行数据处理。</li>
                  <br /><li>按照要求打开文件，点击打开按钮选择后缀名为<b>xlsx</b>或<b>xls</b>文件。当你打开文件时，如果你的文件表头不符合输入要求，你将会看到报错信息，此时你需要根据报错信息重新选择你的文件并打开，确保文件表头<b>符合要求</b>。</li>
                  <br /><li>导入文件可选择<b>表格模式/图形模式</b>，表格模式以<b>表格</b>的形式展示数据，图形模式以<b>可视化</b>的形式展示数据，两种模式均可对数据进行删除、修改、添加的操作,提供修改点的类型（配送中心、配送点、其它点）、坐标、需求量、车辆信息等功能。</li>
                  <br /><li> 如果你想清空页面的数据，可以选择<b>“清空数据”</b>或者<b>“刷新”</b>，两者的区别在于刷新可清空运行缓存。</li>
                  <br /><li>你可以点击设置算法参数按钮设置查询时算法的<b>距离优先参数、时间有限参数、满载率参数和车辆速度</b>。</li>
                  </ol>
                </p>
              </el-tab-pane>
              <el-tab-pane label="地图选择">
                <img
                  class="card-img-top img-fluid"
                  src="../../../assets/images/small/地图查询.png"
                  alt="Card image cap"
                />
                <br />
                <br />
                <h4 class="card-title font-24 mt-0"  style="text-align:center">地图选择</h4>
                <p class="card-text">
                  <ol style="list-style-type:decimal;">
                  <br /><li>本系统以<b>成都市</b>地图为例。</li>
                  <br /><li>在搜索框里<b>搜索地名</b>进行配送中心/客户点添加，也可以选择在<b>地图上选点</b>的方式进行添加，添加的第一个地点默认为配送中心，其他的点为客户点，在节点列表里，可以对点的<b>需求量、类型（配送中心、客户点、其他）</b>进行修改。在车辆列表里对车辆信息进行添加，可以增加车辆类型，如果你不进行任何车辆信息的操作，系统将默认车辆载重为2吨、5吨两种车型，车辆里程都为35公里。</li>
                  <br /><li>输入的节点个数<b>大于等于3个</b>时可以进行查询，节点数少于三个页面会弹窗提示“节点数过少”。</li>
                  <br /><li>如果输入的节点无法查询到节点之间的距离，将会出现不能查询的提示，这是小概率事件，这可能跟你的<b>网络环境</b>有关。
                  </li>
                  <br /><li> 你可以点击设置算法参数按钮设置查询时算法的<b>距离优先参数、时间有限参数、满载率参数和车辆速度</b>。</li>
                  <br /><li>导入数据后，你可以在界面继续进行<b>数据修改</b>，提供修改点的类型（配送中心、配送点、其它点）、需求量、车辆信息等功能。</li>
                  </ol>
                </p>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
  </el-container>
</template>
<style>
p{
  color: #555b60f2;
}
ul{
  color: #555b60f2;
}
</style>
<style src="../../../assets/style/bootstrap/css/metismenu.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/bootstrap.min.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/icons.css" scoped></style>
<style src="../../../assets/style/bootstrap/css/style.css" scoped></style>
