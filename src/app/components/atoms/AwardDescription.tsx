import styles from './AwardDescription.module.css'

interface awardProps {
    position: number,
    title: string,
    description: string

}

export const AwardDescription = (props: awardProps) => {

    const first = props.position==1
    return (
        <div className={styles.award_frame}>
            <div className={styles.section_devider}/>
            <h1 className={first?styles.first_position:styles.second_position}>{first?"1ST PLACE":"2ND PLACE"}</h1>
            <h1 className={styles.title}>{props.title}</h1>
            <p className={styles.paragraph}>{props.description}</p>
        </div>
    )
}