import bcrypt from "bcryptjs";
import prisma from "../prisma/index.js";
export async function ChangePasswordAtLogin(req, res) {
  const { password, confirmPassword, email } = await req.body;

  if (password !== confirmPassword) {
    return res
      .status(401)
      .json({ msg: "Passwords are not similar", status: false });
  }

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if(!findUser){
        return res.status(401).json({msg: "Trying Unauthorized access", status: false})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res
      .status(200)
      .json({ msg: "Credentials updated successfully", status: true });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server error", status: false });
  }
}
