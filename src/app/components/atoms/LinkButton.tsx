import Link from "next/link";
import styles from "./LinkButton.module.css";

interface LinkButtonProps {
    href: string;
    text: string;
    textSize: string;
    arrowSize: number;
}

const LinkButton = (props: LinkButtonProps) => {
    return (
        <Link href={props.href}>
            <div className={styles.link_button}>
                <div className={styles.direction}>
                    <h1 className={`${props.textSize} font-semibold`}>
                        {props.text}
                    </h1>
                    <img
                        src="/icons/arrow_right.svg"
                        alt="Arrow"
                        width={props.arrowSize}
                        height={props.arrowSize}
                        className = {styles.arrow}
                    />
                </div>
                <div className={styles.underline}/>
            </div>
        </Link>
    );
}

export default LinkButton;
