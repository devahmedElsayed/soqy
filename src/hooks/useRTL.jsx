import { useTranslation } from "react-i18next";

export default function useRTL() {
  const { i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  const row = isRTL
    ? "row-reverse"
    : "row";

  return {
    isRTL,
    row,
    textAlign: isRTL
      ? "right"
      : "left",
    writingDirection: isRTL
      ? "rtl"
      : "ltr",
  };
}