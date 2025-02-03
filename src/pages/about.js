import React from 'react'; // Ensure React is imported
import styles from '../styles/About.module.css'; // Import your CSS module

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>About Us</h1>
      <p>
        Welcome to our college placement portal! We are dedicated to connecting students
        with the best career opportunities, bridging the gap between talented individuals and top companies.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to empower students with the tools and resources needed to excel in their career paths.
      </p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Comprehensive company database</li>
        <li>Student-focused guidance and training</li>
        <li>Dedicated support for recruiters and students</li>
        <li>Seamless application and selection process</li>
      </ul>
    </div>
  );
};

export default About;
