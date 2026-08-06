import './ButtonNav.css';

export default function ButtonNav({ children, float = 'right' }) {
  return (
    <div id="button-nav" className={float}>
      {children}
    </div>
  );
}
