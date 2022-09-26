import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants"

export const addPagination = (mainQuery: any, { page, limit }: { page?: string, limit?: string }) => {
    let newQuery = JSON.parse(JSON.stringify(mainQuery))
    newQuery.take = (limit) ? Math.min(parseInt(limit), MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE
    if (page) newQuery.skip = Math.max(parseInt(page) * newQuery.take, 0)

    return newQuery
}

export const addSorting = (mainQuery: any, { sortBy, order }: { sortBy?: string, order?: string }) => {
    let newQuery = JSON.parse(JSON.stringify(mainQuery))

    if (!['ean', 'name', 'price', 'brand', 'discount', 'createdAt'].includes(sortBy)) return newQuery

    if (!order) order = 'asc'
    if (!sortBy) sortBy = 'id'

    newQuery.orderBy = [{
        [sortBy]: order.toLowerCase()
    }]

    return newQuery
}

export const addFiltering = (mainQuery: any, filters: any) => {
    let newQuery = JSON.parse(JSON.stringify(mainQuery))

    newQuery.where = Object.entries(filters).reduce((whereQuery, [k, v]) => {
        if (['ean', 'brand', 'isDeleted'].includes(k)) {
            whereQuery[k] = v
        } else if (['category', 'provider'].includes(k)) {
            whereQuery[k] = {
                name: v
            }
        }
        return whereQuery
    }, {})

    return newQuery
}
