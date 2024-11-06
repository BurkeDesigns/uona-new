/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference path="../.astro/types.d.ts" />

type NetlifyLocals = import('@astrojs/netlify').NetlifyLocals

declare namespace App {
  interface Locals extends NetlifyLocals {
    // ...
  }
}

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    'el'?: unknown;
  }
}

