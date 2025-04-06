import React, { useEffect } from 'react';
import styles from "../styles/Recruiters.module.css";

const Recruiters = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.section, .invitationMessage, .invitationButton');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.recruitersContainer}>
      {/* Invitation Section */}
      <section id="recruiters" className={`${styles.invitationSection} ${styles.fadeIn}`}>
        <div className={styles.invitationContainer}>
          <h2 className={styles.invitationHeading}>An Invitation to Shape the Future of Innovation</h2>

          <p className={styles.invitationMessage}>
            <strong>Dear Industry Leaders and Hiring Partners,</strong>
          </p>

          <p className={styles.invitationMessage}>
            At <strong>IIIT Raichur</strong>, we believe that the <em>future of technology is built today</em>—in the minds of young innovators, problem-solvers, and leaders who will drive tomorrow’s industries.
          </p>
          <p className={styles.invitationMessage}><strong>Why IIIT Raichur?</strong></p>
          <p className={styles.invitationMessage}>
            With a <strong>cutting-edge academic system</strong>, crafted under the mentorship of <strong>IIT Hyderabad</strong>, our students immerse themselves in a curriculum that goes beyond textbooks. The <strong>Fractal Academic System</strong> ensures deep conceptual clarity through continuous learning, allowing students to master fundamentals. From day one, our students engage in <strong>real-world projects</strong>—tackling industry-relevant challenges. Through <strong>internships at startups and tech giants</strong>, they don’t just learn; they contribute, innovate, and lead.
          </p>

          <p className={styles.invitationMessage}>
            We invite you to mentor, collaborate, and recruit the next generation of <strong>industry-ready professionals</strong>.
          </p>

          <a href="/contact" className={styles.invitationButton}>Connect With Us</a>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.fadeIn}`}>Recruitment Process</h2>
        <div className={styles.processSteps}>
          <ul className={styles.timeline}>
            <li className={styles.timelineItem}>
              <div className={styles.timelineSeparator}>
                <span className={styles.timelineDot}></span>
                <span className={styles.timelineConnector}></span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  Company Invitation: The placement office sends invitations to companies with relevant information. You can also email us the same at tnp@iiitr.ac.in
                </div>
              </div>
            </li>

            <li className={styles.timelineItem}>
              <div className={styles.timelineSeparator}>
                <span className={styles.timelineDot}></span>
                <span className={styles.timelineConnector}></span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  Registration: Companies interested in recruiting can register on the Training-Placement website. Please use your corporate email ID for registration.
                  <a href="/" className={styles.recButton}>Recruiter SignUp</a>
                </div>
              </div>
            </li>

            <li className={styles.timelineItem}>
              <div className={styles.timelineSeparator}>
                <span className={styles.timelineDot}></span>
                <span className={styles.timelineConnector}></span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  SPOC Allocation: Student coordinators are assigned as SPOCs (Single Point of Contact) for each registered company and they verify the company's details.
                </div>
              </div>
            </li>

            <li className={styles.timelineItem}>
              <div className={styles.timelineSeparator}>
                <span className={styles.timelineDot}></span>
                <span className={styles.timelineConnector}></span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  Announcement forms: Companies may fill out the Job Announcement Form or Internships Announcement Form for each profile they wish to hire for. Once the completed form with all required details is received, the company is registered and contacted for further processes.
                </div>
              </div>
            </li>

            <li className={styles.timelineItem}>
              <div className={styles.timelineSeparator}>
                <span className={styles.timelineDot}></span>
                <span className={styles.timelineConnector}></span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  Pre-Hiring Process: Students can view the details and eligible students may apply. You can use this account to view resumes of interested students and shortlist applicants. Companies/organizations can request to conduct pre-processes (tests, assignments, etc.) along with their preferred date.
                </div>
              </div>
            </li>

            <li className={styles.timelineItem}>
              <div className={styles.timelineSeparator}>
                <span className={styles.timelineDot}></span>
                <span className={styles.timelineConnector}></span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  Offer Rolling: Students are selected and hired by companies through rolling offers. After completing the selection process, the company must announce the final list of selected students on the same day.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Past Recruiters Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Past Recruiters</h2>
        <div className={styles.recruitersList}>
          <img src="/uploads/infosys.webp" alt="infosys" />
          <img src="/uploads/capgemini.png" alt="Capgemini" />
          <img src="/uploads/amazon.png" alt="Amazon" />
          <img src="/uploads/tcs.png" alt="infosys" />
        </div>
      </section>

    </div>
  );
}

export default Recruiters;