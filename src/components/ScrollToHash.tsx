import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToHash: React.FC = () => {
  const { hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!hash) return;
    if (navigationType === 'POP') {
      return;
    }

    const element = document.getElementById(hash.replace('#', ''));

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [hash, navigationType]);
  return null;
};

export default ScrollToHash;
