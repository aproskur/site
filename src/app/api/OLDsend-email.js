import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME, // Your Gmail address
            pass: process.env.EMAIL_PASSWORD, // Your Gmail password or App Password
        },
    });

    // Set up email data
    let mailOptions = {
        from: email, // sender address
        to: 'annapro.webdev@gmail.com', // your own email to receive messages
        subject: `New Contact Message from ${name}`,
        text: `You have received a new message: \n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
}
