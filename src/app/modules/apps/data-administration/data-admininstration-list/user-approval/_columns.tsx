// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from '../table/columns/UserInfoCell'
import {UserLastLoginCell} from '../table/columns/UserLastLoginCell'
import {UserTwoStepsCell} from '../table/columns/UserTwoStepsCell'
import {UserActionsCell} from '../table/columns/UserActionsCell'
import {UserSelectionCell} from '../table/columns/UserSelectionCell'
import {UserCustomHeader} from '../table/columns/UserCustomHeader'
import {UserSelectionHeader} from '../table/columns/UserSelectionHeader'
import {User} from '../core/_models'

import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {label: 'Role', value: 'role'},
  {label: 'Name', value: 'name'},
  {label: 'Mobile Number', value: 'mobileNumber'},
  {label: 'ID Picture', value: 'avatar'},
  {label: 'Selfie', value: 'avatar'},
  {label: 'Addr. Line 1', value: 'addrOne'},
  {label: 'Addr. Line 2', value: 'addrTwo'},
  {label: 'Townn/ City', value: 'townCity'},
  {label: 'Landmark', value: 'landMark'},
  {label: 'Zip Code', value: 'zipCode'},
  {label: 'ID', value: 'id'},
  {
    action: ['edit'],
  },
  {label: 'Assign Hub', value: 'name'},
  {label: 'OID', value: 'id'},
]
const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
