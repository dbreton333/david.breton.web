'use client'

const images = [
  '/images/aws-logo.png',
  '/images/croesus-logo.png',
  '/images/calgary-logo.png',
  '/images/ets-logo.png',
  '/images/mcgill-logo.png',
  '/images/uLaval-logo.png',
  '/images/genium-logo.png',
];

import styles from './InfiniteCarousel.module.css';

const InfiniteCarousel = () => {
    return (
        <div className={styles.slider}>
            <div className={styles.slide_track}>
                {images.concat(images).concat(images).map((image, index) => (
                    <div className={styles.slide} key={index}>
                        <img src={image} className={styles.logo} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InfiniteCarousel;