import { ItemTheme } from '@/models/common.type';
import { detailTheme } from '@/services/list-theme';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const id = params.id;
  const url = `https://www.moonkits.com/${id}`;
  // fetch data
  const event: ItemTheme = await detailTheme(Number(id));

  return {
    title: event.name,
    openGraph: {
      title: event.name,
      type: 'website',
      description: event.overview,
      images: [
        {
          url: event?.media?.previews?.[0], // Must be an absolute URL
          width: 800,
          height: 600
        }
      ],
      url
    }
  };
}

export default function ThemeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
