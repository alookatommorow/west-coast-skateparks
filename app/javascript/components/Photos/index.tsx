import React from 'react';
import styles from '../../styles/photos.module.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ImageGallery from 'react-image-gallery';

type PhotosProps = {
  photos: string[];
};
export const Photos = ({ photos }: PhotosProps) => {
  const formattedPhotos = photos.map(photo => ({
    original: photo,
    thumbnail: photo,
    // originalClass: styles.root,
  }));
  return photos.length > 0 && <ImageGallery items={formattedPhotos} />;
};
