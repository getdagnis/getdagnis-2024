import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PROJECTS from '../constants/projects.json';
import './DesignProjectsList.css';

function DesignProjectsList({ currentProject }) {
  const seenProjects = JSON.parse(sessionStorage.getItem('seenprojects')) || [];
  const projects = PROJECTS.filter((project) => !seenProjects.includes(project.key) && project.key !== currentProject);

  return (
    <div id="project-list">
      <div id="project-list-container">
        {projects.map(
          (item) =>
            item.show === true && (
              <Link
                to={`/design/project/${item.key}`}
                key={item.key}
                className="grid-item"
                style={{
                  backgroundImage: `url(../../thumbs/${item.key}.svg)`,
                }}
                data-grid-col={item.col}
                data-grid-row={item.row}
              >
                <div className="thumb-info thumb-info-hide-top">
                  <h3>{item.name}</h3>
                  <p>{item.title}</p>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default DesignProjectsList;

DesignProjectsList.propTypes = {
  currentProject: PropTypes.string.isRequired,
};
