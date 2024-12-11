import React, { useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ReCAPTCHAComponent = ({ onTokenChange }) => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        const loadRecaptcha = async () => {
            if (executeRecaptcha) {
                try {
                    const token = await executeRecaptcha('contactFormSubmission');
                    console.log('ReCAPTCHA token:', token);
                    onTokenChange(token); // Pass token to parent component
                } catch (error) {
                    console.error('Error executing reCAPTCHA:', error);
                }
            }
        };

        loadRecaptcha();
    }, [executeRecaptcha, onTokenChange]);

    return null;
};

export default ReCAPTCHAComponent;
