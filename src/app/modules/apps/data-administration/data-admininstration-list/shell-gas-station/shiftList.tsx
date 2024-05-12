import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'

const UsersList = () => {
  return (
    <KTCard>
      <UsersListHeader placeholder='Search Gas Stations' label='Add New' />
      <UsersTable columnProps={roleColumns} />
      <UserEditModal formName='ShiftGasStationModalForm' />
    </KTCard>
  )
}

const ShellGasStationWrapper = () => (
  <QueryRequestProvider initialValue={{type: 'PICKUP_POINT'}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ShellGasStationWrapper}
