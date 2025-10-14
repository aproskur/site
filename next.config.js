/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
};

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl(nextConfig);
