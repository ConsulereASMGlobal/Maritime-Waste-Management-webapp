import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Address',
    value: 'addrOne',
  },
  {
    label: 'Town/ City',
    value: 'townCity',
  },
  {
    label: 'Landmark',
    value: 'landMark',
  },
  {
    label: 'Zip Code',
    value: 'zipCode',
  },
  {
    label: 'Country',
    value: 'country',
  },
  {
    label: 'Contact Person',
    value: 'name',
  },
  {
    label: 'Contact Email',
    value: 'email',
  },
  {
    label: 'Contact No.',
    value: 'mobileNumber',
  },
  {
    label: 'Oi Code',
    value: 'code',
  },
  {
    action: ['edit', 'delete'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
