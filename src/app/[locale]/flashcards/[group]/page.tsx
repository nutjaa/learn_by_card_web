import { trackPageView } from '../../../../lib/analytics';
import { safeFetch } from '../../../../lib/data-fetcher';
import {
  getCachedStyles,
  getCachedDecks,
  getCachedGroups,
} from '../../../../services/cached-services';
import { redirect } from 'next/navigation';
import { ClientRedirect } from '../../../../components/ui/ClientRedirect';
import { createSlug } from '../../../../utils/string';
import { PageWrapper } from '../../../../components/layout';
import { SUPPORTED_LOCALES } from '../../../../lib/constants';

export async function generateStaticParams() { 
  
  // Get all groups for each locale
  const allParams = [];
  
  for (const locale of SUPPORTED_LOCALES) {
    try {
      const { data } = await safeFetch(
        () => getCachedGroups(locale),
        'Failed to fetch groups'
      );
      
      // If we have groups data, add each group to parameters
      if (data && data.member) {
        const groupParams = data.member.map(group => ({
          locale,
          group: `${group.id}-${createSlug(group.name)}`
        }));
        
        allParams.push(...groupParams);
      }
    } catch (error) {
      console.error(`Failed to fetch groups for locale ${locale}:`, error);
    }
  }
  
  // Return all params we want to pre-render
  return allParams;
}

// Simplified fetch functions
const fetchInitialStyles = (locale: string) =>
  safeFetch(() => getCachedStyles(locale), 'Failed to fetch styles');

const fetchInitialDecks = (groupId: number) =>
  safeFetch(() => getCachedDecks(groupId), 'Failed to fetch decks');

function extractStyleId(styleUrl: string): number | null {
  const match = styleUrl.match(/\/style\/(\d+)$/);
  return match ? parseInt(match[1]) : null;
}

async function GroupPageContent({
  locale,
  group,
}: {
  locale: string;
  group: string;
}) {
  const [
    { data: stylesData, error: stylesError },
    { data: decksData, error: decksError },
  ] = await Promise.all([
    fetchInitialStyles(locale),
    fetchInitialDecks(parseInt(group.split('-')[0])),
  ]);

  // Handle errors
  if (stylesError || decksError) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-2 text-gray-600">{stylesError || decksError}</p>
      </div>
    );
  }

  const firstDeck = decksData?.member[0];
  if (firstDeck && stylesData) {
    const styleId = extractStyleId(firstDeck.style as string);
    const style = stylesData.member.find((s) => s.id === styleId);

    if (style) {
      const redirectUrl = `/${locale}/flashcards/${group}/${
        firstDeck.id
      }-${createSlug(style.name)}`;

      // Try server-side redirect first
      try {
        redirect(redirectUrl);
      } catch (error) {
        // If server redirect fails, fall back to client redirect
        console.log('Server redirect failed, using client redirect', error);
        return <ClientRedirect to={redirectUrl} />;
      }
    }
  }

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold">Group Not Found</h1>
        <p className="mt-2 text-gray-600">
          The group you are looking for does not exist or has no decks
          available.
        </p>
      </div>
    </div>
  );
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ locale: string; group: string }>;
}) {
  const { locale, group } = await params;

  console.log('GroupPage params:', { locale, group });
  trackPageView('group detail');

  return (
    <PageWrapper>
      <GroupPageContent locale={locale} group={group} />
    </PageWrapper>
  );
}
