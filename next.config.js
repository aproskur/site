/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
};


async function loadConfig() {
    const { default: createNextIntlPlugin } = await import("next-intl/plugin");
    const withNextIntl = createNextIntlPlugin();
    return withNextIntl(nextConfig);
}

module.exports = loadConfig();