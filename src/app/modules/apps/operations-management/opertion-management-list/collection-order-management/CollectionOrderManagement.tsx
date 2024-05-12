// import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {ListViewProvider} from '../../../data-administration/data-admininstration-list/core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersTable} from '../table/UsersTable'
// import {UserEditModal} from '../../../data-administration/data-admininstration-list/form-edit-modal/CoomonEditModal'
import {UserEditModal} from '../form-edit-modal/UserEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'

const UsersList = () => {
  return (
    <KTCard>
      <UsersTable columnProps={roleColumns} />
      <UserEditModal formName='CustomerCodeModalForm' />
    </KTCard>
  )
}

const CollectionOrderManagementWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CollectionOrderManagementWrapper}
