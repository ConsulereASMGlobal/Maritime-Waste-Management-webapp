import {ListViewProvider} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {roleColumns} from './_columns'

const DropOffPointList = () => {
  return (
    <KTCard>
      {/* type=SMART_CENTRE */}
      <UsersListHeader placeholder='Search Facility Master' label='Add New' />
      <UsersTable columnProps={roleColumns} />
      <UserEditModal modalSize='modal-xl' formName='RecyclingFacilityModalForm' />
    </KTCard>
  )
}

const FacilityMasterWrapper = () => (
  <QueryRequestProvider initialValue={{type: 'FRANCHISE'}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <DropOffPointList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {FacilityMasterWrapper}
