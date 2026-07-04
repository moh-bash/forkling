import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getContributors } from '@/api/github';
import { FiExternalLink, FiGitCommit } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function RepoContributorsPage() {
  const { owner, repoName } = useParams();
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getContributors(owner, repoName, 30, page);
        const items = Array.isArray(data) ? data : [];
        setContributors(page === 1 ? items : prev => [...prev, ...items]);
      } catch {
        setContributors([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [owner, repoName, page]);

  const maxContribs = contributors.length > 0 ? contributors[0].contributions : 1;
  const chartData = contributors.slice(0, 10).map(c => ({
    name: c.login,
    commits: c.contributions,
  }));

  if (loading && contributors.length === 0) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
            <div className="w-10 h-10 rounded-full skeleton" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-32 skeleton" />
              <div className="h-2 w-full skeleton rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top 10 Chart */}
      {chartData.length > 0 && (
        <div className="bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Top Contributors</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#9CA3AF' }} width={80} />
              <Tooltip
                contentStyle={{ background: '#161A22', border: '1px solid #23272F', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#F3F4F6', fontWeight: 700 }}
                itemStyle={{ color: '#D6A228' }}
              />
              <Bar dataKey="commits" fill="#D6A228" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Contributor List */}
      <div className="bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-100 dark:divide-gray-800">
        {contributors.map((c, i) => (
          <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-6 text-right">#{i + 1}</span>
            <img src={c.avatar_url} alt={c.login} className="w-9 h-9 rounded-full flex-shrink-0 border border-gray-200 dark:border-gray-700" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{c.login}</span>
                <a href={c.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-gold transition-colors">
                  <FiExternalLink className="text-xs" />
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden max-w-xs">
                  <div
                    className="h-full rounded-full bg-accent-gold transition-all duration-500"
                    style={{ width: `${(c.contributions / maxContribs) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 flex-shrink-0">
                  <FiGitCommit className="text-[10px]" />
                  {c.contributions.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {contributors.length >= 30 && (
        <div className="text-center">
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-accent-gold hover:text-accent-gold transition-all"
          >
            {loading ? 'Loading...' : 'Load More Contributors'}
          </button>
        </div>
      )}
    </div>
  );
}
