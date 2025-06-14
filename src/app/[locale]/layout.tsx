import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '../../lib/constants';
import { LocaleProvider } from '../../components/providers/LocaleProvider';

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
