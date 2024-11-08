import styles from './Header.module.css';

interface HeaderProps {
    header: string,
    sub_header: string
    hidden?: boolean
}

const Header = (props: HeaderProps) => {
    return (
        <div className={styles.header_content}>
            <div className={styles.header}>
                <h2 className={`${styles.slash} h4 font-sem-bold`}>
                    / &nbsp;
                </h2>
                <h2 className={`h4 font-sem-bold`}>
                    {props.header}
                </h2>
            </div>
            <div className={styles.sub_header}>
                <h2 className={`h2 font-sem-bold`}>
                    {props.sub_header}
                </h2>
            </div>
            <div className={`${styles.devider} ${props.hidden?styles.hidden:""}`}/>
        </div>
    );
}

export default Header;
