const bcrypt = require("bcrypt");
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

  module.exports = { bcryptPassword, decodeHashPassword };