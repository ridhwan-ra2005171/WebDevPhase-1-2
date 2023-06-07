import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const usersPath = path.join(process.cwd(), './public/json/users.json')
const authorsPath = path.join(process.cwd(), './public/json/authors.json')
const reviewersPath = path.join(process.cwd(), './public/json/reviewers.json')
const locationsPath = path.join(process.cwd(), './public/json/locations.json')
const institutionsPath = path.join(process.cwd(), './public/json/institutions.json')
const schedulesPath = path.join(process.cwd(), './public/json/schedules.json')
const sessionsPath = path.join(process.cwd(), './public/json/sessions.json')
const papersPath = path.join(process.cwd(), './public/json/papers.json')
const confDatesPath = path.join(process.cwd(), './public/json/conference-dates.json')
const reviewsPath = path.join(process.cwd(), './public/json/reviews.json')

async function main() {
    try {

        const authors = await fs.readJSON(authorsPath)
        const reviewers = await fs.readJSON(reviewersPath)
        const users = await fs.readJSON(usersPath)
        const locations = await fs.readJSON(locationsPath)
        const institutions = await fs.readJSON(institutionsPath)
        const schedules = await fs.readJSON(schedulesPath)
        const sessions = await fs.readJSON(sessionsPath)
        const papers = await fs.readJSON(papersPath)
        // const confDates = await fs.readJSON(confDatesPath)
        const reviews = await fs.readJSON(reviewsPath)

        // fist populate the models until before session ---------
        //  papers.forEach(async (paper) => {
        //     await prisma.paper.create({ data: paper });
        // })

        // users.forEach(async (user) => {
        //     await prisma.user.create({ data: user });
        // })

        // locations.forEach(async (loc) => {
        //     await prisma.location.create({ data: loc });
        // })

        // institutions.forEach(async (inst) => {
        //     await prisma.institution.create({ data: inst });
        // })

        // schedules.forEach(async (schedule) => {
        //     await prisma.schedule.create({ data: schedule });
        // })

        // until here ----------------------------------------
        // Then Comment the above methods, uncomment session and run db seed again
        
        // sessions.forEach(async (session) => {
        //     await prisma.session.create({ data: session });
        // })

       
        reviews.forEach(async (rev) => {
            await prisma.review.create({ data: rev });
        })
        
        //---------------------------------------------------
        // confDates.forEach(async (date) => {
        //     await prisma.conferenceDates.create({ data: date });
        // })
     
            // await prisma.institution.deleteMany();
            // await prisma.location.deleteMany();
            // await prisma.conferenceDates.deleteMany();
            // await prisma.paper.deleteMany();
            // await prisma.user.deleteMany();
            // await prisma.review.deleteMany();
            // await prisma.session.deleteMany();
            // await prisma.schedule.deleteMany();
 

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
