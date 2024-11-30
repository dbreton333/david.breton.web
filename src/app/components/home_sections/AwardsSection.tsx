'use client';
import { useEffect, useRef, useState } from "react";
import LinkButton from "../atoms/LinkButton";
import styles from "./AwardsSection.module.css";




interface AnimatedCounterProps {
    targetNumber: number;
    colorClass: string;
}

const AnimatedCounter = ({ targetNumber, colorClass }: AnimatedCounterProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let current = 0;
                    setCount(0); // Reset the count to 0 each time it enters
                    const interval = setInterval(() => {
                        if (current < targetNumber) {
                            setCount(prev => prev + 1);
                            current++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 100); // Adjust speed as needed
                }
            },
            { threshold: 1.0 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [targetNumber]);

    return (
        <h1 ref={ref} className={`${colorClass} font-bold huge`}>
            {count}
        </h1>
    );
};

const AwardsSection = () => {
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h2 className={`${styles.slash} h4 font-sem-bold`}>
                    / &nbsp;
                </h2>
                <h2 className={`h4 font-sem-bold`}>
                    MY AWARDS
                </h2>
            </div>
            <div className={styles.information}>
                <div className={styles.left_content}>
                    <h1 className={`font-bold h2`}>
                        My Competition Career
                    </h1>
                    <p className={`${styles.paragraph} font-light p`}>
                    I encourage any enthusiastic programmer to dive into these competitions, 
                    as I truly believe there’s no better way to prepare for real-life problems 
                    and challenges.
                    </p>
                    <div className={styles.link_button_frame}>
                        <LinkButton href="/awards" text="More about my awards " textSize="h5"/>
                    </div>
                </div>

                <div className={styles.right_content}>
                    <div className={styles.award_count}>
                        <div className={styles.podiums}>
                            <AnimatedCounter targetNumber={6} colorClass={styles.podiums_nbr}/>
                            <p className={`h5`}>
                            &nbsp;&nbsp;Podiums
                            </p>
                        </div>
                        <div className={styles.wins}>
                            <AnimatedCounter targetNumber={3} colorClass={styles.wins_nbr}/>
                            <p className={`h5`}>
                            &nbsp;&nbsp;First Places
                            </p>
                        </div>
                    </div>
                    <p className={`${styles.paragraph} font-light p`}>
                    I&apos;m proud to conclude my competitive programming career with a total of 6 titles, 
                    including podiums at the Computer Science Games,  McGill Engineering Competition, 
                    Quebec Engineering Competition, Canadian Engineering Competition and two at the 
                    Engineering Games.
                    </p>
                    <div className={styles.link_button_frame_hidden}>
                        <LinkButton href="/awards" text="MORE ABOUT MY AWARDS " textSize="h5"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AwardsSection;