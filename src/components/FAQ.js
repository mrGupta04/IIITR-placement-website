// components/FAQ.js
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
    question: "What is the total fee payable at the time of admission for students allotted through TFW (Tuition Fee Waiver) scheme?",
    answer: "Answer for TFW scheme students..."
  },
  {
    question: "What is the total fee payable at the time of admission for students allotted through TFW (Tuition Fee Waiver) scheme?",
    answer: "Answer for TFW scheme students..."
  },
  {
    question: "What is the total fee payable at the time of admission for students allotted through TFW (Tuition Fee Waiver) scheme?",
    answer: "Answer for TFW scheme students..."
  },
  // Add all other questions in the same format
  // ... rest of the questions
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {FAQ_DATA.map((item, index) => (
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
            <div className={styles.faqAnswer}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;