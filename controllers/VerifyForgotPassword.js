import Sendit from "../emails/SendIt.js";
import prisma from "../prisma/index.js";

export async function VerifyForgotPassword(req, res){
    const {email} = await req.body;
    if(!email){
        return res.status(400).json({msg: "Email is required", status: false});
    }

    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                email: true,
                name: true,
                verificationOtp: true,
                verified: true
            }
        })

        if(!findUser){
            return res.status(404).json({msg: "User not found", status: false})
        }
        
        await Sendit({to: email, name: findUser.name, subject: "Email Verification", body: findUser.verificationOtp})

        return res.status(200).json({msg: "Email sent successfully", status: true});
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong", status: false});
    }
}