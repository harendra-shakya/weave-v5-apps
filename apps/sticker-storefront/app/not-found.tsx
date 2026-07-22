import { EmptyState } from '@/components/EmptyState';

export default function NotFound() {
  return (
    <div className="py-20">
      <EmptyState
        note="off the page"
        title="There's nothing at this address."
        body="The link may be mistyped or from an older drop. Everything current is on the front page."
        actionLabel="See the current drop"
        actionHref="/"
      />
    </div>
  );
}
