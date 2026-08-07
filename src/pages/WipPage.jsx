import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import DesignPage from './DesignPage';
import './WipPage.css';

const SHOW_WIP_MODAL = true;
const WIP_ACKNOWLEDGED_KEY = 'wip-modal-acknowledged';

function WipPage() {
  const location = useLocation();
  const [showWipModal, setShowWipModal] = useState(
    () =>
      SHOW_WIP_MODAL &&
      location.pathname === '/' &&
      sessionStorage.getItem(WIP_ACKNOWLEDGED_KEY) !== 'true',
  );
  const [isClosing, setIsClosing] = useState(false);

  const handleWipAcknowledgement = () => {
    if (isClosing) return;
    sessionStorage.setItem(WIP_ACKNOWLEDGED_KEY, 'true');
    setIsClosing(true);
    window.setTimeout(() => setShowWipModal(false), 180);
  };

  return (
    <>
      <div className="seo-intro">
        <h1>Dagnis Skurbe — Dev &amp; Design Portfolio</h1>
        <p>
          Showcase of works by Dagnis Skurbe, a Latvian product engineer, designer, creative director and founder.
          Browse branding, visual identity, web development, UX and product projects.
        </p>
      </div>
      <DesignPage />
      {showWipModal && (
        <div className={`wip${isClosing ? ' wip-closing' : ''}`}>
          <div className="wip-message">
            <h1 className="modal-extra-h1">WORK IN PROGRESS</h1>
            <div className="wip-copy">
              <p>Estimated completion: beyond human comprehension.</p>
            </div>
            <div className="wip-buttons">
              <button type="button" className="modal-button" onClick={handleWipAcknowledgement}>
                ACKNOWLEDGED
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WipPage;
