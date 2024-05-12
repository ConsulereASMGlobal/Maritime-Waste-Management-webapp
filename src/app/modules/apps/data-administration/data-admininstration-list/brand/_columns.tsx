import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Brand Name',
    value: 'name',
  },
  {
    label: 'Code',
    value: 'last_login',
  },
  {
    label: 'Logo',
    value: 'avatar',
  },
  {
    action: ['edit', 'delete'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
