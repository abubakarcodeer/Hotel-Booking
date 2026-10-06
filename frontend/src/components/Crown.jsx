export function Crown({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M8 22 L16 44 L48 44 L56 22 L44 30 L32 14 L20 30 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
      <line x1="12" y1="50" x2="52" y2="50" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="10" r="2" fill="currentColor"/>
    </svg>
  );
}
