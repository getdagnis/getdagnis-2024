export async function askAI(question, absurdity) {
  try {
    const res = await fetch('https://getdagnis-worker-prod.getdagnis.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, absurdity: String(absurdity) }),
    });

    const txt = await res.text();
    let data;
    try {
      data = JSON.parse(txt);
    } catch {
      console.warn('Worker returned non-JSON response:', txt);
      return txt || 'Unexpected worker response';
    }

    if (!res.ok) {
      return data.error || data.details || `Error ${res.status}`;
    }

    return data.content || data.error || 'No content';
  } catch (err) {
    console.error('Worker call failed:', err);
    return 'Sorry. Cloudflare Worker request failed.';
  }
}
