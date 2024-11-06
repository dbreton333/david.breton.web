'use client'
import { useState, useEffect, useMemo } from 'react';
import compStyles from './components.module.css';
import styles from './IntroductionSection.module.css';
import Image from 'next/image';
import LinkButton from './atoms/LinkButton';

const useTypewriter = (text: string, speed = 20, postEffect: any) => {
  const [index, setIndex] = useState(0);
  const displayText = useMemo(() => text.slice(0, index), [index]);
  useEffect(() => {
    if (index >= text.length){
      postEffect(true);
      return;
    }
      
    const timeoutId = setTimeout(() => {
      setIndex(i => i + 1);
    }, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, text, speed]);

  return displayText;
};

const Introduction = () => {
    const [showParagraph, setShowParagraph] = useState(false);
    const myname = useTypewriter("David Breton", 100, setShowParagraph);

    
    return (
        <div className={styles.content}>

          <div className={`${styles.left_content}`}>
            <div className={styles.section_devider}/>
            <h1 className={`${styles.title} font-bold h1`}>
              Nice to meet you, <br/>
              I'm <span>{myname}</span>
            </h1>
            <p className={`${showParagraph ? styles.fade_in :styles.hide }  ${styles.paragraph} font-light h6`}>
              As a dynamic Computer Engineer with a strong  background in computer science competitions 
              active committee  involvement, and a diverse portfolio of software projects, 
              I've honed my skills as a proficient problem solver, full-stack developer, and  
              effective leader.
            </p>
            <div className={`${showParagraph ? styles.fade_in :styles.hide } ${styles.link_button_frame}`}>
              <LinkButton href="/about" text="Learn more about me" textSize='h6' arrowSize={20}/>
            </div>
            <div className={ `${showParagraph ? styles.fade_in :styles.hide } ${styles.devider}`}/>
            <h1 className={`${showParagraph ? styles.fade_in :styles.hide } ${styles.paragraph} font-bold h7`}>
              FOLLOW ME
            </h1>
            <div className={` ${showParagraph ? styles.fade_in :styles.hide } ${styles.social_media}`}>
                    <Image
                        src="/icons/linkedin.svg"
                        alt="LinkedIn"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                    <Image
                        src="/icons/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                    <Image
                        src="/icons/instagram.svg"
                        alt="Instagram"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                </div>
          </div>

          <div className={styles.right_content}>
            <div className={styles.image_content}>
              <Image src="/images/my_image.png" alt="David Breton" fill={true}/>
            </div>
          </div>
        </div>
    );
}

export default Introduction;
