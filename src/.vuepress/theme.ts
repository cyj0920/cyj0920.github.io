import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://cyj0920.github.io",

  author: {
    name: "Kyle",
    url: "https://cyj0920.github.io/",
  },

  logo: "/logo.jpg",

  repo: "cyj0920/cyj0920.github.io",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "记录学习与成长",
  displayFooter: true,

  // 博客相关
  blog: {
    description: "技术爱好者",
    intro: "/intro.html",
    medias: {
      Email: "your-email@example.com",
      GitHub: "https://github.com/cyj0920",
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // Markdown 配置
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    mark: true,
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    slimsearch: true,

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },
  },
});
