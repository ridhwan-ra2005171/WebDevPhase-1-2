
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()




export const addPaper = async(paper)=> await prisma.paper.create({data:paper});

//working
export const getPapers = async()=> await prisma.paper.findMany({select:{paperID:true,title:true}});

//working
export const getPaper = async(id)=> await prisma.paper.findUnique(
  {  where:{paperID:id}
  , 
     select:{paperID:true,title:true}
    } );