import { FiBookOpen, FiGitPullRequest, FiExternalLink, FiCheckCircle, FiCode, FiMessageCircle, FiFileText, FiSearch } from 'react-icons/fi';

const STEPS = [
  {
    icon: <FiSearch className="text-lg" />,
    title: 'Find Repos That Match Your Skills',
    desc: 'Use Forkling\'s home page to filter repos by language, topic, and beginner-friendliness. Look for repos with "good first issue" labels — they\'re specifically designed for newcomers.',
  },
  {
    icon: <FiBookOpen className="text-lg" />,
    title: 'Read CONTRIBUTING.md',
    desc: 'Every well-maintained project has a CONTRIBUTING file. It tells you how to set up the project locally, coding standards, commit message conventions, and how to submit PRs.',
  },
  {
    icon: <FiCode className="text-lg" />,
    title: 'Set Up Locally & Explore',
    desc: 'Fork the repo, clone it, and follow the setup instructions. Build the project, run the tests, and explore the codebase before making any changes.',
  },
  {
    icon: <FiGitPullRequest className="text-lg" />,
    title: 'Open a Focused Pull Request',
    desc: 'Start small — a docs fix, a test addition, or a small bug fix. Write a clear PR description explaining what you changed and why. Link it to the issue you\'re addressing.',
  },
  {
    icon: <FiMessageCircle className="text-lg" />,
    title: 'Respond to Feedback Gracefully',
    desc: 'Maintainers may request changes — this is normal and part of the learning process. Be responsive, ask questions when unclear, and iterate on your code.',
  },
  {
    icon: <FiFileText className="text-lg" />,
    title: 'Document Your Contribution',
    desc: 'Once merged, add the contribution to your portfolio or resume. Open-source work is real-world experience that demonstrates collaboration skills.',
  },
];

const RESOURCES = [
  { label: 'GitHub\'s "How to Contribute" Guide', url: 'https://opensource.guide/how-to-contribute/' },
  { label: 'Choose a License', url: 'https://choosealicense.com/' },
  { label: 'First Contributions (Practice Repo)', url: 'https://github.com/firstcontributions/first-contributions' },
  { label: 'Open Source Initiative', url: 'https://opensource.org/' },
  { label: 'Git Handbook', url: 'https://guides.github.com/introduction/git-handbook/' },
  { label: 'Conventional Commits', url: 'https://www.conventionalcommits.org/' },
];

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-accent-gold text-xs font-bold uppercase tracking-[0.15em] mb-6">
          <FiBookOpen className="text-sm" />
          Contributor Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Start Contributing with <span className="hero-gradient-text">Confidence</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Whether you've never opened a pull request or you're looking to contribute more effectively, this guide covers everything you need to know.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">
          This is editorial content — not generated or fetched from any API.
        </p>
      </div>

      {/* Section 1: Open Source Basics */}
      <section className="mb-14">
        <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-accent-gold text-sm font-extrabold">1</span>
          Open Source Basics
        </h2>
        <div className="bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2">What is Open Source?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Open-source software is code that anyone can inspect, modify, and enhance. Projects are typically hosted on platforms like GitHub, where contributors from around the world collaborate asynchronously using git, pull requests, and issue trackers.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2">Understanding Licenses</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Every open-source project has a license that defines how the code can be used. <strong className="text-gray-700 dark:text-gray-300">Permissive licenses</strong> (MIT, Apache 2.0, BSD) allow almost any use. <strong className="text-gray-700 dark:text-gray-300">Copyleft licenses</strong> (GPL, AGPL) require derivative works to remain open-source. Always read the license before contributing.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2">Where to Start</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Start with documentation improvements, bug reports, or issues labeled "good first issue." These are designed for newcomers and often come with guidance from maintainers. You don't need to be an expert — you just need to be willing to learn.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Step-by-Step Guide */}
      <section className="mb-14">
        <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-accent-gold text-sm font-extrabold">2</span>
          Contribute to a Repo
        </h2>
        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-accent-gold/40 via-accent-gold/20 to-transparent hidden sm:block" />

          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex gap-5">
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center text-accent-gold">
                  <span className="text-sm font-extrabold">{i + 1}</span>
                </div>
                <div className="bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2 text-accent-gold">
                    {step.icon}
                    <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Resources */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold font-headline text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-accent-gold text-sm font-extrabold">3</span>
          Useful Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESOURCES.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white dark:bg-[#161A22] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-accent-gold/50 hover:shadow-sm transition-all group"
            >
              <FiExternalLink className="text-gray-400 group-hover:text-accent-gold transition-colors flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-accent-gold transition-colors">{resource.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8 border-t border-gray-200 dark:border-gray-800">
        <FiCheckCircle className="text-accent-gold text-3xl mx-auto mb-3" />
        <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Ready to contribute?</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Head to the home page and find a repo that matches your skills.</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-white font-bold rounded-xl hover:bg-accent-gold-dark transition-colors shadow-lg shadow-amber-500/20">
          Browse Repos →
        </a>
      </div>
    </div>
  );
}
