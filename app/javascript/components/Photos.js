import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/photos';
import '../styles/arrows';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  variableWidth: true,
  slidesToScroll: 1,
};


// center mode and variableWidth don't work together

function Photos(props) {
  // const { photos } = props;
  const photos = ['https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/623/original/lake_20forest-01.jpg?1459397429', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/627/original/lake_20forest-05.jpg?1459397434', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/625/original/lake_20forest-03.jpg?1459397432'];

  const openModal = () => {
    alert('hey snoopy')
  }
  return (
    <div id="photo-root" className={styles.root}>
      <Slider {...settings}>
        {photos.map(photo => (
          <div className={styles.outerPhotoContainer}>
            <div className={styles.photoContainer}>
              <img onClick={openModal} className={styles.photo} src={photo} />
            </div>
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default props => <Photos {...props} />
