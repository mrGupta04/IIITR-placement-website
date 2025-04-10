import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/about.module.css';
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaGraduationCap, FaBriefcase, FaUserTie } from 'react-icons/fa';
import Card from '../components/card';

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

  const studentCoordinators = [
    {
      id: 1,
      image: "/uploads/faculty.jpg",
      name: "Aarav Sharma",
      position: "Placement Coordinator",
      idno: "IIITR2021001",
      branch: "CSE",
      info: "Specialized in AI/ML placements"
    },
    {
      id: 2,
      image: "/uploads/student2.jpg",
      name: "Priya Patel",
      position: "Corporate Relations",
      idno: "IIITR2021002",
      branch: "ECE",
      info: "Manages 30+ company partnerships"
    },
    {
      id: 3,
      image: "/uploads/student3.jpg",
      name: "Rahul Verma",
      position: "Training Head",
      idno: "IIITR2021003",
      branch: "EEE",
      info: "Conducts technical workshops"
    },
    {
      id: 4,
      image: "/uploads/student4.jpg",
      name: "Neha Gupta",
      position: "HR Coordinator",
      idno: "IIITR2021004",
      branch: "CSE",
      info: "Handles student communications"
    },
    {
      id: 5,
      image: "/uploads/student5.jpg",
      name: "Vikram Singh",
      position: "Tech Coordinator",
      idno: "IIITR2021005",
      branch: "ECE",
      info: "Manages coding test platforms"
    },
    {
      id: 6,
      image: "/uploads/student6.jpg",
      name: "Ananya Joshi",
      position: "Documentation Head",
      idno: "IIITR2021006",
      branch: "CSE",
      info: "Maintains placement records"
    },
    {
      id: 7,
      image: "/uploads/student7.jpg",
      name: "Karan Malhotra",
      position: "Event Manager",
      idno: "IIITR2021007",
      branch: "ME",
      info: "Organizes recruitment drives"
    },
    {
      id: 8,
      image: "/uploads/student8.jpg",
      name: "Divya Reddy",
      position: "Alumni Relations",
      idno: "IIITR2021008",
      branch: "CSE",
      info: "Connects with placed graduates"
    }
  ];

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
          <p>Bridging academic excellence with industry success since 2016</p>
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

          {/* Placement Faculty */}
          <div className={styles.leadershipCard}>
            <div className={styles.leadershipContent}>
              <h3 className={styles.leadershipTitle}>Placement Faculty</h3>
              <p className={styles.leadershipQuote}>
                "Steering students towards a successful future by bridging the gap between academic learning and industry demands."
              </p>
              <div className={styles.leaderInfo}>
                <h3 className={styles.leaderName}>Dr. Jhanvi Tiwari</h3>
                <p className={styles.leaderPosition}>Professor & Placement FIC</p>
              </div>
            </div>
            <div className={styles.leaderImage}>
              <Image
                src="/uploads/faculty.jpg"
                alt="Dr. Jhanvi Tiwari"
                width={200}
                height={200}
                className={styles.portrait}
              />
            </div>
          </div>

          {/* Placement Officer - Rajesh */}
          <div className={styles.leadershipCard}>
            <div className={styles.leadershipContent}>
              <h3 className={styles.leadershipTitle}>Placement Officer</h3>
              <p className={styles.leadershipQuote}>
                "Dedicated to providing students with the best career opportunities."
              </p>
              <div className={styles.leaderInfo}>
                <h3 className={styles.leaderName}>Mr. Rajesh Kumar</h3>
                <p className={styles.leaderPosition}>Training & Placement Officer</p>
              </div>
            </div>
            <div className={styles.leaderImage}>
              <Image
                src="/uploads/officer.jpg"
                alt="Mr. Rajesh Kumar"
                width={200}
                height={200}
                className={styles.portrait}
              />
            </div>
          </div>

          {/* Placement Officer - Anjali */}
          <div className={styles.leadershipCard}>
            <div className={styles.leadershipContent}>
              <h3 className={styles.leadershipTitle}>Placement Officer</h3>
              <p className={styles.leadershipQuote}>
                "Ensuring smooth coordination between students and recruiters."
              </p>
              <div className={styles.leaderInfo}>
                <h3 className={styles.leaderName}>Ms. Anjali Mehta</h3>
                <p className={styles.leaderPosition}>Training & Placement Officer</p>
              </div>
            </div>
            <div className={styles.leaderImage}>
              <Image
                src="/uploads/officer2.jpg"
                alt="Ms. Anjali Mehta"
                width={200}
                height={200}
                className={styles.portrait}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Student Coordinators Section */}
      <section className={`${styles.missionSection} ${styles.coordinatorsSection} ${styles.fadeIn}`}>
        <div className={`${styles.sectionContainer} ${styles.missionContent}`}>
          <h2>Student Placement Team</h2>
        </div>
      </section>

      <section className={`${styles.coordinatorsSection} ${styles.fadeIn}`}>
        <div className={styles.sectionContainer}>
          <h2>Student Placement Champions</h2>
          <p className={styles.sectionSubtitle}>Dedicated students facilitating campus recruitment</p>

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
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
