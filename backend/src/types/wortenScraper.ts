export interface IWortenProductsCatalog {
    modules?: Array<{
        model?: {
            template?: string
            products?: Array<any>,
            count?: number,
            offset?: { max?: number }
        }
    }>
}