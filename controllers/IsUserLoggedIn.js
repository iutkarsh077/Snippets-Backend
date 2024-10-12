import jwt from "jsonwebtoken";
import prisma from "../prisma/index.js";
export async function UserDetails(req, res) {
   const token = await req.cookies.snippets;

  if (!token) {
    return res.status(401).json({ msg: "Cookie not available", status: false });
  }

  const getUserData = await jwt.verify(token, process.env.JWT_SECRET);

  if(!getUserData){
    return res.status(500)
    .json({ msg: "Cookie is unavailable", status: false});
  }

  const findUser = await prisma.user.findFirst({
    where: {
        id: getUserData.id
    },
    select: {
        id: true, 
        name: true,
        email: true,
        verified: true
    }
  })

  if(!findUser){
    return res.status(401)
    .json({ msg: "User not available", status: false });
  }

  console.log(findUser);

  return res
    .status(200)
    .json({ msg: "Cookie retrieved", data: findUser, status: true });
}
