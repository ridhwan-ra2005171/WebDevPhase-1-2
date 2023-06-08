import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export const addPaper = async(paper)=> await prisma.paper.create({data:paper});

// //perfecto
// export const getPapers = async()=> await prisma.paper.findMany();

class paperRepo {
  constructor() {}

  async getPaper(paperID) {
    paperID = String(paperID)
    const data = await prisma.paper.findUnique({ where: { paperID } });
    console.log("* paper: ",data);
    return data;

}

  async updatePaperSessID(paperID, sesID) {
    paperID = String(paperID);
    sesID = String(sesID);
    console.log("!: ",paperID," 2: ",sesID);
    return await prisma.paper.update({
        where : {
            paperID
        },
        data : {
            sesID : sesID
        }
    })
  }
}

export default new paperRepo();

// console.log(await new paperRepo().updatePaperSessID("555","55"));
