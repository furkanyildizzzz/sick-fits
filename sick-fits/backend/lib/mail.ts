/*
ok -- go to ethereal then create develop account
ok -- use nodemailer
-- create transporter with etherela credentials
-- create email template in function createNiceEmail (text:String): string
-- create interface MailResponse{message:string}
-- create in async function sendPasswordResetEmail(resetToken:string, to:string):Promise<void> {
    const info = await transporter.sendMail({...}) as MailResponse;
console.log(info)
    if process.env.MAIL_USER.includes('ethereal.email'){
    cosnole.log('Message sent Prewiev it at {getTestMessageUrl(info)}') --import getTestMessageUrl from nodemailer
    }

 }

--call sendPasswordResetEmail function in keystone.ts
--try to send reset request mail from frontend and check your mailbox in ethereal then click the link in the email and try to change your password

--change your interface according to response from transporter.SendMail (visit maketypes from json site)
 */

import nodemailer = require('nodemailer');
import SMTPConnection = require('nodemailer/lib/smtp-connection');

interface IMessageInfo {
    message: string
}

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,

    },
} as nodemailer.TransportOptions);

const createNiceEmail = (text: string): string => `<!DOCTYPE html>
<style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: #fff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
    <div class="container">
        <p>Hi [Recipient's Name],</p>
        <p>We received a request to reset your password for your SickFits account. You can reset your password by clicking the link below:</p>
        <a href="${text}" class="button">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email or contact our support team if you have any questions.</p>
        <p>For your security, this password reset link will expire in 24 hours.</p>
        <p>Thank you,</p>
        <p>The SickFits Team</p>
    </div>
`;

const sendPasswordResetEmail = async (
    resetToken: string,
    to: string
): Promise<void> => {

    const info = await transporter.sendMail({
        from: 'furkan@sicfits.com',
        to: to,
        subject: 'Password Reset Link',
        html: createNiceEmail(`${process.env.FRONTEND_URL}/reset?token=${resetToken}`)
    }) as nodemailer.SentMessageInfo;
    console.log("Message sent: ", info);

    if (process.env.MAIL_USER.includes('ethereal.email')) {
        console.log(`Message sent Prewiev it at ${nodemailer.getTestMessageUrl(info)}`)
    }
};

export default sendPasswordResetEmail;