"use client";

import { useEffect } from 'react';

export default function CSSLoader() {
    useEffect(() => {
        const loadCSS = href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;

            link.onload = () => console.log(`Successfully loaded ${href}`);
            link.onerror = () => console.error(`Failed to load ${href}`);

            document.head.appendChild(link);
            return link; // Return the link element for cleanup
        };

        const links = [
            loadCSS('https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css'),
            loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'),
        ];

        return () => {
            links.forEach(link => {
                document.head.removeChild(link); // Remove the link when component unmounts
            });
        };
    }, []);

}
