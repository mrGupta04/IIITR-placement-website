import dynamic from 'next/dynamic';
import styles from '../styles/Footer.module.css';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

const FontAwesomeIcon = dynamic(
  () => import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon),
  { ssr: false }
);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Layer */}
      <div className={styles.footerTop}>
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>IIIT Raichur</h4>
          <p className={styles.footerText}>
            Empowering minds since 2019. Committed to excellence in education, research, and innovation.
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://x.com/IIITRaichur" className={styles.socialLink} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://in.linkedin.com/school/iiitraichur/" className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://www.instagram.com/iiit_raichur/" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><a href="/profile" className={styles.footerLink}>CareerConnect Portal</a></li>
            <li><a href="/about" className={styles.footerLink}>About TNP cell</a></li>
            <li><a href="/recruiters" className={styles.footerLink}>Partners</a></li>
            <li><a href="/jobs" className={styles.footerLink}>Job Oppurtunities</a></li>
            <li><a href="/alumni" className={styles.footerLink}>Alumni</a></li>
            <li><a href="/contact" className={styles.footerLink}>Contact</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>IIITR Links</h4>
          <ul className={styles.footerLinks}>
            <li><a href="https://iiitr.ac.in/" className={styles.footerLink}>Official Website</a></li>
            <li><a href="https://students.iiitr.ac.in/" className={styles.footerLink}>Students</a></li>
            <li><a href="https://iiitr.ac.in/faculty" className={styles.footerLink}>Faculty</a></li>
            <li><a href="https://iiitr.ac.in/curriculum" className={styles.footerLink}>Academics</a></li>
            <li><a href="https://iiitr.ac.in/reach_us" className={styles.footerLink}>Campus</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Visit Us</h4>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31569.891501789327!2d77.1140416!3d16.1594076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc9d17abbd87b87%3A0x28afde55f519a10b!2sGovernment%20Engineering%20College%20(GEC%20Yermarus%20Camp)!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Bottom Layer */}
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} IIIT Raichur. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;