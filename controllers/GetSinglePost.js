import prisma from "../prisma/index.js";
export async function GetSinglePost(req, res){
    const {id} = await req.query;
    // console.log(id)
    try {
        const getPost = await prisma.postSnippet.findFirst({
            where: {
                id: id, // Ensure 'id' is defined and valid
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
        
        console.log(getPost);
        return res.status(200).json({msg: "Succeed to get The post", data: getPost, status: true})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server error", status: false})
    }
}