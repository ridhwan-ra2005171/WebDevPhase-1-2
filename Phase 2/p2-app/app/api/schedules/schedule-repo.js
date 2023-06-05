import path from "path";
import fsx from "fs-extra";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class schedulesRepo{
    constructor(){
    }

    async getSchedules(){
      try {
        const schedules = await prisma.schedule.findMany({
          include: {
            sessions: {
              include: {
                location: true,
                presenter: true,
                papers: true,
              },
            },
          },
        });
        
        return schedules;
      } catch (error) {
        console.error('Error retrieving dates:', error);
        throw new Error('Failed to retrieve dates');
      }
    }


    async getSchedules(){
      try {
        const schedules = await prisma.schedule.findMany({
          include: {
            sessions: true
            }
        });
        
        return schedules;
      } catch (error) {
        console.error('Error retrieving dates:', error);
        throw new Error('Failed to retrieve dates');
      }
    }



        //might not need this
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

