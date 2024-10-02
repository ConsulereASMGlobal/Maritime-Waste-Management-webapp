import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'
import {useAuth} from '../../../../auth'

const UserManagementList = () => {
  return (
    <KTCard>
      <UsersListHeader label='Add New' />
      <UsersTable columnProps={roleColumns} />
      <UserEditModal formName='BadgesModalForm' />
    </KTCard>
  )
}

const BadgesWrapper = () => {
  const {auth} = useAuth()
  const id = auth?.data?.userId
  return (
    // <QueryRequestProvider initialValue={{initialApi: `badge?userId=${id}`}}>
    <QueryRequestProvider initialValue={{initialApi: `badge`}}>
      {/* <QueryRequestProvider initialValue={{initialApi: `badge`, type: 'userId'}}> */}
      <QueryResponseProvider>
        <ListViewProvider>
          <UserManagementList />
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export {BadgesWrapper}
