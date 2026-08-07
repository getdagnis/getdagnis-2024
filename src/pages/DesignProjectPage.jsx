import { memo, useEffect, useCallback, useState, useMemo } from 'react';
import { Link, ScrollRestoration, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import ImageModal from '../components/ImageModal';
import PropTypes from 'prop-types';

import DesignProjectsList from '../components/DesignProjectsList';
import ProjectReactions from '../components/ProjectReactions';
import ArchiveProjectPlaceholder from '../components/ArchiveProjectPlaceholder';
import ButtonNextProject from '../components-ui/ButtonNextProject';

import PROJECTS from '../constants/projects.json';
import './DesignProjectPage.css';

function DesignProjectPage() {
  const { key: projectKey } = useParams();
  const proj = PROJECTS.find((obj) => obj.key === projectKey);
  const isArchiveProject = Boolean(proj && proj.images.length === 0);
  const isMobile = useMemo(() => window.innerWidth < 768, []);
  const [modalImage, setModalImage] = useState(null);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const openModal = (imageSrc) => {
    setDisableAnimations(true);
    setModalImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = useCallback(() => {
    document.body.style.overflow = 'auto';
    setModalImage(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && closeModal();
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  useEffect(() => {
    const seenProjects = JSON.parse(sessionStorage.getItem('seenprojects')) || [];
    if (!seenProjects.includes(projectKey)) {
      const updatedProjects = [...seenProjects, projectKey];
      sessionStorage.setItem('seenprojects', JSON.stringify(updatedProjects));
    }
  }, [projectKey]);
  useEffect(() => {
    const handleMouseEnter = () => {
      const containers = document.querySelectorAll('.img-container');
      containers.forEach((container) => {
        container.classList.remove('hide-color');
      });
    };

    const containers = document.querySelectorAll('.img-container');
    containers.forEach((container) => {
      container.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      containers.forEach((container) => {
        container.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, []);

  // Calculates the necessary number of grid rows, including double row/size images
  const totalRowSpan = useMemo(() => {
    return proj.images.reduce((sum, image) => sum + (Math.pow(image.rowSpan, 2) || 0), 0);
  }, [proj.images]);

  const gridRows = useMemo(() => {
    if (totalRowSpan === 0) return 0;
    if (isMobile) return proj.images.length;
    return totalRowSpan % 2 === 1 ? (totalRowSpan + 1) / 2 : totalRowSpan / 2;
  }, [proj.images, totalRowSpan, isMobile]);

  useEffect(() => {
    if (proj.images.length > 0) {
      const gridElement = document.getElementById('project-grid');
      if (gridElement) {
        gridElement.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;
      }
    }
  }, [gridRows, proj.images.length]);

  const ImageContainer = memo(({ image, projectKey, index, colSpan, rowSpan, onImageClick, disableAnimations }) => {
    ImageContainer.displayName = 'ImageContainer';

    ImageContainer.propTypes = {
      image: PropTypes.shape({
        src: PropTypes.string.isRequired,
      }).isRequired,
      projectKey: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      colSpan: PropTypes.number.isRequired,
      rowSpan: PropTypes.number.isRequired,
      onImageClick: PropTypes.func,
      disableAnimations: PropTypes.bool,
    };

    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView && !hasAnimated) {
        setHasAnimated(true);
      }
    }, [inView]);

    const handleClick = () => {
      const imageSrc = `../../proj-img/${projectKey}/${image.src}`;
      setDisableAnimations(true);
      if (onImageClick) {
        onImageClick(imageSrc);
      }
    };

    return (
      <div
        key={index}
        id={`img-${index + 1}`}
        ref={ref}
        className={`img-container ${inView ? 'in-view' : 'was-viewed'} ${!disableAnimations ? 'animate' : ''}`}
        style={{
          background: `url(../../proj-img/${projectKey}/${image.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animationDelay: `${index % 2 === 1 ? 0.75 : 0.25}s`,
          gridColumn: `span ${colSpan}`,
          gridRow: `span ${rowSpan}`,
        }}
        onClick={handleClick}
      />
    );
  });

  const navigateTo = (direction) => {
    const currentIndex = PROJECTS.findIndex((obj) => obj.key === projectKey);
    const newIndex =
      direction === 'previous'
        ? (currentIndex - 1 + PROJECTS.length) % PROJECTS.length
        : (currentIndex + 1) % PROJECTS.length;
    return `/design/project/${PROJECTS[newIndex].key}`;
  };

  return (
    <div id="project-container">
      <div id="project-details">
        <div className="proj-head">
          <Link to={`/design`}>
            <div className="proj-title armageddon">
              <h3>
                <div className="back-arrow-container armageddon">
                  <span className="back-arrow"></span>
                </div>
                {proj.name}
              </h3>
            </div>
          </Link>
          <h6>
            {proj.title}
            <span className="title-divider">/</span>
            {proj.work}
          </h6>
        </div>
        <div className={`title-image armageddon${isArchiveProject ? ' archive-title-image' : ''}`}>
          {isArchiveProject ? (
            <div className="archive-hero-placeholder">
              <img src={`/thumbs/${proj.key}.svg`} alt={proj.name} className="archive-logo" />
            </div>
          ) : (
            <img src={`../../proj-img/${proj.key}/${proj.mainImage}`} alt={proj.name} className="main-img" />
          )}
          {isArchiveProject ? (
            <ArchiveProjectPlaceholder
              key={proj.key}
              projectKey={proj.key}
              projectName={proj.name}
              logoSrc={`/thumbs/${proj.key}.svg`}
            />
          ) : (
            <div className="description">
              <div className="description-logo">
                <img src={`/thumbs/${proj.key}.svg`} alt="" aria-hidden="true" />
              </div>
              <div className="description-copy">
                <p>{proj.description}</p>
                {proj.site && (
                  <p>
                    Website:{' '}
                    <span>
                      <a href={`http://${proj.site}`} target="_blank" rel="noreferrer">
                        {proj.site}
                      </a>
                    </span>
                  </p>
                )}
                <p>
                  Year: <span>{proj.year}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isArchiveProject && <div id="project-grid" className={`project-grid${proj.grid ? proj.grid : '1'}`}>
        {proj.images.map((image, index) => (
          <ImageContainer
            image={image}
            projectKey={proj.key}
            index={index}
            key={index}
            colSpan={image.colSpan}
            rowSpan={image.rowSpan}
            onImageClick={openModal}
            disableAnimations={disableAnimations}
          />
        ))}
      </div>}
      <ScrollRestoration />
      <div id="previous-next">
        <div id="previous-next">
          <Link className="previous-button" to={navigateTo('previous')}>
            <ButtonNextProject side="left">Previous</ButtonNextProject>
          </Link>
          <Link className="next-button" to={navigateTo('next')}>
            <ButtonNextProject side="right">Next</ButtonNextProject>
          </Link>
        </div>
      </div>
      {!isArchiveProject && <ProjectReactions projectKey={projectKey} />}
      <div className="project-divider"></div>
      <DesignProjectsList currentProject={projectKey} />
      {modalImage && <ImageModal imageSrc={modalImage} onClose={closeModal} />}
    </div>
  );
}

export default DesignProjectPage;
