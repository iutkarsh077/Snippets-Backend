import { sendMail } from "./SendEmail.js";


const Sendit =async ({to, name, subject, body}) => {
    console.log("Sening email to: ", to);
    await sendMail({to, name, subject, body})
    return;
}

export default Sendit