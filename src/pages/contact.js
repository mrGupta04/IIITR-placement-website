import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: checked 
          ? [...prev.services, name]
          : prev.services.filter(service => service !== name)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send to email via FormSubmit
      const emailResponse = await fetch('https://formsubmit.co/ajax/tnp@iiitr.ac.in', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          services: formData.services.join(', '),
          _subject: 'New Contact Form Submission'
        })
      });

      // Prepare WhatsApp message
      const whatsappMessage = `New Contact Form Submission:
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Message: ${formData.message}
      Services: ${formData.services.join(', ')}`;

      // Open WhatsApp in new tab
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        services: []
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <div className={styles.contactForm}>
          <h1 className={styles.formTitle}>Contact Us</h1>
          <p className={styles.formSubtitle}>We're here to help. Our team is available 24/7.</p>

          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              Oops! Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name" 
                  className={styles.input} 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <span className={styles.inputBorder}></span>
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name" 
                  className={styles.input} 
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <span className={styles.inputBorder}></span>
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  className={styles.input} 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span className={styles.inputBorder}></span>
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  className={styles.input} 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <span className={styles.inputBorder}></span>
              </div>
            </div>

            <div className={styles.textareaGroup}>
              <textarea 
                name="message"
                placeholder="Leave us a message..." 
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <span className={styles.textareaBorder}></span>
            </div>

            <div className={styles.checkboxGroup}>
              <h4 className={styles.servicesTitle}>Services Needed:</h4>
              <div className={styles.checkboxGrid}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="Website Design" 
                    onChange={handleChange}
                    checked={formData.services.includes('Website Design')}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Website Design
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="UX Design" 
                    onChange={handleChange}
                    checked={formData.services.includes('UX Design')}
                  />
                  <span className={styles.checkboxCustom}></span>
                  UX Design
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="User Research" 
                    onChange={handleChange}
                    checked={formData.services.includes('User Research')}
                  />
                  <span className={styles.checkboxCustom}></span>
                  User Research
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="Content Creation" 
                    onChange={handleChange}
                    checked={formData.services.includes('Content Creation')}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Content Creation
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="Strategy & Consulting" 
                    onChange={handleChange}
                    checked={formData.services.includes('Strategy & Consulting')}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Strategy & Consulting
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="Other" 
                    onChange={handleChange}
                    checked={formData.services.includes('Other')}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Other
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message <FaPaperPlane className={styles.buttonIcon} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Chat to us</h2>
            <p className={styles.infoText}>Our friendly team is here to help.</p>
            <a href="mailto:tnp@iiitr.ac.in" className={styles.infoLink}>tnp@iiitr.ac.in</a>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Visit us</h2>
            <p className={styles.infoText}>Come say hello at our office HQ.</p>
            <span className={styles.infoAddress}>
              Temporary Campus, Government Engineering College, Raichur, located at Yeramarus.
            </span>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Call us</h2>
            <p className={styles.infoText}>Mon-Fri from 8am to 5pm.</p>
            <a href="tel:+15550000000" className={styles.infoLink}>+1 (555) 000-0000</a>
          </div>

          <div className={styles.socialIconsContainer}>
            <h3 className={styles.socialTitle}>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaFacebook className={styles.icon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaTwitter className={styles.icon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaLinkedin className={styles.icon} />
              </a>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
              >
                <FaWhatsapp className={styles.icon} style={{color: '#25D366'}} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}