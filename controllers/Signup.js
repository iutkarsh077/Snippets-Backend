import Sendit from "../emails/SendIt.js";
import prisma from "../prisma/index.js";
import bcrypt from "bcryptjs";

export async function Signup(req, res) {
  const {name, email, password} = await req.body;
  console.log(name);
  try {
    const isUserAlreadyExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

 
    if (isUserAlreadyExist) {
      return res
        .status(401)
        .json({ msg: "User already Exist", status: false });
    }

    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            verificationOtp: randomNumber.toString()
        }
    })

    await Sendit({to: email, name, subject: "Email Verification", body: randomNumber});

    return res
      .status(200)
      .json({ msg: "User saved Successfully", status: true });
  
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", status: false });
  }
}
