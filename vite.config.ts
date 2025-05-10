import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
        }
    },
    server: {
        port: 5173,
        host: true,
        watch: {
            usePolling: true,
        },
    },
})
