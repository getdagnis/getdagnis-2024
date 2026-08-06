import PropTypes from 'prop-types';

import './ButtonNav.css';

export default function ButtonNav({ children, float = 'right' }) {
  return (
    <div id="button-nav" className={float}>
      {children}
    </div>
  );
}

ButtonNav.propTypes = {
  children: PropTypes.node.isRequired,
  float: PropTypes.string,
};
