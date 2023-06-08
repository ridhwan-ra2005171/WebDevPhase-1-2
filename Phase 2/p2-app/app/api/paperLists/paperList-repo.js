import path from "path";
import fsx from "fs-extra";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class paperListRepo{
    constructor(){

    }

    //get all papers for DL
    async getPapers(){
        try{
            const papers = await prisma.paper.findMany();
            return papers;
        }catch (error) {
            console.error('Error retrieving dates:', error);
            throw new Error('Failed to retrieve dates');
          }
        
    }

   //getlocation by ID its working in the repo-test
   async getPaper(paperID) {
    try {
      return await prisma.paper.findUnique({
        where: {
            paperID: paperID,
        },
      });

    } catch (e) {
      console.log(e.message);
      return { error: e.message };
    }
  }

}

export default new paperListRepo();