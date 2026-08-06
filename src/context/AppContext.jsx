import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return <AppContext.Provider value={{ isDarkMode, toggleDarkMode, user, setUser }}>{children}</AppContext.Provider>;
};
