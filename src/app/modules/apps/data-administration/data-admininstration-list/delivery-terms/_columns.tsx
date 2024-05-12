import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Delivery Code',
    value: 'code',
  },
  {
    label: 'Meaning',
    value: 'role',
  },
  {
    action: ['edit', 'delete'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
