import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class statRepo {
  constructor() {}

  async getAuthorCountPerPaper() {
    const data = await prisma.paper.findMany({
      select: { 
        paperID: true,
         _count: { 
            select: { 
                authors: true
            } 
        } 
    },
    });
    return data;
  }

  async getSubmittedPapers() {
    const data = await prisma.paper.count({
     
        
    });
    return data;
  }
}

export default new statRepo();
const repo = new statRepo();
console.log(await repo.getSubmittedPapers());
