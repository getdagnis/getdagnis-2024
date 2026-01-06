export async function askAI(question, absurdity) {
  try {
    const res = await fetch('https://getdagnis-worker.getdagnis.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, absurdity: String(absurdity) }),
    });

    const data = await res.json();
    return data.content || data.error;
  } catch (err) {
    console.error('Worker call failed:', err);
    return 'Sorry. Cloudflare Worker request failed.';
  }
}
