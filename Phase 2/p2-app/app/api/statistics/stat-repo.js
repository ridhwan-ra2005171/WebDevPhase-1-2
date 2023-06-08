import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class statRepo{
    constructor(){

    }

    async countPapers() {
        const totalPapers = await prisma.paper.count();
        const acceptedPapers = await prisma.paper.aggregate({
          where : {
            accepted : true
          },
          _count : {
            accepted : true
          }
        })

        const notAcceptedPapers = await prisma.paper.aggregate({
          where : {
            accepted : false
          },
          _count : {
            accepted : true
          }
        })
        return {totalPapers ,  acceptedPapers : acceptedPapers._count.accepted,
          notAcceptedPapers : notAcceptedPapers._count.accepted
        };
      }


      async calculateAverageAuthorsPerPaper() {
        const totalPapers = await prisma.paper.count();
        const totalAuthors = await prisma.user.count();
      
        if (totalPapers === 0) {
          return 0;
        }
      
        const averageAuthorsPerPaper = totalAuthors / totalPapers;
        return averageAuthorsPerPaper;
      }

      async calculateAveragePresentationsPerSession() {
        const totalSessions = await prisma.session.count();
        const totalPresentations = await prisma.paper.count();
      
        const presentationsPerSession = totalPresentations/ totalSessions;
        return {
          totalSessions,
          presentationsPerSession,
        };
      }


}

export default new statRepo();

// console.log(await new statRepo().countPapers());