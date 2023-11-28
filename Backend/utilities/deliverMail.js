const nodemailer = require("nodemailer");

// Function to deliver an email using nodemailer
const deliverMail = async (options) => {
    // Creating a nodemailer transporter with SMTP configuration
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
    });

    // Configuring email options
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Sending the email using the transporter's sendMail method
    await transporter.sendMail(mailOptions);
};

module.exports = deliverMail;
