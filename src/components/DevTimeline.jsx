import { useState } from 'react';

import { TIMELINE } from '../constants/constants';
import './DevTimeline.css';

const DevTimeline = () => {
  const [activeEntry, setActiveYear] = useState(1);
  const [outgoing, setOutgoing] = useState(1);

  const handleYearClick = (id) => {
    setOutgoing(activeEntry);
    setActiveYear(id);
  };

  return (
    <div className="timeline-container">
      <h1 className="timeline-title">Dev Experience Timeline</h1>
      <h3 className="timeline-subtitle">(any other experience excluding)</h3>

      <ul className="timeline">
        {TIMELINE.map((item) => (
          <div key={item.id} className={`timeline-outer ${item.id === activeEntry ? 'active' : ''}`}>
            <li
              id={item.id}
              className={`timeline-item ${item.id === activeEntry ? 'active' : ''}`}
              onClick={() => handleYearClick(item.id)}
            >
              <div className={`timeline-year ${item.id === activeEntry ? 'active' : ''}`} id={`year-${item.id}`}>
                {item.year}
              </div>
              <div
                className={`timeline-bg-red ${item.id >= activeEntry ? 'left' : 'right'} ${
                  item.id === outgoing ? 'outgoing' : ''
                }`}
                // style={{ animationDelay: `${Math.abs(item.id - activeEntry) * 0.1}s` }}
              ></div>
            </li>
          </div>
        ))}
        <div className="timeline-line"></div>
      </ul>

      <div className="timeline-content-container">
        {TIMELINE.map((item) => (
          <div key={item.id} className={`timeline-content ${item.id === activeEntry ? 'active' : ''}`}>
            <h2 className="timeline-box-title">{item.title}</h2>
            <p className="timeline-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevTimeline;

// <div className="timeline-content">
// <h2 className="timeline-box-title">{item.title}</h2>
// <p className="timeline-text">{item.text}</p>
// </div>
