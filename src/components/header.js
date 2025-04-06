// components/Header.js
import Link from 'next/link';
import { FaUser } from "react-icons/fa";

import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Placement Portal</Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/students">Students</Link>
            </li>
            <li>
              <Link href="/recruiters">Recruiters</Link>
            </li>
            <li>
              <Link href="/Stats">Stats</Link>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
