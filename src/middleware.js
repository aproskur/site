import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
    locales: ['en', 'ru'],
    defaultLocale: 'en',
});

// Exclude static assets and internal routes
export const config = {
    matcher: [
        // Apply middleware only to locale-specific routes
        //'/((?!_next|favicon.ico|images|api).*)',
        '/', '/(en|ru)/:path*'
    ],
};
