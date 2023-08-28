import React, { ReactNode, useState, createContext } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({
  theme: "",
  toggleTheme: () => {},
});


export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("");

  console.log("theme: ", theme)

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "" ? "dark" : ""));
    console.log("nag toggle")
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
