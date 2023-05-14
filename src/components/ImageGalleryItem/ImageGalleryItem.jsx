import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ smallImage, largeImage, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => { 
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={css.galleryItem} onClick={toggleModal}>
        <img src={smallImage} alt={tags} data-large={largeImage}/>
      </li>

      {showModal && (
        <Modal url={largeImage} alt={tags} onClose={toggleModal} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;