import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './ArchiveProjectPlaceholder.css';

const ARCHIVE_VOTES_URL = 'https://getdagnis-worker-prod.getdagnis.workers.dev/archive-votes';
const CARD_CHANGE_DELAY = 300;

function getVoteStorageKey(projectKey) {
  return `archive-vote-${projectKey}`;
}

function getCommentStorageKey(projectKey) {
  return `archive-comment-${projectKey}-submitted`;
}

function getLocalDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function ArchiveVoteButton({ voteState, onVote, onComment, className = '' }) {
  if (voteState === 'counted') {
    return (
      <button type="button" className={`modal-button archive-vote-button armageddon ${className}`} onClick={onComment}>
        TELL ME WHY YOU VOTED!
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`modal-button archive-vote-button armageddon ${className}`}
      onClick={onVote}
      disabled={voteState !== 'ready'}
    >
      {voteState === 'submitting' ? 'VOTING...' : 'VOTE ME TO BE UPDATED!'}
    </button>
  );
}

function ArchiveProjectPlaceholder({ projectKey, projectName, logoSrc }) {
  const navigate = useNavigate();
  const [voteState, setVoteState] = useState('ready');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const voteTransitionTimer = useRef(null);

  useEffect(() => {
    let hasVotedToday = false;
    let hasSubmittedComment = false;

    try {
      hasVotedToday = localStorage.getItem(getVoteStorageKey(projectKey)) === getLocalDate();
      hasSubmittedComment = localStorage.getItem(getCommentStorageKey(projectKey)) === 'submitted';
    } catch {
      // Continue with the default state when localStorage is unavailable.
    }

    setVoteState(hasVotedToday ? 'counted' : 'ready');
    setCommentSubmitted(hasSubmittedComment);

    return () => {
      if (voteTransitionTimer.current) clearTimeout(voteTransitionTimer.current);
    };
  }, [projectKey]);

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
      voteTransitionTimer.current = setTimeout(() => setVoteState('counted'), CARD_CHANGE_DELAY);
    } catch (error) {
      console.error('Archive vote failed:', error);
      setVoteState('ready');
    }
  };

  const handleComment = () => {
    try {
      localStorage.setItem(getCommentStorageKey(projectKey), 'submitted');
    } catch {
      // The form remains available even when localStorage is unavailable.
    }

    const search = new URLSearchParams({
      archiveProjectKey: projectKey,
      archiveProjectName: projectName,
    });

    navigate(`/contact?${search.toString()}`, {
      state: {
        archiveProjectKey: projectKey,
        archiveProjectName: projectName,
      },
    });
  };

  return (
    <>
      <div className={`archive-project-card armageddon${voteState === 'counted' ? ' archive-voted' : ''}`}>
        {voteState === 'counted' && (
          <>
            <h3>THIS WILL SOON SEE THE DAYLIGHT!</h3>
            <p>A single vote is good enough! I'll update the project soon.</p>
          </>
        )}
        {voteState !== 'counted' && (
          <>
            <h3>THIS PROJECT WANTS TO SEE THE DAYLIGHT!</h3>
            <p>A single vote is good enough! Let me know this needs to be published!</p>
          </>
        )}
        {!commentSubmitted && <ArchiveVoteButton voteState={voteState} onVote={handleVote} onComment={handleComment} />}
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
  onComment: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ArchiveProjectPlaceholder.propTypes = {
  projectKey: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
};

export default ArchiveProjectPlaceholder;
