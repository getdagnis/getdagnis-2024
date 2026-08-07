import { useState, useEffect } from 'react';
import { useNavigate, ScrollRestoration } from 'react-router-dom';

import { ASK_AI_ABSURD_PROMTPS } from '../constants/constants';
import { askAI, shareContent } from '../utils';
import { formatAIResponse } from '../utils/formatAIResponse';
import './AboutPage.css';

function AboutPage() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(1);
  const [absurdity, setAbsurdity] = useState(1);
  const [utcCountdown, setUtcCountdown] = useState('00:00:00');
  const [sharingStatus, setSharingStatus] = useState(false);

  const navigate = useNavigate();
  const failed = response === 'Sorry. Cloudflare Worker request failed.';

  // Open router status screenshot to display in case of fetch failure
  const openRouterUrl = encodeURIComponent('https://status.openrouter.ai/#active-incidents');
  const orScreenshotUrl = `https://api.microlink.io/?url=${openRouterUrl}&screenshot=true&meta=false&embed=screenshot.url`;

  const handleAskAI = async () => {
    setLoadingStage(1);
    setLoading(true);
    setResponse('');

    window.scrollTo({
      top: 0,
    });

    const question = 'Describe who is Dagnis Skurbe';

    try {
      const result = await askAI(question, absurdity);
      setResponse(result);
    } catch (err) {
      setResponse('Error fetching AI response.');
    } finally {
      setLoading(false);
    }
  };

  const AbsurdityList = () => {
    return Array.from({ length: 10 }, (_, index) => (
      <li key={index} className={index + 1 === absurdity ? 'active' : ''} onClick={() => setAbsurdity(index + 1)}>
        {index + 1}
      </li>
    ));
  };

  const LoadingStatus = () => {
    if (loadingStage === 1) {
      setTimeout(() => setLoadingStage(2), 1500);
      return (
        <div className="loading">
          <p className="loading">Contacting the API...</p>
        </div>
      );
    }

    if (loadingStage === 2) {
      setTimeout(() => setLoadingStage(3), 3000);
      return (
        <div className="loading">
          <p className="loading">Analyzing the web...</p>
        </div>
      );
    }

    if (loadingStage === 3) {
      setTimeout(() => setLoadingStage(4), 5000);
      return (
        <div className="loading">
          <p className="loading">{ASK_AI_ABSURD_PROMTPS[absurdity - 1].message}</p>
        </div>
      );
    }

    if (loadingStage === 4) {
      return (
        <div className="loading">
          <p className="loading">{`Still ${ASK_AI_ABSURD_PROMTPS[absurdity - 1].message.toLowerCase()}`}</p>
        </div>
      );
    }

    return null;
  };

  const handleShare = async () => {
    setSharingStatus(true);
    const { success } = await shareContent(response, absurdity);

    if (success) {
      setSharingStatus('done');
      alert('Shared successfully! Redirecting to shared page...');
      setTimeout(() => navigate('/shared'), 3000);
      // TODO: remove this when a modal confirmation for sharing is added and put it there with no timer
      setTimeout(() => setSharingStatus(false), 3000);
    } else {
      setSharingStatus('error');
      setTimeout(() => setSharingStatus(false), 3000);
    }
  };

  // update countdown for error message
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const utcNow = new Date(now.toUTCString());

      const nextMidnight = new Date(
        Date.UTC(
          utcNow.getUTCFullYear(),
          utcNow.getUTCMonth(),
          utcNow.getUTCDate() + 1, // tomorrow
          0,
          0,
          0
        )
      );

      const diff = nextMidnight.getTime() - utcNow.getTime();

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setUtcCountdown(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="about">
      <div className="about-grid">
        <div className="about-left">
          <div className="dag-img" />
          {!failed && <h1>Who is Dagnis Skurbe?</h1>}
        </div>
        <div className="about-middle">
          {!failed && <h1>Who is Dagnis Skurbe?</h1>}
          <div className="about-response">
            {loading && <LoadingStatus />}
            {sharingStatus && (
              <p>
                {sharingStatus === 'done'
                  ? 'Shared successfully!'
                  : (
                    <>
                      Failed to share. Please <span onClick={() => window.location.reload()}>reload</span> the page.
                    </>
                  )}
              </p>
            )}
            {!loading && !response && !failed && !sharingStatus && (
              <div className="about-intro">
                <p>
                  Instead of writing a bio about myself I thought — why not let AI do it based on the stuff that can be
                  found on the internet — articles, social profiles, LinkedIn etc. So here you go — have fun with it.
                </p>
                <div className="intro-btns-absurdity">
                  <div className="absurdity-level">
                    Absurdity level: <strong>{ASK_AI_ABSURD_PROMTPS[absurdity - 1].title}</strong>
                  </div>
                  <ul className="intro-absurdity-list">
                    <AbsurdityList />
                  </ul>
                </div>
                <div className="intro-btns">
                  <div onClick={!loading && handleAskAI} className={`btn btn-animated`}>
                    Ask AI about Dagnis...
                  </div>
                  {sharingStatus ? (
                    'Sharing...'
                  ) : (
                    <div className="shared-link" onClick={() => navigate('/shared')}>
                      <p>View bios shared by others!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {response && !sharingStatus && (
              <div className="output">
                {!failed && formatAIResponse(response)}
                {failed && (
                  <>
                    <h3>{formatAIResponse(response)}</h3>
                    <p className="error">
                      Call to the API did not succeed.{' '}
                      <a href="https://status.openrouter.ai/#active-incidents" className="error">
                        Hover this link <img src={orScreenshotUrl} alt="OpenRouter status preview" />
                      </a>{' '}
                      to see if the OpenRouter API status is currently down. <br />
                      In case it&apos;s not green, you can try again when it&apos;s back up (usually in minutes).
                    </p>
                    <p className="error">
                      Otherwise the daily query limit probably has been exceeded (too high user activity) and that will
                      be <br /> reset at midnight UTC time in <strong>{utcCountdown}</strong>
                    </p>
                    <div onClick={!loading && handleAskAI} className={`btn btn-animated`}>
                      Try once again...
                    </div>
                  </>
                )}
                {!failed && response && (
                  <div className="about-bottom">
                    <div className="absurdity-level-bottom">
                      <div>Absurdity level:</div>{' '}
                      <div>
                        <strong>{ASK_AI_ABSURD_PROMTPS[absurdity - 1].title}</strong>
                      </div>
                    </div>
                    <ul>
                      <AbsurdityList />
                    </ul>
                    <div className="bottom-btns">
                      <div onClick={!loading && handleAskAI} className={`btn btn-animated`}>
                        Regenerate!
                      </div>
                    </div>
                    <p className="shared-bottom-link">
                      {sharingStatus ? (
                        'Sharing...'
                      ) : (
                        <>
                          Is it good? <em onClick={handleShare}>Share with me!</em>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}

export default AboutPage;
