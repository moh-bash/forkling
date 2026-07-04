import { FiHeart, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0D11] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src="/Forkling_logo.png"
              alt="Forkling mascot"
              width={56}
              height={56}
              className="object-contain"
              style={{ width: 56, height: 56 }}
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100 font-headline">
                Fork<span className="text-accent-gold italic">ling</span>
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                Built for open source communities
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-accent-gold transition-colors">Home</Link>
            <Link to="/compare" className="hover:text-accent-gold transition-colors">Compare</Link>
            <Link to="/guide" className="hover:text-accent-gold transition-colors">Guide</Link>
            <Link to="/models" className="hover:text-accent-models transition-colors">LLMs</Link>
          </div>

          {/* Copyright + built-with */}
          <div className="flex flex-col items-center sm:items-end gap-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <span>Built with</span>
              <FiHeart className="text-accent-gold text-xs" />
              <span>for open source</span>
              <span className="mx-1 text-gray-300 dark:text-gray-700">·</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="text-sm" />
              </a>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-600">
              © {year} Forkling · Built for open source communities
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
