const TEAM_VOTES_URL = 'https://getdagnis-worker-prod.getdagnis.workers.dev/team-votes';
export const TEAM_VOTE_EVENT = 'team-vote';

export async function getTeamVotes() {
  const response = await fetch(TEAM_VOTES_URL);
  if (!response.ok) throw new Error(`Team votes request failed: ${response.status}`);
  return response.json();
}

export async function submitTeamVote(vote) {
  const response = await fetch(TEAM_VOTES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vote }),
  });
  if (!response.ok) throw new Error(`Team vote request failed: ${response.status}`);
  return response.json();
}
