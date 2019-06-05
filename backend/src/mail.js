const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

const niceEmail = text => `
    <div class="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: 'Roboto';
        line-height: 2;
        font-size: 20px;
        ">
        <h2>Hello There</h2>
        <p> ${text}</p>
        <p>Spontane</p>
    </div>
`

exports.transport = transport;
exports.niceEmail = niceEmail;