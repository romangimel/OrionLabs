import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

const SITE_URL_TOKEN = '__ORIONLABS_SITE_URL__';
const configDirectory = dirname(fileURLToPath(import.meta.url));

function resolveConfiguredSiteOrigin(value: string | undefined) {
  try {
    const url = new URL(value?.trim() ?? '');
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.origin : '';
  } catch {
    return '';
  }
}

/** Makes static landing metadata absolute in deployed builds when a site URL is configured. */
function browserPresentationPlugin(siteOrigin: string): Plugin {
  return {
    name: 'orionlabs-browser-presentation',
    transformIndexHtml(html) {
      return html.replaceAll(SITE_URL_TOKEN, siteOrigin);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteOrigin = resolveConfiguredSiteOrigin(env.VITE_SITE_URL);

  return {
    plugins: [react(), browserPresentationPlugin(siteOrigin)],
    resolve: {
      alias: {
        '@': resolve(configDirectory, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
