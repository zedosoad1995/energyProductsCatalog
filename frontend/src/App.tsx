import { Admin, Resource, ListGuesser } from 'react-admin'
import { ProductList } from './components/reactAdmin/Lists'
import dataProvider from './services/reactAdminDataProvider'


function App() {
  return (<Admin dataProvider={dataProvider('http://localhost:9000/api')}>
    <Resource name="products" list={ProductList} />
  </Admin>)
}

export default App
