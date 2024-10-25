const nodemailer = require("nodemailer");
const { makeTemplate } = require("./makeTamplate");

const sendMail = async (UserName, Email, otp) => {
  console.log("send mail a asche");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: "bpronob.biswas.info@gmail.com",
        pass: "rivn bvmp onth lvov",
      },
    });

    const info = await transporter.sendMail({
      from: "bpronob.biswas.info@gmail.com",
      to: `${Email}`,
      subject: "confirmetion mail  👻",
      html: makeTemplate(UserName,otp),
    });

    console.log(info);
    return info;
  } catch (error) {
    console.log("From sendMail Fucntion :", error);
  }
};

module.exports = { sendMail };
