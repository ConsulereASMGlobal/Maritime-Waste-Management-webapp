import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'

const mockedData = [
  {
    gender: 'Male',
    email: 'ashok@gmail.com',
    fullAddress: 'New Baneshwor, Kathmandu',
    mobile: '9860105561',
    joinDate: '2023/09/05',
    currentLevel: 'Manager',
    pointEarned: 45,
    pointRedeemed: 5,
    name: 'Ashok Karki',
    birthday: '1992/12/22',
  },
  {
    gender: 'Femal',
    email: 'aleshika@gmail.com',
    fullAddress: 'Old Baneshwor, Kathmandu',
    mobile: '9860105560',
    joinDate: '2023/09/06',
    currentLevel: 'Employee',
    pointEarned: 5,
    pointRedeemed: 15,
    name: 'Aleshki Chheri',
    birthday: '1996/06/06',
  },
]

const UserManagementList = () => {
  return (
    <KTCard>
      <UsersListHeader label='Add New' />
      <UsersTable /* mockedData={mockedData} */ columnProps={roleColumns} />
      <UserEditModal formName='UnitMeasurementModalForm' />
    </KTCard>
  )
}

const UserManagementWrapper = () => (
  <QueryRequestProvider initialValue={{type: 'CUSTOMER'}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <UserManagementList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UserManagementWrapper}
