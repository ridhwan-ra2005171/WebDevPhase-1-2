import path from "path";
import fsx from "fs-extra";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class locationsRepo{
    constructor(){
    }

    //get all locations:
    async getLocations(){
      try {
        // const schedules = await prisma.location.findMany({
        //   include: {
        //     sessions:{
        //       include:{
        //         location : true
        //       }
        //     }
        //     }
        const locations= await prisma.location.findMany();
        // });
        
        return locations;
      } catch (error) {
        console.error('Error retrieving dates:', error);
        throw new Error('Failed to retrieve dates');
      }
    }

    //getlocation by ID its working in the repo-test
    async getLocation(locationID) {
        try {
          return await prisma.location.findUnique({
            where: {
              locationID: locationID,
            },
          });

        } catch (e) {
          console.log(e.message);
          return { error: e.message };
        }
      }
}

export default new locationsRepo();