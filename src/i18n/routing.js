const { defineRouting } = require('next-intl/routing');
const { createNavigation } = require('next-intl/navigation');

const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'ru'],

    // Used when no locale matches
    defaultLocale: 'en'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);

module.exports = {
    routing,
    Link,
    redirect,
    usePathname,
    useRouter,
    getPathname
};
