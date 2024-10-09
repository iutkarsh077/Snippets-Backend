import prisma from "../prisma/index.js";

export async function VerifyUserAtSignup(req, res){
        const { email, otp } = await req.body;
        if(!email || !otp){
            return res.status(400).json({msg: "Please fill the required fields", status: false})
        }

        try {
            const getUser = await prisma.user.findFirst({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    verificationOtp: true,
                    email: true
                }
            })

            
            if(getUser.verificationOtp !== otp.toString()){
                return res.status(401).json({msg: "Wrong Credentials", status: false})
            }

            const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
            await prisma.user.update({
                where: {
                    id: getUser.id
                },
                data: {
                    verificationOtp: randomNumber,
                    verified: true
                }
            })

             return res.status(200).json({msg: "Successfully Verified", status: true})
        } catch (error) {
            return res.status(500).json({msg: "Internal Server Error", status: false})
        }
}