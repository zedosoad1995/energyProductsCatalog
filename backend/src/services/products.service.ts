import prisma from "../../prisma/prisma-client"
import { addPagination } from "../helpers/queryUtils"

export const getProducts = async (query) => {
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

    mainQuery = addPagination(mainQuery, query)

    const products = await prisma.product.findMany(mainQuery)
        .then(prods => prods.map(p => ({ ...p, category: p.category.name, provider: p.provider.name })))

    return {
        data: products,
        total: await prisma.product.count()
    }
}