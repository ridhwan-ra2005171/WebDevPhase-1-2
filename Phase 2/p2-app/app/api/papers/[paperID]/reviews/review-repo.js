import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class reviewRepo{
    async getReview(reviewerID, paperID){
      try {
        // convert the id to the correct type if nessacery
        paperID = String(paperID);
        reviewerID = parseInt(reviewerID);
        const data = await prisma.review.findMany({
          where : {
            reviewerID,
            paperID
          }
        });
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
}


export default new reviewRepo();
