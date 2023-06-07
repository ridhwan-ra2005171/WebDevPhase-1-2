const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


export async function countPapers() {
    const totalPapers = await prisma.paper.count();
    return totalPapers;
  }

 export async function calculateAverageAuthorsPerPaper() {
    const totalPapers = await prisma.paper.count();
    const totalAuthors = await prisma.user.count();
  
    if (totalPapers === 0) {
      return 0;
    }
  
    const averageAuthorsPerPaper = totalAuthors / totalPapers;
    return averageAuthorsPerPaper;
  }


 export async function calculateAveragePresentationsPerSession() {
    const totalSessions = await prisma.session.count();
    const totalPresentations = await prisma.paper.count();
  
    const presentationsPerSession = totalPresentations/ totalSessions;
    return {
      totalSessions,
      presentationsPerSession,
    };
  }