import nodemailer from 'nodemailer';
import validator from 'validator';
import sanitizeHtml from 'sanitize-html';
import { NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import axios from 'axios';

// Set up the rate limiter
const rateLimiter = new RateLimiterMemory({
    points: 5, // Maximum number of requests
    duration: 15 * 60, // Per window time in seconds (15 minutes)
});

// Google reCAPTCHA verification function
async function verifyRecaptcha(token) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify`;

    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);

    try {
        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { success, score } = response.data;
        if (success) {
            console.log(`reCAPTCHA verification successful with score: ${score}`);
            return true;
        } else {
            console.log('reCAPTCHA verification failed');
            return false;
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error.message);
        return false;
    }
}


// Middleware for rate limiting
async function rateLimitMiddleware(req, res) {
    try {
        await rateLimiter.consume(req.headers.get('x-forwarded-for') || '127.0.0.1');
        // Continue to the next handler if rate limit is not exceeded
    } catch (rateLimitError) {
        // Rate limit exceeded, send response
        return new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// API endpoint handler
export async function POST(request) {
    const rateLimitResult = await rateLimitMiddleware(request);
    if (rateLimitResult) return rateLimitResult;

    const { token, name, email, message } = await request.json();

    // Verify reCAPTCHA
    const recaptchaValid = await verifyRecaptcha(token);
    if (!recaptchaValid) {
        return new NextResponse(JSON.stringify({ error: 'reCAPTCHA verification failed' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Validate other form fields (name, email, message)
    if (!name || validator.isEmpty(name)) {
        return new NextResponse(JSON.stringify({ error: 'Name is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!email || !validator.isEmail(email)) {
        return new NextResponse(JSON.stringify({ error: 'Invalid email address' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!message || validator.isEmpty(message)) {
        return new NextResponse(JSON.stringify({ error: 'Message cannot be empty' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Validate message length
    if (!validator.isLength(message, { max: 5000 })) {
        return new NextResponse(JSON.stringify({ error: 'Message must be less than 5000 characters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeHtml(email, {
        allowedTags: [], // Allow no HTML tags in email
        allowedAttributes: {}, // Allow no HTML attributes
    });

    const sanitizedMessage = sanitizeHtml(message, {
        allowedTags: ['b', 'i', 'em', 'strong', 'p', 'ul', 'ol', 'li'], // Example: Allow basic formatting tags
        allowedAttributes: {}, // No attributes allowed
    });

    // Set up nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Mail options
    let mailOptions = {
        from: sanitizedEmail,
        to: 'annapro.webdev@gmail.com',
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return new NextResponse(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new NextResponse(JSON.stringify({ message: 'Error in sending email' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
