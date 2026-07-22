/** "marginalia!" wordmark — bubbly, cream on purple with a hard offset shadow. */
export function Wordmark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span
      className={`font-display font-extrabold tracking-tight text-cream ${
        size === 'lg' ? 'text-3xl [text-shadow:3px_3px_0_rgb(var(--color-purple-deep))]' : 'text-[1.7rem] [text-shadow:3px_3px_0_rgb(var(--color-purple-deep))]'
      }`}
    >
      marginalia<span className="text-sun">!</span>
    </span>
  );
}
