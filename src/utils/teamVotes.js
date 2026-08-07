const TEAM_VOTES_URL = 'https://getdagnis-worker-prod.getdagnis.workers.dev/team-votes';
export const TEAM_VOTE_EVENT = 'team-vote';
export const TEAM_VOTE_STORAGE_KEY = 'team-vote';

const LOCALHOST_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);

function isLocalhost() {
  return typeof window !== 'undefined' && LOCALHOST_HOSTNAMES.has(window.location.hostname);
}

function getVisitorId() {
  const storedId = localStorage.getItem('team-vote-visitor-id');
  if (storedId) return storedId;

  const visitorId = crypto.randomUUID();
  localStorage.setItem('team-vote-visitor-id', visitorId);
  return visitorId;
}

export async function getTeamVotes() {
  const response = await fetch(TEAM_VOTES_URL);
  if (!response.ok) throw new Error(`Team votes request failed: ${response.status}`);
  return response.json();
}

export async function submitTeamVote(vote, { durationMs } = {}) {
  if (isLocalhost()) {
    throw new Error('Team votes are disabled on localhost.');
  }

  const response = await fetch(TEAM_VOTES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vote, durationMs, visitorId: getVisitorId() }),
  });
  if (!response.ok) throw new Error(`Team vote request failed: ${response.status}`);
  return response.json();
}
