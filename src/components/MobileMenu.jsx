import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MobileMenu.css';

function MobileMenu({ onClose }) {
  const [activeRoute, setActiveRoute] = useState(null);

  // used to determine which link is active
  useEffect(() => {
    window.location.pathname.includes('/design') || window.location.pathname === '/'
      ? setActiveRoute('design')
      : window.location.pathname.includes('/skills')
      ? setActiveRoute('skills')
      : window.location.pathname === '/about'
      ? setActiveRoute('about')
      : window.location.pathname === '/404'
      ? setActiveRoute('404')
      : setActiveRoute(null);
  }, []);

  return (
    <div id="mobile-menu-container">
      <ul id="mobile-menu-list">
        <li style={{ animationDelay: '0.25s' }}>
          <NavLink to="/redirect/design" className={activeRoute === 'design' ? 'active' : ''} onClick={onClose}>
            design
          </NavLink>
        </li>
        <li style={{ animationDelay: '0.3s' }}>
          <NavLink to="/redirect/skills" className={activeRoute === 'skills' ? 'active' : ''} onClick={onClose}>
            dev skills
          </NavLink>
        </li>
        <li style={{ animationDelay: '0.35s' }}>
          <NavLink to="/about" className={activeRoute === 'about' ? 'active' : ''} onClick={onClose}>
            about
          </NavLink>
        </li>
        <li style={{ animationDelay: '0.4s' }}>
          <NavLink to="/404" className={activeRoute === '404' ? 'active' : ''} onClick={onClose}>
            404
          </NavLink>
        </li>
      </ul>
      <div id="mobile-menu-bottom">
        <NavLink to="/contact" className="footer-message mobile-menu-message" onClick={onClose}></NavLink>
        <p>© DAGNIS SKURBE, 2025</p>
      </div>
    </div>
  );
}

export default MobileMenu;

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};
