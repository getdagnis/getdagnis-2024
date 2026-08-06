import { useEffect, useState } from 'react';
import { formatAIResponse } from '../utils/formatAIResponse';

import './SharedPage.css';

function SharedPage() {
  const [entries, setEntries] = useState([]);
  const [itemExpanded, setItemExpanded] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://getdagnis-worker-prod.getdagnis.workers.dev/shared')
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error('Failed to load shared entries:', err));
    setLoading(false);
  }, []);

  return (
    <div id="shared-page">
      <h1>Shared AI Responses</h1>
      <ul className="shared-list">
        {loading && <p>Loading user shared AI bios...</p>}
        {!loading && entries.length === 0 && <p>Sorry, no shared entries found this time...</p>}
        {!loading && entries.length > 0 && (
          <p className="shared-list-intro">
            Below are the AI generated absurd biographies that the site visitors liked and decided to share with others.
            Vote for your favorite ones!
          </p>
        )}
        {!loading &&
          entries.length > 0 &&
          entries.map((entry) => (
            <li
              className="shared-item"
              key={entry.id}
              onClick={() => setItemExpanded(itemExpanded === entry.id ? '' : entry.id)}
            >
              <div className="shared-item-top">
                <div>
                  Absurdity: <strong>{entry.absurdity_level}</strong>
                </div>
                <div className="date">Date: {new Date(entry.created_at).toLocaleString()}</div>
              </div>
              <div className={`shared-item-bottom ${itemExpanded === entry.id ? '' : 'shared-item-bottom-preview'}`}>
                {!entry.summary || entry.summary === 'No summary available' ? (
                  <div className={itemExpanded === entry.id ? 'shared-item-content-expanded' : 'shared-item-content'}>
                    {itemExpanded !== entry.id
                      ? formatAIResponse(entry.content.slice(0, 120) + '... ')
                      : formatAIResponse(entry.content)}
                  </div>
                ) : (
                  <div className={itemExpanded === entry.id ? 'shared-item-content-expanded' : 'shared-item-content'}>
                    {itemExpanded !== entry.id ? formatAIResponse(entry.summary) : formatAIResponse(entry.content)}
                  </div>
                )}
                <div className="shared-item-bottom-right">
                  <div className="published-by-container">
                    <p className="published-by" style={{ color: entry.color, filter: 'brightness(0.8)' }}>
                      Published by:
                      <br />
                      <strong className={`${window.innerWidth > 620 && 'no-text-wrap'}`}>
                        {entry.color ? entry.color : 'Anonymous'} {entry.alias}
                      </strong>
                      {entry.country && ` from ${entry.country}`}
                      {/* {entry.country && entry.country !== 'RU' && (
                          <img className="country-flag" src={`https://flagsapi.com/${entry.country}/flat/64.png`} alt="" />
                      )} */}
                    </p>
                    <div className="avatar-container" style={{ backgroundColor: entry.color }}>
                      <img className="avatar" src={entry.img_url} alt={entry.alias} />
                    </div>
                  </div>
                  <div id={`expand-button ${itemExpanded === entry.id ? 'expanded' : ''}`}>
                    <div
                      className="expand-arrow"
                      style={{ rotate: itemExpanded === entry.id ? '225deg' : '45deg' }}
                    ></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SharedPage;
