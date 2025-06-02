import { APP_CONFIG } from '@/lib/constants';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{APP_CONFIG.name}</h1>
      <p className="text-gray-600">{APP_CONFIG.description}</p>
      <p className="text-sm text-gray-500">Version: {APP_CONFIG.version}</p>
    </div>
  );
}
