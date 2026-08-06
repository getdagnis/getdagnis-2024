import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return <AppContext.Provider value={{ isDarkMode, toggleDarkMode, user, setUser }}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
