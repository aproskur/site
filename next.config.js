/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
};

const withNextIntl = require('next-intl/plugin')();

const configWithIntl = withNextIntl(nextConfig);

configWithIntl.env = configWithIntl.env || {};
if (typeof configWithIntl.env._next_intl_trailing_slash !== 'string') {
    configWithIntl.env._next_intl_trailing_slash = 'false';
}

module.exports = configWithIntl;
