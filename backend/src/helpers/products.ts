import prisma from "../../prisma/prisma-client"

export const getRepeatedEans = async (filterVal) => {
    const repeatedEANs = await prisma.product.groupBy({
        by: ['ean'],
        having: {
            ean: {
                _count: {
                    [filterVal ? 'gt' : 'lte']: 1
                }
            }
        }
    })

    return repeatedEANs.map(obj => obj.ean)
}

export const filterByProductsWithMultProviders = (mainQuery: any, eans: Array<string>) => {
    let newQuery = JSON.parse(JSON.stringify(mainQuery))

    if (!newQuery.where) newQuery.where = {}
    newQuery.where.ean = {
        in: eans
    }

    return newQuery
}