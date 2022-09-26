import { UniqueFilterList } from './UniqueFilterList'
import { API_URL } from '../../constants'

import { useNavigate } from 'react-router-dom'

import { Chip } from '@mui/material';

import { useEffect } from 'react';

const FilterProdsMultProviders = ({ label }: any) => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/products?displayedFilters={"link":true}&filter={"hasMultProviders":true}&sort=ean&order=ASC`)
        localStorage.removeItem('RaStore.products.listParams')

        return () => {
            navigate(`/products?displayedFilters={}&filter={}`)
        }
    }, [])


    return (<Chip sx={{ marginBottom: 1 }} label={label} />)
};

export const ProductFilters = [
    <UniqueFilterList source="ean" mainUrl={`${API_URL}/products/short/ean`} />,
    <UniqueFilterList source="brand" mainUrl={`${API_URL}/products/short/brands`} />,
    <UniqueFilterList source="provider" mainUrl={`${API_URL}/providers/short`} />,
    <UniqueFilterList source="category" mainUrl={`${API_URL}/categories/short`} />,
    <FilterProdsMultProviders source="link" label="Products With Multiple Providers" />
]
