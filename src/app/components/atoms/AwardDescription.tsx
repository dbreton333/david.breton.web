import styles from './AwardDescription.module.css';
import { Reveal } from '../atoms/Reveal';

interface awardProps {
    position: number,
    title: string,
    description: string
}

const ORDINALS: Record<number, string> = {
    1: '1st place',
    2: '2nd place',
    3: '3rd place',
};

export const AwardDescription = ({ position, title, description }: awardProps) => {
    return (
        <Reveal className={styles.award_frame}>
            <span className={`${styles.badge} sub font-medium`}>
                {ORDINALS[position] ?? `${position}th place`}
            </span>
            <h1 className={`${styles.title} h3 font-semibold`}>{title}</h1>
            <p className={`${styles.paragraph} p font-light`}>{description}</p>
        </Reveal>
    );
};
