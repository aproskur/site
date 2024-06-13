"use client";

import { useEffect } from 'react';

export default function CSSLoader() {
    useEffect(() => {
        const loadCSS = href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        };

        loadCSS('https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css');
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');
    }, []);

    return null; // This component doesn't render anything itself
}
