import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Yujie's Blog",
  description: "记录学习与成长的技术博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
