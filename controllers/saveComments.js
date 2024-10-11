import prisma from "../prisma/index.js";

export async function SaveComments(req, res) {
  const data = await req.body;
  const { postId, authorId, content } = data;

  if (!postId || !authorId || !content) {
    return res
      .status(401)
      .json({ msg: "Unauthorized access denied", status: false });
  }

  try {
    console.log(postId, authorId, content);

    await prisma.Comment.create({
        data: {
            content: content,
            postId: postId,
            authorId: authorId
        }
    })

    const allComment = await prisma.postSnippet.findFirst({
      where: {
          id: postId, // Ensure 'id' is defined and valid
      },
      include: {
          author: { // Including the author's details
              select: {
                  name: true,
                  id: true
              },
          },
          comments: { // Including comments and their related author
              include: {
                  author: { // Include the author of the comment
                      select: {
                          name: true,
                          id: true
                      }
                  }
              }
          }
      },
  });
    // console.log(allComment)

    return res
      .status(200)
      .json({ msg: "Comment saved successfully", status: true, allComments: allComment });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server error", status: false });
  }
}
