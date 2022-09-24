import { Datagrid, DateField, List, NumberField, TextField } from 'react-admin'
import { ExternalUrlField } from './ExternalUrlField'
import { ProductFilters } from './Filters'


export const ProductList = () => {
    return (
        <List filters={ProductFilters}>
            <Datagrid bulkActionButtons={false} rowClick="edit">
                <TextField source="ean" />
                <TextField source="name" />
                <NumberField source="price" />
                <TextField source="brand" />
                <TextField source="category" sortable={false} />
                <TextField source="provider" sortable={false} />
                <NumberField source="discount" />
                <DateField source="createdAt" label='Added at' />
                <ExternalUrlField source="url" />
            </Datagrid>
        </List>
    )
}