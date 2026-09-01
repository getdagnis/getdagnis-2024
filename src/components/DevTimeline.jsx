import { useState } from 'react';

import { TIMELINE } from '../constants/constants';
import './DevTimeline.css';

const DevTimeline = () => {
  const initialEntry = TIMELINE[0]?.id ?? null;
  const [activeEntry, setActiveEntry] = useState(initialEntry);
  const [outgoing, setOutgoing] = useState(initialEntry);

  const handleYearClick = (id) => {
    if (id === activeEntry) return;

    setOutgoing(activeEntry);
    setActiveEntry(id);
  };

  const activeItem = TIMELINE.find((item) => item.id === activeEntry) ?? TIMELINE[0];

  return (
    <section className="timeline-container" aria-labelledby="timeline-title">
      <h2 id="timeline-title" className="timeline-title">
        Developer timeline
      </h2>
      <p className="timeline-subtitle">Selected milestones. The rest is in the CV—or buried in the archive.</p>

      <div className="timeline-track">
        <ul className="timeline" aria-label="Development career milestones">
          {TIMELINE.map((item) => (
            <li key={item.id} className={`timeline-outer ${item.id === activeEntry ? 'active' : ''}`}>
              <button
                type="button"
                className={`timeline-item ${item.id === activeEntry ? 'active' : ''}`}
                aria-pressed={item.id === activeEntry}
                aria-label={`${item.year}: ${item.title}`}
                onClick={() => handleYearClick(item.id)}
              >
                <span className={`timeline-year ${item.id === activeEntry ? 'active' : ''}`} id={`year-${item.id}`}>
                  {item.year}
                </span>
                <span
                  className={`timeline-bg-red ${item.id >= activeEntry ? 'left' : 'right'} ${
                    item.id === outgoing ? 'outgoing' : ''
                  }`}
                  aria-hidden="true"
                ></span>
              </button>
            </li>
          ))}
        </ul>
        <div className="timeline-line" aria-hidden="true"></div>
      </div>

      <div className="timeline-content-container" aria-live="polite">
        {activeItem && (
          <div id={`timeline-content-${activeItem.id}`} className="timeline-content active">
            <h3 className="timeline-box-title">{activeItem.title}</h3>
            <p className="timeline-text">{activeItem.text}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DevTimeline;
