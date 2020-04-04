import React, { useState } from 'react';
import Slider from 'react-slick';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';

import useToggle from '../hooks/useToggle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/photos.module.scss';
import '../styles/arrows.scss';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  variableWidth: true,
  // centerMode: true,
  slidesToScroll: 1,
};

const bigSettings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// centerMode and variableWidth don't work together

function Photos(props) {
  // const { photos } = props;
  const photos = ['https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/623/original/lake_20forest-01.jpg?1459397429', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/627/original/lake_20forest-05.jpg?1459397434', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/625/original/lake_20forest-03.jpg?1459397432'];

  console.log(photos)

  const {
    isShowing: modalIsShowing,
    toggle: toggleModalIsShowing,
  } = useToggle(false);

  return (
    <div id="photo-root" className={styles.root}>
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <div key={`wcs-photo-${index}`} className={styles.outerPhotoContainer}>
              <div className={styles.photoContainer}>
                <img onClick={toggleModalIsShowing} className={styles.photo} src={photo} />
              </div>
            </div>
          ))}
        </Slider>

      <Rodal
        visible={modalIsShowing}
        onClose={toggleModalIsShowing}
        width={90}
        height={80}
        measure="%"
        enterAnimation="zoom"
        exitAnimation="zoom"
      >
        <div className={styles.modalSlickContainer}>
          <Slider {...bigSettings}>
            {photos.map((photo, index) => (
              <div key={`wcs-modal-photo-${index}`} className={styles.outerPhotoContainer}>
                <div className={styles.photoContainer}>
                  <img className={styles.bigPhoto} src={photo} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Rodal>
    </div>
  );
};

export default props => <Photos {...props} />
