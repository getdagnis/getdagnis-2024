import DesignPage from './DesignPage';
import './WipPage.css';

function WipPage() {
  return (
    <>
      <DesignPage />
      <div className="wip">
        <div className="wip-message">
          <h1 className="modal-extra-h1">WORK IN PROGRESS</h1>
          <ul className="wip-ul">
            ⇝ Estimated completion: beyond human comprehension.
            <br />
            ⇝ A must have disclaimer these days: the front end was built with Vite and React—before AI agents
            (2019–2024).
            <br />
            ⇝ What little back end there is uses Firebase for voting and Cloudflare Workers for API requests.
            <br />
            ⇝ Designed by hand. Code and CSS written line by line. Animations built from scratch.
            <br />
            ⇝ What’s mainly missing? Finding and collecting the relevant work from more than 20,000 archived files made
            over a span of 20+ years. Never gonna happen.
            <br />
            ⇝ And yes—the logos and visual identities you’re about to see were designed by me.
            <br />⇝ For development work, browse a few smaller public projects at <span>github.com/getdagnis</span>, or
            get in touch.
            <br />
            ⇝ This is not a complete list. It could never be. Ask for more.
            <br />
            ⇝ Oh, and there’s an Easter egg hidden somewhere. Try playing around with one of the arrows.
            <br />
          </ul>
          <div className="wip-buttons">
            <a className="modal-button" href="/redirect/design">
              OK
            </a>
            <a className="modal-button" href="/redirect/design">
              PERFECT!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default WipPage;
