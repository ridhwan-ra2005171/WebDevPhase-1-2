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

    async addReview(reviewData) {
      try {
        const data = await prisma.review.create({
          data : {
            reviewData
          }
        });
        console.log("* Prisma review-repo, add review");
        return data;
      } catch (error) {
        throw new Error('Failed to add review');
      }
    }

    
    async updateReview(reviewID, reviewData) {
      try {
        const data = await prisma.review.update({
          where : {
            reviewID
          },
          data : {
            reviewData
          }
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

// console.log(await repo.getReview(12,5));