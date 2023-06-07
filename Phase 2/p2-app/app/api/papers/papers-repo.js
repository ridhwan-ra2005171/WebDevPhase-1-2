
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()




export const addPaper = async(paper)=> await prisma.paper.create({data:paper});
export const getPapers = async()=> await prisma.paper.findMany();
export const getPaper = async(paperID)=> await prisma.paper.findUnique({where:paperID});