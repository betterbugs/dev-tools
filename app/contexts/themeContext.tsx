"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  isLightTheme: boolean;
  setIsLightTheme: (isLight: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "nestify-theme";
type Theme = "dark" | "light";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hasHydrated, setHasHydrated] = useState(false);

  // Load persisted theme after hydration.
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.warn("Theme persistence unavailable", error);
    }
    setHasHydrated(true);
  }, []);

  // Apply theme class and persist updates safely.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;

    if (!hasHydrated) {
      return;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn("Theme persistence unavailable", error);
    }
  }, [theme, hasHydrated]);

  const handleSetIsLightTheme = (isLight: boolean) => {
    setTheme(isLight ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        isLightTheme: theme === "light",
        setIsLightTheme: handleSetIsLightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
