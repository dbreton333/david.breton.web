'use client'
import styles from "../page.module.css";
import portfolioStyles from "./portfolio.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Reveal } from "../components/atoms/Reveal";
import { ProjectRow } from "../components/molecules/ProjectRow";
import { projects } from "../data/projects";

export default function Portfolio() {
  return (
    <div className={styles.main}>
      <div className={`${styles.container} ${styles.light}`}>
        <NavBar/>
        <div className={portfolioStyles.intro}>
          <Reveal>
            <h1 className={`${portfolioStyles.title} h1 font-semibold`}>
              A working list of things I&apos;ve built.
            </h1>
            <p className={`${portfolioStyles.paragraph} p font-light`}>
              Side projects, competitions, and experiments &mdash; each one grew out of a
              problem I wanted to actually solve, not just a demo.
            </p>
          </Reveal>
        </div>

        <div className={portfolioStyles.list}>
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <ProjectRow project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
