<template>
  <d2-container >
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
  </d2-container>
</template>
