import React, { useState } from "react";
import Image from 'next/image'; // Add this import
import styles from "../styles/card.module.css";
import { FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Card = ({ image, name, position, idno, branch, info, small }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`${styles.card} ${small ? styles.small : ""}`}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onClick={() => setFlipped(!flipped)}
        >
            <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
                {/* Front Side */}
                <div className={styles.front}>
                    <div className={styles.imageContainer}>
                        <Image 
                            src={image} 
                            alt={name} 
                            width={150}
                            height={150}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.textContainer}>
                        <h3 className={styles.name}>{name}</h3>
                        <p className={styles.position}>{position}</p>
                    </div>
                </div>

                {/* Back Side */}
                <div className={styles.back}>
                    <h5 className={styles.name}>{name}</h5>
                    <p className={styles.info}>{info}</p>
                    <p className={styles.details}>{branch} • {idno}</p>
                    <div className={styles.contactLinks}>
                        <a href="#" className={styles.contactLink}>
                            <FaEnvelope />
                        </a>
                        <a href="#" className={styles.contactLink}>
                            <FaLinkedin />
                        </a>
                        <a href="#" className={styles.contactLink}>
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;