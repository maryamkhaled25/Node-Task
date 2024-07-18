
import { User } from "../../../databases/models/user.model.js";
import { emailHtml } from "../../emailing/email.html.js";
import { sendEmail } from "../../emailing/user.email.js";
import { catchAsyncErr } from "../../utilies/catchError.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


//====================1)signUp(add) ====================
const signup = catchAsyncErr(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.json({ message: "This Email is already in use" });
  } else {
    const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
    
    user = await User.insertMany({ name, email, password: hash }, { new: true });
    var token = jwt.sign({ email }, process.env.JWT_KEY);  //sign (data that is in payload , secret key)
    sendEmail({email, html: emailHtml(token)});
    res.status(201).json({ message: "inserted success" , user});
  }
});


//====================2)signIn ====================
const signin = catchAsyncErr(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).json({ message: "incorrect email or password" });
  }

  user["password"] = undefined;
  var token = jwt.sign({ user }, process.env.JWT_KEY);  //sign (data that is in payload , secret key)
  res.json({ message: "login successfully", token });
});


//====================3)verify ====================
const verify = catchAsyncErr(async (req, res) => {
  let { token } = req.params;
  jwt.verify(token,process.env.JWT_KEY,async function(err,decoded){
    if(!err){
      await User.findOneAndUpdate({ email:decoded.email }, { confirmedEmail: true });
      res.status(201).json({ message: "Account verified successfully" });
    } else{
      res.json(err)
    }
  })

});




export {
  signup,
  signin,
  verify,
  getUsers,
  updateUser,
  deleteUser
}