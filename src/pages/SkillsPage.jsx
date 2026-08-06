import { Fragment, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import DevTimeline from '../components/DevTimeline';
import SKILLS_DESIGN from '../constants/skills-design.json';
import SKILLS_DEV from '../constants/skills-dev.json';
import './SkillsPage.css';

function SkillsPage() {
  const [skillSection, setSkillSection] = useState('dev');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/skills/design')) {
      setSkillSection('design');
    } else if (path.includes('/skills/dev')) {
      setSkillSection('dev');
    }
  }, [location.pathname]);

  const toggleSkillSection = (clicked) => {
    setSkillSection(clicked === 'right' ? 'design' : 'dev');
  };

  return (
    <div id="skills-container">
      <div id="skills-top">
        <NavLink to="/skills/dev" onClick={() => toggleSkillSection('left')}>
          <p className="left">DEV skills</p>
          <svg className="skills-tab-left" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M259.09,36,240.14,19a33.08,33.08,0,0,0-22.07-8.44H16.46a8.26,8.26,0,0,0-8.27,8.26V72H281.67V44.65A33.85,33.85,0,0,1,259.09,36Z"
              transform="translate(-7.19 -9.6)"
            />
          </svg>
        </NavLink>
        <div className="skills-title-middle"></div>
        <NavLink to="/skills/design" onClick={() => toggleSkillSection('right')}>
          <p className="right">DESIGN skills</p>
          <svg className="skills-tab-right" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M259.09,36,240.14,19a33.08,33.08,0,0,0-22.07-8.44H16.46a8.26,8.26,0,0,0-8.27,8.26V72H281.67V44.65A33.85,33.85,0,0,1,259.09,36Z"
              transform="translate(-7.19 -9.6)"
            />
          </svg>
        </NavLink>
      </div>
      <div id="skills-grid">
        {skillSection === 'design'
          ? SKILLS_DESIGN.designSkills.map((skill, index) => renderSkill(skill, index))
          : SKILLS_DEV.devSkills.map((skill, index) => renderSkill(skill, index))}
      </div>
      {skillSection === 'dev' && <DevTimeline />}
    </div>
  );
}

function renderSkill(skill, index) {
  return (
    <div
      key={skill.key}
      className={`skill-item ${skill.class}  armageddon`}
      style={{
        animationDelay: `${0.3 + index / 20}s`,
        zIndex: index,
      }}
    >
      <div className="skill-item-top">
        <div
          className="skill-icon"
          style={{ backgroundImage: `url(../../icons-${skill.section}/${skill.key}.svg)` }}
        ></div>
      </div>
      <div id="skill-item-bottom">
        <h3>
          {skill.title.split(' //').map((part, index, array) => (
            <Fragment key={`${skill.key}-title-${index}`}>
              {part}
              {index < array.length - 1 && (
                <span style={{ opacity: 0.25, marginLeft: '0.175rem', fontWeight: 300 }}>/</span>
              )}
            </Fragment>
          ))}
        </h3>
        <p>
          {skill.describe.split(' //').map((part, index, array) => (
            <Fragment key={`${skill.key}-description-${index}`}>
              {part}
              {index < array.length - 1 && <span style={{ opacity: 0.25, marginLeft: '0.175rem' }}>/</span>}
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

export default SkillsPage;
