import { getVisitorId } from './teamVotes';

export const shareContent = async (content, absurdity) => {
  try {
    const res = await fetch('https://getdagnis-worker-prod.getdagnis.workers.dev/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        absurdity,
        visitorId: getVisitorId(),
      }),
    });

    const json = await res.json();
    return json.success
      ? json
      : { success: false, error: json.error || 'The Worker rejected the share.' };
  } catch (err) {
    console.error('Share failed:', err);
    return { success: false, error: err.message || 'The share request failed.' };
  }
};
