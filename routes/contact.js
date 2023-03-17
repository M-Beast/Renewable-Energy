const express = require('express');
const route = express.Router();
const nodemailer = require("nodemailer");
const DB = require('../Modules/UsersDB');

route.post('/', (req, res) => {
    console.log(req.body)
    const { name, email, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "renewableenergy1223@gmail.com",
            pass: "msmhtidrgblwofex",
        },
    });

    const mailOptions = {
        from: "renewableenergy1223@gmail.com",
        to: "nadermedo1577@gmail.com",
        subject: "New Message from Contact Form",
        html: `<p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message}</p>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err);
            res.status(500).send({ success: false, message: "Error sending message" });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send({ ok: "OK" });
        }
    });
});

module.exports = route;