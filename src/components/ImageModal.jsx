function ImageModal({ imageSrc, onClose }) {
  const position = { x: 0, y: 0 };
  const isMobile = window.innerWidth < 1024;

  return (
    <div
      className="image-modal"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: `calc(50% + ${position.y}px)`,
        left: `calc(50% + ${position.x}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
      }}
    >
      <img
        src={imageSrc}
        alt="Full size"
        style={{
          width: isMobile ? '200%' : '80%',
          height: 'auto',
          maxWidth: isMobile ? '300vw' : '80vw',
          maxHeight: isMobile ? '200vh' : '80vh',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

export default ImageModal;
