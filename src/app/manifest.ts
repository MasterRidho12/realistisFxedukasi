import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RealistisFx — Platform Edukasi Trading Forex',
    short_name: 'RealistisFx',
    description:
      'Edukasi bisnis trading forex bertahap, terarah & terkonsep. Bukan perjudian cepat kaya. SOP Money Management 1% & Anti-Margin Call.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#005A36',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/images/logo-green.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
