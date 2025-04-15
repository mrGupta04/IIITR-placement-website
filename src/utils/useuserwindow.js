import { useState, useEffect } from 'react'; // Add this import

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return isMobile;
};

export default useWindowSize;  // Default export