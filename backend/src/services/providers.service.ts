import prisma from "../../prisma/prisma-client"
import { addPagination } from "../helpers/queryUtils"

export const getUniqueProviders = async (query) => {
    let mainQuery: any = {
        where: {},
        distinct: ['name'],
        select: {
            name: true
        },
        orderBy: {
            name: 'asc'
        }
    }

    mainQuery = addPagination(mainQuery, query)

    return {
        data: await prisma.provider.findMany(mainQuery)
            .then(res => res.map(data => data.name)),
        total: await prisma.$queryRaw`
        SELECT COUNT(DISTINCT name)
        FROM public."Provider"`
            .then((res: any) => Number(res[0].count))
    }
}
