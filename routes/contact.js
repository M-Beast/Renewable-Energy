const express = require('express');
const route = express.Router();
const nodemailer = require("nodemailer");
const config = require('../config');
const DB = require('../Modules/UsersDB');

route.post('/', (req, res) => {
    console.log(req.body)
    const { name, email, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.Email.Sender.email,
            pass: config.Email.Sender.pass
        },
    });

    const mailOptions = {
        from: config.Email.Sender.email,
        to: config.Email.Receiver.email,
        subject: "New Message from Contact Form",
        html: `<p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message}</p>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err);
            res.status(500).redirect('/');
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).redirect('/');
        }
    });
});

module.exports = route;