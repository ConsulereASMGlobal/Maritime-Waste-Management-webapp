import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {roleColumns} from './_columns'
import {useQueryRequest} from '../core/QueryRequestProvider'
import {useEffect} from 'react'
const UsersList = () => {
  return (
    <KTCard>
      <UsersListHeader label='Add New' placeholder='Search Recycler' />
      <UsersTable columnProps={roleColumns} />
      <UserEditModal formName='CustomerEditCodeModalForm' />
    </KTCard>
  )
}

const CustomerListWrapper = () => {
  return (
    <QueryRequestProvider initialValue={{type: 'RECYCLER'}}>
      <QueryResponseProvider>
        <ListViewProvider>
          <UsersList />
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  )
}

export {CustomerListWrapper}
