'use client';

import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import FAQ from '../components/faq';
import { useRouter } from 'next/navigation'; // Updated import
import { motion } from 'framer-motion';
import DirectorsCorner from '../components/directorcorner';
import { useEffect, useState } from 'react'; // Added for potential state management

// Dynamic import if needed (commented out as not currently used)
// const DynamicComponent = dynamic(() => import('../components/someComponent'), { ssr: false });

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
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // For client-side only operations

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigateToRecruiters = () => {
    router.push('/recruiters');
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              src="/uploads/IIIT-Raichur-Transit-Campus.jpg"
              alt="IIITR Campus"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Welcome To IIIT Raichur
              <motion.span 
                className={styles.heroSubtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Engineering Excellence Since 2019
              </motion.span>
            </motion.h1>
          </div>
        </header>

        {/* About Section */}
        <section className={styles.aboutSection}>
          <AnimatedHeader />
          <motion.h2 
            className={styles.sectionTitle}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Why IIIT Raichur?
          </motion.h2>
          
          <motion.div 
            className={styles.content}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className={styles.paragraph}
              variants={fadeInUp}
            >
              <h3>Premier Institution Under Govt. of India</h3>
              <p>
                Established in 2019 under the IIIT (PPP) Act, 2017, the Indian Institute of Information Technology, Raichur (IIIT Raichur) is a premier technical institution in Karnataka, dedicated to excellence in IT education and innovation. Backed by the Ministry of Education, Government of India, the institute blends academic rigor with industry relevance through its unique Public-Private Partnership (PPP) model.
                <span className={styles.highlight}>
                  IIIT Raichur, mentored by IIT Hyderabad, excels in AI, Data Science, and Cybersecurity, offering top-tier education, research, industry collaborations, and excellent placements.
                </span>
              </p>
            </motion.div>

            <motion.p 
              className={styles.paragraph}
              variants={fadeInUp}
            >
              IIIT Raichur, established under the Ministry of Education, Government of India, is a premier institute mentored by IIT Hyderabad, ensuring academic excellence and strong industry collaborations. With a focus on emerging technologies like AI, Data Science, and Cybersecurity, the institute equips students with future-ready skills. Its dynamic research culture, funded projects, and innovation-driven ecosystem provide a platform for technological advancements. IIIT Raichur also offers excellent placement opportunities, industry partnerships, and a vibrant student life with cultural, technical, and sports activities, fostering holistic growth and career development.
            </motion.p>
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className={styles.introduction}>
          <motion.h2 
            className={styles.sectionTitle}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Latest Updates
          </motion.h2>
          <motion.p 
            className={styles.sectionText}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Indian Institute Of Information Technology Raichur is a leading institution dedicated to excellence in education, research, and community service. Our mission is to empower students with the knowledge and skills they need to succeed in a rapidly changing world.
          </motion.p>
        </section>

        {/* Featured Programs Section */}
        <section className={styles.featuredPrograms}>
          <motion.h2 
            className={styles.sectionTitle}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Featured Programs
          </motion.h2>
          <motion.div 
            className={styles.programList}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className={styles.programCard}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              variants={fadeInUp}
            >
              <h3>Computer Science</h3>
              <p>Explore the world of computing and technology with our state-of-the-art facilities and expert faculty.</p>
            </motion.div>
            <motion.div
              className={styles.programCard}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              variants={fadeInUp}
            >
              <h3>Artificial Intelligence & Data Science</h3>
              <p>Gain the skills and knowledge to lead in the global business environment.</p>
            </motion.div>
            <motion.div
              className={styles.programCard}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              variants={fadeInUp}
            >
              <h3>Mathematics & Computing</h3>
              <p>Innovate and solve complex problems with our hands-on engineering programs.</p>
            </motion.div>
          </motion.div>
        </section>

        <DirectorsCorner />

        <motion.section 
          className={styles.recruitersSection}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className={styles.recruitersContent}>
            <h2 className={styles.sectionTitle}>Invitation to Recruiters</h2>
            <p className={styles.recruiterMessage}>
              At IIIT Raichur, we take pride in nurturing some of the brightest minds in the country.
              Our students have a solid foundation in computer science and hands-on exposure to emerging
              technologies like AI, Data Science, and Cybersecurity. They are trained to solve real-world
              problems and adapt quickly to evolving industry needs. Mentored by IIT Hyderabad and backed
              by a rigorous academic environment, our graduates are driven, innovative, and industry-ready.
              Partner with us to discover the future leaders of your organization.
            </p>
            <motion.button
              className={styles.recruiterButton}
              onClick={navigateToRecruiters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With our team
            </motion.button>
          </div>
        </motion.section>
        
        <FAQ />
      </div>
    </>
  );
}