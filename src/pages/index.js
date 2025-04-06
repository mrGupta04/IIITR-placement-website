'use client'; // This page needs to be client-side due to FontAwesome and interactivity

import Image from 'next/image'; // Single import here
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import FAQ from '../components/FAQ';
import { useRouter } from 'next/router';
import { DirectorsCorner } from '../components/DirectorsCorner';
import dynamic from 'next/dynamic';

// Dynamically import FontAwesomeIcon to avoid SSR issues

// Define AnimatedHeader outside Home
const AnimatedHeader = () => {
  return (
    <div className={styles.animatedHeader}>
      <div className={styles.scrollingBanner}>
        <div className={styles.scrollingContent}>
          <span>🏆 First Rank in AICTE SIH 2023</span>
          <span>📍 IIIT Raichur OFFICIAL</span>
          <span>🎓 Officially handed over by IIT Hyderabad</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
    
    
      <div className={styles.container}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              src="/uploads/cover.jpg"
              alt="IIITR Campus"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              priority
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Welcome To IIIT Raichur
              <span className={styles.heroSubtitle}>Engineering Excellence Since 2019</span>
            </h1>
          </div>
        </header>

        {/* About Section */}
        <section className={styles.aboutSection}>
        <AnimatedHeader />
          <h2 className={styles.sectionTitle}>Why IIIT Raichur?</h2>
          <div className={styles.content}>
            <div className={styles.paragraph}>
              <h3>Premier Institution Under Govt. of India</h3>
              <p>
                Established in 2019 under the IIIT (PPP) Act, 2017, the Indian Institute of Information Technology, Raichur (IIIT Raichur) is a premier technical institution in Karnataka, dedicated to excellence in IT education and innovation. Backed by the Ministry of Education, Government of India, the institute blends academic rigor with industry relevance through its unique Public-Private Partnership (PPP) model.
                <span className={styles.highlight}>
                  IIIT Raichur, mentored by IIT Hyderabad, excels in AI, Data Science, and Cybersecurity, offering top-tier education, research, industry collaborations, and excellent placements.
                </span>
              </p>
            </div>

            <p className={styles.paragraph}>
              IIIT Raichur, established under the Ministry of Education, Government of India, is a premier institute mentored by IIT Hyderabad, ensuring academic excellence and strong industry collaborations. With a focus on emerging technologies like AI, Data Science, and Cybersecurity, the institute equips students with future-ready skills. Its dynamic research culture, funded projects, and innovation-driven ecosystem provide a platform for technological advancements. IIIT Raichur also offers excellent placement opportunities, industry partnerships, and a vibrant student life with cultural, technical, and sports activities, fostering holistic growth and career development.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className={styles.introduction}>
          <h2 className={styles.sectionTitle}>Latest Updates</h2>
          <p className={styles.sectionText}>
            Indian Institute Of Information Technology Raichur is a leading institution dedicated to excellence in education, research, and community service. Our mission is to empower students with the knowledge and skills they need to succeed in a rapidly changing world.
          </p>
        </section>

        {/* Featured Programs Section */}
        <section className={styles.featuredPrograms}>
          <h2 className={styles.sectionTitle}>Featured Programs</h2>
          <div className={styles.programList}>
            <div className={styles.programCard}>
              <h3>Computer Science</h3>
              <p>Explore the world of computing and technology with our state-of-the-art facilities and expert faculty.</p>
            </div>
            <div className={styles.programCard}>
              <h3>Artificial Intelligence & Data Science</h3>
              <p>Gain the skills and knowledge to lead in the global business environment.</p>
            </div>
            <div className={styles.programCard}>
              <h3>Mathematics & Computing</h3>
              <p>Innovate and solve complex problems with our hands-on engineering programs.</p>
            </div>
          </div>
        </section>

        <DirectorsCorner />
        <FAQ />

       
      </div>
    </>
  );
}