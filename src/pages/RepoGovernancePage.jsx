import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCommunityProfile, getRepo } from '@/api/github';
import { FiCheck, FiX, FiShield, FiFileText, FiUsers, FiBookOpen, FiAlertTriangle } from 'react-icons/fi';

const CHECKS = [
  { key: 'readme', label: 'README', icon: <FiBookOpen className="text-sm" />, desc: 'Project overview and setup instructions' },
  { key: 'contributing', label: 'CONTRIBUTING', icon: <FiUsers className="text-sm" />, desc: 'Guidelines for contributors' },
  { key: 'code_of_conduct', label: 'Code of Conduct', icon: <FiShield className="text-sm" />, desc: 'Community behavior standards' },
  { key: 'license', label: 'LICENSE', icon: <FiFileText className="text-sm" />, desc: 'Legal usage terms' },
  { key: 'issue_template', label: 'Issue Template', icon: <FiAlertTriangle className="text-sm" />, desc: 'Structured issue reporting' },
  { key: 'pull_request_template', label: 'PR Template', icon: <FiFileText className="text-sm" />, desc: 'Pull request guidelines' },
];

function classifyLicense(license) {
  if (!license) return { type: 'none', label: 'No License', color: 'text-gray-500' };
  const spdx = license.spdx_id?.toLowerCase() || '';
  const permissive = ['mit', 'apache-2.0', 'bsd-2-clause', 'bsd-3-clause', 'isc', 'unlicense', '0bsd'];
  const copyleft = ['gpl-2.0', 'gpl-3.0', 'agpl-3.0', 'lgpl-2.1', 'lgpl-3.0', 'mpl-2.0'];
  if (permissive.includes(spdx)) return { type: 'permissive', label: 'Permissive', color: 'text-signal-healthy' };
  if (copyleft.includes(spdx)) return { type: 'copyleft', label: 'Copyleft', color: 'text-signal-warn' };
  return { type: 'other', label: 'Other', color: 'text-signal-active' };
}

export default function RepoGovernancePage() {
  const { owner, repoName } = useParams();
  const [profile, setProfile] = useState(null);
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [profileData, repoData] = await Promise.all([
          getCommunityProfile(owner, repoName).catch(() => null),
          getRepo(owner, repoName).catch(() => null),
        ]);
        setProfile(profileData);
        setRepo(repoData);
      } catch {
        // Silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [owner, repoName]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 animate-pulse">
            <div className="h-4 w-40 skeleton mb-3" />
            <div className="h-20 skeleton rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  const files = profile?.files || {};
  const healthPct = profile?.health_percentage || 0;
  const license = classifyLicense(repo?.license);

  const checkResults = CHECKS.map(check => {
    let present = false;
    if (check.key === 'readme') present = !!files.readme;
    else if (check.key === 'contributing') present = !!files.contributing;
    else if (check.key === 'code_of_conduct') present = !!files.code_of_conduct;
    else if (check.key === 'license') present = !!repo?.license;
    else if (check.key === 'issue_template') present = !!files.issue_template;
    else if (check.key === 'pull_request_template') present = !!files.pull_request_template;
    return { ...check, present };
  });

  const passed = checkResults.filter(c => c.present).length;

  let healthColor, healthBg;
  if (healthPct >= 70) { healthColor = 'text-signal-healthy'; healthBg = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'; }
  else if (healthPct >= 40) { healthColor = 'text-signal-warn'; healthBg = 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40'; }
  else { healthColor = 'text-signal-danger'; healthBg = 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/40'; }

  return (
    <div className="space-y-6">
      {/* Health Score */}
      <div className={`${healthBg} border rounded-2xl p-6 text-center`}>
        <div className={`text-4xl font-extrabold font-headline ${healthColor}`}>{healthPct}%</div>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">Community Health Score</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{passed}/{CHECKS.length} checks passed</p>
      </div>

      {/* Checklist */}
      <div className="bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-100 dark:divide-gray-800">
        {checkResults.map(check => (
          <div key={check.key} className="flex items-center gap-4 p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${check.present ? 'bg-emerald-100 dark:bg-emerald-950/30' : 'bg-red-100 dark:bg-red-950/30'}`}>
              {check.present ? (
                <FiCheck className="text-signal-healthy font-bold" />
              ) : (
                <FiX className="text-signal-danger font-bold" />
              )}
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                {check.icon} {check.label}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{check.desc}</p>
            </div>
            <span className={`text-xs font-bold ${check.present ? 'text-signal-healthy' : 'text-signal-danger'}`}>
              {check.present ? 'Found' : 'Missing'}
            </span>
          </div>
        ))}
      </div>

      {/* License Details */}
      <div className="bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <FiShield className="text-accent-gold" />
          License
        </h3>
        {repo?.license ? (
          <div className="flex items-center gap-3">
            <span className={`text-lg font-extrabold font-headline ${license.color}`}>
              {repo.license.spdx_id}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              license.type === 'permissive' ? 'badge-healthy' :
              license.type === 'copyleft' ? 'badge-warn' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              {license.label}
            </span>
            {repo.license.name && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{repo.license.name}</span>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No license detected. Contributions may be restricted.</p>
        )}
      </div>
    </div>
  );
}
