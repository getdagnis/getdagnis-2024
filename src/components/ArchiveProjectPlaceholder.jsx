import { useState } from 'react';
import PropTypes from 'prop-types';

import './ArchiveProjectPlaceholder.css';

const ARCHIVE_VOTES_URL = 'https://getdagnis-worker-prod.getdagnis.workers.dev/archive-votes';

function getVoteStorageKey(projectKey) {
  return `archive-vote-${projectKey}`;
}

function getLocalDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function ArchiveVoteButton({ voteState, onVote, className = '' }) {
  return (
    <button
      type="button"
      className={`modal-button archive-vote-button armageddon ${className}`}
      onClick={onVote}
      disabled={voteState !== 'ready'}
    >
      {voteState === 'counted' ? 'your vote is counted' : 'VOTE ME TO BE UPDATED!'}
    </button>
  );
}

function ArchiveProjectPlaceholder({ projectKey, logoSrc }) {
  const [voteState, setVoteState] = useState(() => {
    try {
      return localStorage.getItem(getVoteStorageKey(projectKey)) === getLocalDate() ? 'counted' : 'ready';
    } catch {
      return 'ready';
    }
  });

  const handleVote = async () => {
    if (voteState !== 'ready') return;
    setVoteState('submitting');

    try {
      const response = await fetch(ARCHIVE_VOTES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectKey }),
      });

      if (!response.ok) throw new Error(`Archive vote failed with status ${response.status}`);
      localStorage.setItem(getVoteStorageKey(projectKey), getLocalDate());
      setVoteState('counted');
    } catch (error) {
      console.error('Archive vote failed:', error);
      setVoteState('ready');
    }
  };

  return (
    <>
      <div className="archive-project-card armageddon">
        <h3>This project is waiting to see the daylight</h3>
        <ArchiveVoteButton voteState={voteState} onVote={handleVote} />
      </div>
      <div className="archive-project-gallery" aria-label="Archive placeholders">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="archive-gallery-placeholder armageddon" key={index}>
            <img src={logoSrc} alt="" aria-hidden="true" />
          </div>
        ))}
      </div>
    </>
  );
}

ArchiveVoteButton.propTypes = {
  voteState: PropTypes.oneOf(['ready', 'submitting', 'counted']).isRequired,
  onVote: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ArchiveProjectPlaceholder.propTypes = {
  projectKey: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

export default ArchiveProjectPlaceholder;
