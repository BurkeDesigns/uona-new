// custom-attributes.d.ts
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    el?: string; // Add the custom "el" attribute
  }
}