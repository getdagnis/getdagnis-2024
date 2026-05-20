import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ButtonNav from '../components-ui/ButtonNav';
import MobileMenu from '../components/MobileMenu';

import './Header.css';

const ARMAGGEDON_START_COUNT = 0;
const SHOTCOUNT_BEFORE_ARMAGGEDON = 4;

function Header() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [arrowState, setArrowState] = useState({
    backgroundPositionX: 'right',
    transition: 'background-position-x 15s ease',
  });
  const [becomeState, setBecomeState] = useState({});
  const [sloganState, setSloganState] = useState({});
  const [shotCount, setShotCount] = useState(ARMAGGEDON_START_COUNT);
  const [armageddon, setArmageddon] = useState(false);
  const [showDamn, setShowDamn] = useState(false);

  const arrowElement = useRef(null);
  const becomeElement = useRef(null);
  const sloganElement = useRef(null);

  const arrowElementWidth = arrowElement.current ? arrowElement.current.offsetWidth : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 2000);

    setShotCount(ARMAGGEDON_START_COUNT);
    setArrowState({ backgroundPositionX: '100%', transition: 'background-position-x 0.2s ease-out' });

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.armageddon');
    if (armageddon) {
      elements.forEach((el) => {
        const randomDelay = (Math.random() * 4 + 1).toFixed(2);
        el.style.animation = 'armageddon 1.5s ease-out';
        el.style.animationDelay = `${randomDelay}s`;
        el.style.animationFillMode = 'forwards';
      });
    }
    setArmageddon(false);
  }, [armageddon]);

  const handleArrowMouseEnter = () => {
    if (!isPageLoaded) return;
    setArrowState({ backgroundPositionX: `calc(100% - ${arrowElementWidth}px + 5vw)` });
  };

  const handleArrowMouseLeave = () => {
    setArrowState({ backgroundPositionX: `100%` });
  };

  const handleArrowMouseClick = () => {
    shootTheArrow();
    bounceTheIconsText();
  };

  const shootTheArrow = () => {
    setArrowState({ backgroundPositionX: 'right', transition: 'background-position-x 0.1s ease-out' });

    setTimeout(
      () => setArrowState({ backgroundPositionX: '100%', transition: 'background-position-x 0.2s ease-out' }),
      500,
    );
  };

  const bounceTheIconsText = () => {
    setShotCount(shotCount + 1);

    setTimeout(
      () => setArrowState({ backgroundPositionX: '115%', transition: 'background-position-x 0.1s ease-out' }),
      100,
    );
    setTimeout(
      () => setArrowState({ backgroundPositionX: '100%', transition: 'background-position-x 0.2s ease-out' }),
      200,
    );
    setTimeout(
      () => setArrowState({ backgroundPositionX: '102%', transition: 'background-position-x 0.1s ease-out' }),
      400,
    );

    setBecomeState({ transform: 'translateX(0.5%)', transition: 'all 0.01s ease-out' });
    setBecomeState({
      transform: 'translateX(8%)',
      transition: 'all 0.01s ease-out',
    });
    setTimeout(() => setBecomeState({ transform: 'none', transition: 'transform 0.05s ease-out' }), 50);

    if (shotCount === SHOTCOUNT_BEFORE_ARMAGGEDON) {
      setTimeout(() => {
        setSloganState({
          transform: `rotate(2.82deg)`,
          transformOrigin: 'center left',
          transition: 'transform 0.1s ease-out',
        });
      }, 600);

      setTimeout(
        () =>
          setBecomeState({
            animation: 'becomeSloganFall 2.5s ease-out',
            animationFillMode: 'forwards',
            transition: 'transform 0.05s ease-out',
          }),
        600,
      );

      setTimeout(
        () =>
          setSloganState({
            animation: 'becomeSloganFall 2.5s ease-out',
            animationFillMode: 'forwards',
            transition: 'transform 0.05s ease-out',
          }),
        2000,
      );

      setTimeout(() => {
        setArmageddon(true);
      }, 4500);

      setTimeout(() => {
        damnYouBrokeMySite();
      }, 12000);

      return;
    }

    if (shotCount > ARMAGGEDON_START_COUNT) {
      setTimeout(() => {
        setSloganState({
          transform: `rotate(0.${shotCount * 3}deg)`,
          transformOrigin: 'center left',
          transition: 'transform 0.1s ease-out',
        });
      }, 600);
    }
  };

  const damnYouBrokeMySite = () => {
    setShowDamn(true);
    document.body.style.overflow = 'hidden';
  };

  function handleHamburgerClick() {
    // prevents unnecessary scroll "leftovers" caused by hamburger-inner animations
    const siteContainer = document.getElementById('site-container');
    const hamburger = document.querySelector('.hamburger');
    if (showMenu) {
      handleMenuClose();
    }

    if (!showMenu) {
      siteContainer.style.overflow = 'hidden';
      setShowMenu(true);
      // let the mobile menu slide in, only then show the close button
      setTimeout(() => {
        hamburger.classList.add('is-active');
        hamburger.classList.add('z-index-999');
      }, 500);
    }
  }

  function handleMenuClose() {
    const hamburger = document.querySelector('.hamburger');
    const siteContainer = document.getElementById('site-container');

    setShowMenu(false);
    hamburger.classList.remove('is-active');
    hamburger.classList.remove('z-index-999');
    siteContainer.style.overflow = '';
  }

  const location = useLocation();
  const designActive = location.pathname.includes('/design');

  return (
    <div id="header">
      {armageddon && <div className="overlay-block"></div>}
      <div className="header-top">
        <div className="header-left">
          <NavLink to="/redirect/design">
            <div className="logo armageddon"></div>
          </NavLink>
          <p className="logo-subtitle armageddon">dev & design portfolio</p>
        </div>

        <div className="hamburger hamburger--collapser" onClick={() => handleHamburgerClick()}>
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </div>

        <nav id="header-nav" className="armageddon">
          <ButtonNav>
            <NavLink to="/design" className={designActive ? 'active' : ''}>
              design
            </NavLink>
          </ButtonNav>
          <ButtonNav>
            <NavLink to="/skills/dev">dev skills</NavLink>
          </ButtonNav>
          <ButtonNav>
            <NavLink to="/about">about</NavLink>
          </ButtonNav>
          <ButtonNav>
            <NavLink to="/cv">cv</NavLink>
          </ButtonNav>
          <ButtonNav>
            <NavLink to="/404">404</NavLink>
          </ButtonNav>
        </nav>
      </div>

      <div className="become-slogan" style={sloganState} ref={sloganElement}>
        <span className="become-left">
          ideas<strong>become</strong>brands
        </span>
        <span
          className="become-middle"
          style={arrowState}
          onMouseEnter={handleArrowMouseEnter}
          onMouseLeave={handleArrowMouseLeave}
          onClick={handleArrowMouseClick}
          ref={arrowElement}
        ></span>
        <span className="become-right" style={becomeState} ref={becomeElement}>
          brands<strong className="b">become</strong>icons
        </span>
      </div>
      {showMenu && <MobileMenu showMenu={showMenu} onClose={handleMenuClose} />}
      {showDamn && (
        <div className="dammit">
          <h1 className="modal-h1">damn. you&nbsp;broke&nbsp;my&nbsp;site.</h1>
          <h1 className="modal-h1">but&nbsp;no&nbsp;worries. we&nbsp;can&nbsp;restore&nbsp;it.</h1>
          <div id="armageddon-btn" className="modal-button" onClick={() => window.location.reload()}>
            RELOAD <img className="reload-icon" src="/reload.svg" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
