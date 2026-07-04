import { FiX } from 'react-icons/fi';

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust',
  'C++', 'C', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'C#', 'Scala', 'Shell',
];

const TOPICS = [
  'web', 'machine-learning', 'devtools', 'api', 'cli',
  'database', 'security', 'blockchain', 'cloud', 'mobile',
  'data-science', 'testing', 'networking', 'graphics',
];

const MAINTENANCE = [
  { key: 'thriving', label: '🟢 Thriving', pushed: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0] },
  { key: 'active', label: '🟡 Active', pushed: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0] },
  { key: 'dormant', label: '🔴 Dormant', pushed: null },
];

export default function FilterChips({ filters, onFiltersChange }) {
  const toggleLanguage = (lang) => {
    onFiltersChange({
      ...filters,
      language: filters.language === lang ? '' : lang,
    });
  };

  const toggleTopic = (topic) => {
    onFiltersChange({
      ...filters,
      topic: filters.topic === topic ? '' : topic,
    });
  };

  const toggleMaintenance = (m) => {
    onFiltersChange({
      ...filters,
      maintenance: filters.maintenance === m.key ? '' : m.key,
      pushed: filters.maintenance === m.key ? '' : m.pushed,
    });
  };

  const toggleBeginnerFriendly = () => {
    onFiltersChange({
      ...filters,
      hasGoodFirstIssue: !filters.hasGoodFirstIssue,
    });
  };

  const hasActiveFilters = filters.language || filters.topic || filters.maintenance || filters.hasGoodFirstIssue;

  const clearAll = () => {
    onFiltersChange({
      language: '',
      topic: '',
      maintenance: '',
      pushed: '',
      hasGoodFirstIssue: false,
    });
  };

  return (
    <div className="space-y-3">
      {/* Filter group labels + chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-1">Language</span>
        {LANGUAGES.map(lang => (
          <button
            key={lang}
            onClick={() => toggleLanguage(lang)}
            className={`chip ${filters.language === lang ? 'active' : ''}`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-1">Topic</span>
        {TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`chip ${filters.topic === topic ? 'active' : ''}`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-1">Status</span>
        {MAINTENANCE.map(m => (
          <button
            key={m.key}
            onClick={() => toggleMaintenance(m)}
            className={`chip ${filters.maintenance === m.key ? 'active' : ''}`}
          >
            {m.label}
          </button>
        ))}

        <span className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

        <button
          onClick={toggleBeginnerFriendly}
          className={`chip ${filters.hasGoodFirstIssue ? 'active' : ''}`}
        >
          🌱 Beginner Friendly
        </button>

        {hasActiveFilters && (
          <>
            <span className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-signal-danger transition-colors"
            >
              <FiX className="text-sm" />
              Clear all
            </button>
          </>
        )}
      </div>
    </div>
  );
}
