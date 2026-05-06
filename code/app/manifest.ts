import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hạnh & Tín Wedding Invitation',
    short_name: 'Hạnh & Tín',
    description: 'Thiệp mời đám cưới Hạnh & Tín',
    start_url: '/',
    display: 'standalone',
    background_color: '#7B171B',
    theme_color: '#7B171B',
    icons: [
      {
        src: '/icon.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  }
}
