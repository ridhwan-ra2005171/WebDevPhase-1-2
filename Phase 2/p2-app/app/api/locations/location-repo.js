import path from "path";
import fsx from "fs-extra";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class locationsRepo{
    constructor(){
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