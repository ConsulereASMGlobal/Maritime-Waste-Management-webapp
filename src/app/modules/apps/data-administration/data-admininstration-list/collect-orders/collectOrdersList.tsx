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
      <UsersListHeader
        showResetButton={true}
        searchElements={searchElements}
        placeholder='Search Category'
      />
      <UsersTable showPagination={true} columnProps={roleColumns} />
      <UserEditModal showViewPage getByIdApi='collect/orders/' formName='CollectOrdersModalForm' />
    </KTCard>
  )
}

const CollectOrdersWrapper = () => (
  <QueryRequestProvider initialValue={{initialApi: 'collect/orders'}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CollectOrdersWrapper}
