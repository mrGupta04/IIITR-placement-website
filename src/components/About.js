import React, { useEffect } from 'react';
import Card from "./Card.js";
import styles from '../styles/about.module.css';

const additionalMembers = [
  { image: "/uploads/coordinator.jpg", name: "David Wilson", position: "Lead Developer", info: "Full-stack developer with expertise in JavaScript.", linkedin: "https://linkedin.com/in/david", email: "david@example.com" },
  { image: "/uploads/coordinator.jpg", name: "Sophia Brown", position: "UX Designer", info: "Designing seamless user experiences.", linkedin: "https://linkedin.com/in/sophia", email: "sophia@example.com" },
  { image: "/uploads/coordinator.jpg", name: "Michael Lee", position: "Data Scientist", info: "Turning data into actionable insights.", linkedin: "https://linkedin.com/in/michael", email: "michael@example.com" },
  { image: "/uploads/coordinator.jpg", name: "Emma Wilson", position: "HR Manager", info: "Managing talent with care and expertise.", linkedin: "https://linkedin.com/in/emma", email: "emma@example.com" },
  { image: "/uploads/coordinator.jpg", name: "Daniel Martinez", position: "DevOps Engineer", info: "Optimizing infrastructure and CI/CD pipelines.", linkedin: "https://linkedin.com/in/daniel", email: "daniel@example.com" },
  { image: "/uploads/coordinator.jpg", name: "Daniel Martinez", position: "DevOps Engineer", info: "Optimizing infrastructure and CI/CD pipelines.", linkedin: "https://linkedin.com/in/daniel", email: "daniel@example.com" },
  { image: "/uploads/coordinator.jpg", name: "Olivia White", position: "QA Engineer", info: "Ensuring software quality and testing automation.", linkedin: "https://linkedin.com/in/olivia", email: "olivia@example.com" },
  { image: "/uploads/coordinator.jpg", name: "James Anderson", position: "Cybersecurity Analyst", info: "Protecting data and network security.", linkedin: "https://linkedin.com/in/james", email: "james@example.com" },
  { image: "/uploads/coordinator.jpg", name: "Grace Thomas", position: "Project Manager", info: "Driving projects from start to success.", linkedin: "https://linkedin.com/in/grace", email: "grace@example.com" }
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

      {/* Invitation Section */}
      <section id="recruiters" className={`${styles.invitationSection} ${styles.fadeIn}`} >
        <div className={styles.invitationContainer}>
          <h2 className={styles.invitationHeading}>An Invitation to Shape the Future of Innovation</h2>
          <p className={styles.invitationMessage}>
            <strong>Dear Industry Leaders and Hiring Partners,</strong>
          </p>
          <p className={styles.invitationMessage}>
            At <strong>IIIT Raichur</strong>, we believe that the <em>future of technology is built today</em>—in the minds of young innovators, problem-solvers, and leaders who will drive tomorrow’s industries.
          </p>
          <p className={styles.invitationMessage}>
            With a <strong>cutting-edge academic system</strong>, crafted under the mentorship of <strong>IIT Hyderabad</strong>, our students immerse themselves in a curriculum that goes beyond textbooks. The <strong>Fractal Academic System</strong> ensures deep conceptual clarity through continuous learning, allowing students to master fundamentals while fostering creativity and adaptability.
          </p>
          <p className={styles.invitationMessage}>
            From <strong>day one</strong>, our students engage in <strong>real-world projects</strong>—tackling industry-relevant challenges in <strong>Machine Learning, Data Science, Software Development, and beyond</strong>. Through <strong>internships at startups and tech giants</strong>, they don’t just learn; they contribute, innovate, and lead.
          </p>
          <p className={styles.invitationMessage}>
            We invite you to <strong>be a part of this journey</strong>—to mentor, collaborate, and recruit the next generation of <strong>industry-ready professionals</strong> who are eager to make an impact.
          </p>
          <p className={styles.invitationMessage}>
            🚀 <strong>Let’s build the future together.</strong>
            💡 <strong>Join us in shaping tomorrow’s pioneers.</strong>
          </p>
          <a href="#contact" className={styles.invitationButton}>Connect With Us</a>
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
              <p>
                <a href="mailto:faculty@example.com" className={styles.contactLink}>
                  <img src="/uploads/email_icon.png" alt="Email" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/linkedin_icon.png" alt="LinkedIn" className={styles.icon} />
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
              <p>
                <a href="mailto:faculty@example.com" className={styles.contactLink}>
                  <img src="/uploads/email_icon.png" alt="Email" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/linkedin_icon.png" alt="LinkedIn" className={styles.icon} />
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
              <p>
                <a href="mailto:faculty@example.com" className={styles.contactLink}>
                  <img src="/uploads/email_icon.png" alt="Email" className={styles.icon} />
                </a>
                <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <img src="/uploads/linkedin_icon.png" alt="LinkedIn" className={styles.icon} />
                </a>
              </p>
            </div>
          </div>
          {/* New Members - 2 Rows of 4 Cards */}
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
