import EmptyState from '@/components/EmptyState';

export default function NotFound() {
  return (
    <EmptyState
      heading="Page not found"
      body="The page you're looking for doesn't exist, or has moved."
      cta={{ label: 'Back to homepage', href: '/' }}
    />
  );
}
