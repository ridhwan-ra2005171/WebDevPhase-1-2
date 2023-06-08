import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class reviewRepo{
    async getReview(reviewID){
      try {
        // convert the id to the correct type if nessacery
        // reviewID = String(reviewID);
        // console.log(reviewID);
        const data = await prisma.review.findFirst({
          where : {
            reviewID
          }
        });
        // console.log(data);
        console.log("* Prisma review-repo, get review");
        return data;
      } catch (error) {
        throw new Error('Failed to retrieve review');
      }
    }

    async updateReview(reviewID, reviewData) {
      try {
        const data = await prisma.review.update({
          where : {
            reviewID
          },
          data : 
            reviewData
        });
        console.log("* Prisma review-repo, update review");
        return data;
      } catch (error) {
        throw new Error('Failed to update review');
      }
    }

    async getPapersToReview(reviewerID) {
      try {
        reviewerID = parseInt(reviewerID)
        console.log(reviewerID);
        let data = await prisma.review.findMany({
          where : {
            reviewerId : reviewerID
          },
          select : { reviewID : true ,paper : {include : {authors: true}}}
        });
        // data = data.map(obj => obj.paper);
        console.log("* Prisma review-repo, get papers to review");
        return data;
      } catch (error) {
        throw new Error('Failed to get papers to review');
      }
    }
}
export default new reviewRepo();

// const repo = new reviewRepo();
// const obj = {
//   reviewID: "climm1x76000h695stts5j6bj",
//   overallEvaluation: 2,
//   paperContribution: 5,
//   paperStrength: "a",
//   paperWeaknesses: "a",
//   paperID: "1",
//   reviewerId: 8
// };

// console.log(await repo.updateReview("climm1x76000h695stts5j6bj",obj));