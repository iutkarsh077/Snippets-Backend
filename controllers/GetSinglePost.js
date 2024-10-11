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
                author: { // Assuming 'author' is a relation in your 'postSnippet' model
                    select: { // Use 'select' to specify which fields to return
                        name: true, // This retrieves the author's name
                    },
                },
            },
        });
        
        console.log(getPost);
        return res.status(200).json({msg: "Succeed to get The post", data: getPost, status: true})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server error", status: false})
    }
}