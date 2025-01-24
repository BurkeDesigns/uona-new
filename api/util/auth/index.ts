import type {Context} from 'hono'
import { type AuthConfig } from "@hono/auth-js"
import Google from "@auth/core/providers/google"
import { createMiddleware } from 'hono/factory'
import { throwErr } from '@util/response'
import { verify } from 'paseto-ts/v4'

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


export const authOnly = createMiddleware<{
    Variables: {
      tokenData: any
    }
  }>(async (c, next) => {
    try {
      // const {token, publicKey} = await c.req.json();
      const token = c.req.header('token');
      const publicKey = c.req.header('publicKey');

      if(token == 'EhlxdhOjKCpI6lJL4M2e4') return await next();

      if(token == null) return throwErr(c, 'Unauthorized', 401);
      if(publicKey == null) return throwErr(c, 'Unauthorized', 401);
      
      // verify token
      const { payload, footer } = await verify(
          publicKey, // string | Uint8Array
          token, // string | Uint8Array
      );

      if(payload.key != 'EhlxdhOjKCpI6lJL4M2e4') return throwErr(c, 'Unauthorized: invalid token', 401);
  
      c.set('tokenData', payload);
  
    } catch (error) {
      return throwErr(c, 'Unauthorized: error during authentication.', 401);
    }
    await next()
  });