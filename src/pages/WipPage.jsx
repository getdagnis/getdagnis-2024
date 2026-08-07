import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import DesignPage from './DesignPage';
import { submitTeamVote, TEAM_VOTE_EVENT } from '../utils/teamVotes';
import './WipPage.css';

const SHOW_WIP_MODAL = true;
const WIP_ACKNOWLEDGED_KEY = 'wip-modal-acknowledged';

function WipPage() {
  const location = useLocation();
  const [gridAnimationRun, setGridAnimationRun] = useState(0);
  const [showWipModal, setShowWipModal] = useState(
    () => SHOW_WIP_MODAL && location.pathname === '/' && sessionStorage.getItem(WIP_ACKNOWLEDGED_KEY) !== 'true',
  );

  const handleWipAcknowledgement = (vote) => {
    sessionStorage.setItem(WIP_ACKNOWLEDGED_KEY, 'true');
    window.dispatchEvent(new CustomEvent(TEAM_VOTE_EVENT, { detail: { vote } }));
    submitTeamVote(vote).catch(() => {
      // Keep the local reveal even when the Worker is unavailable.
    });
    setGridAnimationRun((currentRun) => currentRun + 1);
    setShowWipModal(false);
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
      <DesignPage gridAnimationRun={gridAnimationRun} />
      {showWipModal && (
        <div className="wip">
          <div className="wip-message">
            <h1 className="modal-extra-h1">WORK IN PROGRESS</h1>
            <ul className="wip-ul">
              ⇝ Estimated completion: beyond human comprehension.
              <br />
              ⇝ A must have disclaimer these days: the front end was built with Vite and React—before AI agents
              (2019–2024).
              <br />
              ⇝ Designed by hand. Code and CSS written line by line. Animations built from scratch.
              <br />
              ⇝ What’s mainly missing? Finding and collecting the relevant work from more than 20,000 archived files
              made over a span of 20+ years. Never gonna happen.
              <br />
              ⇝ Since people keep asking—yes the logos and visual identities you’re about to see were designed by me.
              <br />
              ⇝ Oh, and there are some Easter eggs hidden somewhere. Play around with the arrows.
              <br />
            </ul>
            <div className="wip-buttons">
              <button type="button" className="modal-button" onClick={() => handleWipAcknowledgement('ok')}>
                OK
              </button>
              <button type="button" className="modal-button" onClick={() => handleWipAcknowledgement('perfect')}>
                PERFECT!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WipPage;
