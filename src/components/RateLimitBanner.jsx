import { useApp } from '@/context/AppContext';
import { FiAlertTriangle, FiKey, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function RateLimitBanner() {
  const { rateLimit, setSettingsOpen } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !rateLimit) return null;

  const { remaining, limit, reset } = rateLimit;
  const pct = limit > 0 ? (remaining / limit) * 100 : 100;
  const resetDate = new Date(reset * 1000);
  const resetMin = Math.max(0, Math.round((resetDate - Date.now()) / 60000));

  let bgClass, textClass, barColor, icon;
  if (pct > 50) {
    bgClass = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40';
    textClass = 'text-emerald-700 dark:text-emerald-400';
    barColor = 'bg-signal-healthy';
    icon = null;
  } else if (pct > 10) {
    bgClass = 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40';
    textClass = 'text-amber-700 dark:text-amber-400';
    barColor = 'bg-signal-warn';
    icon = <FiAlertTriangle className="text-sm flex-shrink-0" />;
  } else {
    bgClass = 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/40';
    textClass = 'text-red-700 dark:text-red-400';
    barColor = 'bg-signal-danger';
    icon = <FiAlertTriangle className="text-sm flex-shrink-0" />;
  }

  return (
    <div className={`border-b ${bgClass} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3 text-xs font-medium">
        <div className={`flex items-center gap-2 ${textClass} flex-1 min-w-0`}>
          {icon}
          <span className="truncate">
            GitHub API: <strong>{remaining.toLocaleString()}</strong> / {limit.toLocaleString()} requests remaining
            {resetMin > 0 && <span className="text-gray-500 dark:text-gray-400 ml-1">(resets in {resetMin}m)</span>}
          </span>

          {/* Mini progress bar */}
          <div className="hidden sm:block w-20 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
            <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {limit <= 60 && (
          <button
            onClick={() => setSettingsOpen(true)}
            className={`flex items-center gap-1 ${textClass} hover:underline flex-shrink-0`}
          >
            <FiKey className="text-xs" />
            Add token for 5K/hr
          </button>
        )}

        <button
          onClick={() => setDismissed(true)}
          className="p-0.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <FiX className={`text-sm ${textClass}`} />
        </button>
      </div>
    </div>
  );
}
