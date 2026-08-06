import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga4';

import { AppProvider } from './context/AppContext';
import Header from './layout/Header';
import Footer from './layout/Footer';
import SEO from './components/SEO';
import './App.css';

// Google Analytics
const TRACKING_ID = 'G-JWRXKK1QPP';
ReactGA.initialize(TRACKING_ID);

function App({ children }) {
  // Google Analytics
  useEffect(() => {
    ReactGA.send('pageview');
  }, []);

  return (
    <AppProvider>
      <SEO />
      <div id="site-container">
        <Header />
        <div id="site-content">{children}</div>
        <Footer />
      </div>
    </AppProvider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
