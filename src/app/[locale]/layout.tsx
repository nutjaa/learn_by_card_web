import { SUPPORTED_LOCALES } from '@/lib/language-utils';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Await params before using its properties
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  console.log('LocaleLayout params:', { locale });
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return children;
}
