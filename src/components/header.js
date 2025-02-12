import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaBars } from 'react-icons/fa';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Placement Portal</Link>
        </div>

        

        {/* Navigation Menu - Show only when menuOpen is true */}
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/jobs">Jobs</Link>
            </li>
            <li>
              <Link href="/recruiters">Recruiters</Link>
            </li>
            <li>
              <Link href="/Stats">Statistics</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/profile" className={styles.loginButton}>
            <FaUser className={styles.userIcon} /> Profile
          </Link>

          {/* Hamburger Menu Icon */}
          <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
