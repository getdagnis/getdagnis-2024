import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import PROJECTS from '../constants/projects.json';
import { DESIGN_FILTERS } from '../constants/constants';
import { SCREEN_WIDTHS as SCREEN } from '../constants/constants';
import './DesignPage.css';

const PANEL = {
  WHAT_IS_THIS: 'what-is-this',
  RECRUITERS: 'recruiters',
};
const PANEL_ANIMATION_MS = 500;
const PANEL_SWITCH_PAUSE_MS = 50;

function DesignPage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [gridItems, setGridItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState(sessionStorage.getItem('activefilter') || 'all');
  const [seeFilters, setSeeFilters] = useState(activeFilter !== 'all');
  const [isHiding, setIsHiding] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [renderedPanel, setRenderedPanel] = useState(null);
  const [openRecruiterQuestions, setOpenRecruiterQuestions] = useState({ professional: true });
  const panelSwitchTimeout = useRef(null);

  useEffect(() => () => window.clearTimeout(panelSwitchTimeout.current), []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      const newColumns = calculateColumns(window.innerWidth);
      setColumns(newColumns);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateColumns = (width) => {
    if (width > SCREEN.MEDIUM) return 4;
    if (width <= SCREEN.MEDIUM && width > SCREEN.SMALL) return 3;
    if (width <= SCREEN.SMALL && width >= SCREEN.XSMALL) return 2;
    return 1;
  };

  const [columns, setColumns] = useState(calculateColumns(window.innerWidth));

  useEffect(() => {
    if (isHiding) return;
    let filteredItems = [];

    if (activeFilter === 'unseen') {
      const seenProjects = JSON.parse(sessionStorage.getItem('seenprojects')) || [];

      filteredItems = PROJECTS.filter((project) => !seenProjects.includes(project.key)).map((project, index) => {
        const row = Math.floor(index / columns) + 1; // Calculate thumbs row count
        const col = (index % columns) + 1; // Calculate thumbs column count

        return {
          ...project,
          key: project.key,
          className: `grid-item col-${col} row-${row} itemBounceAnim`, // Combined class names
          col: col,
          row: row,
        };
      });
      setGridItems(filteredItems);
      return;
    }

    if (activeFilter === 'seen') {
      const seenProjects = JSON.parse(sessionStorage.getItem('seenprojects')) || [];

      filteredItems = PROJECTS.filter((project) => seenProjects.includes(project.key)).map((project, index) => {
        const row = Math.floor(index / columns) + 1; // Calculate thumbs row count
        const col = (index % columns) + 1; // Calculate thumbs column count

        return {
          ...project,
          key: project.key,
          className: `grid-item col-${col} row-${row} itemBounceAnim`, // Combined class names
          col: col,
          row: row,
        };
      });
      setGridItems(filteredItems);
      return;
    }

    filteredItems = PROJECTS.filter(
      (project) =>
        project.show === true &&
        project.category.includes('all') &&
        (project.category.includes(activeFilter) || activeFilter === 'all'),
    ).map((project, index) => {
      const row = Math.floor(index / columns) + 1; // Calculate row number
      const col = (index % columns) + 1; // Calculate column number

      return {
        ...project,
        key: project.key,
        className: `grid-item col-${col} row-${row} itemBounceAnim`, // Combined class names
        col: col,
        row: row,
      };
    });
    setGridItems(filteredItems);
  }, [activeFilter, columns, screenWidth, isHiding]);

  const handleFilterChange = (newFilter) => {
    if (activeFilter !== newFilter) {
      const calculateTimeOut =
        gridItems.length > 12 ? gridItems.length * 25 : gridItems.length > 4 ? gridItems.length * 100 : 400;
      setIsHiding(true);

      // Remove the items visually after 1000ms (or the length of the animation)
      setTimeout(() => {
        setGridItems([]);
        setIsHiding(false);
      }, calculateTimeOut);

      setActiveFilter(newFilter);
      sessionStorage.setItem('activefilter', newFilter);
    }
  };

  const handleFiltersToggle = () => {
    setActiveFilter('all');
    sessionStorage.setItem('activefilter', 'all');
    window.clearTimeout(panelSwitchTimeout.current);
    setActivePanel(null);
    setRenderedPanel(null);
    setSeeFilters(!seeFilters);
  };

  const handlePanelToggle = (panel) => {
    window.clearTimeout(panelSwitchTimeout.current);

    if (activePanel === panel) {
      setActivePanel(null);
      panelSwitchTimeout.current = window.setTimeout(() => {
        setRenderedPanel(null);
        panelSwitchTimeout.current = null;
      }, PANEL_ANIMATION_MS);
      return;
    }

    if (activePanel) {
      setActivePanel(null);
      panelSwitchTimeout.current = window.setTimeout(() => {
        setRenderedPanel(panel);
        setActivePanel(panel);
        panelSwitchTimeout.current = null;
      }, PANEL_ANIMATION_MS + PANEL_SWITCH_PAUSE_MS);
      return;
    }

    setRenderedPanel(panel);
    if (seeFilters) {
      setSeeFilters(false);
    }
    setActivePanel(panel);
  };

  const handleGithubClick = () => {
    console.log('This is not a link. You must remain here ');
  };

  const handleRecruiterQuestionToggle = (question) => {
    setOpenRecruiterQuestions((currentQuestions) => ({
      ...currentQuestions,
      [question]: !currentQuestions[question],
    }));
  };

  const getThumbInfoInitialClass = (col, row) => {
    const returnClass = 'thumb-info';
    if (row === 1) {
      return returnClass.concat(' thumb-info-hide-top');
    }
    if (col === 4) {
      return returnClass.concat(' thumb-info-hide-right');
    }
    if (col === 1) {
      return returnClass.concat(' thumb-info-hide-left');
    }
    return returnClass.concat(' thumb-info-hide-top');
  };

  const showThisFilter = (filter) => {
    if (filter.key === 'all' || filter.display !== true) {
      return false;
    }

    if (screenWidth <= SCREEN.SMALL && filter.mobile !== true) {
      return false;
    }

    return true;
  };

  return (
    <div id="portfolio">
      <div className={!seeFilters ? 'portfolio-filters' : 'portfolio-filters filters-shown'}>
        <div className="filters-button armageddon" onClick={handleFiltersToggle}></div>
        <ul className="filters-list armageddon">
          <li className="close-filters" onClick={handleFiltersToggle}></li>
          {DESIGN_FILTERS.map(
            (filter) =>
              showThisFilter(filter) && (
                <li
                  key={filter.key}
                  className={activeFilter === filter.key ? 'active' : ''}
                  onClick={() => handleFilterChange(filter.key)}
                >
                  {filter.title}
                </li>
              ),
          )}
        </ul>
        {!seeFilters && (
          <div className="info-panel-controls">
            <button
              type="button"
              className={`panel-toggle${activePanel === PANEL.WHAT_IS_THIS ? ' active' : ''}`}
              aria-expanded={activePanel === PANEL.WHAT_IS_THIS}
              aria-controls="design-info-panel"
              onClick={() => handlePanelToggle(PANEL.WHAT_IS_THIS)}
            >
              what is this?
            </button>
            <button
              type="button"
              className={`panel-toggle${activePanel === PANEL.RECRUITERS ? ' active' : ''}`}
              aria-expanded={activePanel === PANEL.RECRUITERS}
              aria-controls="recruiters-panel"
              onClick={() => handlePanelToggle(PANEL.RECRUITERS)}
            >
              recruiters
            </button>
          </div>
        )}
      </div>
      <div className={`design-info-panel-wrapper${activePanel ? ' info-panel-shown' : ''}`} aria-hidden={!activePanel}>
        {renderedPanel === PANEL.WHAT_IS_THIS && (
          <section id="design-info-panel" className="design-info-panel" aria-label="About this design portfolio">
            <h2>what is this?</h2>
            <p>
              Things I designed before code gradually took over. Logos and complete visual identities. Websites, apps,
              books, products and a few things that refused to fit a category.
            </p>
            <p>
              Some were client work. Some were done working in agencies. Some I started myself. And yes — since people
              keep asking — logos &amp; identities showcased here are all made by myself (or &quot;refreshed&quot; for
              ZZ).
            </p>
            <p>
              This is an eternal work in progress. Most of twenty years of work is still buried somewhere among 20,000+
              archive files. If you came looking for something specific, ask. I&apos;ll give it to you. Or publish it
              here.
            </p>
            <p>
              For development work, browse{' '}
              <a className="fake-link" onClick={handleGithubClick}>
                github.com/getdagnis
              </a>{' '}
              or get in touch. And try the arrows. Not telling you which arrows. One of them does something it
              shouldn’t.
            </p>
          </section>
        )}
        {renderedPanel === PANEL.RECRUITERS && (
          <section id="recruiters-panel" className="design-info-panel" aria-label="Information for recruiters">
            <h2>recruiters</h2>
            <div className="recruiter-qa">
              <div className="recruiter-question">
                <button
                  type="button"
                  className="recruiter-question-toggle"
                  aria-expanded={Boolean(openRecruiterQuestions.professional)}
                  aria-controls="recruiter-answer-professional"
                  onClick={() => handleRecruiterQuestionToggle('professional')}
                >
                  what are you professionally now?
                </button>
                <div
                  id="recruiter-answer-professional"
                  className={`recruiter-answer${openRecruiterQuestions.professional ? ' open' : ''}`}
                >
                  <p>
                    Senior React / Next.js developer. Technical Product Owner. Full-stack across Node.js, APIs,
                    databases and deployment. Frontend is still where I’m strongest from multiple perspectives.
                  </p>
                </div>
              </div>

              <div className="recruiter-question">
                <button
                  type="button"
                  className="recruiter-question-toggle"
                  aria-expanded={Boolean(openRecruiterQuestions.strongest)}
                  aria-controls="recruiter-answer-strongest"
                  onClick={() => handleRecruiterQuestionToggle('strongest')}
                >
                  what are you specialising at?
                </button>
                <div
                  id="recruiter-answer-strongest"
                  className={`recruiter-answer${openRecruiterQuestions.strongest ? ' open' : ''}`}
                >
                  <p>
                    Complex responsive interfaces. Frontend architecture. Design systems. The point where brand design,
                    product decisions and engineering need to become one job—not three meetings.
                  </p>
                </div>
              </div>

              <div className="recruiter-question">
                <button
                  type="button"
                  className="recruiter-question-toggle"
                  aria-expanded={Boolean(openRecruiterQuestions.proof)}
                  aria-controls="recruiter-answer-proof"
                  onClick={() => handleRecruiterQuestionToggle('proof')}
                >
                  what proves it?
                </button>
                <div
                  id="recruiter-answer-proof"
                  className={`recruiter-answer${openRecruiterQuestions.proof ? ' open' : ''}`}
                >
                  <p>React professionally since 2018. Web as early as early 2000s.</p>
                  <p>
                    Recent work includes security-sensitive platforms, participation in startup builds, maintaining
                    design systems for international enterprise products serving millions, third-party API integrations
                    and AI features. I’m comfortable taking an unclear product idea from design to release. Before code
                    took over: nearly two decades in design, creative direction and helping to launch nationally well
                    known projects.
                  </p>
                </div>
              </div>

              <div className="recruiter-question">
                <button
                  type="button"
                  className="recruiter-question-toggle"
                  aria-expanded={Boolean(openRecruiterQuestions.practice)}
                  aria-controls="recruiter-answer-practice"
                  onClick={() => handleRecruiterQuestionToggle('practice')}
                >
                  can I see that in practice?
                </button>
                <div
                  id="recruiter-answer-practice"
                  className={`recruiter-answer${openRecruiterQuestions.practice ? ' open' : ''}`}
                >
                  <p>
                    You are looking at one example. Some more publically available examples can be found on my Github
                    profile.
                  </p>
                  <p>
                    This site was designed from scratch mainly between 2019–2024. Code and CSS written line by line,
                    initial animation effects (such as the "red walking rectangle") as Vanilla JS. Animations built from
                    scratch. Firebase handles voting. OpenRouter API calls run through Cloudflare Workers.
                  </p>
                  <p>
                    The original Vite + React build predates AI agents (2019–2024). But they make up a large part of my
                    work now: implementation, migrations, testing, debugging and review. I direct the work, inspect the
                    output and own what ships.
                  </p>
                </div>
              </div>
            </div>
            <div className="recruiter-links" aria-label="Recruiter links">
              <a href="/cv-dagnis_skurbe-2026.pdf" download>
                CV
              </a>
              {/* <Link to="/cv">CV (ATS)</Link> */}
              <a href="https://github.com/getdagnis" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/getdagnis" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <Link to="/contact">Quick Connect</Link>
            </div>
          </section>
        )}
      </div>
      <div id="grid-container" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {/* Render grid items */}
        {gridItems.map((item, index) => (
          <Link
            to={`/design/project/${item.key}`}
            key={item.key}
            className={`${item.className} ${isHiding ? 'itemHideAnim armageddon ' : 'armageddon'}`}
            style={{
              backgroundImage: `url(../../thumbs/${item.key}.svg)`,
              animationDelay: `${index / 25 + item.col * 0.05}s`, // Animation delay formula so that each item bounces a bit later
            }}
            data-grid-col={item.col}
            data-grid-row={item.row}
          >
            <div className={getThumbInfoInitialClass(item.col, item.row)}>
              <h3 className="item-title">{item.name}</h3>
              <p className="item-description">{item.title}</p>
              <p className="item-description">{item.work}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DesignPage;
