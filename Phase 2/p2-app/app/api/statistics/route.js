import statRepo from "./stat-repo";


export async function GET(request) {
    try {
        let stats=[];
        let papers = await statRepo.countPapers();
        let avgAuth = await statRepo.calculateAverageAuthorsPerPaper();
        let avgPres = await statRepo.calculateAveragePresentationsPerSession();
        stats =[papers,avgAuth,avgPres];
        return Response.json(stats, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}