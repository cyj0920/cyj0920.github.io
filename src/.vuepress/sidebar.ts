import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "博文",
      icon: "blog",
      prefix: "blog/",
      link: "blog/",
      children: "structure",
    },
    "intro",
  ],
});
