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
  const searchElements = [
    {
      type: 'datePicker',
      name: 'start_date',
      label: 'Start Date',
    },
    {
      type: 'datePicker',
      name: 'end_date',
      label: 'End Date',
    },
  ]
  return (
    <KTCard>
      {/* <UsersListHeader placeholder='Search Gas Stations' label='Add New' /> */}
      <UsersListHeader
        showResetButton={true}
        searchElements={searchElements}
        placeholder='Search Category'
      />
      <UsersTable columnProps={roleColumns} />
      <UserEditModal headerName='Report' formName='ProductionManagementModalForm' />
      {/* <UserEditModal formName='ShiftGasStationModalForm' /> */}
    </KTCard>
  )
}

const IncentiveList = () => (
  <QueryRequestProvider initialValue={{initialApi: 'productions'}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {IncentiveList}
