# CodeCombat 家长端页面

本目录包含当前版本首页、家长 FAQ，以及页面和配置依赖的图片、视频、样式与脚本。无需安装依赖或执行构建。

## 文件结构

- index.html：首页。
- faq.html：家长 FAQ，包含问答与交互。
- faq-content.json：FAQ 内容维护源文件；当前页面已内嵌内容，修改 JSON 后需同步更新 faq.html。
- parent-home.css、parent-polish.css、parent-revision.css：现有样式。
- parent-home.js、content-config.js：交互与媒体配置。
- assets/：页面和媒体配置所依赖的图片、视频。
- .nojekyll：静态资源直接发布配置。
- 文件清单.json：文件大小与 SHA-256 校验值。

## 上传到 GitHub

将本目录里面的文件与 assets 文件夹一起放入目标仓库，保持相对路径与文件名不变；通常让 index.html 位于准备部署的网站目录根部。不要只上传两个 HTML，也不需要上传工作目录中的历史备份、分析资料、review 截图或其他旧版页面。

本包已压缩图片与视频。assets 合计约 35.9 MiB，所有单文件均小于 25 MiB，可通过 GitHub 网页上传。请保留目录结构；不要把 ZIP 当成网页源文件上传。

GitHub 官方限制说明：https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## 本地查看

可先用浏览器打开 index.html 和 faq.html。使用静态网站服务器预览或部署时，目录结构保持一致即可。体验、购买和外部课程链接仍会访问原官方网站。

## 视频说明

- assets/chuangguan.mp4：当前首页关卡展示视频。
- assets/new-intro.mp4：当前新手引导弹窗视频。
- assets/child-learning.mp4：由原始 MOV 转为 H.264 / AAC，改善浏览器兼容性。

content-config.js 中 src 为空的项目属于已有预留配置；expectedFile 是未来素材的建议文件名，并非本包缺失的已启用视频。当前六图区域使用 learning-moment-1.webp 至 learning-moment-6.webp。

本包保留页面文案与设计，仅压缩素材并更新对应路径；不包含仓库初始化、远程上传或上线操作。原始素材备份位置见“素材压缩说明.md”。
