import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import styles from '../styles/contact.module.css';

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <div className={styles.contactForm}>
          <h1>Contact Us</h1>
          <p>We’re here to help. Our team is available 24/7.</p>

          <form>
            <div className={styles.inputRow}>
              <input type="text" placeholder="First Name" className={styles.input} />
              <input type="text" placeholder="Last Name" className={styles.input} />
            </div>

            <div className={styles.inputRow}>
              <input type="email" placeholder="Email" className={styles.input} />
              <input type="tel" placeholder="Phone Number" className={styles.input} />
            </div>

            <textarea placeholder="Leave us a message..." className={styles.textarea}></textarea>

            <div className={styles.checkboxGroup}>
              <label><input type="checkbox" /> Website Design</label>
              <label><input type="checkbox" /> UX Design</label>
              <label><input type="checkbox" /> User Research</label>
              <label><input type="checkbox" /> Content Creation</label>
              <label><input type="checkbox" /> Strategy & Consulting</label>
              <label><input type="checkbox" /> Other</label>
            </div>

            <button type="submit" className={styles.button}>Send Message</button>
          </form>
        </div>

        <div className={styles.contactInfo}>
          <div>
            <h2>Chat to us</h2>
            <p>Our friendly team is here to help.</p>
            <span>tnp@iiitr.ac.in</span>
          </div>

          <div>
            <h2>Visit us</h2>
            <p>Come say hello at our office HQ.</p>
            <span>Temporary Campus,Government Engineering College, Raichur, located at Yeramarus.</span>
          </div>

          <div>
            <h2>Call us</h2>
            <p>Mon-Fri from 8am to 5pm.</p>
            <span>+1 (555) 000-0000</span>
          </div>

          <div className={styles.socialIconsContainer}>
            <h3>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook className={styles.icon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter className={styles.icon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className={styles.icon} />
              </a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}