import nodemailer from "nodemailer";

export async function sendMail({ to, name, subject, body }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  // Ensure environment variables are set
  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    console.error("SMTP credentials are missing");
    return;
  }

  // Create transport for Nodemailer
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  // Verify transport connection
  try {
    await transport.verify();
    console.log("SMTP connection successful");
  } catch (error) {
    console.error("SMTP connection error:", error);
    return;
  }

  // Define inline HTML directly in the sendMail function
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
    <h1 style="color: #333; text-align: center;">Hello, ${name}</h1>
    <p style="font-size: 16px; color: #555; text-align: center;">
      Thank you for registering on SNIPPETS. Please use the following verification code to complete your registration:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <h2 style="font-size: 32px; color: #4CAF50;">${body}</h2>
    </div>
    <p style="font-size: 14px; color: #777; text-align: center;">
      If you did not request this code, please ignore this email.
    </p>
    <p style="font-size: 14px; color: #777; text-align: center;">
      Regards,<br />The SNIPPETS Team
    </p>
  </div>
`;


  // Send the email
  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to, // recipient
      subject,
      html: emailHtml, // inline HTML
    });
    // console.log("Email sent successfully:", sendResult);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
