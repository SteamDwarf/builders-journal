import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: '/src',
            assets: '/src/assets',
            app: '/src/app',
            pages: '/src/pages',
            widgets: '/src/widgets',
            features: '/src/features',
            entities: '/src/entities',
            shared: '/src/shared',
            AppConstants: '/src/AppConstants.ts',
            buffer: 'buffer',
            main: '/src/main.tsx',
            types: '/src/types.ts',
        },
    },
    server: {
        port: 3000,
        strictPort: true,
        host: '0.0.0.0',
    },
});
