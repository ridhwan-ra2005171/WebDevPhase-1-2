import path from "path";
import fsx from "fs-extra";

// const dataPath = path.join(process.cwd(), "data/recipes.json");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class userRepo{
    constructor(){

    }

    //get all users
    async getUsers(){
        const users = await prisma.user.findMany();
        console.log("Get all users");
        return users;
    }

    async getOneUser(id) {
        const data = await prisma.user.findUnique({
            where : {
                id
            }
        });
        return user;
    }

}

export default new userRepo();

