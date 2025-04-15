import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/DirectorCorner.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ElfsightWidget = dynamic(() => import("./elfsightwidget"), { ssr: false });

const SocialSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div></div>;
};

const DirectorsCorner = () => {
  const [showFull, setShowFull] = useState(false);

  const shortText = `Welcome to IIIT Raichur! We're dedicated to advancing technology and
  education, fostering innovation and excellence. Our vibrant campus
  and world-class faculty are here to empower students and
  collaborators on their journey to success.`;

  const fullText = `${shortText} Join us in shaping the
  future of IT and knowledge. Welcome to IIIT Raichur! We're dedicated to advancing technology and education, fostering innovation and excellence. Our vibrant campus and world-class faculty are here to empower students and collaborators on their journey to success.`;

  const handleToggle = () => {
    setShowFull(prev => !prev);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <section className="bg-gray-100 py-10 px-6">
        <section className="relative py-16 bg-gradient-to-b from-blue-50/20 to-white">
          <div className={`container ${styles.container}`}>
            <div className={`row ${styles.card} shadow-lg p-4`}>
              <div className="col-md-6 d-flex flex-column justify-content-center text-center">
                <div className="blockquote">
                  <span className={styles.quoteIcon}>&ldquo;</span>
                </div>
                <h1 className="fw-bold">Director Sir's Message</h1>
                <h2 className="fw-bold">Prof. Harish Kumar Sardana</h2>
                <p className="lead">{showFull ? fullText : shortText}</p>
                <button className="btn btn-outline-dark mt-3" onClick={handleToggle}>
                  {showFull ? "Read Less" : "Know More..."}
                </button>
              </div>

              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div className={styles.video} style={{ width: '100%', height: '275px' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Director's Message"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: '12px' }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>


          <style jsx global>{`
            @keyframes fade-in-up {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }

            video::-webkit-media-controls-panel {
              background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
            }
          `}</style>
        </section>
      </section>
    </section>
  );
};

export default DirectorsCorner;