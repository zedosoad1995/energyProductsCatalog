import { UniqueFilterList } from './UniqueFilterList'
import { TextInput } from 'react-admin'


export const ProductFilters = [
    <UniqueFilterList source="ean" mainUrl="http://localhost:9000/api/products/short/ean" />,
    <UniqueFilterList source="brand" mainUrl="http://localhost:9000/api/products/short/brands" />,
    <UniqueFilterList source="provider" mainUrl="http://localhost:9000/api/providers/short" />,
    <UniqueFilterList source="category" mainUrl="http://localhost:9000/api/categories/short" />,
]
