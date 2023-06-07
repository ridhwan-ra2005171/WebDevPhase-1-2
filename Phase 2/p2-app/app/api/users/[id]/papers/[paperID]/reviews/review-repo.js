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

    async getPapersToReview(reviewerID) {
      try {
        reviewerID = parseInt(reviewerID)
        console.log(reviewerID);
        let data = await prisma.user.findMany({
          where : {
            id : reviewerID
          },
          select : {reviewedPapers : {include : {authors: true}}}
        });
        data = data[0].reviewedPapers
        console.log("* Prisma review-repo, get papers to review");
        return data;
      } catch (error) {
        throw new Error('Failed to get papers to review');
      }
    }

    
}


export default new reviewRepo();
