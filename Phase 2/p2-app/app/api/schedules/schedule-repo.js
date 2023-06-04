import path from "path";
import fsx from "fs-extra";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class schedulesRepo{
    constructor(){
    }

    async getAllDates() {
        try {
          const schedules = await prisma.schedule.findMany();
          const dates = schedules.map((schedule) => schedule.date);
          return dates;
        } catch (error) {
          console.error('Error retrieving dates:', error);
          throw new Error('Failed to retrieve dates');
        }
      }




}

export default new schedulesRepo();

