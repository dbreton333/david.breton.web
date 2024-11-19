import styles from "./Photo.module.css";

interface photoProps {
    src: string,
    alt: string
}

export const Photo = (props: photoProps) => {
    return (
        <div>
            <div className={styles.photo_frame}>
                <img src={props.src} alt={props.alt} className={styles.img} />
            </div>
        </div>
    );
}