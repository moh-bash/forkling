/**
 * ForkyState — reusable Forky mascot moment.
 * Small personality touch for empty states, errors, and loading.
 * Props:
 *   message  {string}  — one short sentence of copy
 *   size     {'sm'|'md'|'lg'}  — controls image size (default 'md')
 *   spin     {boolean} — adds a gentle float animation for loading states
 */
export default function ForkyState({ message, size = 'md', spin = false }) {
  const sizeMap = { sm: 48, md: 72, lg: 96 };
  const px = sizeMap[size] ?? 72;

  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src="/Forkling_logo.png"
        alt="Forky the axolotl"
        width={px}
        height={px}
        className={`object-contain select-none ${spin ? 'animate-float' : ''}`}
        style={{ width: px, height: px }}
      />
      {message && (
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-xs text-center leading-snug">
          {message}
        </p>
      )}
    </div>
  );
}
