import { ReactNode, useState, createContext, useRef, useEffect } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: "",
  toggleTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const bodyRef = useRef(document.body);


  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "" ? "dark" : ""));
    bodyRef.current?.classList.toggle("dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      bodyRef.current?.classList.add("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
