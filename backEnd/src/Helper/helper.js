const bcrypt = require("bcrypt");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
// =========Encodeing Password===========
const bcryptPassword = async (password) => {
  try {
    const hasPasword = await bcrypt.hash(password, 10);
    return hasPasword;
  } catch (error) {
    console.log(error);
  }
};
//   ===========decodeing Password==========
const decodeHashPassword = async (plainPassword, encryptedPassword) => {
  const passwordResult = await bcrypt.compare(plainPassword, encryptedPassword);
  return passwordResult;
};
// ===========OTPgenerator========
const MakeOtp = async () => {
  return aleaRNGFactory(new Date()).uInt32().toString().slice(0, 4);
};

module.exports = { bcryptPassword, decodeHashPassword, MakeOtp };
