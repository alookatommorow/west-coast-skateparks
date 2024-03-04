import React from 'react';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

type PhotosProps = {
  photos: string[];
};
export const Photos = ({ photos }: PhotosProps) => {
  const renderItem = (item: ReactImageGalleryItem) => (
    <div className="image-stuff">
      <img className="image-gallery-image" src={item.original} />
    </div>
  );

  const formattedPhotos = photos.map(photo => ({
    original: photo,
    thumbnail: photo,
  }));

  return (
    photos.length > 0 && (
      <ImageGallery items={formattedPhotos} renderItem={renderItem} />
    )
  );
};
