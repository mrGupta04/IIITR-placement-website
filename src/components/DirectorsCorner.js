import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "../styles/DirectorsCorner.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load Elfsight widget
const ElfsightWidget = dynamic(() => import("./ElfsightWidget"), { ssr: false });

const SocialSection = () => {
  useEffect(() => {
    // Dynamic script loading for Elfsight
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
  useEffect(() => {
    // Load Elfsight script dynamically
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <section className="bg-gray-100 py-10 px-6">
        <section className="relative py-16 bg-gradient-to-b from-blue-50/20 to-white">
        <div className={`container ${styles.container}`}>
      <div className={`row ${styles.card} shadow-lg p-4`}>
        {/* Left Section: Text */}
        <div className="col-md-6 d-flex flex-column justify-content-center text-center">
          <div className="blockquote">
            <span className={styles.quoteIcon}>&ldquo;</span>
          </div>
          <h1 className="fw-bold">Director Sir's Message</h1>
          <h2 className="fw-bold">Prof. Harish Kumar Sardana</h2>
          <p className="lead">
            Welcome to IIIT Raichur! We're dedicated to advancing technology and
            education, fostering innovation and excellence. Our vibrant campus
            and world-class faculty are here to empower students and
            collaborators on their journey to success. Join us in shaping the
            future of IT and knowledge.
          </p>
          <button className="btn btn-outline-dark mt-3">Know More...</button>
        </div>

        {/* Right Section: Video */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <video className={styles.video} controls>
            <source src="/uploads/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
          {/* Social Handle Section */}
          <div className="container mx-auto px-6 mt-20">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
                Social Handle
              </h3>
            </div>

            <div className="max-w-7xl mx-auto rounded-3xl bg-white p-6 shadow-xl shadow-blue-100/30">
              <ElfsightWidget />
            </div>
          </div>

          {/* Global Styles */}
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
              background-image: linear-gradient(transparent, rgba(0,0,0,0.6));
            }
          `}</style>
        </section>
      </section>
    </section>
  );
};

export { DirectorsCorner, SocialSection };