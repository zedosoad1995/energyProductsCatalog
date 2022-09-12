import axios from 'axios'
import { useListContext } from 'react-admin'
import { SelectInput } from 'react-admin'


export const UniqueFilterList = ({ source }: any) => {
    axios.get('http://localhost:9000/api/products/short/brands')
        .then(res => {
            console.log(res.data.data.data)
        })

    return (
        <SelectInput choices={[]} source={source} />
    )
}
