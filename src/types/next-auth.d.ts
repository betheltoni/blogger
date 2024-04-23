import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

import { IUserObject } from '@/types';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    token: string;
    user: DefaultSession['user'] & {
      token: string;
      user: IUserObject;
    };
  }

  interface User {
    token: string;
    user: IUserObject;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    /** OpenID ID Token */
    user: {
      token: string;
      user: IUserObject;
    };
  }
}
