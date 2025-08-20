import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Placement Portal</Link>
        </div>

        {/* Navigation Menu */}
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul>
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
           
            <li>
              <Link href="/recruiters" onClick={() => setMenuOpen(false)}>Recruiters</Link>
            </li>
            <li>
              <Link href="/stats" onClick={() => setMenuOpen(false)}>Statistics</Link>
            </li>
            <li>
              <Link href="/alumni" onClick={() => setMenuOpen(false)}>Alumni</Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/profile" className={styles.loginButton} onClick={() => setMenuOpen(false)}>
            <FaUser className={styles.userIcon} /> 
          </Link>

         
          <button 
            className={styles.menuToggle} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;