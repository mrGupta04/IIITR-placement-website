import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/about.module.css';
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaGraduationCap, FaBriefcase, FaUserTie } from 'react-icons/fa';
import Card from '../components/card';
import studentCoordinators from '../data/team/coordinators.js';
import leadershipTeam from '../data/team/leaders.js';

const About = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(`.${styles.fadeIn}`);
      const windowHeight = window.innerHeight;

      elements.forEach((element) => {
        const position = element.getBoundingClientRect().top;
        if (position < windowHeight - 100) {
          element.classList.add(styles.visible);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.aboutHero}>
        <Image
          src="/uploads/IIIT-Raichur-Transit-Campus.jpg"
          alt="IIIT Raichur Campus"
          fill
          priority
          sizes="100vw"
          className={styles.campusImage}
        />
        <div className={styles.heroOverlay}></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroContent}
        >
          <h1>About Our <span className={styles.highlight}>Placement Cell</span></h1>
          <p>Bridging academic excellence with industry success since 2019</p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className={`${styles.missionSection} ${styles.fadeIn}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.missionContent}>
            <h2>Our Strategic Mission</h2>
            <p>
              The Training and Placement Cell serves as the vital link between IIIT Raichur's academic
              programs and corporate India. We've facilitated <strong>500+ placements</strong> with
              leading tech companies through our comprehensive approach.
            </p>
          </div>
          <div className={styles.missionCards}>
            <div className={styles.missionCard}>
              <FaGraduationCap className={styles.missionIcon} />
              <h3>Talent Development</h3>
              <p>200+ hours of annual skill-building workshops</p>
            </div>
            <div className={styles.missionCard}>
              <FaBriefcase className={styles.missionIcon} />
              <h3>Industry Connect</h3>
              <p>50+ corporate partners including Fortune 500</p>
            </div>
            <div className={styles.missionCard}>
              <FaUserTie className={styles.missionIcon} />
              <h3>Career Launch</h3>
              <p>85% placement rate across all programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className={`${styles.missionSection} ${styles.fadeIn} ${styles.leadershipSection}`}>
        <div className={`${styles.sectionContainer} ${styles.missionContent}`}>
          <h2>Leadership Team</h2>

          {leadershipTeam.map((leader) => (
            <div key={leader.id} className={styles.leadershipCard}>
              <div className={styles.leaderImage}>
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={240}
                  height={240}
                  className={styles.portrait}
                />
              </div>

              <div className={styles.leadershipContent}>
                <h3 className={styles.leaderRole}>{leader.position.split('&')[0].trim()}</h3>
                <p className={styles.leadershipQuote}>"{leader.quote}"</p>
                <div className={styles.leaderInfo}>
                  <div className={styles.leaderNamePosition}>
                    <h4>{leader.name}</h4>
                    <p className={styles.leaderPosition}>{leader.position}</p>
                    <div className={styles.contactLinks}>
                      <a
                        href={`mailto:${leader.emailLink}`}
                        className={styles.contactLink}
                        aria-label={`Email ${leader.name}`}
                      >
                        <FaEnvelope />
                      </a>
                      <a
                        href={leader.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactLink}
                        aria-label={`${leader.name}'s LinkedIn profile`}
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href={`https://wa.me/${leader.whatsappLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactLink}
                        aria-label={`WhatsApp ${leader.name}`}
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Coordinators Section */}
      <section className={`${styles.missionSection} ${styles.coordinatorsSection} ${styles.fadeIn}`}>
        <div className={`${styles.sectionContainer} ${styles.missionContent}`}>
          <h2>Student Placement Team</h2>

          <div className={styles.coordinatorsGrid}>
            {studentCoordinators.map((student) => (
              <Card
                key={student.id}
                image={student.image}
                name={student.name}
                position={student.position}
                idno={student.idno}
                branch={student.branch}
                info={student.info}
                small={true}
                linkedinLink={student.linkedinLink}
                whatsappLink={student.whatsappLink}
                emailLink={student.emailLink}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;