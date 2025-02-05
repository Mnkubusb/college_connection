import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'College Connection',
        short_name: 'College Connection',
        description: 'College Connections – Find. Connect. Thrive.',
        start_url: '/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#000000',
        icons: [
            {
                src: '/logo_new.svg',
                sizes: '64x64 32x32 24x24 16x16',
                type: 'image/x-icon',
            },
            {
                src: '/logo_new.svg',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo_new.svg',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}