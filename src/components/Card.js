import React, { useState } from "react";
import styles from "../styles/card.module.css";

const Card = ({ image, name, position, idno, branch, info, small }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`${styles.card} ${small ? styles.small : ""}`}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
                {/* Front Side */}
                <div className={styles.front}>
                    <img src={image} alt={name} className={styles.image} />
                    <div>
                        <h3 className={styles.name}>{name} <p className={styles.position}>{position}</p></h3>
                    </div>
                </div>

                {/* Back Side */}
                <div className={styles.back}>
                    <h5 className={styles.name}>{name}</h5>
                    <p className={styles.info}>{info}</p>
                    <p className={styles.info}>{branch}: {idno}</p>
                    <p className={styles.pinfo}>
                            <a href="mailto:faculty@example.com" className={styles.contactLink}>
                                <img src="/uploads/email_icon.png" alt="Email" className={styles.icon} />
                            </a>
                            <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                <img src="/uploads/linkedin.png" alt="LinkedIn" className={styles.icon} />
                            </a>
                            <a href="https://www.linkedin.com/in/faculty" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                <img src="/uploads/whatsapp.png" alt="LinkedIn" className={styles.icon} />
                            </a>
                        </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
