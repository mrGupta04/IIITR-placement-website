import React, { useEffect } from 'react';
import styles from "../styles/Recruiters.module.css";

const Recruiters = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1
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
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} animate-on-scroll`}>An Invitation to Shape the Future of Innovation</h1>
          <p className={`${styles.heroSubtitle} animate-on-scroll`}>
            Partner with IIIT Raichur to recruit exceptional talent trained under the mentorship of IIT Hyderabad
          </p>
          <a href="#recruiters" className={`${styles.heroButton} animate-on-scroll`}>Explore Partnership</a>
        </div>
      </section>

      {/* Invitation Section */}
      <section id="recruiters" className={`${styles.invitationSection} animate-on-scroll`}>
        <div className={styles.invitationContainer}>
          <div className={styles.invitationHeader}>
            <h2 className={styles.invitationHeading}>Join Hands with Future Innovators</h2>
            <div className={styles.divider}></div>
          </div>

          <div className={styles.invitationContent}>
            <p className={styles.invitationMessage}>
              <strong>Dear Industry Leaders and Hiring Partners,</strong>
            </p>

            <p className={styles.invitationMessage}>
              At <strong>IIIT Raichur</strong>, we believe that the <em>future of technology is built today</em>—in the minds of young innovators, problem-solvers, and leaders who will drive tomorrow's industries.
            </p>

            <div className={styles.featureHighlight}>
              <h3>Why IIIT Raichur?</h3>
              <ul className={styles.featureList}>
                <li>
                  <span className={styles.featureIcon}>🚀</span>
                  <strong>Cutting-edge academic system</strong> mentored by IIT Hyderabad
                </li>
                <li>
                  <span className={styles.featureIcon}>🧩</span>
                  <strong>Fractal Academic System</strong> for deep conceptual clarity
                </li>
                <li>
                  <span className={styles.featureIcon}>💡</span>
                  <strong>Real-world projects</strong> tackling industry challenges
                </li>
                <li>
                  <span className={styles.featureIcon}>🌐</span>
                  <strong>Industry internships</strong> at startups and tech giants
                </li>
              </ul>
            </div>

            <p className={styles.invitationMessage}>
              We invite you to mentor, collaborate, and recruit the next generation of <strong>industry-ready professionals</strong>.
            </p>

            <div className={styles.buttonGroup}>
              <a href="/contact" className={styles.invitationButton}>Connect With Us</a>
              <a href="#process" className={styles.secondaryButton}>View Process</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={`${styles.statCard} animate-on-scroll`}>
            <h3 className={styles.statNumber}>100+</h3>
            <p className={styles.statLabel}>Companies Visited</p>
          </div>
          <div className={`${styles.statCard} animate-on-scroll`}>
            <h3 className={styles.statNumber}>90%+</h3>
            <p className={styles.statLabel}>Placement Rate</p>
          </div>
          <div className={`${styles.statCard} animate-on-scroll`}>
            <h3 className={styles.statNumber}>50+</h3>
            <p className={styles.statLabel}>Industry Projects</p>
          </div>
          <div className={`${styles.statCard} animate-on-scroll`}>
            <h3 className={styles.statNumber}>4.0+</h3>
            <p className={styles.statLabel}>Average Package (LPA)</p>
          </div>
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section id="process" className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recruitment Process</h2>
          <p className={styles.sectionSubtitle}>Simple steps to hire the best talent</p>
        </div>

        <div className={styles.processSteps}>
          <div className={styles.processTimeline}>
            {[
              {
                title: "Company Invitation",
                content: "The placement office sends invitations to companies with relevant information. You can also email us at tnp@iiitr.ac.in",
                icon: "📨"
              },
              {
                title: "Registration",
                content: "Companies interested in recruiting can register on our portal. Please use your corporate email ID for registration.",
                action: "Recruiter SignUp",
                icon: "📝"
              },
              {
                title: "SPOC Allocation",
                content: "Student coordinators are assigned as SPOCs (Single Point of Contact) for each registered company.",
                icon: "👥"
              },
              {
                title: "Announcement Forms",
                content: "Companies fill out Job/Internship Announcement Forms for each hiring profile.",
                icon: "📋"
              },
              {
                title: "Pre-Hiring Process",
                content: "View resumes, shortlist candidates, and conduct pre-placement activities.",
                icon: "🔍"
              },
              {
                title: "Offer Rolling",
                content: "Finalize selections and announce the list of selected students.",
                icon: "🎯"
              }
            ].map((step, index) => (
              <div key={index} className={`${styles.processStep} animate-on-scroll`}>
                <div className={styles.stepIndicator}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <span className={styles.stepIcon}>{step.icon}</span>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.content}</p>
                  {step.action && (
                    <a href="/" className={styles.stepAction}>{step.action}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Recruiters Section */}
      <section className={styles.recruitersSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Esteemed Recruiters</h2>
          <p className={styles.sectionSubtitle}>Companies who trust our talent</p>
        </div>

        <div className={styles.recruitersGrid}>
          {['infosys', 'capgemini', 'amazon', 'tcs', 'google', 'microsoft', 'accenture', 'wipro'].map((company) => (
            <div key={company} className={`${styles.recruiterLogo} animate-on-scroll`}>
              <img
                src={`/uploads/${company}.png`}
                alt={company}
                onError={(e) => {
                  e.target.src = `/uploads/${company}.webp`;
                  e.target.onerror = null;
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Hire Exceptional Talent?</h2>
          <p className={styles.ctaText}>Join our growing network of recruiters and get access to the brightest minds in technology.</p>
          <div className={styles.ctaButtons}>
            <a href="/register" className={styles.primaryCta}>Register as Recruiter</a>
            <a href="/contact" className={styles.secondaryCta}>Schedule Campus Visit</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Recruiters;