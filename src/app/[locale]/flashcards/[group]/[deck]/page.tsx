import { Suspense } from 'react';
import { ErrorBoundary } from '../../../../../components/providers';
import { LoadingSpinner } from '../../../../../components/ui';
import { trackPageView } from '../../../../../lib/analytics';
import { PageWrapper } from '../../../../../components/layout';

export default async function DeckPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  console.log(locale);

  trackPageView('deck');

  return (
    <PageWrapper>xxxx</PageWrapper>
  );
}
