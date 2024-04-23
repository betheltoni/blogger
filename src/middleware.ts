export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|favicon.ico|assets|fonts|svg|images|serviceWorker).*)(.+)',
  ],
};
