import type {Context} from 'hono'
import { type AuthConfig } from "@hono/auth-js"
import Google from "@auth/core/providers/google"

export function getAuthConfig(c: Context): AuthConfig {
    return {
      secret: c.env.AUTH_SECRET,
      providers: [
        Google({
          clientId: c.env.GOOGLE_CLIENT_ID,
          clientSecret: c.env.GOOGLE_CLIENT_SECRET
        }),
      ],
      trustHost: true,
    }
  }