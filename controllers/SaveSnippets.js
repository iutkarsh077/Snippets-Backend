import prisma from "../prisma/index.js";

export async function SaveSnippets(req, res) {
  const data = req.body;
  const { question, language, code, id } = data;
  console.log(data);

  try {
    if (!question || !language || !code) {
      return res.status(400).json({ msg: "Required fields are not available" });
    }

    const userDetails = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!userDetails || !userDetails.id) {
      return res.status(401).json({ msg: "Unauthorized user access" });
    }

    console.log(userDetails);
    await prisma.postSnippet.create({
      data: {
        programmingLanguage: language,
        code: code,
        question: question,
        author: {
          connect: { id: userDetails.id }, // Use connect to relate to the user
        },
      },
    });

    return res.status(201).json({ msg: "Snippet saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
}
