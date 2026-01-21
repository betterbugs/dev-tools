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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("nestify-theme");
    if (savedTheme !== null) {
      setIsLightTheme(savedTheme === "light");
    }
    setIsLoaded(true);
  }, []);

  // Save theme to localStorage when it changes
  const handleSetIsLightTheme = (isLight: boolean) => {
    setIsLightTheme(isLight);
    localStorage.setItem("nestify-theme", isLight ? "light" : "dark");
  };

  // Don't render until theme is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ isLightTheme, setIsLightTheme: handleSetIsLightTheme }}
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
