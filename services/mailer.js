const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const mailer = async (payload) => {
  const { to, QRCode } = payload;
  const htmlFile = await fs.readFileSync(
    __dirname + "./../templates/emailTemplate.html"
  );
  const htmlData = Buffer.from(htmlFile).toString(); // converting buffer to string
  const template = handlebars.compile(htmlData);
  const data = template({ QRCode: "cid:unique@nodemailer.com" });

  const msgOptions = {
    from: "np01cp4s210041@islingtoncollege.edu.np", // sender address
    to: to.toString(), // list of receivers
    subject: "QR Code Generator", // Subject line
    text: "OR Code",
    html: data,
    attachments: [
      {
        filename: "image.png",
        path: QRCode,
        cid: "unique@nodemailer.com",
      },
    ],
  };
  const info = await transporter.sendMail(msgOptions);

  return info.messageId;
};

module.exports = { mailer };
