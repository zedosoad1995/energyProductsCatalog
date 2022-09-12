import axios from 'axios'
import { useEffect, useState } from 'react'
import { SelectInput, TextInput } from 'react-admin'


const UniqueFilterList = ({ source }: any) => {
    const [uniqueChoices, setUniqueChoices] = useState<Array<any>>([])

    useEffect(() => {
        axios.get('http://localhost:9000/api/products/short/brands')
            .then(res => {
                const transformedData = res.data.data.data.map((d: any) => ({ id: d, name: d }))
                setUniqueChoices(transformedData)
            })
    }, [])

    return (
        <SelectInput choices={uniqueChoices} source={source} />
    )
}

export const ProductFilters = [
    <TextInput source="ean" />,
    <TextInput source="category" />,
    <UniqueFilterList source="brand" />,
    <TextInput source="provider" />
]