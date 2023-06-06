import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class paperRepo {
  constructor() {}

  //get all papers
  async getPapers() {
    const data = await prisma.paper.findMany();
    console.log("Get all papers");
    return data;
  }

  // For reviewer ==========================================
  async getReviews(reviewerID) {
    const data = await prisma.review.findMany({
      where: {
        reviewerID,
      },
    });
    return data;
  }

  async getPapersOfReviewer(reviewerID) {
    const data = await prisma.paper.findMany({
      where: {
        reviews: {
          some: {
            reviewerID,
          },
        },
      },
      include: {
        reviews: true,
      },
    });
    return data;
  }

  // ========================================================
}

export default new paperRepo();

const repo = new paperRepo();
console.log(await repo.getPapersOfReviewer(12));
