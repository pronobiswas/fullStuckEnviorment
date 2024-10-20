const { bcryptPassword } = require("../Helper/helper.js");
const { RegModel } = require("../Model/authModel.js");
const { apiError } = require("../Utils/apiError.js");
const { EamilChecker, PasswordChecker } = require("../Utils/checker.js");

const registetionControler = async (req, res) => {
  try {
    const { UserName, Email, TelePhone, Password } = req.body;
    if (!UserName) {
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
    // =========Check if user Alrady exist or not=====
    const ExisUser = await RegModel.find({
      $or: [{ TelePhone: TelePhone }, { Email: Email }],
    });
    if (ExisUser?.length) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            400,
            `${ExisUser[0]?.FirstName} Already Exist !!`
          )
        );
    }
    // now make a  password encrypt
    const hasPassword = await bcryptPassword(Password);
    // ====regester An User========
    const RegistetionUser = await new RegModel({
      UserName: UserName,
      Email: Email,
      TelePhone: TelePhone,
      Password: hasPassword,
    }).save();
    
    console.log(RegistetionUser);

    // =========sending Response====
    if (RegistetionUser) {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            RegistetionUser,
            200,
            null,
            "Registration  sucesfull"
          )
        );
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports = { registetionControler };
