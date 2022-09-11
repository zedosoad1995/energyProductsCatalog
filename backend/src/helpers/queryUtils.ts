import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants"

export const addPagination = (mainQuery: any, { page, limit }: { page?: string, limit?: string }) => {
    let newQuery = JSON.parse(JSON.stringify(mainQuery))
    newQuery.take = (limit) ? Math.min(parseInt(limit), MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE
    if (page) newQuery.skip = Math.max(parseInt(page) * newQuery.take, 0)

    return newQuery
}

export const addSorting = (mainQuery: any, { sortBy, order }: { sortBy?: string, order?: string }) => {
    let newQuery = JSON.parse(JSON.stringify(mainQuery))

    if (!order) order = 'asc'
    if (!sortBy) sortBy = 'id'

    newQuery.orderBy = [{
        [sortBy]: order.toLowerCase()
    }]

    return newQuery
}
