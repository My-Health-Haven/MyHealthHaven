import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;

    const removeHashCharacter = (str) => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      const elementId = removeHashCharacter(hash);
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // If element not found immediately (e.g. lazy loading), retry after short delay
        const timer = setTimeout(() => {
           const el = document.getElementById(elementId);
           if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
           }
        }, 500); // 500ms allows for some rendering time
        
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return null;
};

export default ScrollToHashElement;
