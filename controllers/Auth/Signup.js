const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ValidateEmail = require("../../utils/ValidateEmail");
const ValidatePhoneNum = require("../../utils/ValidatePhoneNum");
const { JWT_SECRET, JWT_EXP } = require("../../config");

/* const AWS = require('aws-sdk');
const s3=new AWS.S3({
  accesskeyId:process.env.AWS_ID,
  screstAccessKet:process.env.AWS_SECRET
}) */

module.exports = async (req, res) => {

  const { name, email, phone_num, password } = req.body;

  let error = {};
  if (!name || name.trim().length === 0) {
    error.name = "name field must be required";
  }
  if (!ValidateEmail(email)) {
    error.email = "email address should be valid ";
  }
  if (!email || email.trim().length === 0) {
    error.email = "email field must be required";
  }
  if (!password || password.trim().length === 0) {
    error.password = "password must be required";
  }
  if(!ValidatePhoneNum(phone_num)){
    error.phone_num = "Phone number should be valid";
  }

  if (Object.keys(error).length) {
    return res.status(422).json({ error });
  }

  try {
    const user = await User.findOne({ email });
    if (user) res.status(400).json({ error: "email already exists" });
    const hashPassword = await bcrypt.hash(password, 8);

    const registerUser = new User({
      name,
      email,
      password: hashPassword,
      phone_num: phone_num
    });

    const saveUser = await registerUser.save();

    const token = jwt.sign({ userId: saveUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXP,
    });

    saveUser.active = true;
    await saveUser.save();

    // S3 code, must be enabled when bucket available in cloud.
    /* let myFile=req.file.originalname.split(".");
    const fileType=myFile[myFile.length-1];
    const params={
      Bucket:process.env.AWS_BUCKET_NAME,
      // image is stored as name_phone_num.png
      Key:`${name}_${phone_num}.${fileType}`,
      Body: req.file.buffer
    }

    let upload_data;
    s3.upload(params,(err, data)=>{
      if(err){
        res.status(500).json({error: "Something went wrong", message: err.message})
      }
      upload_data=data
    }) */
    
    res.status(201).json({
      message: `Account created for ${email}`,
      data: {
        token,
      },
      /* Upload_info:{
        upload_data
      } */
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong", message: err.message });
  }
};
