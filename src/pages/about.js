import React, { useEffect } from 'react';
import Card from "../components/Card";
import styles from '../styles/about.module.css';

const additionalMembers = [
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "David Wilson", idno: "CS22B1000", branch: "CSE Branch", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
];

const About = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(`.${styles.fadeIn}`);
      const windowHeight = window.innerHeight;

      elements.forEach((element) => {
        const position = element.getBoundingClientRect().top;

        if (position < windowHeight - 100 && position > 0) {
          element.classList.add(styles.visible);
        } else if (position > windowHeight - 50) {
          element.classList.remove(styles.visible);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {/* Parallax Hero Section */}
      <section className={`${styles.heroSection} ${styles.parallax}`}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>About the TNP Cell</h1>
          <p className={styles.heroSubheading}>
            Bridging the gap between academic excellence and career success.
          </p>
          <div className={styles.heroButtons}>
            <a href="#recruiters" className={styles.heroButton}>Message for Recruiters</a>
            <a href="#placement-team" className={styles.heroButton}>Training & Placement Team</a>
            <a href="/contact" className={styles.heroButton}>Contact Us</a>
          </div>
        </div>
      </section>

      {/* About Section with Smooth Scroll Effect */}
      <section className={`${styles.aboutSection} ${styles.fadeIn}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.aboutHeading}>The Role of the TNP Cell</h2>
          <p className={styles.aboutParagraph}>
            The Training and Placement (TNP) Cell at our institution plays a pivotal role in ensuring that students have access to career opportunities in various industries. We act as the bridge between academic education and professional employment.
          </p>
          <p className={styles.aboutParagraph}>
            Our cell is dedicated to preparing students for real-world challenges. Through consistent interaction with leading companies, we provide a platform where students can meet recruiters and showcase their skills.
          </p>

          <h3 className={styles.subHeading}>What We Do</h3>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>Organize recruitment drives with top-tier companies.</li>
            <li className={styles.featureItem}>Conduct training workshops to develop industry-relevant skills.</li>
            <li className={styles.featureItem}>Provide career counseling and guidance to students.</li>
            <li className={styles.featureItem}>Offer mock interviews and resume building sessions.</li>
          </ul>
        </div>
      </section>


      {/* Meet the Team Section */}
      <section id="placement-team" className={`${styles.teamSection} ${styles.fadeIn}`}>
        <h2 className={styles.subHeading}>Meet the Placement Team</h2>
        <div className={styles.teamContainer}>
          {/* Placement Faculty */}
          <div className={`${styles.teamCard} ${styles.reverseCard}`}>
            <img src="/uploads/faculty.jpg" alt="Placement Faculty" className={styles.teamImage} />
            <div className={styles.teamText}>
              <h3>Placement Faculty</h3>
              <p>“Steering students towards a successful future by bridging the gap between academic learning and industry demands.”</p>
              <p><strong>Dr. Jhanvi Tiwari</strong><br />Professor & Placement FIC</p>
              <p className={styles.iconlink}>
                <a href="mailto:faculty@example.com" className={styles.contactLink}>
                  <img src="/uploads/email_icon.png" alt="Email" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/linkedin.png" alt="LinkedIn" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/whatsapp.png" alt="LinkedIn" className={styles.icon} />
                </a>
              </p>
            </div>
          </div>

          {/* Placement Officer */}
          <div className={`${styles.teamCard} ${styles.placementOfficerCard}`}>
            <div className={styles.teamText}>
              <h3>Placement Officer</h3>
              <p>“Dedicated to providing students with the best career opportunities.”</p>
              <p><strong>Mr. </strong><br />Training & Placement Officer</p>
              <p className={styles.iconlink}>
                <a href="mailto:faculty@example.com" className={styles.contactLink}>
                  <img src="/uploads/email_icon.png" alt="Email" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/linkedin.png" alt="LinkedIn" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/whatsapp.png" alt="LinkedIn" className={styles.icon} />
                </a>
              </p>
            </div>
            <img src="/uploads/officer.jpg" alt="Placement Officer" className={styles.teamImage} />
          </div>

          {/* Placement Coordinator */}
          <div className={`${styles.teamCard} ${styles.reverseCard}`}>
            <img src="/uploads/coordinator.jpg" alt="Placement Coordinator" className={styles.teamImage} />
            <div className={styles.teamText}>
              <h3>Placement Coordinator</h3>
              <p>“Fostering a seamless connection between students and recruiters.”</p>
              <p><strong>Ms. </strong><br />Student & Training - Placement Coordinator</p>
              <p className={styles.iconlink}>
                <a href="mailto:faculty@example.com" className={styles.contactLink}>
                  <img src="/uploads/email_icon.png" alt="Email" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/linkedin.png" alt="LinkedIn" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/whatsapp.png" alt="LinkedIn" className={styles.icon} />
                </a>
              </p>
            </div>
          </div>

        </div>
        {/* New Members - 2 Rows of 4 Cards */}
        <div className={styles.cteamContainer}>
          <div className={styles.additionalGrid}>
            {additionalMembers.map((member, index) => (
              <Card key={index} {...member} small />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;