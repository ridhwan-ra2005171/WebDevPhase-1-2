import path from "path";
import fsx from "fs-extra";

// const dataPath = path.join(process.cwd(), "data/recipes.json");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const addReview = async(review)=> await prisma.review.create({data:review});
export const getReview= async(paperID)=> await prisma.review.findMany({where:{paperID:paperID}});


// export const addPaper = async(paper)=> await prisma.paper.create({data:paper});


export async function addPaper(paper){
    try{
const addedPaper= await prisma.paper.create({data:paper});
const review={
    paperID:addedPaper.paperID,
    reviewerId:4
}
console.log("added Paper: ",addedPaper);
const addedReview= await prisma.review.create({data:review})
console.log("added review: ",addedReview);
 return paper
}catch (error) {
    console.log(error);
    return Response.json({ error: "There was an internal error paper" }, { status: 500 });
}

}



//perfecto
export const getPapers = async()=> await prisma.paper.findMany();
export const getPaper = async(paperID)=> await prisma.paper.findUnique({where:{paperID},include:{reviews:true}});

export const getUsers= async ()=> await prisma.user.findMany();
export const getUser= async (email)=> await prisma.user.findMany({where:{email}});
export const getAuthor= async (id)=> await prisma.author.findUnique({where:{id:+id},include:{authoredPaper:true}});
export const getAuthors= async ()=> await prisma.author.findMany({include:{authoredPaper:true}});
export const getReviewer= async (id)=> await prisma.reviewer.findUnique({where:{reviewerId:+id}});
export const getReviewers= async ()=> await prisma.reviewer.findMany();


        // console.log("Get all users");
    




