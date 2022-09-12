import { Datagrid, List, NumberField, TextField, UrlField } from 'react-admin';

export const ProductList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="ean" />
            <TextField source="name" />
            <NumberField source="price" />
            <NumberField source="discount" />
            <TextField source="category" />
            <TextField source="brand" />
            <TextField source="provider" />
            <UrlField source="url" />
        </Datagrid>
    </List>
)