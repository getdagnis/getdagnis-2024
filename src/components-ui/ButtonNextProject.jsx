import './ButtonNextProject.css';

export default function ButtonNextProject({ children, onClick, side = 'right' }) {
  return (
    <button id="button-next" className={side} onClick={onClick}>
      {side === 'left' && <div className="arrow">&lt;</div>}
      {children}
      {side === 'right' && <div className="arrow">&gt;</div>}
    </button>
  );
}
