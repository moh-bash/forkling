import { useState, useEffect } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

export default function ScrollButtons() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      setShowUp(scrollY > 300);
      setShowDown(scrollY + winHeight < docHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  if (!showUp && !showDown) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      {showUp && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 glass border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-accent-gold dark:hover:text-accent-gold transition-all duration-200 hover:scale-110"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="text-lg" />
        </button>
      )}
      {showDown && (
        <button
          onClick={scrollToBottom}
          className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 glass border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-accent-gold dark:hover:text-accent-gold transition-all duration-200 hover:scale-110"
          aria-label="Scroll to bottom"
        >
          <FiArrowDown className="text-lg" />
        </button>
      )}
    </div>
  );
}
