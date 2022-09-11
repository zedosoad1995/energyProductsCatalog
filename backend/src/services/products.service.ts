import prisma from "../../prisma/prisma-client"

export const getProducts = async () => {
    const mainQuery = {
        include: {
            category: {
                select: {
                    name: true
                }
            },
            provider: {
                select: {
                    name: true
                }
            },
        }
    }

    return {
        data: await prisma.product.findMany(mainQuery),
        total: await prisma.product.count()
    }
}