import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'

const UserApprovalList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <KTCard>
      <UsersTable columnProps={roleColumns} />
      {<UserEditModal headerName='Approve/ Reject' formName='UserApprovalModalForm' />}
    </KTCard>
  )
}

const UserApprovalWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UserApprovalList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UserApprovalWrapper}
