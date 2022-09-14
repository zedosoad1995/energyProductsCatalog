import prisma from "../../prisma/prisma-client"
import { addPagination } from "../helpers/queryUtils"

export const getUniqueCategories = async (query) => {
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
        data: await prisma.category.findMany(mainQuery)
            .then(res => res.map(data => data.name)),
        total: await prisma.$queryRaw`
        SELECT COUNT(DISTINCT name)
        FROM public."Category"`
            .then((res: any) => Number(res[0].count))
    }
}
