import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'
import {useQueryRequest} from '../core/QueryRequestProvider'

const DropOffPointList = () => {
  const statusLis = [
    {label: 'Select One', value: ''},
    {label: 'CREATED', value: 'CREATED'},
    {label: 'ACCEPTED', value: 'ACCEPTED'},
    {label: 'REJECTED', value: 'REJECTED'},
    {label: 'COMPLETED', value: 'COMPLETED'},
  ]
  const searchElements = [
    {
      type: 'select',
      value: 'select',
      options: statusLis,
      name: 'status',
      label: 'Status',
    },
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
      <UsersTable columnProps={roleColumns} />
      <UserEditModal showViewPage getByIdApi='return/orders/' formName='ReturnOrdersModalForm' />
    </KTCard>
  )
}

const ReturnOrdersWrapper = () => (
  <QueryRequestProvider initialValue={{initialApi: 'return/orders'}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <DropOffPointList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ReturnOrdersWrapper}
