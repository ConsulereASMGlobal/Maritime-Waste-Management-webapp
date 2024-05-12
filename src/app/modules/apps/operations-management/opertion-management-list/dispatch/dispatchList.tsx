// import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {ListViewProvider} from '../../../data-administration/data-admininstration-list/core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/UserEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'

const UserApprovalList = () => {
  return (
    <KTCard>
      <UsersTable columnProps={roleColumns} />
      <UserEditModal formName='CustomerCodeModalForm' />
    </KTCard>
  )
}

const DispatchListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UserApprovalList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {DispatchListWrapper}
