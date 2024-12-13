

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(({ requestLocale }) => {
    const supportedLocales = ['en', 'ru'];
    const defaultLocale = 'en';

    // Validate or adjust the locale
    const locale = supportedLocales.includes(requestLocale) ? requestLocale : defaultLocale;

    return {
        locales: supportedLocales,
        defaultLocale,
        requestLocale: locale,
    };
});
