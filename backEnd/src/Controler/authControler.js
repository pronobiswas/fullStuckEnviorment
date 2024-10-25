const { bcryptPassword, MakeOtp } = require("../Helper/helper.js");
const { RegModel } = require("../Model/authModel.js");
const { apiError } = require("../Utils/apiError.js");
const { apiResponse } = require("../Utils/apiResponse.js");
const { EamilChecker, PasswordChecker } = require("../Utils/checker.js");
const { sendMail } = require("../Utils/SendMail.js");

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
          new apiError(
            false,
            null,
            400,
            `${ExisUser?.UserName} Already Exist !!`
          )
        );
    }
    // now make a  password encrypt
    const hasPassword = await bcryptPassword(Password);
    // =======make OTP=====
    const otp = await MakeOtp();
    // ====regester An User========
    const RegistetionUser = await new RegModel({
      UserName: UserName,
      Email: Email,
      TelePhone: TelePhone,
      Password: hasPassword,
    }).save();
    // =======send mail=========
    const mailInfo = await sendMail(UserName, Email, otp);
    // ===========set OTP in database==============
    if (RegistetionUser || mailInfo) {
      await RegModel.findOneAndUpdate(
        {
          _id: RegistetionUser._id,
        },
        {
          $set: { OTP: otp },
        },
        {
          new: true,
        }
      );
    }
    
    // =========sending Response====
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
  } catch (error) {
    res.send(error);
  }
};
const otpMatchControler = async (req,res)=>{
  try {
    const {Email , OTP} = req.body;
    const findUser = await RegModel.findOne({Email:Email})
    if(!findUser){
      return console.log("user Cant found");
    }
    if(OTP == findUser.OTP){
      console.log("otp mileche");
      findUser.userIsVeryFied = true
      await findUser.save();
      console.log(findUser);

    }else{console.log("otp mile mnai");
    }
    
    
    
    
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = { registetionControler ,otpMatchControler };
