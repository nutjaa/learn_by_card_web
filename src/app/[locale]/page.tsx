import { GroupsClient, RunningNavbar } from '@/components/groups/index';
import { trackPageView } from '../../lib/analytics';
import { safeFetch } from '../../lib/data-fetcher';
import { getCachedGroups } from '../../services/cached-services';
import { PageWrapper } from '../../components/layout';
import { SUPPORTED_LOCALES } from '../../lib/constants';

// Add this function to generate static paths for each locale
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}

// Simplified fetch function using the cached service
const fetchInitialGroups = (locale: string) =>
  safeFetch(() => getCachedGroups(locale), 'Failed to fetch groups');

// Separate component for the main content
async function HomeContent({ locale }: { locale: string }) {
  const { data: initialGroupsData, error } = await fetchInitialGroups(locale);

  return (
    <>
      <RunningNavbar initialData={initialGroupsData} />
      <main className="p-3">
        <GroupsClient initialData={initialGroupsData} initialError={error} />
      </main>
    </>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  trackPageView('home');

  return (
    <PageWrapper>
      <HomeContent locale={locale} />
    </PageWrapper>
  );
}
