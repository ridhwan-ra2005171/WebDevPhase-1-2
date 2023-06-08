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
}

export default new paperListRepo();