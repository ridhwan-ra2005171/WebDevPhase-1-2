import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export const addPaper = async(paper)=> await prisma.paper.create({data:paper});


// //perfecto
// export const getPapers = async()=> await prisma.paper.findMany();



class sessionRepo{
    constructor(){}

    async addSession(sessObj) {
        return await prisma.session.create({
            data : sessObj
        });
      }
}

export default new sessionRepo();
const sessObj = {
    title : "TEST FROM TEST_REPO 1",
    locationID : "1",
    fromTime : "12:15",
    endTime : "12:30",
    schID : "55"
}

// console.log(await new sessionRepo().addSession(sessObj));