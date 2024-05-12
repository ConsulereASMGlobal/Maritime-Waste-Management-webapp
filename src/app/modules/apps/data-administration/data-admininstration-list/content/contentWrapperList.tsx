import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../../_metronic/helpers'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {roleColumns} from './_columns'
const mockedData = [
  {id: '1', currencyName: 'US Dollar', shortForm: 'USD', symbol: '$'},
  {id: '2', currencyName: 'Philippine Peso', shortForm: 'PHP', symbol: 'P'},
]
const UsersList = () => {
  return (
    <KTCard>
      <UsersTable mockedData={mockedData} columnProps={roleColumns} />
    </KTCard>
  )
}

const ContentWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ContentWrapper}
