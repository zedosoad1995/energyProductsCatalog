import { Admin, Resource, ListGuesser } from 'react-admin'
import { ProductList } from './components/reactAdmin/Lists'
import { API_URL } from './constants'
import dataProvider from './services/reactAdminDataProvider'


function App() {
  return (<Admin dataProvider={dataProvider(API_URL)}>
    <Resource name="products" list={ProductList} />
  </Admin>)
}

export default App
