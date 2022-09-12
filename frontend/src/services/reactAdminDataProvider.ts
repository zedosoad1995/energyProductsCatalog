import { stringify } from 'query-string'
import { fetchUtils, DataProvider } from 'ra-core'


export default (
    apiUrl: string,
    httpClient = fetchUtils.fetchJson
): DataProvider => ({
    getList: (resource: any, params: any) => {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort

        const query = {
            page,
            limit: perPage,
            ...params.filter,
            sortBy: field,
            order
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`

        return httpClient(url).then((res) => {
            const { total, data } = res.json.data

            return {
                data,
                total
            }
        })
            .catch((err) => {
                return Promise.reject(err)
            })
    },

    getOne: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },

    getMany: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },

    getManyReference: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },

    update: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },

    updateMany: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },

    create: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },

    delete: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },

    deleteMany: (resource: any, params: any) => {
        return httpClient('').then(res => ({ data: res.json }))
    },
});