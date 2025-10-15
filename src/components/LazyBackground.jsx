import { useEffect, useRef, useState } from 'react';

const LazyBackground = ({ className, src, children }) => {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const container = entry.target;
                        container.style.backgroundImage = `url(${src})`;
                        setLoaded(true);
                        observer.unobserve(container);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [src]);

    return (
        <div
            ref={containerRef}
            className={`${className} ${loaded ? 'loaded' : 'loading'}`}
            style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {children}
        </div>
    );
};

export default LazyBackground;
