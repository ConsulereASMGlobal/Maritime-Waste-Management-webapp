import {useListView} from '../../core/ListViewProvider'
import {UsersListToolbar} from './UserListToolbar'
import {UsersListGrouping} from './UsersListGrouping'
import {UsersListSearchComponent} from './UsersListSearchComponent'

interface userProps {
  label?: string
  placeholder?: string
  searchElements?: any
  showResetButton?: boolean
}

const UsersListHeader = ({
  label = '',
  showResetButton = false,
  placeholder,
  searchElements = [],
}: userProps) => {
  return (
    <div className='card-header border-0 pt-6'>
      <UsersListSearchComponent
        showResetButton={showResetButton}
        searchElements={searchElements}
        placeholder={placeholder}
      />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {/* {selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar />} */}
        <UsersListToolbar label={label} />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {UsersListHeader}
