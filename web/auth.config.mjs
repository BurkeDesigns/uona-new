// import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
  // cookies: {
  //   sessionToken: {
  //     // name: "authjs.session-token",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: true,
  //       // This is key:
  //       domain: ".uona.edu",
  //     },
  //   },
  //   callbackUrl: {
  //     // name: "authjs.callback-url",
  //     options: {
  //       sameSite: "lax",
  //       path: "/",
  //       secure: true,
  //       domain: ".uona.edu",
  //     },
  //   },
  //   csrfToken: {
  //     // name: "authjs.csrf-token",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       // path: "/",
  //       secure: true,
  //       domain: ".uona.edu",
  //     },
  //   },
  // },
  providers: [
    // GitHub({
    // 	clientId: import.meta.env.GITHUB_CLIENT_ID,
    // 	clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
