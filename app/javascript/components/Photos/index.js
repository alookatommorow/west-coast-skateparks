import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import Modal from 'components/Modal';
import useToggle from 'hooks/useToggle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from 'styles/photos.module.scss';
import 'styles/slick.scss';
import { slickSettings } from './utils';
import { MOBILE_WIDTH } from './constants';

function Photos(props) {
  const { photos } = props;
  // const photos = ['https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/808/original/newberg-01.jpg?1459399047', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/809/original/newberg-02.jpg?1459399048', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/810/original/newberg-03.jpg?1459399050', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/811/original/newberg-04.jpg?1459399052', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/812/original/newberg-05.jpg?1459399054', 'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/813/original/newberg-06.jpg?1459399056'];
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > MOBILE_WIDTH);
  const [currentSlide, setCurrentSlide] = useState(0);
  const afterChange = current => setCurrentSlide(current);
  const settings = slickSettings(isDesktop);
  const mainSettings = { ...settings, afterChange };
  const modalSettings = { ...settings, initialSlide: currentSlide };
  const slider = useRef();
  const {
    isShowing: modalIsShowing,
    toggle: toggleModalIsShowing,
  } = useToggle(false);

  useEffect(() => {
    const handleResize = () => {
      if (!isDesktop && window.innerWidth > MOBILE_WIDTH) {
        setIsDesktop(true)
      } else if (isDesktop && window.innerWidth <= MOBILE_WIDTH) {
        setIsDesktop(false)
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div id="photo-root" className={styles.root}>
      <Slider {...mainSettings} ref={slider}>
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
        className={styles.photoModal}
        fullScreenMobile
      >
        <Modal.Body className={styles.modalContentContainer}>
          <div className={styles.modalSlickContainer}>
            <Slider {...modalSettings}>
              {photos.map((photo, index) => (
                <div key={`wcs-modal-photo-${index}`} className={styles.outerPhotoContainer}>
                  <div className={styles.photoContainer}>
                    <img loading="lazy" className={styles.bigPhoto} src={photo} />
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
