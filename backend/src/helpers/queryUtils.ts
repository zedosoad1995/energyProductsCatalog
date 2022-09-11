import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants"

export const addPagination = (mainQuery: any, params: { page?: string, limit?: string }) => {
    let newQuery = JSON.parse(JSON.stringify(mainQuery))
    newQuery.take = ('limit' in params) ? Math.min(parseInt(params.limit), MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE
    if ('page' in params) newQuery.skip = Math.max(parseInt(params.page) * newQuery.take, 0)

    return newQuery
}