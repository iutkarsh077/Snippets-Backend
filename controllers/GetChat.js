import prisma from "../prisma/index.js";
export async function GetChat(req, res) {
  const { senderId, receiverId } = await req.body;
  if (!senderId || !receiverId) {
    return res
      .status(401)
      .json({ msg: "An unauthorized access is denied", status: false });
  }

  console.log("SenderId: ", senderId);
  console.log("ReceiverId: ", receiverId)

  try {
    const findChat = await prisma.chat.findMany({
      where: {
        OR: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
    });

    console.log(findChat);

    return res
      .status(200)
      .json({ msg: "Successflyy get The chat", status: true, chats: findChat });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server error", status: false });
  }
}
