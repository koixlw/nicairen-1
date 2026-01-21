import { createI18n } from "vue-i18n";
import en from "./en";
import zh from "./zh";

// 从 localStorage 读取保存的语言设置，默认为中文
const savedLocale = localStorage.getItem("locale") || "zh";

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: savedLocale,
  fallbackLocale: "zh",
  messages: {
    zh,
    en,
  },
});

export default i18n;
