import { useState } from 'react';
import styles from '../styles/FAQ.module.css';

const FAQ_DATA = [
  {
    question: "What is the total fee payable at the time of admission for regular students?",
    answer: "Answer for regular students admission fee..."
  },
  {
    question: "What is the total fee payable at the time of admission for students allotted through TFW (Tuition Fee Waiver) scheme?",
    answer: "Answer for TFW scheme students..."
  },
  {
    question: "What documents are needed during reporting?",
    answer: "Answer for required documents..."
  },
  {
    question: "How to reach IIIT Raichur campus?",
    answer: "Answer about directions..."
  },
  {
    question: "What is the hostel fee for the first semester?",
    answer: "Answer about hostel fees..."
  },
  {
    question: "Are there any scholarships available?",
    answer: "Answer about scholarships..."
  },
  {
    question: "Can I apply for hostel change?",
    answer: "Answer about hostel changes..."
  },
  // Add more if needed
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const visibleFAQs = showAll ? FAQ_DATA : FAQ_DATA.slice(0, 5);

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {visibleFAQs.map((item, index) => (
          <div 
            key={index}
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
          >
            <div 
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <h3>{item.question}</h3>
              <svg
                className={styles.chevron}
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
            <div className={`${styles.faqAnswer} ${activeIndex === index ? styles.show : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* See More / See Less Button */}
      {FAQ_DATA.length > 5 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button className={styles.seeMoreButton} onClick={toggleShowAll}>
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQ;