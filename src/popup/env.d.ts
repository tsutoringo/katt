/// <reference types="vite/client" />

declare const __GIT_BRANCH__: string;
declare const __GIT_HASH__: string;
declare const __GIT_SHORT_HASH__: string;


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
