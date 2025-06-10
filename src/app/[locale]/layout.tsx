import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '../../lib/constants';
import { LocaleProvider } from '../../components/providers/LocaleProvider';

// Add this function to generate static paths for each locale
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log('LocaleLayout params:', { locale });
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
