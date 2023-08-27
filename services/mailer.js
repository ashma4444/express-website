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
  //   const htmlFile = await fs.readFileSync(
  //     __dirname + "./../templates/emailTemplate.html"
  //   );
  //   const htmlData = Buffer.from(htmlFile).toString(); // converting buffer to string
  //   const template = handlebars.compile(htmlData);
  //   const data = template({ QRCode });
  const test = Buffer.from(QRCode).toString();

  const msgOptions = {
    from: "np01cp4s210041@islingtoncollege.edu.np", // sender address
    to: to.toString(), // list of receivers
    subject: "QR Code Generator", // Subject line
    text: "OR Code",
    html: `
      <html>
        <body>
          <h1>QR Code Image</h1>
          <img src="${test}" alt="no img">
          <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKzSURBVO3BQY7cQAwEwSxC//9yeo48NSBIs17TjIgfrDGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1y8VASfpLKSRI6lSeS8JNUnijWKMUapVijXLxM5U1JuEOlS8KJyh0qb0rCm4o1SrFGKdYoF1+WhDtU7khCp9KpdEl4UxLuUPmmYo1SrFGKNcrFcEn4nxRrlGKNUqxRLv5zSehU/mXFGqVYoxRrlIsvU/lJSThR6ZLwhMpvUqxRijVKsUa5eFkS/iaVLglvSsJvVqxRijVKsUa5eEjlN0lCp9Il4Q6Vf0mxRinWKMUa5eKhJHQqXRLepNKpdEk4UemScJKEN6l8U7FGKdYoxRrl4mVJ6FS6JNyh0iXhjiR0Kt+k0iXhJAmdyhPFGqVYoxRrlPjBFyWhU+mS0Kl0SehU7kjCiUqXhBOVkyTcofKmYo1SrFGKNUr84IEknKh8UxI6lS4JncqbknCHSpeETuWJYo1SrFGKNUr84EVJeEKlS8KJSpeEO1ROktCpdEnoVE6S0Km8qVijFGuUYo0SP/iHJaFT6ZLQqXRJeJNKl4ROpUtCp/JEsUYp1ijFGuXioST8JJVO5U0qXRI6lZMkdCpdEjqVNxVrlGKNUqxRLl6m8qYknCShU+lUuiScJKFTOUnCSRI6lW8q1ijFGqVYo1x8WRLuUHlTEk5UTpLQqZyonCThROWJYo1SrFGKNcrFMEnoVJ5Q6ZJwkoQTlW8q1ijFGqVYo1wMl4Q3qZwk4W8q1ijFGqVYo1x8mco3qZwk4USlS0Kn0iXhNyvWKMUapVijXLwsCT8pCScqXRJOVLoknKjckYRO5U3FGqVYoxRrlPjBGqNYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ih/AIlBBfx0Q8CaAAAAAElFTkSuQmCC"
          alt=""
          id="qr-img"
        />
        </body>
      </html>
    `,
  };
  const info = await transporter.sendMail(msgOptions);

  return info.messageId;
};

module.exports = { mailer };