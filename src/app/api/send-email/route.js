import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    const { name, email, message } = body;

    // Log the values received from the request body
    console.log('Request data:', { name, email, message });

    // Set up your nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Mail options
    let mailOptions = {
        from: email,
        to: 'annapro.webdev@gmail.com',
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        // Use NextResponse for the response
        return new NextResponse(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        // Use NextResponse for error handling
        return new NextResponse(JSON.stringify({ message: 'Error in sending email' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

