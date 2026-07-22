import { EmptyState } from "@/components/EmptyState";

/** Invalid film ID / expired link — warm, first-class state. */

export default function FilmNotFound() {
  return (
    <div className="mx-auto max-w-page px-6 md:px-10">
      <EmptyState
        title="That reel isn't in the archive."
        body="The film you're looking for doesn't exist, or its link has expired."
        actionHref="/"
        actionLabel="Browse the films"
      />
    </div>
  );
}
