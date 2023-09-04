import { ReactNode, useState, createContext } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  dummy: string;
}

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  dummy: string;
}

const defaultThemeContext: ThemeContextType = {
  theme: "",
  toggleTheme: () => {},
  dummy: "asdf",
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider = ({ children, dummy }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("");
  console.log("dummy:", dummy);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "" ? "dark" : ""));
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme, dummy: dummy }}>
      {children}
    </ThemeContext.Provider>
  );
};
