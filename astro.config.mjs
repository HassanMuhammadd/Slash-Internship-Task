import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import tailwind from '@astrojs/tailwind';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
    integrations: [storyblok({
        accessToken: 'dLv4AdSt2ct1PzVTdyDUBgtt',
        apiOptions: {
            region: ''
        },
        bridge: {
            customParent: 'https://app.storyblok.com'
        },
        components: {
            page: 'storyblok/Page',
            navbar: 'storyblok/Navbar',
            hero: 'storyblok/Hero',
            productsPage: 'storyblok/ProductsPage',
            aboutPage: 'storyblok/aboutPage',
        }
    }), tailwind(), react()],
    vite: {
        plugins: [basicSsl()],
        server: {
            https: true
        }
    }
});