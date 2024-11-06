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

import styles from './CarouselSection.module.css';
const CarouselSection = () => {
    return (
    <div className={styles.slider}>
    <div className={styles.slide_track}>
        <div className={styles.slide}>
        <img src={images[0]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[1]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[2]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[3]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[4]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[5]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[6]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[0]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[1]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[2]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[3]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[4]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[5]} className={styles.logo} alt="" />
        </div>
        <div className={styles.slide}>
        <img src={images[6]} className={styles.logo} alt="" />
        </div>
    </div>
    </div>
    )
}

export default CarouselSection;