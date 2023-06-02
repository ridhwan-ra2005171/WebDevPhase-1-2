import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const usersPath = path.join(process.cwd(), './public/json/users.json')
const locationsPath = path.join(process.cwd(), './public/json/locations.json')
const institutionsPath = path.join(process.cwd(), './public/json/institutions.json')
const schedulesPath = path.join(process.cwd(), './public/json/schedules.json')
const sessionsPath = path.join(process.cwd(), './public/json/sessions.json')
const papersPath = path.join(process.cwd(), './public/json/papers.json')
const confDatesPath = path.join(process.cwd(), './public/json/conference-dates.json')

async function main() {
    try {


        const users = await fs.readJSON(usersPath)
        const locations = await fs.readJSON(locationsPath)
        const institutions = await fs.readJSON(institutionsPath)
        const schedules = await fs.readJSON(schedulesPath)
        const sessions = await fs.readJSON(sessionsPath)
        const papers = await fs.readJSON(papersPath)
        const confDates = await fs.readJSON(confDatesPath)


        users.forEach(async (user) => {
            await prisma.user.create({ data: user });
        })

        locations.forEach(async (loc) => {
            await prisma.location.create({ data: loc });
        })

        institutions.forEach(async (inst) => {
            await prisma.institution.create({ data: inst });
        })

        schedules.forEach(async (schedule) => {
            await prisma.schedule.create({ data: schedule });
        })

        sessions.forEach(async (session) => {
            await prisma.session.create({ data: session });
        })


        papers.forEach(async (paper) => {
            await prisma.paper.create({ data: paper });
        })

        confDates.forEach(async (date) => {
            await prisma.conferenceDates.create({ data: date });
        })


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