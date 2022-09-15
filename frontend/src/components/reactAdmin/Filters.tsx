import { UniqueFilterList } from './UniqueFilterList'
import { API_URL } from '../../constants'


export const ProductFilters = [
    <UniqueFilterList source="ean" mainUrl={`${API_URL}/products/short/ean`} />,
    <UniqueFilterList source="brand" mainUrl={`${API_URL}/products/short/brands`} />,
    <UniqueFilterList source="provider" mainUrl={`${API_URL}/providers/short`} />,
    <UniqueFilterList source="category" mainUrl={`${API_URL}/categories/short`} />,
]
