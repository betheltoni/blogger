'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

interface IProviders extends PropsWithChildren {
  session: Session | null;
}

const Providers = ({ children, session }: IProviders) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
