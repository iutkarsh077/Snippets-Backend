import prisma from "../prisma/index.js";
export async function SaveChat(req, res) {
  const data = await req.body;
  const { senderId, receiverId, text } = data;

  if (!senderId || !receiverId || !text) {
    return res
      .status(401)
      .json({ msg: "An unauthorized access denied", status: false });
  }
  console.log(data);
  try {
    const response = await prisma.Chat.create({
      data: {
        text: text,
        senderId: senderId,
        receiverId: receiverId,
      },
    });
    console.log(response)
    return res
      .status(200)
      .json({ msg: "Chat saved successfully", status: true });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server error", status: false });
  }
}
