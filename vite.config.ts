import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension from 'vite-plugin-web-extension';
import path from 'path';
import gitRevision from 'git-revision';

function root(...paths: string[]): string {
  return path.resolve(__dirname, ...paths);
}

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  define: {
    __GIT_BRANCH__: JSON.stringify(gitRevision('branch')),
    __GIT_HASH__: JSON.stringify(gitRevision('long')),
    __GIT_SHORT_HASH__: JSON.stringify(gitRevision('short'))
  },
  build: {
    outDir: root("dist"),
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    webExtension({
      manifest: root("src/manifest.json"),
      assets: "assets",
      browser: process.env.TARGET,
      webExtConfig: {
        firefox: "firefox",
      },
      verbose: true,
    }),
  ],
});
