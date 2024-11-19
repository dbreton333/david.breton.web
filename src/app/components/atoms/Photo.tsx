import styles from "./Photo.module.css";
import Image from "next/image";

interface photoProps {
    src: string,
    alt: string
}

export const Photo = (props: photoProps) => {
    return (

        <div className={styles.img}>
            <Image src={props.src} alt={props.alt} fill={true} />
        </div>

    );
}