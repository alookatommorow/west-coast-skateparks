import React from 'react';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { Photo } from '../../../types';

type PhotosProps = {
  photos: Photo[];
};
export const Photos = ({ photos }: PhotosProps) => {
  const renderItem = (item: ReactImageGalleryItem) => (
    <div className="image-stuff">
      <img className="image-gallery-image" src={item.original} />
    </div>
  );

  const formattedPhotos = photos.map(photo => ({
    original: photo.url,
    thumbnail: photo.url,
  }));

  return (
    photos.length > 0 && (
      <ImageGallery items={formattedPhotos} renderItem={renderItem} />
    )
  );
};
