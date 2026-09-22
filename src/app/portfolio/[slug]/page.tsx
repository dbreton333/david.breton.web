'use client'
import { notFound, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from '../../page.module.css';
import detailStyles from './project.module.css';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Reveal } from '../../components/atoms/Reveal';
import { getProjectBySlug } from '../../data/projects';
import { GameRules } from '../../components/colosseum/GameRules';

const ColosseumGame = dynamic(
  () => import('../../components/colosseum/ColosseumGame').then((mod) => ({ default: mod.ColosseumGame })),
  {
    ssr: false,
    loading: () => <div className={detailStyles.gameLoading}>Loading Colosseum Survival&hellip;</div>,
  }
);

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.main}>
      <div className={`${styles.container} ${styles.dark}`}>
        <NavBar/>

        <Reveal className={detailStyles.header}>
          <Link href="/portfolio" className={`${detailStyles.back} sub`}>&larr; Portfolio</Link>
          <div className={detailStyles.meta_row}>
            <span className="sub">{project.role}</span>
            <span className="sub">{project.stack}</span>
            <span className="sub">{project.year}</span>
          </div>
          <h1 className={`${detailStyles.title} h1 font-semibold`}>{project.name}</h1>
        </Reveal>

        <Reveal delay={100} className={detailStyles.description}>
          {project.description.map((paragraph, i) => (
            <p key={i} className="p font-light">{paragraph}</p>
          ))}
          {(project.liveHref || project.codeHref) && (
            <div className={detailStyles.links}>
              {project.liveHref && (
                <a className={`${detailStyles.link} h5 font-semibold`} href={project.liveHref}>View live &rarr;</a>
              )}
              {project.codeHref && (
                <a className={`${detailStyles.link} h5 font-semibold`} href={project.codeHref}>Source &rarr;</a>
              )}
            </div>
          )}
        </Reveal>
      </div>

      {project.slug === 'colosseum-survival' && (
        <>
          <div className={`${styles.container} ${styles.dark} ${detailStyles.gameSection}`}>
            <ColosseumGame/>
          </div>
          <div className={`${styles.section} ${styles.light}`}>
            <GameRules/>
          </div>
        </>
      )}

      <Footer/>
    </div>
  );
}
