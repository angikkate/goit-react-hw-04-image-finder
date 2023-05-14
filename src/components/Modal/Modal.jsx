import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, alt, onClose }) => {
  //console.log(url);
  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyEsc);
  // }, []);
  
  // useEffect(() => {
  //   window.removeEventListener('keydown', handleKeyEsc);
  // }, []);

  useEffect(() => {
    const handleKeyDown = e => { console.log(e.code);
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClickBackdrop = e => { console.log(e.code);
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleClickBackdrop}>
      <div className={css.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;