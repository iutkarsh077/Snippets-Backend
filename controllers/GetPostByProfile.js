import prisma from "../prisma/index.js";
export async function GetPostByProfile(req, res) {
  const { id }  = req.query;

  console.log(id);

  if (!id) {
    return res
      .status(401)
      .json({ msg: "An unauthorized access denied", status: false });
  }

  try {
    const findAllPosts = await prisma.PostSnippet.findMany({
      where: {
        authorId: id,
      },
    });

    if (!findAllPosts) {
      return res.status(401).json({ msg: "No Post found", status: false });
    }

    return res
      .status(200)
      .json({ msg: "Successfully get all the posts", status: true, posts: findAllPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server error", status: false });
  }
}
