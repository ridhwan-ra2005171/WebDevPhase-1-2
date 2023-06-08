import path from "path";
import fsx from "fs-extra";

// const dataPath = path.join(process.cwd(), "data/recipes.json");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const addReview = async(review)=> await prisma.review.create({data:review});
export const getReview= async(paperID)=> await prisma.review.findMany({where:{paperID:paperID}});


// export const addPaper = async(paper)=> await prisma.paper.create({data:paper});


export async function addPaper(toAdd){
    try{
        const paper=toAdd[0]
        const reviewer1Id=toAdd[1]
        const reviewer2Id=toAdd[2]
const addedPaper= await prisma.paper.create({data:paper});
const review1={
    paperID:addedPaper.paperID,
    reviewerId:reviewer1Id
}
const review2={
    paperID:addedPaper.paperID,
    reviewerId:reviewer2Id

}
console.log("added Paper: ",addedPaper);
const addedReview1= await prisma.review.create({data:review1})
const addedReview2= await prisma.review.create({data:review2})
console.log("added review: ",addedReview1);
console.log("added review: ",addedReview2);
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
export const getUser= async (email)=> await prisma.user.findUnique({where:{email}});
export const getAuthor= async (id)=> await prisma.author.findUnique({where:{id:+id},include:{authoredPaper:true}});
export const getAuthors= async ()=> await prisma.author.findMany({include:{authoredPaper:true}});
export const getReviewer= async (id)=> await prisma.reviewer.findUnique({where:{reviewerId:+id}});
export const getReviewers= async ()=> await prisma.reviewer.findMany();



export const getReviews= async ()=> await prisma.review.findMany();

export const getInstitutions= async ()=> await prisma.institution.findMany();


        // console.log("Get all users");
    




