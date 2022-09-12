import prisma from "../../prisma/prisma-client"
import { addFiltering, addPagination, addSorting } from "../helpers/queryUtils"

export const getProducts = async (query) => {
    if (query.isDeleted) {
        query.isDeleted = query.isDeleted === 'true'
    }

    let mainQuery = {
        select: {
            id: true,
            ean: true,
            name: true,
            price: true,
            discount: true,
            url: true,
            brand: true,
            isDeleted: true,
            createdAt: true,
            updatedAt: true,
            category: {
                select: {
                    name: true
                }
            },
            provider: {
                select: {
                    name: true
                }
            }
        }
    }

    mainQuery = addFiltering(mainQuery, query)
    mainQuery = addPagination(mainQuery, query)
    mainQuery = addSorting(mainQuery, query)

    const countQuery = addFiltering({}, query)

    const products = await prisma.product.findMany(mainQuery)
        .then(prods => prods.map(p => ({ ...p, category: p.category.name, provider: p.provider.name })))

    return {
        data: products,
        total: await prisma.product.count(countQuery)
    }
}

export const getAllBrands = async () => {
    return {
        data: await prisma.product.findMany({
            where: {},
            distinct: ['brand'],
            select: {
                brand: true
            },
            orderBy: {
                brand: 'asc'
            }
        })
            .then(res => res.map(data => data.brand)),
    }
}



