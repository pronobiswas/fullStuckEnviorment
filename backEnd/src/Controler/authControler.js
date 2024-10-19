const { RegModel } = require("../Model/authModel.js");
const { apiError } = require("../Utils/apiError.js");
const { EamilChecker, PasswordChecker } = require("../Utils/checker.js");

const registetionControler = async (req, res) => {
  try {
    const { FullName, Email, TelePhone, Password } = req.body;
    if (!FullName) {
      return res
        .status(404)
        .json(
          new apiError(
            false,
            null,
            400,
            `Email_Adress Missing or Invalid Eamil  !!`
          )
        );
    }
    if (!Email || !EamilChecker(Email)) {
      return res
        .status(404)
        .json(
          new apiError(
            false,
            null,
            400,
            `Email_Adress Missing or Invalid Eamil  !!`
          )
        );
    }
    if (!Password || !PasswordChecker(Password)) {
      return res
        .status(404)
        .json(
          new apiError(
            false,
            null,
            400,
            `Password Missing or Minimum eight characters, at least one uppercase letter, one lowercase letter and one number !!`
          )
        );
    }

    const RegistetionUser = await new RegModel({
      FullName,
      Email,
      TelePhone,
      Password,
    }).save();

    // =========sending Response====
    res.status(200).json({
      sucess: true,
      data: RegistetionUser,
      message: "update data in database",
    });
    console.log(FullName);
  } catch (error) {
    res.send(error);
  }
};
module.exports = { registetionControler };
