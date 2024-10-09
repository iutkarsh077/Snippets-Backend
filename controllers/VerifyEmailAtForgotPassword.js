import prisma from "../prisma/index.js";

export async function VerifyEmailAtForgotPassword(req, res){
    const {email, otp} = await req.body;

    if(!email || !otp){
        return res.status(401).json({msg: "Please fill the required Fields", status: false})
    }

    console.log(email, otp)

    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                verified: true,
                id: true,
                verificationOtp: true
            }
        })


        if(!findUser){
            return res.status(401).json({msg: "User not available", status: false})
        }

        console.log(findUser)
        if(findUser.verificationOtp !== otp.toString()){
            return res.status(401).json({msg: "Wrong Credentials", status: false})
        }

        const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
        await  prisma.user.update({
            where: {
                id: findUser.id
            },
            data: {
                verificationOtp: randomNumber
            }
        })

        return res.status(200).json({msg: "User authorized successfully", status: true})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", status: false})
    }
}