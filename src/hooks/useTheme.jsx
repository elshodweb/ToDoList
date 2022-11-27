import { useLayoutEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("light");
  const setValTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return { setValTheme };
};
