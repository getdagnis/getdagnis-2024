import { NavLink } from 'react-router-dom';

import DesignPage from './DesignPage';
import './WipPage.css';

function WipPage() {
  return (
    <>
      <DesignPage />
      <div className="wip">
        <div className="wip-message">
          <h1 className="modal-extra-h1">WORK IN PROGRESS</h1>
          Estimated time of completion: beyond human comprehension. <br />
          FE built with Vite + React before AI agents. <br />
          What little BE there is: Firebase for voting. Cloudeflare for API workers.
          <br />
          Hand designed. Line-by-line hand written code/CSS. Hand animated. <br />
          Mainly missing: actually collecting the works for the projects through 20k archived files.
          <br />
          And yes: the logos/identities featured here that you'll see in a moment are designed by me.
          <br />
          For dev projects: browse through small public ones on <span>github.com/getdagnis</span> or get in touch.
          <br />
          Completely not a complete list. Could never be. Ask for more.
          <br />
          Oh, and there's an Easter Egg hidden if you try playing around with one of the arrows.
          <br />
          <div className="wip-buttons">
            <NavLink className="modal-button" to="/redirect/design">
              OK
            </NavLink>
            <NavLink className="modal-button" to="/redirect/design">
              PERFECT!
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default WipPage;
