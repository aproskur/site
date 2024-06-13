'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

const ReCAPTCHAComponent = ({ onTokenChange }) => {
    const recaptchaRef = useRef(null);

    const handleRecaptchaChange = (value) => {
        onTokenChange(value);
    };

    useEffect(() => {
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    }, []);

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            size="invisible"
            onChange={handleRecaptchaChange}
        />
    );
};

export default ReCAPTCHAComponent;
