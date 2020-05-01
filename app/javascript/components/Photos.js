import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Modal from './Modal';

import useToggle from '../hooks/useToggle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/photos.module.scss';
import '../styles/slick.scss';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  variableWidth: true,
  // centerMode: true,
  slidesToScroll: 1,
};

// centerMode and variableWidth don't work together
const bigSettings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Photos(props) {
  // const { photos } = props;
  const photos = ['https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/623/original/lake_20forest-01.jpg?1459397429', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/627/original/lake_20forest-05.jpg?1459397434', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/000/625/original/lake_20forest-03.jpg?1459397432'];

  const {
    isShowing: modalIsShowing,
    toggle: toggleModalIsShowing,
  } = useToggle(false);

  const slider1 = useRef();
  const slider2 = useRef();

  return (
    <div id="photo-root" className={styles.root}>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={`wcs-photo-${index}`} className={styles.outerPhotoContainer}>
            <div className={styles.photoContainer}>
              <img loading="lazy" onClick={toggleModalIsShowing} className={styles.photo} src={photo} />
            </div>
          </div>
        ))}
      </Slider>
      <Modal
        isVisible={modalIsShowing}
        onClose={toggleModalIsShowing}
        height="80%"
        width="80%"
      >
        <Modal.Body className={styles.modalContentContainer}>
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default props => <Photos {...props} />
