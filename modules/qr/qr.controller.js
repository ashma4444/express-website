const QRCode = require("qrcode");

const qrGenarator = async (url) => {
  const data = await QRCode.toDataURL(url);
  return data;
};

module.exports = { qrGenarator };
