const nodemailer = require('nodemailer')
module.exports.sendEmail = (emailReceive,subject,html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_SENT_OTP,
            pass: process.env.PASS_APP_SENT_OTP
        }
    });
    
    const mailOptions = {
        from: process.env.GMAIL_SENT_OTP,
        to: "ptbngoc16103@gmail.com",
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}