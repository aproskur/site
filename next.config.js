const createNextIntlPlugin = require("next-intl/plugin");
//const i18nConfig = require('./src/i18n/i18n');
const withNextIntl = createNextIntlPlugin('./src/i18n/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
};

module.exports = withNextIntl(nextConfig);
