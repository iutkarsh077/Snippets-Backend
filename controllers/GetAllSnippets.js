import prisma from "../prisma/index.js"

export async function GetAllSnippets(req, res){
    try {
        const getAllSnippets = await prisma.PostSnippet.findMany();
        return res.status(201).json({msg: "All snippets fetched", status: true, data: getAllSnippets})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server error", status: false})
    }
}