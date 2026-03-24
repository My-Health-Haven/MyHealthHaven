import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const shouldBypassAnimation = () => {
  if (typeof document === 'undefined') {
    return true;
  }

  return document.documentElement.dataset.prerendered === 'true';
};

const FadeIn = ({ children, delay = 0, duration = 800, className = '', style = {} }) => {
  const [isVisible, setIsVisible] = useState(() => shouldBypassAnimation());
  const domRef = useRef();

  useEffect(() => {
    if (shouldBypassAnimation() || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% visible

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.98)',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default FadeIn;

