import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import useToggle from 'hooks/useToggle';
import styles from 'styles/photos.module.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ImageGallery from 'react-image-gallery';
// uncomment below line to use example photos in dev
// import { DEV_PHOTOS as photos } from './constants';


function Photos(props) {
  // comment out below line to use example photos in dev
  const { photos } = props;

  const formattedPhotos = photos.map(photo => ({
    original: photo,
    thumbnail: photo,
    originalClass: styles.photo,
  }));

  return photos.length > 0 && (
    <ImageGallery additionalClass={styles.root} items={formattedPhotos} />
  );
};

export default props => <Photos {...props} />
